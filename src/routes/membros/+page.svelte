<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head><title>Membros Online — Paragonn Panel</title></svelte:head>

<div class="page-header">
	<div>
		<div class="page-title">Membros Online</div>
		<div class="page-sub">{data.players.length} jogador(es) no servidor agora</div>
	</div>
</div>

<div class="page-body">
	{#if data.bridgeOffline}
		<div class="alert alert-error">
			Não foi possível conectar ao paragonn-bridge. Verifique se o plugin está rodando no
			servidor e se <span class="mono">BRIDGE_API_URL</span>/<span class="mono">BRIDGE_API_KEY</span>
			estão corretos no <span class="mono">.env</span>.
		</div>
	{/if}

	<div class="tbl-wrap">
		<table>
			<thead>
				<tr>
					<th>Jogador</th>
					<th>UUID</th>
					<th style="text-align:right">Ações</th>
				</tr>
			</thead>
			<tbody>
				{#each data.players as p}
					<tr>
						<td style="font-weight:500">{p.name}</td>
						<td class="muted sm mono">{p.uuid}</td>
						<td class="act">
							<a href={`/membros/${encodeURIComponent(p.name)}`} class="btn btn-ghost btn-sm">Ver perfil</a>
						</td>
					</tr>
				{:else}
					<tr><td colspan="3"><div class="empty">Ninguém online agora.</div></td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
