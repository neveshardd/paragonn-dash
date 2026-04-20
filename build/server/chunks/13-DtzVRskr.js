import { p as prisma } from './prisma-CBIvUiGq.js';
import { f as fail, r as redirect } from './index-qlbAXOsF.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import './index-DBqjc0Yf.js';

//#region src/routes/loja/servidores/+page.server.ts
var load = async ({ url }) => {
	const editId = url.searchParams.get("edit") ? Number(url.searchParams.get("edit")) : null;
	const [servidores, edit] = await Promise.all([prisma.servidor.findMany({
		orderBy: { nome: "asc" },
		include: { _count: { select: { produtos: true } } }
	}), editId ? prisma.servidor.findUnique({ where: { id: editId } }) : null]);
	return {
		servidores,
		edit,
		showForm: url.searchParams.has("add") || !!editId
	};
};
var actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const nome = data.get("nome")?.trim();
		const ip = data.get("ip")?.trim();
		const porta = Number(data.get("porta")) || 25565;
		if (!nome || !ip) return fail(400, { error: "Nome e IP são obrigatórios" });
		try {
			await prisma.servidor.create({ data: {
				nome,
				ip,
				porta
			} });
		} catch {
			return fail(409, { error: "Já existe um servidor com esse nome" });
		}
		redirect(303, "/loja/servidores");
	},
	update: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		const nome = data.get("nome")?.trim();
		const ip = data.get("ip")?.trim();
		const porta = Number(data.get("porta")) || 25565;
		if (!nome || !ip) return fail(400, { error: "Nome e IP são obrigatórios" });
		try {
			await prisma.servidor.update({
				where: { id },
				data: {
					nome,
					ip,
					porta
				}
			});
		} catch {
			return fail(500, { error: "Erro ao atualizar servidor" });
		}
		redirect(303, "/loja/servidores");
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		try {
			await prisma.servidor.delete({ where: { id } });
		} catch {
			return fail(400, { error: "Não é possível deletar: servidor possui produtos vinculados" });
		}
		redirect(303, "/loja/servidores");
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 13;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DoE9mizl.js')).default;
const server_id = "src/routes/loja/servidores/+page.server.ts";
const imports = ["_app/immutable/nodes/13.C94p7Zf5.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=13-DtzVRskr.js.map
