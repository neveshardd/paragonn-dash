<script lang="ts">
	import type { PageData } from './$types';
	import SkinViewer from '$lib/components/SkinViewer.svelte';
	import EquipmentCard from '$lib/components/EquipmentCard.svelte';
	import VitalsPanel from '$lib/components/VitalsPanel.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>{data.profile.name} — Paragonn Panel</title></svelte:head>

<div class="page-header">
	<div>
		<div class="page-title">{data.profile.name}</div>
		<div class="page-sub">
			{#if data.profile.online}
				<span class="badge badge-green">Online agora</span>
			{:else}
				Offline · última vez visto {new Date(data.profile.lastSeen).toLocaleString('pt-BR')}
			{/if}
		</div>
	</div>
	<a href="/membros" class="btn btn-ghost">← Voltar</a>
</div>

<div class="page-body">
	<div class="profile-grid">
		<div class="profile-skin">
			<SkinViewer
				skinUrl={data.skinUrl}
				skinModel={data.skinModel}
				armor={data.profile.armor}
				size={280}
			/>
		</div>
		<div class="profile-equipment">
			<VitalsPanel vitals={data.profile.vitals} />

			<div class="form-block">
				<div class="form-block-head">Armadura</div>
				<div class="form-body eq-grid">
					<EquipmentCard label="Capacete" piece={data.profile.armor.helmet} />
					<EquipmentCard label="Peitoral" piece={data.profile.armor.chestplate} />
					<EquipmentCard label="Calça" piece={data.profile.armor.leggings} />
					<EquipmentCard label="Botas" piece={data.profile.armor.boots} />
				</div>
			</div>

			{#if data.profile.heldWeapon}
				<div class="form-block" style="margin-top:16px">
					<div class="form-block-head">Arma na mão</div>
					<div class="form-body eq-grid">
						<EquipmentCard label="Slot 1 (hotbar)" piece={data.profile.heldWeapon} />
					</div>
				</div>
			{/if}

			<div class="act" style="margin-top:16px; gap: 8px;">
				<a href={`/economia?jogador=${encodeURIComponent(data.profile.name)}`} class="btn btn-ghost btn-sm">
					Ver economia
				</a>
				<a href={`/punicoes?jogador=${encodeURIComponent(data.profile.name)}`} class="btn btn-ghost btn-sm">
					Ver punições
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.profile-grid {
		display: flex;
		gap: 24px;
		flex-wrap: wrap;
		align-items: flex-start;
	}
	.profile-skin {
		flex-shrink: 0;
	}
	.profile-equipment {
		flex: 1;
		min-width: 280px;
	}
	.eq-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 10px;
	}
</style>
