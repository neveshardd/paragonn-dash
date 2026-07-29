// Tradução e estilo de materiais/encantamentos de itens do Minecraft 1.8, usado nos
// cards de equipamento (armadura/arma) tanto no painel quanto reaproveitado como
// referência no site.

const TIER_COLORS: Record<string, string> = {
	WOOD: '#a97c50',
	STONE: '#8d8d8d',
	CHAINMAIL: '#6b7280',
	IRON: '#d8d8d8',
	GOLD: '#facc15',
	DIAMOND: '#67e8f9',
	LEATHER: '#a15c3e'
};

const PIECE_LABELS: Record<string, string> = {
	SWORD: 'Espada',
	AXE: 'Machado',
	PICKAXE: 'Picareta',
	SPADE: 'Pá',
	HOE: 'Enxada',
	HELMET: 'Capacete',
	CHESTPLATE: 'Peitoral',
	LEGGINGS: 'Calça',
	BOOTS: 'Botas'
};

// O asset/icone real de textura chama a peca de "shovel", mas o Material do Bukkit
// 1.8 usa o nome legado "SPADE" - so isso diverge do padrao <tier>_<peca>.png.
const ICON_FILE_OVERRIDES: Record<string, string> = {
	SPADE: 'shovel'
};

const TIER_LABELS: Record<string, string> = {
	WOOD: 'Madeira',
	STONE: 'Pedra',
	CHAINMAIL: 'Cota de Malha',
	IRON: 'Ferro',
	GOLD: 'Ouro',
	DIAMOND: 'Diamante',
	LEATHER: 'Couro'
};

// Nomes legados que Enchantment.getName() devolve no Bukkit 1.8 (nao sao os nomes
// amigaveis que aparecem no jogo) - traduzidos pra portugues aqui.
const ENCHANTMENT_LABELS: Record<string, string> = {
	PROTECTION_ENVIRONMENTAL: 'Proteção',
	PROTECTION_FIRE: 'Proteção contra Fogo',
	PROTECTION_FALL: 'Queda Suave',
	PROTECTION_EXPLOSIONS: 'Proteção contra Explosão',
	PROTECTION_PROJECTILE: 'Proteção contra Projétil',
	OXYGEN: 'Respiração',
	WATER_WORKER: 'Afinidade Aquática',
	THORNS: 'Espinhos',
	DEPTH_STRIDER: 'Passos da Profundeza',
	DAMAGE_ALL: 'Afiação',
	DAMAGE_UNDEAD: 'Prejuízo aos Mortos-vivos',
	DAMAGE_ARTHROPODS: 'Prejuízo aos Artrópodes',
	KNOCKBACK: 'Empurrão',
	FIRE_ASPECT: 'Aspecto Ígneo',
	LOOT_BONUS_MOBS: 'Saque',
	DIG_SPEED: 'Eficiência',
	SILK_TOUCH: 'Toque Suave',
	DURABILITY: 'Durabilidade',
	LOOT_BONUS_BLOCKS: 'Fortuna',
	ARROW_DAMAGE: 'Poder',
	ARROW_KNOCKBACK: 'Impacto',
	ARROW_FIRE: 'Chama',
	ARROW_INFINITE: 'Infinidade',
	LUCK: 'Sorte do Mar',
	LURE: 'Atração'
};

// O item icon do couro (helmet/chestplate/leggings/boots) e cinza/grayscale de
// proposito - geramos uma versao ja tingida com a cor padrao do couro (ver
// armorRenderer.ts) e usamos ela em vez do arquivo original.
const LEATHER_TINTED_PIECES = new Set(['HELMET', 'CHESTPLATE', 'LEGGINGS', 'BOOTS']);

function splitMaterial(material: string): { tier: string; piece: string } | null {
	for (const piece of Object.keys(PIECE_LABELS)) {
		if (material.endsWith(`_${piece}`)) {
			return { tier: material.slice(0, material.length - piece.length - 1), piece };
		}
	}
	return null;
}

export function materialColor(material: string | undefined | null): string {
	if (!material) return '#3a3a42';
	const parsed = splitMaterial(material);
	if (!parsed) return '#3a3a42';
	return TIER_COLORS[parsed.tier] ?? '#3a3a42';
}

export function materialLabel(material: string | undefined | null): string {
	if (!material) return 'Vazio';
	const parsed = splitMaterial(material);
	if (!parsed) return material;
	const tierLabel = TIER_LABELS[parsed.tier] ?? parsed.tier;
	const pieceLabel = PIECE_LABELS[parsed.piece] ?? parsed.piece;
	return `${pieceLabel} de ${tierLabel}`;
}

/** Caminho do icone real do item (16x16, mesmo sprite do inventario do jogo),
 *  servido a partir de /static/textures/items. */
export function itemIconPath(material: string | undefined | null): string | null {
	if (!material) return null;
	const parsed = splitMaterial(material);
	if (!parsed) return null;
	const tier = parsed.tier.toLowerCase();
	const piece = (ICON_FILE_OVERRIDES[parsed.piece] ?? parsed.piece).toLowerCase();
	if (parsed.tier === 'LEATHER' && LEATHER_TINTED_PIECES.has(parsed.piece)) {
		return `/textures/items/${tier}_${piece}_tinted.png`;
	}
	return `/textures/items/${tier}_${piece}.png`;
}

/** Traduz o nome legado do encantamento (Enchantment.getName() no Bukkit 1.8) pro
 *  nome amigavel em portugues, com um fallback razoavel se nao mapeado. */
export function enchantmentLabel(rawName: string): string {
	if (ENCHANTMENT_LABELS[rawName]) return ENCHANTMENT_LABELS[rawName];
	return rawName
		.toLowerCase()
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}
