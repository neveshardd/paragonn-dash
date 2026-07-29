import { H as escape_html, V as attr, n as attr_class, o as ensure_array_like, s as head, u as stringify } from "../../../../chunks/dev.js";
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
		$$renderer.push(`<!--]--> <div class="tbl-wrap"><table><thead><tr><th>#</th><th>Produto</th><th>Preço</th><th>Categoria</th><th>Servidor</th><th>Status</th><th style="text-align:right">Ações</th></tr></thead><tbody>`);
		const each_array = ensure_array_like(data.produtos);
		if (each_array.length !== 0) {
			$$renderer.push("<!--[-->");
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let p = each_array[$$index];
				$$renderer.push(`<tr><td class="muted sm">${escape_html(p.id)}</td><td><div style="display:flex;align-items:center;gap:12px"><div class="prod-thumb svelte-eedcmg">`);
				if (p.imagem) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<img${attr("src", p.imagem)}${attr("alt", p.nome)} class="svelte-eedcmg"/>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<div class="thumb-placeholder svelte-eedcmg">?</div>`);
				}
				$$renderer.push(`<!--]--></div> <div><div style="font-weight:600">${escape_html(p.nome)}</div> `);
				if (p.descricao) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="muted xs">${escape_html(p.descricao.slice(0, 45))}${escape_html(p.descricao.length > 45 ? "…" : "")}</div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></div></td><td style="white-space:nowrap">R$ ${escape_html(p.preco.toFixed(2))}</td><td><span class="badge badge-blue">${escape_html(p.categoria.nome)}</span></td><td><span class="mono">${escape_html(p.servidor.nome)}</span></td><td><form method="POST" action="?/toggleAtivo" style="display:inline"><input type="hidden" name="id"${attr("value", p.id)}/> <input type="hidden" name="ativo"${attr("value", String(p.ativo))}/> <button type="submit"${attr_class(`badge ${stringify(p.ativo ? "badge-green" : "badge-red")}`)} style="border:none;cursor:pointer;background:none">${escape_html(p.ativo ? "Ativo" : "Inativo")}</button></form></td><td class="act"><a${attr("href", `/loja/produtos/${stringify(p.id)}/editar`)} class="btn btn-ghost btn-sm">Editar</a> <form method="POST" action="?/delete" style="display:inline"><input type="hidden" name="id"${attr("value", p.id)}/> <button type="submit" class="btn btn-danger btn-sm">Deletar</button></form></td></tr>`);
			}
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push(`<tr><td colspan="7"><div class="empty">Nenhum produto. <a href="/loja/produtos/novo" style="color:var(--primary)">Criar o primeiro.</a></div></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></div>`);
	});
}
//#endregion
export { _page as default };
