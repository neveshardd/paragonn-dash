<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const fmt = (d: Date | string) =>
		new Date(d).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
</script>

<svelte:head><title>Visão Geral — Paragonn Panel</title></svelte:head>

<div class="stat-grid">
	<div class="stat-card">
			<div class="stat-label">Postagens</div>
			<div class="stat-value">{data.totalBlog}</div>
		</div>
		<div class="stat-card">
			<div class="stat-label">Produtos</div>
			<div class="stat-value">{data.totalProdutos}</div>
		</div>
		<div class="stat-card">
			<div class="stat-label">Equipe</div>
			<div class="stat-value">{data.totalEquipe}</div>
		</div>
		<div class="stat-card">
			<div class="stat-label">Cupons Ativos</div>
			<div class="stat-value">{data.totalCupons}</div>
		</div>
	</div>

	<div class="section">
		<div class="sec-head">
			<span class="sec-title">Últimas Postagens</span>
			<a href="/blog" class="btn btn-sm">Ver todas</a>
		</div>
		<div class="tbl-wrap">
			<table>
				<thead>
					<tr>
						<th>#</th><th>Título</th><th>Autor</th><th>Data</th><th>Status</th>
					</tr>
				</thead>
				<tbody>
					{#each data.recentPosts as p}
						<tr>
							<td class="muted sm">{p.id}</td>
							<td><a href="/blog/{p.id}/editar" style="color:var(--primary)">{p.titulo}</a></td>
							<td>{p.autor}</td>
							<td class="muted sm">{fmt(p.dataHorario)}</td>
							<td>
								<span class="badge {p.publicado ? 'badge-green' : 'badge-gray'}">
									{p.publicado ? 'Publicado' : 'Rascunho'}
								</span>
							</td>
						</tr>
					{:else}
						<tr><td colspan="5"><div class="empty">Nenhuma postagem ainda.</div></td></tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<div class="section">
		<div class="sec-head">
			<span class="sec-title">Últimos Produtos</span>
			<a href="/loja/produtos" class="btn btn-sm">Ver todos</a>
		</div>
		<div class="tbl-wrap">
			<table>
				<thead>
					<tr>
						<th>#</th><th>Nome</th><th>Preço</th><th>Categoria</th><th>Servidor</th><th>Status</th>
					</tr>
				</thead>
				<tbody>
					{#each data.recentProdutos as p}
						<tr>
							<td class="muted sm">{p.id}</td>
							<td><a href="/loja/produtos/{p.id}/editar" style="color:var(--primary)">{p.nome}</a></td>
							<td>R$ {p.preco.toFixed(2)}</td>
							<td>{p.categoria.nome}</td>
							<td><span class="mono">{p.servidor.nome}</span></td>
							<td>
								<span class="badge {p.ativo ? 'badge-green' : 'badge-red'}">
									{p.ativo ? 'Ativo' : 'Inativo'}
								</span>
							</td>
						</tr>
					{:else}
						<tr><td colspan="6"><div class="empty">Nenhum produto ainda.</div></td></tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

