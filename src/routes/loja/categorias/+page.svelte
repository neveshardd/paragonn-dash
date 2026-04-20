<script lang="ts">
	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head><title>Categorias — Paragonn Panel</title></svelte:head>

<div class="page-header">
	<div>
		<div class="page-title">Categorias</div>
		<div class="page-sub">{data.categorias.length} categoria(s)</div>
	</div>
	{#if !data.showForm}
		<a href="?add" class="btn btn-primary">+ Nova Categoria</a>
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
					{data.edit ? `Editar Categoria #${data.edit.id}` : 'Nova Categoria'}
					<a href="/loja/categorias" class="btn btn-ghost btn-sm">✕ Cancelar</a>
				</div>
				<div class="form-body">
					{#if data.edit}
						<input type="hidden" name="id" value={data.edit.id} />
					{/if}
					<div class="field" style="max-width:320px">
						<label for="nome">Nome *</label>
						<input id="nome" name="nome" type="text" placeholder="Nome da categoria" required value={data.edit?.nome ?? ''} />
					</div>
				</div>
				<div class="form-foot">
					<button type="submit" class="btn btn-primary">{data.edit ? 'Salvar' : 'Criar'}</button>
					<a href="/loja/categorias" class="btn">Cancelar</a>
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
					<th>Produtos</th>
					<th style="text-align:right">Ações</th>
				</tr>
			</thead>
			<tbody>
				{#each data.categorias as c}
					<tr>
						<td class="muted sm">{c.id}</td>
						<td>{c.nome}</td>
						<td><span class="badge badge-gray">{c._count.produtos}</span></td>
						<td class="act">
							<a href="?edit={c.id}" class="btn btn-ghost btn-sm">Editar</a>
							<form method="POST" action="?/delete" style="display:inline">
								<input type="hidden" name="id" value={c.id} />
								<button type="submit" class="btn btn-danger btn-sm" disabled={c._count.produtos > 0}>Deletar</button>
							</form>
						</td>
					</tr>
				{:else}
					<tr><td colspan="4"><div class="empty">Nenhuma categoria. <a href="?add" style="color:var(--primary)">Criar a primeira.</a></div></td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
