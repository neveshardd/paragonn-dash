import { B as escape_html, a as head, i as ensure_array_like } from "../../../../../chunks/dev.js";
//#region src/routes/loja/produtos/novo/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		head("1e1yteh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Novo Produto — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-header"><div><div class="page-title">Novo Produto</div> <div class="page-sub"><a href="/loja/produtos" style="color:var(--primary)">Produtos</a> / Novo</div></div></div> <div class="page-body">`);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert alert-error">${escape_html(form.error)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form method="POST"><div class="form-block"><div class="form-block-head">Dados do Produto</div> <div class="form-body"><div class="form-row"><div class="field" style="flex:2"><label for="nome">Nome *</label> <input id="nome" name="nome" type="text" placeholder="Nome do produto" required=""/></div> <div class="field"><label for="preco">Preço (R$) *</label> <input id="preco" name="preco" type="number" step="0.01" min="0" placeholder="0.00" required=""/></div></div> <div class="form-row"><div class="field"><label for="categoriaId">Categoria *</label> <select id="categoriaId" name="categoriaId" required="">`);
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`Selecione...`);
		});
		$$renderer.push(`<!--[-->`);
		const each_array = ensure_array_like(data.categorias);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let c = each_array[$$index];
			$$renderer.option({ value: c.id }, ($$renderer) => {
				$$renderer.push(`${escape_html(c.nome)}`);
			});
		}
		$$renderer.push(`<!--]--></select></div> <div class="field"><label for="servidorId">Servidor *</label> <select id="servidorId" name="servidorId" required="">`);
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`Selecione...`);
		});
		$$renderer.push(`<!--[-->`);
		const each_array_1 = ensure_array_like(data.servidores);
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let s = each_array_1[$$index_1];
			$$renderer.option({ value: s.id }, ($$renderer) => {
				$$renderer.push(`${escape_html(s.nome)}`);
			});
		}
		$$renderer.push(`<!--]--></select></div></div> <div class="field"><label for="descricao">Descrição</label> <textarea id="descricao" name="descricao" placeholder="Descrição do produto (opcional)"></textarea></div> <div class="check-row"><input id="ativo" name="ativo" type="checkbox" checked=""/> <label for="ativo">Produto ativo</label></div></div> <div class="form-foot"><button type="submit" class="btn btn-primary">Criar Produto</button> <a href="/loja/produtos" class="btn">Cancelar</a></div></div></form></div>`);
	});
}
//#endregion
export { _page as default };
