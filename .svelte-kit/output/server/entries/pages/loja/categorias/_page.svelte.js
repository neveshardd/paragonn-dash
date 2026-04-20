import { B as escape_html, a as head, c as stringify, i as ensure_array_like, z as attr } from "../../../../chunks/dev.js";
//#region src/routes/loja/categorias/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		head("102a46y", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Categorias — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-header"><div><div class="page-title">Categorias</div> <div class="page-sub">${escape_html(data.categorias.length)} categoria(s)</div></div> `);
		if (!data.showForm) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<a href="?add" class="btn btn-primary">+ Nova Categoria</a>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="page-body">`);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert alert-error">${escape_html(form.error)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.showForm) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<form method="POST"${attr("action", data.edit ? "?/update" : "?/create")}><div class="form-block"><div class="form-block-head">${escape_html(data.edit ? `Editar Categoria #${data.edit.id}` : "Nova Categoria")} <a href="/loja/categorias" class="btn btn-ghost btn-sm">✕ Cancelar</a></div> <div class="form-body">`);
			if (data.edit) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<input type="hidden" name="id"${attr("value", data.edit.id)}/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="field" style="max-width:320px"><label for="nome">Nome *</label> <input id="nome" name="nome" type="text" placeholder="Nome da categoria" required=""${attr("value", data.edit?.nome ?? "")}/></div></div> <div class="form-foot"><button type="submit" class="btn btn-primary">${escape_html(data.edit ? "Salvar" : "Criar")}</button> <a href="/loja/categorias" class="btn">Cancelar</a></div></div></form>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="tbl-wrap"><table><thead><tr><th>#</th><th>Nome</th><th>Produtos</th><th style="text-align:right">Ações</th></tr></thead><tbody>`);
		const each_array = ensure_array_like(data.categorias);
		if (each_array.length !== 0) {
			$$renderer.push("<!--[-->");
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let c = each_array[$$index];
				$$renderer.push(`<tr><td class="muted sm">${escape_html(c.id)}</td><td>${escape_html(c.nome)}</td><td><span class="badge badge-gray">${escape_html(c._count.produtos)}</span></td><td class="act"><a${attr("href", `?edit=${stringify(c.id)}`)} class="btn btn-ghost btn-sm">Editar</a> <form method="POST" action="?/delete" style="display:inline"><input type="hidden" name="id"${attr("value", c.id)}/> <button type="submit" class="btn btn-danger btn-sm"${attr("disabled", c._count.produtos > 0, true)}>Deletar</button></form></td></tr>`);
			}
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push(`<tr><td colspan="4"><div class="empty">Nenhuma categoria. <a href="?add" style="color:var(--primary)">Criar a primeira.</a></div></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></div>`);
	});
}
//#endregion
export { _page as default };
