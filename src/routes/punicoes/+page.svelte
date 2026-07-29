<script lang="ts">
	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();

	const TYPE_LABELS: Record<string, string> = {
		BAN: 'Ban',
		TEMP_BAN: 'Ban temporário',
		MUTE: 'Mute',
		TEMP_MUTE: 'Mute temporário',
		WARN: 'Advertência'
	};

	const TYPE_BADGE: Record<string, string> = {
		BAN: 'badge-red',
		TEMP_BAN: 'badge-red',
		MUTE: 'badge-amber',
		TEMP_MUTE: 'badge-amber',
		WARN: 'badge-gray'
	};

	let showForm = $state(false);
</script>

<svelte:head><title>Punições — Paragonn Panel</title></svelte:head>

<div class="page-header">
	<div>
		<div class="page-title">Punições</div>
		<div class="page-sub">
			{data.jogador ? `Punições de ${data.jogador}` : `${data.punishments.length} punição(ões) ativa(s)`}
		</div>
	</div>
	<button class="btn btn-primary" onclick={() => (showForm = !showForm)}>
		{showForm ? 'Fechar' : '+ Nova Punição'}
	</button>
</div>

<div class="page-body">
	{#if form?.error}
		<div class="alert alert-error">{form.error}</div>
	{/if}

	{#if data.bridgeOffline}
		<div class="alert alert-error">paragonn-bridge indisponível ou paragonn-bans não carregado.</div>
	{/if}

	<form method="GET" action="/punicoes" class="form-block" style="margin-bottom:16px">
		<div class="form-block-head">Filtrar por jogador</div>
		<div class="form-body">
			<div class="form-row">
				<div class="field" style="flex:2">
					<input name="jogador" type="text" placeholder="Nome do jogador (deixe vazio para ver todas ativas)" value={data.jogador} />
				</div>
				<div class="field" style="justify-content:flex-end; display:flex; align-items:flex-end;">
					<button type="submit" class="btn">Filtrar</button>
				</div>
			</div>
		</div>
	</form>

	{#if showForm}
		<div class="form-block" style="margin-bottom:16px">
			<div class="form-block-head">Nova Punição</div>
			<div class="form-body">
				<form method="POST" action="?/ban">
					<div class="form-row">
						<div class="field"><label for="ban-name">Jogador *</label><input id="ban-name" name="name" required /></div>
						<div class="field" style="flex:2"><label for="ban-reason">Motivo *</label><input id="ban-reason" name="reason" required /></div>
						<div class="field" style="max-width:140px"><label for="ban-duration">Horas (0 = perm.)</label><input id="ban-duration" name="durationHours" type="number" min="0" value="0" /></div>
						<div class="field" style="justify-content:flex-end; display:flex; align-items:flex-end;">
							<button type="submit" class="btn btn-danger">Banir</button>
						</div>
					</div>
				</form>
				<form method="POST" action="?/mute" style="margin-top:10px">
					<div class="form-row">
						<div class="field"><label for="mute-name">Jogador *</label><input id="mute-name" name="name" required /></div>
						<div class="field" style="flex:2"><label for="mute-reason">Motivo *</label><input id="mute-reason" name="reason" required /></div>
						<div class="field" style="max-width:140px"><label for="mute-duration">Horas (0 = perm.)</label><input id="mute-duration" name="durationHours" type="number" min="0" value="0" /></div>
						<div class="field" style="justify-content:flex-end; display:flex; align-items:flex-end;">
							<button type="submit" class="btn">Mutar</button>
						</div>
					</div>
				</form>
				<form method="POST" action="?/warn" style="margin-top:10px">
					<div class="form-row">
						<div class="field"><label for="warn-name">Jogador *</label><input id="warn-name" name="name" required /></div>
						<div class="field" style="flex:2"><label for="warn-reason">Motivo *</label><input id="warn-reason" name="reason" required /></div>
						<div class="field" style="justify-content:flex-end; display:flex; align-items:flex-end;">
							<button type="submit" class="btn">Advertir</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	{/if}

	<div class="tbl-wrap">
		<table>
			<thead>
				<tr>
					<th>Tipo</th>
					<th>Jogador</th>
					<th>Motivo</th>
					<th>Aplicado por</th>
					<th>Expira</th>
					<th style="text-align:right">Ações</th>
				</tr>
			</thead>
			<tbody>
				{#each data.punishments as p}
					<tr>
						<td><span class="badge {TYPE_BADGE[p.type]}">{TYPE_LABELS[p.type]}</span></td>
						<td style="font-weight:500">{p.targetName}</td>
						<td class="muted sm">{p.reason ?? '-'}</td>
						<td class="muted sm">{p.issuedBy ?? '-'}</td>
						<td class="muted sm">{p.expiresAt ? new Date(p.expiresAt).toLocaleString('pt-BR') : 'Nunca'}</td>
						<td class="act">
							{#if p.type === 'BAN' || p.type === 'TEMP_BAN'}
								<form method="POST" action="?/unban" style="display:inline">
									<input type="hidden" name="name" value={p.targetName} />
									<button type="submit" class="btn btn-ghost btn-sm">Desbanir</button>
								</form>
							{:else if p.type === 'MUTE' || p.type === 'TEMP_MUTE'}
								<form method="POST" action="?/unmute" style="display:inline">
									<input type="hidden" name="name" value={p.targetName} />
									<button type="submit" class="btn btn-ghost btn-sm">Desmutar</button>
								</form>
							{/if}
						</td>
					</tr>
				{:else}
					<tr><td colspan="6"><div class="empty">Nenhuma punição encontrada.</div></td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
