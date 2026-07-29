import { H as escape_html, V as attr, n as attr_class, o as ensure_array_like, s as head, u as stringify } from "../../../chunks/dev.js";
//#region src/routes/blog/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		const fmt = (d) => new Date(d).toLocaleString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
		head("u4k2t", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Blog — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-header"><div><div class="page-title">Blog</div> <div class="page-sub">${escape_html(data.posts.length)} postagem(s)</div></div> <a href="/blog/novo" class="btn btn-primary">+ Nova Postagem</a></div> <div class="page-body">`);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert alert-error">${escape_html(form.error)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="tbl-wrap"><table><thead><tr><th>#</th><th>Postagem</th><th>Autor</th><th>Data</th><th>Status</th><th style="text-align:right">Ações</th></tr></thead><tbody>`);
		const each_array = ensure_array_like(data.posts);
		if (each_array.length !== 0) {
			$$renderer.push("<!--[-->");
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let post = each_array[$$index];
				$$renderer.push(`<tr><td class="muted sm">${escape_html(post.id)}</td><td><div style="display:flex;align-items:center;gap:12px"><div class="blog-thumb svelte-u4k2t">`);
				if (post.imagem) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<img${attr("src", post.imagem)}${attr("alt", post.titulo)} class="svelte-u4k2t"/>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<div class="thumb-placeholder svelte-u4k2t">/</div>`);
				}
				$$renderer.push(`<!--]--></div> <div style="font-weight:600;max-width:240px" class="sm">${escape_html(post.titulo)}</div></div></td><td>${escape_html(post.autor)}</td><td class="muted sm" style="white-space:nowrap">${escape_html(fmt(post.dataHorario))}</td><td><form method="POST" action="?/togglePublicado" style="display:inline"><input type="hidden" name="id"${attr("value", post.id)}/> <input type="hidden" name="publicado"${attr("value", String(post.publicado))}/> <button type="submit"${attr_class(`badge ${stringify(post.publicado ? "badge-green" : "badge-gray")}`)} style="border:none;cursor:pointer;background:none">${escape_html(post.publicado ? "Publicado" : "Rascunho")}</button></form></td><td class="act"><a${attr("href", `/blog/${stringify(post.id)}/editar`)} class="btn btn-ghost btn-sm">Editar</a> <form method="POST" action="?/delete" style="display:inline"><input type="hidden" name="id"${attr("value", post.id)}/> <button type="submit" class="btn btn-danger btn-sm">Deletar</button></form></td></tr>`);
			}
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push(`<tr><td colspan="6"><div class="empty">Nenhuma postagem. <a href="/blog/novo" style="color:var(--primary)">Criar a primeira.</a></div></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></div>`);
	});
}
//#endregion
export { _page as default };
