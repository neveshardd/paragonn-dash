<script lang="ts">
	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head><title>Equipe — Paragonn Panel</title></svelte:head>

<div class="page-header">
	<div>
		<div class="page-title">Equipe</div>
		<div class="page-sub">{data.membros.length} membro(s)</div>
	</div>
	{#if !data.showForm}
		<a href="?add" class="btn btn-primary">+ Adicionar Membro</a>
	{/if}
</div>

<div class="page-body">
	{#if form?.error}
		<div class="alert alert-error">{form.error}</div>
	{/if}

	{#if data.showForm}
		<form method="POST" action={data.edit ? '?/update' : '?/create'}>
			<div class="form-block">
				<div class="form-block-head">
					{data.edit ? `Editar Membro #${data.edit.id}` : 'Adicionar Membro'}
					<a href="/equipe" class="btn btn-ghost btn-sm">✕</a>
				</div>
				<div class="form-body">
					{#if data.edit}
						<input type="hidden" name="id" value={data.edit.id} />
					{/if}
					<div class="form-row">
						<div class="field">
							<label for="nick">Nick *</label>
							<input id="nick" name="nick" type="text" placeholder="NickDoJogador" required value={data.edit?.nick ?? ''} />
						</div>
						<div class="field">
							<label for="cargo">Cargo *</label>
							<input id="cargo" name="cargo" type="text" placeholder="Administrador" required value={data.edit?.cargo ?? ''} />
						</div>
					</div>
				</div>
				<div class="form-foot">
					<button type="submit" class="btn btn-primary">{data.edit ? 'Salvar' : 'Adicionar'}</button>
					<a href="/equipe" class="btn">Cancelar</a>
				</div>
			</div>
		</form>
	{/if}

	<div class="tbl-wrap">
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Nick</th>
					<th>Cargo</th>
					<th style="text-align:right">Ações</th>
				</tr>
			</thead>
			<tbody>
				{#each data.membros as m}
					<tr>
						<td class="muted sm">{m.id}</td>
						<td style="font-weight:600">{m.nick}</td>
						<td><span class="badge badge-blue">{m.cargo}</span></td>
						<td class="act">
							<a href="?edit={m.id}" class="btn btn-ghost btn-sm">Editar</a>
							<form method="POST" action="?/delete" style="display:inline">
								<input type="hidden" name="id" value={m.id} />
								<button type="submit" class="btn btn-danger btn-sm">Remover</button>
							</form>
						</td>
					</tr>
				{:else}
					<tr><td colspan="4"><div class="empty">Nenhum membro na equipe. <a href="?add" style="color:var(--primary)">Adicionar.</a></div></td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
