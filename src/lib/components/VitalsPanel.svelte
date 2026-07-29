<script lang="ts">
	import type { PlayerVitals } from '$lib/server/bridge';

	let { vitals }: { vitals: PlayerVitals } = $props();

	// Sprites reais extraidos de gui/icons.png (Minecraft 1.8.8): cada icone e 9x9,
	// vazio/cheio/metade nas mesmas coordenadas pra coracao e fome (so a linha muda).
	const HUD_ICON = {
		heart: {
			empty: '/textures/hud/heart_empty.png',
			half: '/textures/hud/heart_half.png',
			full: '/textures/hud/heart_full.png'
		},
		hunger: {
			empty: '/textures/hud/hunger_empty.png',
			half: '/textures/hud/hunger_half.png',
			full: '/textures/hud/hunger_full.png'
		}
	};

	// Igual o Minecraft faz: o "container" vazio e sempre a base, e o coracao/frango
	// cheio (ou pela metade) e desenhado por cima.
	function iconRow(value: number, max: number): ('empty' | 'half' | 'full')[] {
		const totalIcons = Math.max(1, Math.round(max / 2));
		const row: ('empty' | 'half' | 'full')[] = [];
		for (let i = 0; i < totalIcons; i++) {
			const remaining = value - i * 2;
			row.push(remaining >= 2 ? 'full' : remaining >= 1 ? 'half' : 'empty');
		}
		return row;
	}

	function pct(value: number, max: number) {
		if (max <= 0) return 0;
		return Math.max(0, Math.min(100, (value / max) * 100));
	}

	let hearts = $derived(iconRow(vitals.health, vitals.maxHealth));
	let hunger = $derived(iconRow(vitals.foodLevel, 20));
</script>

<div class="form-block" style="margin-bottom:16px">
	<div class="form-block-head">Status</div>
	<div class="form-body">
		<div class="icon-row">
			{#each hearts as state, i (i)}
				<div class="icon-slot" style={i === 0 ? '' : 'margin-left:-2px'}>
					<img src={HUD_ICON.heart.empty} alt="" width="16" height="16" />
					{#if state !== 'empty'}
						<img
							class="overlay"
							src={state === 'full' ? HUD_ICON.heart.full : HUD_ICON.heart.half}
							alt=""
							width="16"
							height="16"
						/>
					{/if}
				</div>
			{/each}
		</div>

		<div class="icon-row" style="margin-top:4px">
			{#each hunger as state, i (i)}
				<div class="icon-slot" style={i === 0 ? '' : 'margin-left:-2px'}>
					<img src={HUD_ICON.hunger.empty} alt="" width="16" height="16" />
					{#if state !== 'empty'}
						<img
							class="overlay"
							src={state === 'full' ? HUD_ICON.hunger.full : HUD_ICON.hunger.half}
							alt=""
							width="16"
							height="16"
						/>
					{/if}
				</div>
			{/each}
		</div>

		<div class="stat-row" style="margin-top:10px">
			<div class="stat-row-head">
				<span>⭐ Nível {vitals.xpLevel}</span>
				<span class="stat-row-value">{Math.round(vitals.xpProgress * 100)}%</span>
			</div>
			<div class="stat-bar-track">
				<div class="stat-bar-fill" style={`width:${pct(vitals.xpProgress, 1)}%; background:#16a34a`}></div>
			</div>
		</div>
	</div>
</div>

<style>
	.icon-row {
		display: flex;
	}
	.icon-slot {
		position: relative;
		width: 16px;
		height: 16px;
	}
	.icon-slot img {
		image-rendering: pixelated;
	}
	.icon-slot .overlay {
		position: absolute;
		inset: 0;
	}
	.stat-row-head {
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		margin-bottom: 6px;
	}
	.stat-row-value {
		font-weight: 700;
	}
	.stat-bar-track {
		height: 8px;
		border-radius: 999px;
		background: var(--surface);
		border: 1px solid var(--border);
		overflow: hidden;
	}
	.stat-bar-fill {
		height: 100%;
		border-radius: 999px;
	}
</style>
