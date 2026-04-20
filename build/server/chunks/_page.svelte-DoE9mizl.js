import { a6 as head, e as escape_html, a as attr, a7 as ensure_array_like, a8 as stringify } from './dev-F8WnKEJC.js';

//#region src/routes/loja/servidores/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		head("sbdbmi", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Servidores — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-header"><div><div class="page-title">Servidores</div> <div class="page-sub">${escape_html(data.servidores.length)} servidor(es)</div></div> `);
		if (!data.showForm) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<a href="?add" class="btn btn-primary">+ Novo Servidor</a>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="page-body">`);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert alert-error">${escape_html(form.error)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.showForm) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<form method="POST"${attr("action", data.edit ? "?/update" : "?/create")}><div class="form-block"><div class="form-block-head">${escape_html(data.edit ? `Editar Servidor #${data.edit.id}` : "Novo Servidor")} <a href="/loja/servidores" class="btn btn-ghost btn-sm">✕</a></div> <div class="form-body">`);
			if (data.edit) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<input type="hidden" name="id"${attr("value", data.edit.id)}/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="form-row"><div class="field"><label for="nome">Nome *</label> <input id="nome" name="nome" type="text" placeholder="ex: Survival" required=""${attr("value", data.edit?.nome ?? "")}/></div> <div class="field" style="flex:2"><label for="ip">IP / Host *</label> <input id="ip" name="ip" type="text" placeholder="play.paragonn.com.br" required=""${attr("value", data.edit?.ip ?? "")}/></div> <div class="field" style="max-width:100px"><label for="porta">Porta</label> <input id="porta" name="porta" type="number" min="1" max="65535"${attr("value", data.edit?.porta ?? 25565)}/></div></div></div> <div class="form-foot"><button type="submit" class="btn btn-primary">${escape_html(data.edit ? "Salvar" : "Criar")}</button> <a href="/loja/servidores" class="btn">Cancelar</a></div></div></form>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="tbl-wrap"><table><thead><tr><th>#</th><th>Nome</th><th>IP / Host</th><th>Porta</th><th>Produtos</th><th style="text-align:right">Ações</th></tr></thead><tbody>`);
		const each_array = ensure_array_like(data.servidores);
		if (each_array.length !== 0) {
			$$renderer.push("<!--[-->");
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let s = each_array[$$index];
				$$renderer.push(`<tr><td class="muted sm">${escape_html(s.id)}</td><td style="font-weight:500">${escape_html(s.nome)}</td><td><span class="mono">${escape_html(s.ip)}</span></td><td class="muted sm">${escape_html(s.porta)}</td><td><span class="badge badge-gray">${escape_html(s._count.produtos)}</span></td><td class="act"><a${attr("href", `?edit=${stringify(s.id)}`)} class="btn btn-ghost btn-sm">Editar</a> <form method="POST" action="?/delete" style="display:inline"><input type="hidden" name="id"${attr("value", s.id)}/> <button type="submit" class="btn btn-danger btn-sm"${attr("disabled", s._count.produtos > 0, true)}>Deletar</button></form></td></tr>`);
			}
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push(`<tr><td colspan="6"><div class="empty">Nenhum servidor. <a href="?add" style="color:var(--primary)">Criar o primeiro.</a></div></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DoE9mizl.js.map
