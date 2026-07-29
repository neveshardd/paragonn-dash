import "../../../chunks/index-server.js";
import { H as escape_html, V as attr, s as head } from "../../../chunks/dev.js";
//#region src/routes/configuracoes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		let discordLink = data.configs?.discord_link || "https://discord.gg/paragonn";
		let serverIP = data.configs?.server_ip || "play.paragonn.com.br";
		let saving = false;
		head("1gyavzl", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Configurações Globais — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-body"><div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px;"><div><h2 style="font-size: 20px; font-weight: 700; margin-bottom: 4px;">Configurações Globais</h2> <p class="muted sm">Gerencie os links e parâmetros gerais do ecossistema.</p></div> <button class="btn btn-primary" style="padding: 10px 24px; font-weight: 600;"${attr("disabled", saving, true)}>${escape_html("Salvar Alterações")}</button></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="form-block"><div class="form-block-head">🎮 Social &amp; Servidor</div> <div class="form-body"><div class="field"><label for="discord">Link do Discord</label> <input id="discord" type="text"${attr("value", discordLink)} placeholder="https://discord.gg/..."/> <p class="xs muted">Este link será atualizado automaticamente no Site e na Loja.</p></div> <div style="height: 12px;"></div> <div class="field"><label for="server_ip">IP do Servidor</label> <input id="server_ip" type="text"${attr("value", serverIP)} placeholder="play.paragonn.com.br"/> <p class="xs muted">Este IP será atualizado no Site (Copiadores e Rodapé).</p></div></div></div></div>`);
	});
}
//#endregion
export { _page as default };
