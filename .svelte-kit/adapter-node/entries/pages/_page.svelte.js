import { B as escape_html, a as head, c as stringify, i as ensure_array_like, n as attr_class, z as attr } from "../../chunks/dev.js";
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const fmt = (d) => new Date(d).toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric"
		});
		head("1uha8ag", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Visão Geral — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-header"><div><div class="page-title">Visão Geral</div> <div class="page-sub">Resumo do painel</div></div></div> <div class="page-body"><div class="stat-grid"><div class="stat-card"><div class="stat-label">Postagens</div> <div class="stat-value">${escape_html(data.totalBlog)}</div></div> <div class="stat-card"><div class="stat-label">Produtos</div> <div class="stat-value">${escape_html(data.totalProdutos)}</div></div> <div class="stat-card"><div class="stat-label">Equipe</div> <div class="stat-value">${escape_html(data.totalEquipe)}</div></div> <div class="stat-card"><div class="stat-label">Cupons Ativos</div> <div class="stat-value">${escape_html(data.totalCupons)}</div></div></div> <div class="section"><div class="sec-head"><span class="sec-title">Últimas Postagens</span> <a href="/blog" class="btn btn-sm">Ver todas</a></div> <div class="tbl-wrap"><table><thead><tr><th>#</th><th>Título</th><th>Autor</th><th>Data</th><th>Status</th></tr></thead><tbody>`);
		const each_array = ensure_array_like(data.recentPosts);
		if (each_array.length !== 0) {
			$$renderer.push("<!--[-->");
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let p = each_array[$$index];
				$$renderer.push(`<tr><td class="muted sm">${escape_html(p.id)}</td><td><a${attr("href", `/blog/${stringify(p.id)}/editar`)} style="color:var(--primary)">${escape_html(p.titulo)}</a></td><td>${escape_html(p.autor)}</td><td class="muted sm">${escape_html(fmt(p.dataHorario))}</td><td><span${attr_class(`badge ${stringify(p.publicado ? "badge-green" : "badge-gray")}`)}>${escape_html(p.publicado ? "Publicado" : "Rascunho")}</span></td></tr>`);
			}
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push(`<tr><td colspan="5"><div class="empty">Nenhuma postagem ainda.</div></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></div> <div class="section"><div class="sec-head"><span class="sec-title">Últimos Produtos</span> <a href="/loja/produtos" class="btn btn-sm">Ver todos</a></div> <div class="tbl-wrap"><table><thead><tr><th>#</th><th>Nome</th><th>Preço</th><th>Categoria</th><th>Servidor</th><th>Status</th></tr></thead><tbody>`);
		const each_array_1 = ensure_array_like(data.recentProdutos);
		if (each_array_1.length !== 0) {
			$$renderer.push("<!--[-->");
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let p = each_array_1[$$index_1];
				$$renderer.push(`<tr><td class="muted sm">${escape_html(p.id)}</td><td><a${attr("href", `/loja/produtos/${stringify(p.id)}/editar`)} style="color:var(--primary)">${escape_html(p.nome)}</a></td><td>R$ ${escape_html(p.preco.toFixed(2))}</td><td>${escape_html(p.categoria.nome)}</td><td><span class="mono">${escape_html(p.servidor.nome)}</span></td><td><span${attr_class(`badge ${stringify(p.ativo ? "badge-green" : "badge-red")}`)}>${escape_html(p.ativo ? "Ativo" : "Inativo")}</span></td></tr>`);
			}
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push(`<tr><td colspan="6"><div class="empty">Nenhum produto ainda.</div></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></div></div>`);
	});
}
//#endregion
export { _page as default };
