import { H as escape_html, V as attr, s as head } from "../../../chunks/dev.js";
//#region src/routes/economia/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let amount = 0;
		head("bi2bjk", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Economia — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-header"><div><div class="page-title">Economia</div> <div class="page-sub">Consulte e ajuste o saldo (cash) de um jogador</div></div></div> <div class="page-body"><form method="GET" action="/economia" class="form-block"><div class="form-block-head">Buscar jogador</div> <div class="form-body"><div class="form-row"><div class="field" style="flex:2"><label for="jogador">Nome do jogador</label> <input id="jogador" name="jogador" type="text" placeholder="ex: neveshardd"${attr("value", data.jogador)} required=""/></div> <div class="field" style="justify-content:flex-end; display:flex; align-items:flex-end;"><button type="submit" class="btn btn-primary">Buscar</button></div></div></div></form> `);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert alert-error" style="margin-top:16px">${escape_html(form.error)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.jogador && data.bridgeOffline) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert alert-error" style="margin-top:16px">${escape_html(data.notFound ? `Jogador "${data.jogador}" nunca entrou no servidor.` : "paragonn-bridge indisponível ou paragonn-core não carregado.")}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.jogador && data.balance !== null) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="form-block" style="margin-top:16px"><div class="form-block-head">${escape_html(data.jogador)}</div> <div class="form-body"><div class="stat-card" style="max-width:220px; margin-bottom:16px"><div class="stat-label">Saldo atual</div> <div style="font-size:24px; font-weight:700">${escape_html(data.balance.toLocaleString("pt-BR"))}</div></div> <form method="POST" action="?/update"><input type="hidden" name="jogador"${attr("value", data.jogador)}/> <div class="form-row"><div class="field" style="max-width:160px"><label for="amount">Quantia</label> <input id="amount" name="amount" type="number" min="0"${attr("value", amount)} required=""/></div> <div class="field" style="justify-content:flex-end; display:flex; align-items:flex-end; gap:8px;"><button type="submit" name="op" value="add" class="btn btn-primary">Adicionar</button> <button type="submit" name="op" value="remove" class="btn btn-danger">Remover</button> <button type="submit" name="op" value="set" class="btn">Definir</button></div></div></form></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
export { _page as default };
