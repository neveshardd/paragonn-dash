import { B as escape_html, a as head, z as attr } from "../../../../../chunks/dev.js";
//#region src/routes/blog/[id]/editar/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		const dtLocal = () => {
			const d = new Date(data.post.dataHorario);
			d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
			return d.toISOString().slice(0, 16);
		};
		head("15usca9", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Editar Postagem — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-header"><div><div class="page-title">Editar Postagem</div> <div class="page-sub"><a href="/blog" style="color:var(--primary)">Blog</a> / #${escape_html(data.post.id)}</div></div></div> <div class="page-body">`);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert alert-error">${escape_html(form.error)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form method="POST"><div class="form-block"><div class="form-block-head">Editando "${escape_html(data.post.titulo)}"</div> <div class="form-body"><div class="form-row"><div class="field"><label for="titulo">Título *</label> <input id="titulo" name="titulo" type="text" required=""${attr("value", data.post.titulo)}/></div> <div class="field"><label for="autor">Autor *</label> <input id="autor" name="autor" type="text" required=""${attr("value", data.post.autor)}/></div></div> <div class="form-row"><div class="field"><label for="dataHorario">Data e Hora</label> <input id="dataHorario" name="dataHorario" type="datetime-local"${attr("value", dtLocal())}/></div> <div class="field"><label for="imagem">URL da Imagem</label> <input id="imagem" name="imagem" type="url"${attr("value", data.post.imagem ?? "")}/></div></div> <div class="field"><label for="descricao">Descrição *</label> <textarea id="descricao" name="descricao" rows="6" required="" style="min-height:120px">`);
		const $$body = escape_html(data.post.descricao);
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea></div> <div class="check-row"><input id="publicado" name="publicado" type="checkbox"${attr("checked", data.post.publicado, true)}/> <label for="publicado">Publicado</label></div></div> <div class="form-foot"><button type="submit" class="btn btn-primary">Salvar Alterações</button> <a href="/blog" class="btn">Cancelar</a></div></div></form></div>`);
	});
}
//#endregion
export { _page as default };
