import { H as escape_html, V as attr, o as ensure_array_like, s as head } from "../../../chunks/dev.js";
//#region src/routes/membros/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		head("61hbmc", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Membros Online — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-header"><div><div class="page-title">Membros Online</div> <div class="page-sub">${escape_html(data.players.length)} jogador(es) no servidor agora</div></div></div> <div class="page-body">`);
		if (data.bridgeOffline) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert alert-error">Não foi possível conectar ao paragonn-bridge. Verifique se o plugin está rodando no
			servidor e se <span class="mono">BRIDGE_API_URL</span>/<span class="mono">BRIDGE_API_KEY</span> estão corretos no <span class="mono">.env</span>.</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="tbl-wrap"><table><thead><tr><th>Jogador</th><th>UUID</th><th style="text-align:right">Ações</th></tr></thead><tbody>`);
		const each_array = ensure_array_like(data.players);
		if (each_array.length !== 0) {
			$$renderer.push("<!--[-->");
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let p = each_array[$$index];
				$$renderer.push(`<tr><td style="font-weight:500">${escape_html(p.name)}</td><td class="muted sm mono">${escape_html(p.uuid)}</td><td class="act"><a${attr("href", `/membros/${encodeURIComponent(p.name)}`)} class="btn btn-ghost btn-sm">Ver perfil</a></td></tr>`);
			}
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push(`<tr><td colspan="3"><div class="empty">Ninguém online agora.</div></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></div>`);
	});
}
//#endregion
export { _page as default };
