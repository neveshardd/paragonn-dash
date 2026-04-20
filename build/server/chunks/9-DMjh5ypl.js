import { p as prisma } from './prisma-CBIvUiGq.js';
import { f as fail, r as redirect } from './index-qlbAXOsF.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import './index-DBqjc0Yf.js';

//#region src/routes/loja/cupons/+page.server.ts
var load = async ({ url }) => {
	const editId = url.searchParams.get("edit") ? Number(url.searchParams.get("edit")) : null;
	const [cupons, edit] = await Promise.all([prisma.cupom.findMany({ orderBy: { id: "desc" } }), editId ? prisma.cupom.findUnique({ where: { id: editId } }) : null]);
	return {
		cupons,
		edit,
		showForm: url.searchParams.has("add") || !!editId
	};
};
var actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const codigo = data.get("codigo")?.trim().toUpperCase();
		const desconto = Number(data.get("desconto"));
		const ativo = data.get("ativo") === "on";
		const expiraRaw = data.get("expira");
		const expira = expiraRaw ? new Date(expiraRaw) : null;
		if (!codigo || isNaN(desconto) || desconto < 1 || desconto > 100) return fail(400, { error: "Código e desconto (1–100%) são obrigatórios" });
		try {
			await prisma.cupom.create({ data: {
				codigo,
				desconto,
				ativo,
				expira
			} });
		} catch {
			return fail(409, { error: "Já existe um cupom com esse código" });
		}
		redirect(303, "/loja/cupons");
	},
	update: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		const codigo = data.get("codigo")?.trim().toUpperCase();
		const desconto = Number(data.get("desconto"));
		const ativo = data.get("ativo") === "on";
		const expiraRaw = data.get("expira");
		const expira = expiraRaw ? new Date(expiraRaw) : null;
		if (!codigo || isNaN(desconto)) return fail(400, { error: "Dados inválidos" });
		try {
			await prisma.cupom.update({
				where: { id },
				data: {
					codigo,
					desconto,
					ativo,
					expira
				}
			});
		} catch {
			return fail(500, { error: "Erro ao atualizar cupom" });
		}
		redirect(303, "/loja/cupons");
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		try {
			await prisma.cupom.delete({ where: { id } });
		} catch {
			return fail(500, { error: "Erro ao deletar cupom" });
		}
		redirect(303, "/loja/cupons");
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DSO1Kkqk.js')).default;
const server_id = "src/routes/loja/cupons/+page.server.ts";
const imports = ["_app/immutable/nodes/9.BYSlJj2p.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-DMjh5ypl.js.map
