<script lang="ts">
	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head><title>Novo Produto — Paragonn Panel</title></svelte:head>

<div class="page-header">
	<div>
		<div class="page-title">Novo Produto</div>
		<div class="page-sub"><a href="/loja/produtos" style="color:var(--primary)">Produtos</a> / Novo</div>
	</div>
</div>

<div class="page-body">
	{#if form?.error}
		<div class="alert alert-error">{form.error}</div>
	{/if}

	<form method="POST">
		<div class="form-block">
			<div class="form-block-head">Dados do Produto</div>
			<div class="form-body">
				<div class="form-row">
					<div class="field" style="flex:2">
						<label for="nome">Nome *</label>
						<input id="nome" name="nome" type="text" placeholder="Nome do produto" required />
					</div>
					<div class="field">
						<label for="preco">Preço (R$) *</label>
						<input id="preco" name="preco" type="number" step="0.01" min="0" placeholder="0.00" required />
					</div>
				</div>
				<div class="form-row">
					<div class="field">
						<label for="categoriaId">Categoria *</label>
						<select id="categoriaId" name="categoriaId" required>
							<option value="">Selecione...</option>
							{#each data.categorias as c}
								<option value={c.id}>{c.nome}</option>
							{/each}
						</select>
					</div>
					<div class="field">
						<label for="servidorId">Servidor *</label>
						<select id="servidorId" name="servidorId" required>
							<option value="">Selecione...</option>
							{#each data.servidores as s}
								<option value={s.id}>{s.nome}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="field">
					<label for="descricao">Descrição</label>
					<textarea id="descricao" name="descricao" placeholder="Descrição do produto (opcional)"></textarea>
				</div>
				<div class="field">
					<label for="comando">Comando de Entrega</label>
					<input id="comando" name="comando" type="text" placeholder="ex: lp user %player% parent add vip" value="lp user %player% parent add vip" required />
					<span class="field-hint">Use %player% para o nick do jogador.</span>
				</div>
				<div class="check-row">
					<input id="ativo" name="ativo" type="checkbox" checked />
					<label for="ativo">Produto ativo</label>
				</div>
			</div>
			<div class="form-foot">
				<button type="submit" class="btn btn-primary">Criar Produto</button>
				<a href="/loja/produtos" class="btn">Cancelar</a>
			</div>
		</div>
	</form>
</div>
