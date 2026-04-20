import { a6 as head, e as escape_html, a as attr, a7 as ensure_array_like, a8 as stringify } from './dev-F8WnKEJC.js';

//#region src/routes/equipe/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		head("omd6f4", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Equipe — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-header"><div><div class="page-title">Equipe</div> <div class="page-sub">${escape_html(data.membros.length)} membro(s)</div></div> `);
		if (!data.showForm) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<a href="?add" class="btn btn-primary">+ Adicionar Membro</a>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="page-body">`);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert alert-error">${escape_html(form.error)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.showForm) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<form method="POST"${attr("action", data.edit ? "?/update" : "?/create")}><div class="form-block"><div class="form-block-head">${escape_html(data.edit ? `Editar Membro #${data.edit.id}` : "Adicionar Membro")} <a href="/equipe" class="btn btn-ghost btn-sm">✕</a></div> <div class="form-body">`);
			if (data.edit) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<input type="hidden" name="id"${attr("value", data.edit.id)}/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="form-row"><div class="field"><label for="nick">Nick *</label> <input id="nick" name="nick" type="text" placeholder="NickDoJogador" required=""${attr("value", data.edit?.nick ?? "")}/></div> <div class="field"><label for="cargo">Cargo *</label> <input id="cargo" name="cargo" type="text" placeholder="Administrador" required=""${attr("value", data.edit?.cargo ?? "")}/></div></div></div> <div class="form-foot"><button type="submit" class="btn btn-primary">${escape_html(data.edit ? "Salvar" : "Adicionar")}</button> <a href="/equipe" class="btn">Cancelar</a></div></div></form>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="tbl-wrap"><table><thead><tr><th>#</th><th>Nick</th><th>Cargo</th><th style="text-align:right">Ações</th></tr></thead><tbody>`);
		const each_array = ensure_array_like(data.membros);
		if (each_array.length !== 0) {
			$$renderer.push("<!--[-->");
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let m = each_array[$$index];
				$$renderer.push(`<tr><td class="muted sm">${escape_html(m.id)}</td><td style="font-weight:600">${escape_html(m.nick)}</td><td><span class="badge badge-blue">${escape_html(m.cargo)}</span></td><td class="act"><a${attr("href", `?edit=${stringify(m.id)}`)} class="btn btn-ghost btn-sm">Editar</a> <form method="POST" action="?/delete" style="display:inline"><input type="hidden" name="id"${attr("value", m.id)}/> <button type="submit" class="btn btn-danger btn-sm">Remover</button></form></td></tr>`);
			}
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push(`<tr><td colspan="4"><div class="empty">Nenhum membro na equipe. <a href="?add" style="color:var(--primary)">Adicionar.</a></div></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-7GsDOe8o.js.map
