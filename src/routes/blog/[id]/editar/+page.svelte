<script lang="ts">
	import BlogImagemField from '$lib/components/BlogImagemField.svelte';
	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();

	let imagem = $state('');
	$effect.pre(() => {
		imagem = data.post.imagem ?? '';
	});

	const dtLocal = () => {
		const d = new Date(data.post.dataHorario);
		d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
		return d.toISOString().slice(0, 16);
	};
</script>

<svelte:head><title>Editar Postagem — Paragonn Panel</title></svelte:head>

<div class="page-header">
	<div>
		<div class="page-title">Editar Postagem</div>
		<div class="page-sub"><a href="/blog" style="color:var(--primary)">Blog</a> / #{data.post.id}</div>
	</div>
</div>

<div class="page-body">
	{#if form?.error}
		<div class="alert alert-error">{form.error}</div>
	{/if}

	<form method="POST">
		<div class="form-block">
			<div class="form-block-head">Editando "{data.post.titulo}"</div>
			<div class="form-body">
				<div class="form-row">
					<div class="field">
						<label for="titulo">Título *</label>
						<input id="titulo" name="titulo" type="text" required value={data.post.titulo} />
					</div>
					<div class="field">
						<label for="autor">Autor *</label>
						<input id="autor" name="autor" type="text" required value={data.post.autor} />
					</div>
				</div>
				<div class="form-row">
					<div class="field">
						<label for="dataHorario">Data e Hora</label>
						<input id="dataHorario" name="dataHorario" type="datetime-local" value={dtLocal()} />
					</div>
				</div>
				<BlogImagemField bind:value={imagem} />
				<div class="field">
					<label for="descricao">Descrição *</label>
					<textarea id="descricao" name="descricao" rows="6" required style="min-height:120px">{data.post.descricao}</textarea>
				</div>
				<div class="check-row">
					<input id="publicado" name="publicado" type="checkbox" checked={data.post.publicado} />
					<label for="publicado">Publicado</label>
				</div>
			</div>
			<div class="form-foot">
				<button type="submit" class="btn btn-primary">Salvar Alterações</button>
				<a href="/blog" class="btn">Cancelar</a>
			</div>
		</div>
	</form>
</div>
