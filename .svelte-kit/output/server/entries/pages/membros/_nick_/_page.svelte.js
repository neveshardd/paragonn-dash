import { n as onDestroy } from "../../../../chunks/index-server.js";
import { H as escape_html, V as attr, a as derived, n as attr_class, o as ensure_array_like, r as attr_style, s as head } from "../../../../chunks/dev.js";
import { TextureLoader } from "three";
new TextureLoader();
//#endregion
//#region src/lib/components/SkinViewer.svelte
function SkinViewer_1($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { skinUrl, skinModel = "default", armor, size = 260 } = $$props;
		let viewer = null;
		onDestroy(() => {
			viewer?.dispose?.();
		});
		if (skinUrl) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<canvas${attr("width", size)}${attr("height", size)} class="svelte-1ywrewx"></canvas>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="skin-placeholder svelte-1ywrewx"${attr_style(`width:${size}px;height:${size}px`)}>?</div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/lib/equipment.ts
var TIER_COLORS = {
	WOOD: "#a97c50",
	STONE: "#8d8d8d",
	CHAINMAIL: "#6b7280",
	IRON: "#d8d8d8",
	GOLD: "#facc15",
	DIAMOND: "#67e8f9",
	LEATHER: "#a15c3e"
};
var PIECE_LABELS = {
	SWORD: "Espada",
	AXE: "Machado",
	PICKAXE: "Picareta",
	SPADE: "Pá",
	HOE: "Enxada",
	HELMET: "Capacete",
	CHESTPLATE: "Peitoral",
	LEGGINGS: "Calça",
	BOOTS: "Botas"
};
var ICON_FILE_OVERRIDES = { SPADE: "shovel" };
var TIER_LABELS = {
	WOOD: "Madeira",
	STONE: "Pedra",
	CHAINMAIL: "Cota de Malha",
	IRON: "Ferro",
	GOLD: "Ouro",
	DIAMOND: "Diamante",
	LEATHER: "Couro"
};
var ENCHANTMENT_LABELS = {
	PROTECTION_ENVIRONMENTAL: "Proteção",
	PROTECTION_FIRE: "Proteção contra Fogo",
	PROTECTION_FALL: "Queda Suave",
	PROTECTION_EXPLOSIONS: "Proteção contra Explosão",
	PROTECTION_PROJECTILE: "Proteção contra Projétil",
	OXYGEN: "Respiração",
	WATER_WORKER: "Afinidade Aquática",
	THORNS: "Espinhos",
	DEPTH_STRIDER: "Passos da Profundeza",
	DAMAGE_ALL: "Afiação",
	DAMAGE_UNDEAD: "Prejuízo aos Mortos-vivos",
	DAMAGE_ARTHROPODS: "Prejuízo aos Artrópodes",
	KNOCKBACK: "Empurrão",
	FIRE_ASPECT: "Aspecto Ígneo",
	LOOT_BONUS_MOBS: "Saque",
	DIG_SPEED: "Eficiência",
	SILK_TOUCH: "Toque Suave",
	DURABILITY: "Durabilidade",
	LOOT_BONUS_BLOCKS: "Fortuna",
	ARROW_DAMAGE: "Poder",
	ARROW_KNOCKBACK: "Impacto",
	ARROW_FIRE: "Chama",
	ARROW_INFINITE: "Infinidade",
	LUCK: "Sorte do Mar",
	LURE: "Atração"
};
var LEATHER_TINTED_PIECES = new Set([
	"HELMET",
	"CHESTPLATE",
	"LEGGINGS",
	"BOOTS"
]);
function splitMaterial(material) {
	for (const piece of Object.keys(PIECE_LABELS)) if (material.endsWith(`_${piece}`)) return {
		tier: material.slice(0, material.length - piece.length - 1),
		piece
	};
	return null;
}
function materialColor(material) {
	if (!material) return "#3a3a42";
	const parsed = splitMaterial(material);
	if (!parsed) return "#3a3a42";
	return TIER_COLORS[parsed.tier] ?? "#3a3a42";
}
function materialLabel(material) {
	if (!material) return "Vazio";
	const parsed = splitMaterial(material);
	if (!parsed) return material;
	const tierLabel = TIER_LABELS[parsed.tier] ?? parsed.tier;
	return `${PIECE_LABELS[parsed.piece] ?? parsed.piece} de ${tierLabel}`;
}
/** Caminho do icone real do item (16x16, mesmo sprite do inventario do jogo),
*  servido a partir de /static/textures/items. */
function itemIconPath(material) {
	if (!material) return null;
	const parsed = splitMaterial(material);
	if (!parsed) return null;
	const tier = parsed.tier.toLowerCase();
	const piece = (ICON_FILE_OVERRIDES[parsed.piece] ?? parsed.piece).toLowerCase();
	if (parsed.tier === "LEATHER" && LEATHER_TINTED_PIECES.has(parsed.piece)) return `/textures/items/${tier}_${piece}_tinted.png`;
	return `/textures/items/${tier}_${piece}.png`;
}
/** Traduz o nome legado do encantamento (Enchantment.getName() no Bukkit 1.8) pro
*  nome amigavel em portugues, com um fallback razoavel se nao mapeado. */
function enchantmentLabel(rawName) {
	if (ENCHANTMENT_LABELS[rawName]) return ENCHANTMENT_LABELS[rawName];
	return rawName.toLowerCase().split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
//#endregion
//#region src/lib/components/EquipmentCard.svelte
function EquipmentCard($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const ROMAN = [
			"",
			"I",
			"II",
			"III",
			"IV",
			"V",
			"VI",
			"VII",
			"VIII",
			"IX",
			"X"
		];
		let { label, piece } = $$props;
		let iconPath = derived(() => piece ? itemIconPath(piece.material) : null);
		$$renderer.push(`<div${attr_class("eq-card svelte-1oflioy", void 0, { "empty": !piece })}><div class="eq-swatch svelte-1oflioy"${attr_style(`background:${materialColor(piece?.material)}`)}>`);
		if (iconPath()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img${attr("src", iconPath())}${attr("alt", piece ? materialLabel(piece.material) : "")} width="28" height="28" class="svelte-1oflioy"/>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="eq-info"><div class="eq-label svelte-1oflioy">${escape_html(label)}</div> <div class="eq-value svelte-1oflioy">${escape_html(piece?.displayName ?? (piece ? materialLabel(piece.material) : "Vazio"))}</div> `);
		if (piece?.displayName) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="eq-sub svelte-1oflioy">${escape_html(materialLabel(piece.material))}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (piece && Object.keys(piece.enchantments).length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="eq-ench svelte-1oflioy"><!--[-->`);
			const each_array = ensure_array_like(Object.entries(piece.enchantments));
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let [name, level] = each_array[$$index];
				$$renderer.push(`<span class="badge badge-gray">${escape_html(enchantmentLabel(name))} ${escape_html(ROMAN[level] ?? level)}</span>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div>`);
	});
}
//#endregion
//#region src/lib/components/VitalsPanel.svelte
function VitalsPanel($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { vitals } = $$props;
		const HUD_ICON = {
			heart: {
				empty: "/textures/hud/heart_empty.png",
				half: "/textures/hud/heart_half.png",
				full: "/textures/hud/heart_full.png"
			},
			hunger: {
				empty: "/textures/hud/hunger_empty.png",
				half: "/textures/hud/hunger_half.png",
				full: "/textures/hud/hunger_full.png"
			}
		};
		function iconRow(value, max) {
			const totalIcons = Math.max(1, Math.round(max / 2));
			const row = [];
			for (let i = 0; i < totalIcons; i++) {
				const remaining = value - i * 2;
				row.push(remaining >= 2 ? "full" : remaining >= 1 ? "half" : "empty");
			}
			return row;
		}
		function pct(value, max) {
			if (max <= 0) return 0;
			return Math.max(0, Math.min(100, value / max * 100));
		}
		let hearts = derived(() => iconRow(vitals.health, vitals.maxHealth));
		let hunger = derived(() => iconRow(vitals.foodLevel, 20));
		$$renderer.push(`<div class="form-block" style="margin-bottom:16px"><div class="form-block-head">Status</div> <div class="form-body"><div class="icon-row svelte-7dt6n3"><!--[-->`);
		const each_array = ensure_array_like(hearts());
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let state = each_array[i];
			$$renderer.push(`<div class="icon-slot svelte-7dt6n3"${attr_style(i === 0 ? "" : "margin-left:-2px")}><img${attr("src", HUD_ICON.heart.empty)} alt="" width="16" height="16" class="svelte-7dt6n3"/> `);
			if (state !== "empty") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<img class="overlay svelte-7dt6n3"${attr("src", state === "full" ? HUD_ICON.heart.full : HUD_ICON.heart.half)} alt="" width="16" height="16"/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="icon-row svelte-7dt6n3" style="margin-top:4px"><!--[-->`);
		const each_array_1 = ensure_array_like(hunger());
		for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
			let state = each_array_1[i];
			$$renderer.push(`<div class="icon-slot svelte-7dt6n3"${attr_style(i === 0 ? "" : "margin-left:-2px")}><img${attr("src", HUD_ICON.hunger.empty)} alt="" width="16" height="16" class="svelte-7dt6n3"/> `);
			if (state !== "empty") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<img class="overlay svelte-7dt6n3"${attr("src", state === "full" ? HUD_ICON.hunger.full : HUD_ICON.hunger.half)} alt="" width="16" height="16"/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="stat-row" style="margin-top:10px"><div class="stat-row-head svelte-7dt6n3"><span>⭐ Nível ${escape_html(vitals.xpLevel)}</span> <span class="stat-row-value svelte-7dt6n3">${escape_html(Math.round(vitals.xpProgress * 100))}%</span></div> <div class="stat-bar-track svelte-7dt6n3"><div class="stat-bar-fill svelte-7dt6n3"${attr_style(`width:${pct(vitals.xpProgress, 1)}%; background:#16a34a`)}></div></div></div></div></div>`);
	});
}
//#endregion
//#region src/routes/membros/[nick]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("k6ss7y", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(data.profile.name)} — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-header"><div><div class="page-title">${escape_html(data.profile.name)}</div> <div class="page-sub">`);
		if (data.profile.online) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="badge badge-green">Online agora</span>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`Offline · última vez visto ${escape_html(new Date(data.profile.lastSeen).toLocaleString("pt-BR"))}`);
		}
		$$renderer.push(`<!--]--></div></div> <a href="/membros" class="btn btn-ghost">← Voltar</a></div> <div class="page-body"><div class="profile-grid svelte-k6ss7y"><div class="profile-skin svelte-k6ss7y">`);
		SkinViewer_1($$renderer, {
			skinUrl: data.skinUrl,
			skinModel: data.skinModel,
			armor: data.profile.armor,
			size: 280
		});
		$$renderer.push(`<!----></div> <div class="profile-equipment svelte-k6ss7y">`);
		VitalsPanel($$renderer, { vitals: data.profile.vitals });
		$$renderer.push(`<!----> <div class="form-block"><div class="form-block-head">Armadura</div> <div class="form-body eq-grid svelte-k6ss7y">`);
		EquipmentCard($$renderer, {
			label: "Capacete",
			piece: data.profile.armor.helmet
		});
		$$renderer.push(`<!----> `);
		EquipmentCard($$renderer, {
			label: "Peitoral",
			piece: data.profile.armor.chestplate
		});
		$$renderer.push(`<!----> `);
		EquipmentCard($$renderer, {
			label: "Calça",
			piece: data.profile.armor.leggings
		});
		$$renderer.push(`<!----> `);
		EquipmentCard($$renderer, {
			label: "Botas",
			piece: data.profile.armor.boots
		});
		$$renderer.push(`<!----></div></div> `);
		if (data.profile.heldWeapon) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="form-block" style="margin-top:16px"><div class="form-block-head">Arma na mão</div> <div class="form-body eq-grid svelte-k6ss7y">`);
			EquipmentCard($$renderer, {
				label: "Slot 1 (hotbar)",
				piece: data.profile.heldWeapon
			});
			$$renderer.push(`<!----></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="act" style="margin-top:16px; gap: 8px;"><a${attr("href", `/economia?jogador=${encodeURIComponent(data.profile.name)}`)} class="btn btn-ghost btn-sm">Ver economia</a> <a${attr("href", `/punicoes?jogador=${encodeURIComponent(data.profile.name)}`)} class="btn btn-ghost btn-sm">Ver punições</a></div></div></div></div>`);
	});
}
//#endregion
export { _page as default };
