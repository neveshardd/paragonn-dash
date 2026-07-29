<script lang="ts">
	import { materialColor, materialLabel, itemIconPath, enchantmentLabel } from '$lib/equipment';
	import type { EquipmentPiece } from '$lib/server/bridge';

	const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

	let { label, piece }: { label: string; piece: EquipmentPiece | null } = $props();

	let iconPath = $derived(piece ? itemIconPath(piece.material) : null);
</script>

<div class="eq-card" class:empty={!piece}>
	<div class="eq-swatch" style={`background:${materialColor(piece?.material)}`}>
		{#if iconPath}
			<img src={iconPath} alt={piece ? materialLabel(piece.material) : ''} width="28" height="28" />
		{/if}
	</div>
	<div class="eq-info">
		<div class="eq-label">{label}</div>
		<div class="eq-value">{piece?.displayName ?? (piece ? materialLabel(piece.material) : 'Vazio')}</div>
		{#if piece?.displayName}
			<div class="eq-sub">{materialLabel(piece.material)}</div>
		{/if}
		{#if piece && Object.keys(piece.enchantments).length > 0}
			<div class="eq-ench">
				{#each Object.entries(piece.enchantments) as [name, level]}
					<span class="badge badge-gray">{enchantmentLabel(name)} {ROMAN[level] ?? level}</span>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.eq-card {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 12px;
		border-radius: 8px;
		background: var(--surface);
		border: 1px solid var(--border);
	}
	.eq-card.empty {
		opacity: 0.5;
	}
	.eq-swatch {
		width: 32px;
		height: 32px;
		border-radius: 6px;
		flex-shrink: 0;
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.eq-swatch img {
		image-rendering: pixelated;
	}
	.eq-label {
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--muted);
	}
	.eq-value {
		font-weight: 600;
		font-size: 14px;
	}
	.eq-sub {
		font-size: 11px;
		color: var(--muted);
	}
	.eq-ench {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		margin-top: 4px;
	}
</style>
