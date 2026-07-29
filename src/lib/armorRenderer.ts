// Renderiza a armadura de verdade (textura oficial do Minecraft 1.8.8, extraida do
// pacote "minecraft-assets") anexada aos "bones" do modelo do skinview3d.
//
// O skinview3d so renderiza skin/cape/elytra - nao existe biblioteca pronta pra
// armadura 3D. Aqui a gente usa a mesma tecnica que o proprio skinview3d usa pra
// desenhar a camada de overlay da skin (uma caixa um pouco maior que a peca base,
// com UV mapeado pro layout padrao do ModelBiped) so que apontando pra textura real
// de armadura (64x32, mesmo formato usado desde sempre pelo Minecraft) em vez da
// textura da skin. As texturas ficam em /static/textures/armor/{tier}_layer_{1,2}.png.
//
// Particularidade do couro: a textura base (leather_layer_*.png) e cinza/grayscale
// de proposito - o jogo tinge ela com a cor do couro (padrao 0xA06540 se nao tingido)
// via multiplicacao. Reproduzimos isso com material.color.

import {
	BoxGeometry,
	BufferAttribute,
	DoubleSide,
	Group,
	Mesh,
	MeshStandardMaterial,
	NearestFilter,
	Object3D,
	Texture,
	TextureLoader,
	Vector2
} from 'three';
import type { ArmorSet, EquipmentPiece } from './server/bridge';

const ARMOR_TAG = 'paragonn-armor-piece';
const DEFAULT_LEATHER_COLOR = 0xa06540;
const textureLoader = new TextureLoader();
const textureCache = new Map<string, Texture>();

function loadArmorTexture(tier: string, layer: 1 | 2): Texture {
	const key = `${tier}_layer_${layer}`;
	const cached = textureCache.get(key);
	if (cached) return cached;

	const texture = textureLoader.load(`/textures/armor/${key}.png`);
	texture.magFilter = NearestFilter;
	texture.minFilter = NearestFilter;
	textureCache.set(key, texture);
	return texture;
}

/** Mesmo algoritmo de UV-unwrap do skinview3d (model.js), generico pro layout
 *  padrao do ModelBiped, mas apontando pra uma textura 64x32 (formato da armadura)
 *  em vez de 64x64 (formato da skin). */
function setArmorUVs(
	box: BoxGeometry,
	u: number,
	v: number,
	width: number,
	height: number,
	depth: number,
	textureWidth = 64,
	textureHeight = 32
) {
	const toFaceVertices = (x1: number, y1: number, x2: number, y2: number) => [
		new Vector2(x1 / textureWidth, 1.0 - y2 / textureHeight),
		new Vector2(x2 / textureWidth, 1.0 - y2 / textureHeight),
		new Vector2(x2 / textureWidth, 1.0 - y1 / textureHeight),
		new Vector2(x1 / textureWidth, 1.0 - y1 / textureHeight)
	];
	const top = toFaceVertices(u + depth, v, u + width + depth, v + depth);
	const bottom = toFaceVertices(u + width + depth, v, u + width * 2 + depth, v + depth);
	const left = toFaceVertices(u, v + depth, u + depth, v + depth + height);
	const front = toFaceVertices(u + depth, v + depth, u + width + depth, v + depth + height);
	const right = toFaceVertices(u + width + depth, v + depth, u + width + depth * 2, v + height + depth);
	const back = toFaceVertices(u + width + depth * 2, v + depth, u + width * 2 + depth * 2, v + height + depth);

	const uvRight = [right[3], right[2], right[0], right[1]];
	const uvLeft = [left[3], left[2], left[0], left[1]];
	const uvTop = [top[3], top[2], top[0], top[1]];
	const uvBottom = [bottom[0], bottom[1], bottom[3], bottom[2]];
	const uvFront = [front[3], front[2], front[0], front[1]];
	const uvBack = [back[3], back[2], back[0], back[1]];

	const data: number[] = [];
	for (const face of [uvRight, uvLeft, uvTop, uvBottom, uvFront, uvBack]) {
		for (const vertex of face) data.push(vertex.x, vertex.y);
	}
	const uvAttr = box.attributes.uv as BufferAttribute;
	uvAttr.set(new Float32Array(data));
	uvAttr.needsUpdate = true;
}

// Regioes do ModelBiped no layout 64x32 (mesmo layout usado pelo formato antigo de
// skin - a textura de armadura reaproveita esse layout desde sempre).
const REGION = {
	head: { u: 0, v: 0, w: 8, h: 8, d: 8 },
	body: { u: 16, v: 16, w: 8, h: 12, d: 4 },
	arm: { u: 40, v: 16, w: 4, h: 12, d: 4 },
	leg: { u: 0, v: 16, w: 4, h: 12, d: 4 }
};

function tierFromMaterial(material: string): string | null {
	const match = material.match(/^(LEATHER|CHAINMAIL|IRON|GOLD|DIAMOND)_/);
	return match ? match[1].toLowerCase() : null;
}

