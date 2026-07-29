import "../../../../chunks/index-server.js";
import "../../../../chunks/dev.js";
//#region src/routes/loja/meta/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="empty">Carregando dados da meta...</div>`);
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
