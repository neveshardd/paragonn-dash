<script lang="ts">
	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();

	const fmt = (d: Date | string) =>
		new Date(d).toLocaleString('pt-BR', {
			day: '2-digit', month: '2-digit', year: 'numeric',
			hour: '2-digit', minute: '2-digit'
		});
</script>

<svelte:head><title>Blog — Paragonn Panel</title></svelte:head>

<div class="page-header">
	<div>
		<div class="page-title">Blog</div>
		<div class="page-sub">{data.posts.length} postagem(s)</div>
	</div>
	<a href="/blog/novo" class="btn btn-primary">+ Nova Postagem</a>
</div>

<div class="page-body">
	{#if form?.error}
		<div class="alert alert-error">{form.error}</div>
	{/if}

	<div class="tbl-wrap">
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Postagem</th>
					<th>Autor</th>
					<th>Data</th>
					<th>Status</th>
					<th style="text-align:right">Ações</th>
				</tr>
			</thead>
			<tbody>
				{#each data.posts as post}
					<tr>
						<td class="muted sm">{post.id}</td>
						<td>
							<div style="display:flex;align-items:center;gap:12px">
								<div class="blog-thumb">
									{#if post.imagem}
										<img src={post.imagem} alt={post.titulo} />
									{:else}
										<div class="thumb-placeholder">/</div>
									{/if}
								</div>
								<div style="font-weight:600;max-width:240px" class="sm">{post.titulo}</div>
							</div>
						</td>
						<td>{post.autor}</td>
						<td class="muted sm" style="white-space:nowrap">{fmt(post.dataHorario)}</td>
						<td>
							<form method="POST" action="?/togglePublicado" style="display:inline">
								<input type="hidden" name="id" value={post.id} />
								<input type="hidden" name="publicado" value={String(post.publicado)} />
								<button
									type="submit"
									class="badge {post.publicado ? 'badge-green' : 'badge-gray'}"
									style="border:none;cursor:pointer;background:none"
								>
									{post.publicado ? 'Publicado' : 'Rascunho'}
								</button>
							</form>
						</td>
						<td class="act">
							<a href="/blog/{post.id}/editar" class="btn btn-ghost btn-sm">Editar</a>
							<form method="POST" action="?/delete" style="display:inline">
								<input type="hidden" name="id" value={post.id} />
								<button type="submit" class="btn btn-danger btn-sm">Deletar</button>
							</form>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="6">
							<div class="empty">
								Nenhuma postagem.
								<a href="/blog/novo" style="color:var(--primary)">Criar a primeira.</a>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.blog-thumb {
		width: 44px;
		height: 32px;
		border-radius: 4px;
		background: #f1f5f9;
		overflow: hidden;
		flex-shrink: 0;
		border: 1px solid var(--border);
	}
	.blog-thumb img {
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
