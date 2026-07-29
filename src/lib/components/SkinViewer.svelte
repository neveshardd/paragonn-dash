<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { applyArmorOverlay } from '$lib/armorRenderer';
	import type { ArmorSet } from '$lib/server/bridge';

	let {
		skinUrl,
		skinModel = 'default',
		armor,
		size = 260
	}: {
		skinUrl: string | null;
		skinModel?: 'slim' | 'default';
		armor?: ArmorSet;
		size?: number;
	} = $props();

	let canvas: HTMLCanvasElement;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let viewer: any = null;

	onMount(async () => {
		if (!skinUrl) return;
		const { SkinViewer, IdleAnimation } = await import('skinview3d');
		viewer = new SkinViewer({
			canvas,
			width: size,
			height: size,
			skin: skinUrl,
			model: skinModel,
			zoom: 0.6
		});
		viewer.animation = new IdleAnimation();
		viewer.autoRotate = true;
		viewer.autoRotateSpeed = 0.6;
		viewer.controls.enableZoom = false;
		if (armor) {
			applyArmorOverlay(viewer.playerObject, armor, skinModel);
		}
	});

	onDestroy(() => {
		viewer?.dispose?.();
	});
</script>

{#if skinUrl}
	<canvas bind:this={canvas} width={size} height={size}></canvas>
{:else}
	<div class="skin-placeholder" style={`width:${size}px;height:${size}px`}>?</div>
{/if}

<style>
	canvas {
		display: block;
		border-radius: 8px;
	}
	.skin-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 8px;
		color: var(--muted);
		font-size: 28px;
		font-weight: 700;
	}
</style>
