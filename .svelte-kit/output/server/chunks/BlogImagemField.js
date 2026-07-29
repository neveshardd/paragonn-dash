import { V as attr, i as bind_props } from "./dev.js";
//#region src/lib/components/BlogImagemField.svelte
function BlogImagemField($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { value = "" } = $$props;
		let uploading = false;
		$$renderer.push(`<div class="blog-imagem-field svelte-twrfhw"><div class="field"><label for="imagem-url">URL da imagem (capa do post)</label> <div class="input-group svelte-twrfhw"><input id="imagem-url" name="imagem" type="url" placeholder="https://… (preenchido após upload ou cole uma URL)"${attr("value", value)}/> `);
		if (value) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button type="button" class="btn-clear svelte-twrfhw" title="Remover imagem"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></div> <div class="upload-area svelte-twrfhw"><input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" hidden=""/> <button type="button" class="btn-upload svelte-twrfhw"${attr("disabled", uploading, true)}>`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg> Fazer upload de imagem`);
		$$renderer.push(`<!--]--></button> <span class="hint svelte-twrfhw">Tamanho máximo: 8MB. Recomendado: 1200x630px.</span></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (value) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="preview-card svelte-twrfhw"><div class="preview-header svelte-twrfhw">Pré-visualização</div> <div class="preview-content svelte-twrfhw"><img${attr("src", value)} alt="Pré-visualização" class="svelte-twrfhw" onerror="this.__e=event"/></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
		bind_props($$props, { value });
	});
}
//#endregion
export { BlogImagemField as t };
