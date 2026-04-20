import { a as head } from "../../../chunks/dev.js";
//#region src/routes/membros/+page.svelte
function _page($$renderer) {
	head("61hbmc", $$renderer, ($$renderer) => {
		$$renderer.title(($$renderer) => {
			$$renderer.push(`<title>Membros Online — Paragonn Panel</title>`);
		});
	});
	$$renderer.push(`<div class="page-header"><div><div class="page-title">Membros Online</div> <div class="page-sub">Lista de jogadores no servidor</div></div></div> <div class="page-body"><div class="coming-soon"><div class="coming-badge">Em Breve</div> <h2>Integração de Membros Online</h2> <p>Esta seção exibirá a lista de jogadores online em tempo real.<br/> Integração direta via plugin Minecraft — em desenvolvimento.</p></div></div>`);
}
//#endregion
export { _page as default };
