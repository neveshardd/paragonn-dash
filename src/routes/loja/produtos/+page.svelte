<script lang="ts">
	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head><title>Produtos — Paragonn Panel</title></svelte:head>

<div class="page-header">
	<div>
		<div class="page-title">Produtos</div>
		<div class="page-sub">{data.produtos.length} produto(s)</div>
	</div>
	<a href="/loja/produtos/novo" class="btn btn-primary">+ Novo Produto</a>
</div>

<div class="page-body">
	{#if form?.error}
		<div class="alert alert-error">{form.error}</div>
	{/if}

	{#if data.categorias.length === 0 || data.servidores.length === 0}
		<div class="alert" style="background:#fefce8;color:#92400e;border-color:#fde68a">
			⚠ Cadastre pelo menos uma <a href="/loja/categorias" style="color:var(--primary)">categoria</a> e um <a href="/loja/servidores" style="color:var(--primary)">servidor</a> antes de adicionar produtos.
		</div>
	{/if}

	<div class="tbl-wrap">
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Produto</th>
					<th>Preço</th>
					<th>Categoria</th>
					<th>Servidor</th>
					<th>Status</th>
					<th style="text-align:right">Ações</th>
				</tr>
			</thead>
			<tbody>
				{#each data.produtos as p}
					<tr>
						<td class="muted sm">{p.id}</td>
						<td>
							<div style="display:flex;align-items:center;gap:12px">
								<div class="prod-thumb">
									{#if p.imagem}
										<img src={p.imagem} alt={p.nome} />
									{:else}
										<div class="thumb-placeholder">?</div>
									{/if}
								</div>
								<div>
									<div style="font-weight:600">{p.nome}</div>
									{#if p.descricao}<div class="muted xs">{p.descricao.slice(0, 45)}{p.descricao.length > 45 ? '…' : ''}</div>{/if}
								</div>
							</div>
						</td>
						<td style="white-space:nowrap">R$ {p.preco.toFixed(2)}</td>
						<td><span class="badge badge-blue">{p.categoria.nome}</span></td>
						<td><span class="mono">{p.servidor.nome}</span></td>
						<td>
							<form method="POST" action="?/toggleAtivo" style="display:inline">
								<input type="hidden" name="id" value={p.id} />
								<input type="hidden" name="ativo" value={String(p.ativo)} />
								<button type="submit" class="badge {p.ativo ? 'badge-green' : 'badge-red'}" style="border:none;cursor:pointer;background:none">
									{p.ativo ? 'Ativo' : 'Inativo'}
								</button>
							</form>
						</td>
						<td class="act">
							<a href="/loja/produtos/{p.id}/editar" class="btn btn-ghost btn-sm">Editar</a>
							<form method="POST" action="?/delete" style="display:inline">
								<input type="hidden" name="id" value={p.id} />
								<button type="submit" class="btn btn-danger btn-sm">Deletar</button>
							</form>
						</td>
					</tr>
				{:else}
					<tr><td colspan="7"><div class="empty">Nenhum produto. <a href="/loja/produtos/novo" style="color:var(--primary)">Criar o primeiro.</a></div></td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.prod-thumb {
		width: 36px;
		height: 36px;
		border-radius: 6px;
		background: #f1f5f9;
		overflow: hidden;
		flex-shrink: 0;
		border: 1px solid var(--border);
	}
	.prod-thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.thumb-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		font-weight: 700;
		color: #94a3b8;
	}
</style>
