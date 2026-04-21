<script lang="ts">
	import BlogImagemField from '$lib/components/BlogImagemField.svelte';
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();

	let imagem = $state('');
	$effect.pre(() => {
		const f = form as { imagem?: string } | undefined;
		if (f && 'imagem' in f && f.imagem !== undefined) {
			imagem = f.imagem ?? '';
		}
	});

	const nowLocal = () => {
		const d = new Date();
		d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
		return d.toISOString().slice(0, 16);
	};
</script>

<svelte:head><title>Nova Postagem — Paragonn Panel</title></svelte:head>

<div class="page-header">
	<div>
		<div class="page-title">Nova Postagem</div>
		<div class="page-sub"><a href="/blog" style="color:var(--primary)">Blog</a> / Nova</div>
	</div>
</div>

<div class="page-body">
	{#if form?.error}
		<div class="alert alert-error">{form.error}</div>
	{/if}

	<form method="POST">
		<div class="form-block">
			<div class="form-block-head">Dados da Postagem</div>
			<div class="form-body">
				<div class="form-row">
					<div class="field">
						<label for="titulo">Título *</label>
						<input id="titulo" name="titulo" type="text" placeholder="Título da postagem" required value={(form as any)?.titulo ?? ''} />
					</div>
					<div class="field">
						<label for="autor">Autor *</label>
						<input id="autor" name="autor" type="text" placeholder="Nome do autor" required value={(form as any)?.autor ?? ''} />
					</div>
				</div>
				<div class="form-row">
					<div class="field">
						<label for="dataHorario">Data e Hora</label>
						<input id="dataHorario" name="dataHorario" type="datetime-local" value={nowLocal()} />
					</div>
				</div>
				<BlogImagemField bind:value={imagem} />
				<div class="field">
					<label for="descricao">Descrição *</label>
					<textarea id="descricao" name="descricao" rows="6" placeholder="Conteúdo da postagem..." required style="min-height:120px">{(form as any)?.descricao ?? ''}</textarea>
				</div>
				<div class="check-row">
					<input id="publicado" name="publicado" type="checkbox" checked />
					<label for="publicado">Publicar imediatamente</label>
				</div>
			</div>
			<div class="form-foot">
				<button type="submit" class="btn btn-primary">Criar Postagem</button>
				<a href="/blog" class="btn">Cancelar</a>
			</div>
		</div>
	</form>
</div>
