import { a6 as head, e as escape_html, a7 as ensure_array_like, a as attr, b as attr_class, a8 as stringify } from './dev-F8WnKEJC.js';

//#region src/routes/loja/produtos/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		head("eedcmg", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Produtos — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-header"><div><div class="page-title">Produtos</div> <div class="page-sub">${escape_html(data.produtos.length)} produto(s)</div></div> <a href="/loja/produtos/novo" class="btn btn-primary">+ Novo Produto</a></div> <div class="page-body">`);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert alert-error">${escape_html(form.error)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.categorias.length === 0 || data.servidores.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert" style="background:#fefce8;color:#92400e;border-color:#fde68a">⚠ Cadastre pelo menos uma <a href="/loja/categorias" style="color:var(--primary)">categoria</a> e um <a href="/loja/servidores" style="color:var(--primary)">servidor</a> antes de adicionar produtos.</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="tbl-wrap"><table><thead><tr><th>#</th><th>Nome</th><th>Preço</th><th>Categoria</th><th>Servidor</th><th>Status</th><th style="text-align:right">Ações</th></tr></thead><tbody>`);
		const each_array = ensure_array_like(data.produtos);
		if (each_array.length !== 0) {
			$$renderer.push("<!--[-->");
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let p = each_array[$$index];
				$$renderer.push(`<tr><td class="muted sm">${escape_html(p.id)}</td><td><div>${escape_html(p.nome)}</div> `);
				if (p.descricao) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="muted xs">${escape_html(p.descricao.slice(0, 60))}${escape_html(p.descricao.length > 60 ? "…" : "")}</div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></td><td style="white-space:nowrap">R$ ${escape_html(p.preco.toFixed(2))}</td><td><span class="badge badge-blue">${escape_html(p.categoria.nome)}</span></td><td><span class="mono">${escape_html(p.servidor.nome)}</span></td><td><form method="POST" action="?/toggleAtivo" style="display:inline"><input type="hidden" name="id"${attr("value", p.id)}/> <input type="hidden" name="ativo"${attr("value", String(p.ativo))}/> <button type="submit"${attr_class(`badge ${stringify(p.ativo ? "badge-green" : "badge-red")}`)} style="border:none;cursor:pointer;background:none">${escape_html(p.ativo ? "Ativo" : "Inativo")}</button></form></td><td class="act"><a${attr("href", `/loja/produtos/${stringify(p.id)}/editar`)} class="btn btn-ghost btn-sm">Editar</a> <form method="POST" action="?/delete" style="display:inline"><input type="hidden" name="id"${attr("value", p.id)}/> <button type="submit" class="btn btn-danger btn-sm">Deletar</button></form></td></tr>`);
			}
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push(`<tr><td colspan="7"><div class="empty">Nenhum produto. <a href="/loja/produtos/novo" style="color:var(--primary)">Criar o primeiro.</a></div></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Bs3e9fl9.js.map
