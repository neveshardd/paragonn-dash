import { a6 as head, e as escape_html, a as attr, a7 as ensure_array_like, b as attr_class, a8 as stringify } from './dev-F8WnKEJC.js';

//#region src/routes/loja/cupons/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		const fmtDate = (d) => d ? new Date(d).toLocaleDateString("pt-BR") : "—";
		const expiraLocal = (d) => {
			if (!d) return "";
			const dt = new Date(d);
			dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
			return dt.toISOString().slice(0, 10);
		};
		head("15qtqus", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Cupons — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-header"><div><div class="page-title">Cupons</div> <div class="page-sub">${escape_html(data.cupons.length)} cupom(ns)</div></div> `);
		if (!data.showForm) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<a href="?add" class="btn btn-primary">+ Novo Cupom</a>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="page-body">`);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert alert-error">${escape_html(form.error)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.showForm) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<form method="POST"${attr("action", data.edit ? "?/update" : "?/create")}><div class="form-block"><div class="form-block-head">${escape_html(data.edit ? `Editar Cupom #${data.edit.id}` : "Novo Cupom")} <a href="/loja/cupons" class="btn btn-ghost btn-sm">✕</a></div> <div class="form-body">`);
			if (data.edit) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<input type="hidden" name="id"${attr("value", data.edit.id)}/>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <div class="form-row"><div class="field"><label for="codigo">Código *</label> <input id="codigo" name="codigo" type="text" placeholder="EX: PROMO10" required=""${attr("value", data.edit?.codigo ?? "")} style="text-transform:uppercase"/></div> <div class="field"><label for="desconto">Desconto (%) *</label> <input id="desconto" name="desconto" type="number" min="1" max="100" placeholder="10" required=""${attr("value", data.edit?.desconto ?? "")}/></div> <div class="field"><label for="expira">Expira em</label> <input id="expira" name="expira" type="date"${attr("value", expiraLocal(data.edit?.expira ?? null))}/></div></div> <div class="check-row"><input id="ativo" name="ativo" type="checkbox"${attr("checked", data.edit ? data.edit.ativo : true, true)}/> <label for="ativo">Cupom ativo</label></div></div> <div class="form-foot"><button type="submit" class="btn btn-primary">${escape_html(data.edit ? "Salvar" : "Criar")}</button> <a href="/loja/cupons" class="btn">Cancelar</a></div></div></form>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="tbl-wrap"><table><thead><tr><th>#</th><th>Código</th><th>Desconto</th><th>Expira</th><th>Status</th><th style="text-align:right">Ações</th></tr></thead><tbody>`);
		const each_array = ensure_array_like(data.cupons);
		if (each_array.length !== 0) {
			$$renderer.push("<!--[-->");
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let c = each_array[$$index];
				$$renderer.push(`<tr><td class="muted sm">${escape_html(c.id)}</td><td><span class="mono" style="font-weight:600">${escape_html(c.codigo)}</span></td><td><span class="badge badge-amber">${escape_html(c.desconto)}% OFF</span></td><td class="muted sm">${escape_html(fmtDate(c.expira))}</td><td><span${attr_class(`badge ${stringify(c.ativo ? "badge-green" : "badge-red")}`)}>${escape_html(c.ativo ? "Ativo" : "Inativo")}</span></td><td class="act"><a${attr("href", `?edit=${stringify(c.id)}`)} class="btn btn-ghost btn-sm">Editar</a> <form method="POST" action="?/delete" style="display:inline"><input type="hidden" name="id"${attr("value", c.id)}/> <button type="submit" class="btn btn-danger btn-sm">Deletar</button></form></td></tr>`);
			}
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push(`<tr><td colspan="6"><div class="empty">Nenhum cupom. <a href="?add" style="color:var(--primary)">Criar o primeiro.</a></div></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DSO1Kkqk.js.map
