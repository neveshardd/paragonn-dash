import "../../chunks/index-server.js";
import { V as attr, d as unsubscribe_stores, l as store_get, n as attr_class, tt as getContext } from "../../chunks/dev.js";
import "../../chunks/client.js";
//#region node_modules/@sveltejs/kit/src/runtime/app/stores.js
/**
* A function that returns all of the contextual stores. On the server, this must be called during component initialization.
* Only use this if you need to defer store subscription until after the component has mounted, for some reason.
*
* @deprecated Use `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))
*/
var getStores = () => {
	const stores$1 = getContext("__svelte__");
	return {
		page: { subscribe: stores$1.page.subscribe },
		navigating: { subscribe: stores$1.navigating.subscribe },
		updated: stores$1.updated
	};
};
/**
* A readable store whose value contains page data.
*
* On the server, this store can only be subscribed to during component initialization. In the browser, it can be subscribed to at any time.
*
* @deprecated Use `page` from `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))
* @type {import('svelte/store').Readable<import('@sveltejs/kit').Page>}
*/
var page = { subscribe(fn) {
	return getStores().page.subscribe(fn);
} };
//#endregion
//#region src/lib/assets/logo.png
var logo_default = "/_app/immutable/assets/logo.D7-sTseJ.png";
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { children } = $$props;
		let sidebarOpen = false;
		function active(path) {
			if (path === "/") return store_get($$store_subs ??= {}, "$page", page).url.pathname === "/";
			return store_get($$store_subs ??= {}, "$page", page).url.pathname.startsWith(path);
		}
		$$renderer.push(`<div${attr_class("layout", void 0, { "sidebar-open": sidebarOpen })}><div class="sidebar-overlay" role="button" tabindex="0" aria-label="Fechar menu"></div> <aside class="sidebar"><div class="brand"><img${attr("src", logo_default)} alt="Paragonn" style="height: 36px; width: auto; display: block;"/></div> <div class="nav-section"><div class="nav-label">Geral</div> <a href="/"${attr_class("nav-link", void 0, { "active": active("/") })}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg> Visão Geral</a></div> <div class="nav-section"><div class="nav-label">Blog</div> <a href="/blog"${attr_class("nav-link", void 0, { "active": active("/blog") })}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg> Postagens</a></div> <div class="nav-section"><div class="nav-label">Loja</div> <a href="/loja/produtos"${attr_class("nav-link", void 0, { "active": active("/loja/produtos") })}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> Produtos</a> <a href="/loja/categorias"${attr_class("nav-link", void 0, { "active": active("/loja/categorias") })}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> Categorias</a> <a href="/loja/cupons"${attr_class("nav-link", void 0, { "active": active("/loja/cupons") })}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg> Cupons</a> <a href="/loja/servidores"${attr_class("nav-link", void 0, { "active": active("/loja/servidores") })}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg> Servidores</a> <a href="/loja/meta"${attr_class("nav-link", void 0, { "active": active("/loja/meta") })}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg> Meta Mensal</a></div> <div class="nav-section"><div class="nav-label">Comunidade</div> <a href="/equipe"${attr_class("nav-link", void 0, { "active": active("/equipe") })}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Equipe</a> <a href="/membros"${attr_class("nav-link", void 0, { "active": active("/membros") })}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"></path></svg> Membros</a></div> <div class="nav-section"><div class="nav-label">Servidor</div> <a href="/economia"${attr_class("nav-link", void 0, { "active": active("/economia") })}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v12M15 9.5c0-1.4-1.4-2.5-3-2.5s-3 1-3 2.5 1.4 2 3 2.5 3 1 3 2.5-1.4 2.5-3 2.5-3-1.1-3-2.5"></path></svg> Economia</a> <a href="/punicoes"${attr_class("nav-link", void 0, { "active": active("/punicoes") })}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="4.9" y1="4.9" x2="19.1" y2="19.1"></line></svg> Punições</a> <a href="/logs"${attr_class("nav-link", void 0, { "active": active("/logs") })}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line><line x1="9" y1="11" x2="12" y2="11"></line></svg> Logs</a></div> <div class="nav-section"><div class="nav-label">Sistema</div> <a href="/configuracoes"${attr_class("nav-link", void 0, { "active": active("/configuracoes") })}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> Configurações</a></div></aside> <main class="main"><div class="page-header"><div style="display: flex; align-items: center;"><button class="menu-toggle" aria-label="Alternar menu"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button> <div><h1 class="page-title">`);
		if (active("/loja")) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`Loja`);
		} else if (active("/blog")) {
			$$renderer.push("<!--[1-->");
			$$renderer.push(`Blog`);
		} else if (active("/equipe")) {
			$$renderer.push("<!--[2-->");
			$$renderer.push(`Equipe`);
		} else if (active("/membros")) {
			$$renderer.push("<!--[3-->");
			$$renderer.push(`Membros`);
		} else if (active("/economia")) {
			$$renderer.push("<!--[4-->");
			$$renderer.push(`Economia`);
		} else if (active("/punicoes")) {
			$$renderer.push("<!--[5-->");
			$$renderer.push(`Punições`);
		} else if (active("/logs")) {
			$$renderer.push("<!--[6-->");
			$$renderer.push(`Logs do Servidor`);
		} else if (active("/configuracoes")) {
			$$renderer.push("<!--[7-->");
			$$renderer.push(`Configurações`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`Visão Geral`);
		}
		$$renderer.push(`<!--]--></h1></div></div></div> <div class="page-body">`);
		children($$renderer);
		$$renderer.push(`<!----></div></main></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _layout as default };