function addArmorMesh(
	parent: Object3D,
	region: { u: number; w: number; h: number; d: number },
	v: number,
	boxSize: [number, number, number],
	position: [number, number, number],
	texture: Texture,
	tintColor: number,
	mirror = false
) {
	const geometry = new BoxGeometry(...boxSize);
	setArmorUVs(geometry, region.u, v, region.w, region.h, region.d);
	const material = new MeshStandardMaterial({
		map: texture,
		color: tintColor,
		transparent: true,
		alphaTest: 1e-5,
		side: DoubleSide,
		polygonOffset: true,
		polygonOffsetFactor: -1,
		polygonOffsetUnits: -1
	});
	const mesh = new Mesh(geometry, material);
	mesh.position.set(...position);
	if (mirror) {
		mesh.scale.x = -1;
	}
	mesh.userData[ARMOR_TAG] = true;
	parent.add(mesh);
}

function clearArmor(parent: Object3D) {
	const toRemove = parent.children.filter((child) => child.userData?.[ARMOR_TAG]);
	for (const child of toRemove) {
		parent.remove(child);
		const mesh = child as Mesh;
		mesh.geometry?.dispose();
		(mesh.material as MeshStandardMaterial)?.dispose?.();
	}
}

function piece(armor: ArmorSet, slot: keyof ArmorSet): EquipmentPiece | null {
	return armor[slot];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyArmorOverlay(playerObject: any, armor: ArmorSet, skinModel: 'slim' | 'default' = 'default') {
	const skin = playerObject.skin;
	const head: Group = skin.head;
	const body: Group = skin.body;
	const rightLeg: Group = skin.rightLeg;
	const leftLeg: Group = skin.leftLeg;
	const rightArm: Group = skin.rightArm;
	const leftArm: Group = skin.leftArm;

	// Mesmo deslocamento que o skinview3d aplica no pivo interno do braco (rightArmPivot/
	// leftArmPivot) pra compensar a largura menor do modelo "slim" - nosso mesh de manga
	// e filho direto do grupo do braco (nao do pivo interno), entao precisamos repetir
	// esse deslocamento manualmente pra alinhar certinho nos dois modelos.
	const armPivotX = skinModel === 'slim' ? 0.5 : 1;

	[head, body, rightLeg, leftLeg, rightArm, leftArm].forEach(clearArmor);

	const helmet = piece(armor, 'helmet');
	const chestplate = piece(armor, 'chestplate');
	const leggings = piece(armor, 'leggings');
	const boots = piece(armor, 'boots');

	if (helmet) {
		const tier = tierFromMaterial(helmet.material);
		if (tier) {
			const texture = loadArmorTexture(tier, 1);
			const tint = tier === 'leather' ? DEFAULT_LEATHER_COLOR : 0xffffff;
			addArmorMesh(head, REGION.head, 0, [9.2, 9.2, 9.2], [0, 4, 0], texture, tint);
		}
	}

	if (chestplate) {
		const tier = tierFromMaterial(chestplate.material);
		if (tier) {
			const texture = loadArmorTexture(tier, 1);
			const tint = tier === 'leather' ? DEFAULT_LEATHER_COLOR : 0xffffff;
			addArmorMesh(body, REGION.body, 16, [9.2, 13.2, 5.2], [0, 0, 0], texture, tint);
			addArmorMesh(rightArm, REGION.arm, 16, [5.2, 13.2, 5.2], [-armPivotX, -4, 0], texture, tint);
			addArmorMesh(leftArm, REGION.arm, 16, [5.2, 13.2, 5.2], [armPivotX, -4, 0], texture, tint, true);
		}
	}

	if (leggings) {
		const tier = tierFromMaterial(leggings.material);
		if (tier) {
			const texture = loadArmorTexture(tier, 2);
			const tint = tier === 'leather' ? DEFAULT_LEATHER_COLOR : 0xffffff;
			addArmorMesh(body, REGION.body, 16, [8.8, 12.8, 4.8], [0, 0, 0], texture, tint);
			addArmorMesh(rightLeg, REGION.leg, 16, [4.8, 12.8, 4.8], [0, -6, 0], texture, tint);
			addArmorMesh(leftLeg, REGION.leg, 16, [4.8, 12.8, 4.8], [0, -6, 0], texture, tint, true);
		}
	}

	if (boots) {
		const tier = tierFromMaterial(boots.material);
		if (tier) {
			const texture = loadArmorTexture(tier, 1);
			const tint = tier === 'leather' ? DEFAULT_LEATHER_COLOR : 0xffffff;
			addArmorMesh(rightLeg, REGION.leg, 16, [5.6, 13.6, 5.6], [0, -6, 0], texture, tint);
			addArmorMesh(leftLeg, REGION.leg, 16, [5.6, 13.6, 5.6], [0, -6, 0], texture, tint, true);
		}
	}
}
