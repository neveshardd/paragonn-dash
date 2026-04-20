<script lang="ts">
	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head><title>Servidores — Paragonn Panel</title></svelte:head>

<div class="page-header">
	<div>
		<div class="page-title">Servidores</div>
		<div class="page-sub">{data.servidores.length} servidor(es)</div>
	</div>
	{#if !data.showForm}
		<a href="?add" class="btn btn-primary">+ Novo Servidor</a>
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
					{data.edit ? `Editar Servidor #${data.edit.id}` : 'Novo Servidor'}
					<a href="/loja/servidores" class="btn btn-ghost btn-sm">✕</a>
				</div>
				<div class="form-body">
					{#if data.edit}
						<input type="hidden" name="id" value={data.edit.id} />
					{/if}
					<div class="form-row">
						<div class="field">
							<label for="nome">Nome *</label>
							<input id="nome" name="nome" type="text" placeholder="ex: Survival" required value={data.edit?.nome ?? ''} />
						</div>
						<div class="field" style="flex:2">
							<label for="ip">IP / Host *</label>
							<input id="ip" name="ip" type="text" placeholder="play.paragonn.com.br" required value={data.edit?.ip ?? ''} />
						</div>
						<div class="field" style="max-width:100px">
							<label for="porta">Porta</label>
							<input id="porta" name="porta" type="number" min="1" max="65535" value={data.edit?.porta ?? 25565} />
						</div>
					</div>
				</div>
				<div class="form-foot">
					<button type="submit" class="btn btn-primary">{data.edit ? 'Salvar' : 'Criar'}</button>
					<a href="/loja/servidores" class="btn">Cancelar</a>
				</div>
			</div>
		</form>
	{/if}

	<div class="tbl-wrap">
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Nome</th>
					<th>IP / Host</th>
					<th>Porta</th>
					<th>Produtos</th>
					<th style="text-align:right">Ações</th>
				</tr>
			</thead>
			<tbody>
				{#each data.servidores as s}
					<tr>
						<td class="muted sm">{s.id}</td>
						<td style="font-weight:500">{s.nome}</td>
						<td><span class="mono">{s.ip}</span></td>
						<td class="muted sm">{s.porta}</td>
						<td><span class="badge badge-gray">{s._count.produtos}</span></td>
						<td class="act">
							<a href="?edit={s.id}" class="btn btn-ghost btn-sm">Editar</a>
							<form method="POST" action="?/delete" style="display:inline">
								<input type="hidden" name="id" value={s.id} />
								<button type="submit" class="btn btn-danger btn-sm" disabled={s._count.produtos > 0}>Deletar</button>
							</form>
						</td>
					</tr>
				{:else}
					<tr><td colspan="6"><div class="empty">Nenhum servidor. <a href="?add" style="color:var(--primary)">Criar o primeiro.</a></div></td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
