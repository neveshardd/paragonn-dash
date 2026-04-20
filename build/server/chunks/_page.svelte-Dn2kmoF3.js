import { a6 as head, e as escape_html, a as attr, a7 as ensure_array_like } from './dev-F8WnKEJC.js';

//#region src/routes/loja/produtos/[id]/editar/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		head("5h8euc", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Editar Produto — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-header"><div><div class="page-title">Editar Produto</div> <div class="page-sub"><a href="/loja/produtos" style="color:var(--primary)">Produtos</a> / #${escape_html(data.produto.id)}</div></div></div> <div class="page-body">`);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert alert-error">${escape_html(form.error)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form method="POST"><div class="form-block"><div class="form-block-head">Editando "${escape_html(data.produto.nome)}"</div> <div class="form-body"><div class="form-row"><div class="field" style="flex:2"><label for="nome">Nome *</label> <input id="nome" name="nome" type="text" required=""${attr("value", data.produto.nome)}/></div> <div class="field"><label for="preco">Preço (R$) *</label> <input id="preco" name="preco" type="number" step="0.01" min="0" required=""${attr("value", data.produto.preco)}/></div></div> <div class="form-row"><div class="field"><label for="categoriaId">Categoria *</label> <select id="categoriaId" name="categoriaId" required=""><!--[-->`);
		const each_array = ensure_array_like(data.categorias);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let c = each_array[$$index];
			$$renderer.option({
				value: c.id,
				selected: c.id === data.produto.categoriaId
			}, ($$renderer) => {
				$$renderer.push(`${escape_html(c.nome)}`);
			});
		}
		$$renderer.push(`<!--]--></select></div> <div class="field"><label for="servidorId">Servidor *</label> <select id="servidorId" name="servidorId" required=""><!--[-->`);
		const each_array_1 = ensure_array_like(data.servidores);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let s = each_array_1[$$index_1];
			$$renderer.option({
				value: s.id,
				selected: s.id === data.produto.servidorId
			}, ($$renderer) => {
				$$renderer.push(`${escape_html(s.nome)}`);
			});
		}
		$$renderer.push(`<!--]--></select></div></div> <div class="field"><label for="descricao">Descrição</label> <textarea id="descricao" name="descricao">`);
		const $$body = escape_html(data.produto.descricao ?? "");
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea></div> <div class="check-row"><input id="ativo" name="ativo" type="checkbox"${attr("checked", data.produto.ativo, true)}/> <label for="ativo">Produto ativo</label></div></div> <div class="form-foot"><button type="submit" class="btn btn-primary">Salvar Alterações</button> <a href="/loja/produtos" class="btn">Cancelar</a></div></div></form></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Dn2kmoF3.js.map
