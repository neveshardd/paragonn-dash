<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import ProdutoImagemField from '$lib/components/ProdutoImagemField.svelte';
	let { data, form }: { data: PageData; form: ActionData } = $props();

	let imagem = $state(data.produto.imagem ?? '');
</script>

<svelte:head><title>Editar Produto — Paragonn Panel</title></svelte:head>

<div class="page-header">
	<div>
		<div class="page-title">Editar Produto</div>
		<div class="page-sub"><a href="/loja/produtos" style="color:var(--primary)">Produtos</a> / #{data.produto.id}</div>
	</div>
</div>

<div class="page-body">
	{#if form?.error}
		<div class="alert alert-error">{form.error}</div>
	{/if}

	<form method="POST">
		<div class="form-block">
			<div class="form-block-head">Editando "{data.produto.nome}"</div>
			<div class="form-body">
				<div class="form-row">
					<div class="field" style="flex:2">
						<label for="nome">Nome *</label>
						<input id="nome" name="nome" type="text" required value={data.produto.nome} />
					</div>
					<div class="field">
						<label for="preco">Preço (R$) *</label>
						<input id="preco" name="preco" type="number" step="0.01" min="0" required value={data.produto.preco} />
					</div>
				</div>
				<div class="form-row">
					<div class="field">
						<label for="categoriaId">Categoria *</label>
						<select id="categoriaId" name="categoriaId" required>
							{#each data.categorias as c}
								<option value={c.id} selected={c.id === data.produto.categoriaId}>{c.nome}</option>
							{/each}
						</select>
					</div>
					<div class="field">
						<label for="servidorId">Servidor *</label>
						<select id="servidorId" name="servidorId" required>
							{#each data.servidores as s}
								<option value={s.id} selected={s.id === data.produto.servidorId}>{s.nome}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="field">
					<label for="descricao">Descrição</label>
					<textarea id="descricao" name="descricao">{data.produto.descricao ?? ''}</textarea>
				</div>

				<div class="field">
					<ProdutoImagemField bind:value={imagem} />
				</div>

				<div class="field">
					<label for="comando">Comando de Entrega</label>
					<input id="comando" name="comando" type="text" value={data.produto.comando} required />
					<span class="field-hint">Use %player% para o nick do jogador.</span>
				</div>
				<div class="check-row">
					<input id="ativo" name="ativo" type="checkbox" checked={data.produto.ativo} />
					<label for="ativo">Produto ativo</label>
				</div>
			</div>
			<div class="form-foot">
				<button type="submit" class="btn btn-primary">Salvar Alterações</button>
				<a href="/loja/produtos" class="btn">Cancelar</a>
			</div>
		</div>
	</form>
</div>
