import { H as escape_html, V as attr, n as attr_class, o as ensure_array_like, s as head, u as stringify } from "../../../chunks/dev.js";
//#region src/routes/punicoes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		const TYPE_LABELS = {
			BAN: "Ban",
			TEMP_BAN: "Ban temporário",
			MUTE: "Mute",
			TEMP_MUTE: "Mute temporário",
			WARN: "Advertência"
		};
		const TYPE_BADGE = {
			BAN: "badge-red",
			TEMP_BAN: "badge-red",
			MUTE: "badge-amber",
			TEMP_MUTE: "badge-amber",
			WARN: "badge-gray"
		};
		head("80g4up", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Punições — Paragonn Panel</title>`);
			});
		});
		$$renderer.push(`<div class="page-header"><div><div class="page-title">Punições</div> <div class="page-sub">${escape_html(data.jogador ? `Punições de ${data.jogador}` : `${data.punishments.length} punição(ões) ativa(s)`)}</div></div> <button class="btn btn-primary">${escape_html("+ Nova Punição")}</button></div> <div class="page-body">`);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert alert-error">${escape_html(form.error)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (data.bridgeOffline) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="alert alert-error">paragonn-bridge indisponível ou paragonn-bans não carregado.</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form method="GET" action="/punicoes" class="form-block" style="margin-bottom:16px"><div class="form-block-head">Filtrar por jogador</div> <div class="form-body"><div class="form-row"><div class="field" style="flex:2"><input name="jogador" type="text" placeholder="Nome do jogador (deixe vazio para ver todas ativas)"${attr("value", data.jogador)}/></div> <div class="field" style="justify-content:flex-end; display:flex; align-items:flex-end;"><button type="submit" class="btn">Filtrar</button></div></div></div></form> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="tbl-wrap"><table><thead><tr><th>Tipo</th><th>Jogador</th><th>Motivo</th><th>Aplicado por</th><th>Expira</th><th style="text-align:right">Ações</th></tr></thead><tbody>`);
		const each_array = ensure_array_like(data.punishments);
		if (each_array.length !== 0) {
			$$renderer.push("<!--[-->");
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let p = each_array[$$index];
				$$renderer.push(`<tr><td><span${attr_class(`badge ${stringify(TYPE_BADGE[p.type])}`)}>${escape_html(TYPE_LABELS[p.type])}</span></td><td style="font-weight:500">${escape_html(p.targetName)}</td><td class="muted sm">${escape_html(p.reason ?? "-")}</td><td class="muted sm">${escape_html(p.issuedBy ?? "-")}</td><td class="muted sm">${escape_html(p.expiresAt ? new Date(p.expiresAt).toLocaleString("pt-BR") : "Nunca")}</td><td class="act">`);
				if (p.type === "BAN" || p.type === "TEMP_BAN") {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<form method="POST" action="?/unban" style="display:inline"><input type="hidden" name="name"${attr("value", p.targetName)}/> <button type="submit" class="btn btn-ghost btn-sm">Desbanir</button></form>`);
				} else if (p.type === "MUTE" || p.type === "TEMP_MUTE") {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<form method="POST" action="?/unmute" style="display:inline"><input type="hidden" name="name"${attr("value", p.targetName)}/> <button type="submit" class="btn btn-ghost btn-sm">Desmutar</button></form>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></td></tr>`);
			}
		} else {
			$$renderer.push("<!--[!-->");
			$$renderer.push(`<tr><td colspan="6"><div class="empty">Nenhuma punição encontrada.</div></td></tr>`);
		}
		$$renderer.push(`<!--]--></tbody></table></div></div>`);
	});
}
//#endregion
export { _page as default };
