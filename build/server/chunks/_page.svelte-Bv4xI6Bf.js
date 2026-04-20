import { a6 as head, e as escape_html, a as attr } from './dev-F8WnKEJC.js';

//#region src/routes/blog/novo/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { form } = $$props;
		const nowLocal = () => {
			const d = /* @__PURE__ */ new Date();
			d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
			return d.toISOString().slice(0, 16);
		};
		head("k038fy", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Nova Postagem — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-header"><div><div class="page-title">Nova Postagem</div> <div class="page-sub"><a href="/blog" style="color:var(--primary)">Blog</a> / Nova</div></div></div> <div class="page-body">`);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert alert-error">${escape_html(form.error)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form method="POST"><div class="form-block"><div class="form-block-head">Dados da Postagem</div> <div class="form-body"><div class="form-row"><div class="field"><label for="titulo">Título *</label> <input id="titulo" name="titulo" type="text" placeholder="Título da postagem" required=""${attr("value", form?.titulo ?? "")}/></div> <div class="field"><label for="autor">Autor *</label> <input id="autor" name="autor" type="text" placeholder="Nome do autor" required=""${attr("value", form?.autor ?? "")}/></div></div> <div class="form-row"><div class="field"><label for="dataHorario">Data e Hora</label> <input id="dataHorario" name="dataHorario" type="datetime-local"${attr("value", nowLocal())}/></div> <div class="field"><label for="imagem">URL da Imagem</label> <input id="imagem" name="imagem" type="url" placeholder="https://..."${attr("value", form?.imagem ?? "")}/></div></div> <div class="field"><label for="descricao">Descrição *</label> <textarea id="descricao" name="descricao" rows="6" placeholder="Conteúdo da postagem..." required="" style="min-height:120px">`);
		const $$body = escape_html(form?.descricao ?? "");
		if ($$body) $$renderer.push(`${$$body}`);
		$$renderer.push(`</textarea></div> <div class="check-row"><input id="publicado" name="publicado" type="checkbox" checked=""/> <label for="publicado">Publicar imediatamente</label></div></div> <div class="form-foot"><button type="submit" class="btn btn-primary">Criar Postagem</button> <a href="/blog" class="btn">Cancelar</a></div></div></form></div>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Bv4xI6Bf.js.map
