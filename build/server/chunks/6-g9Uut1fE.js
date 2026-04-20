import { p as prisma } from './prisma-CBIvUiGq.js';
import { f as fail, r as redirect } from './index-qlbAXOsF.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import './index-DBqjc0Yf.js';

//#region src/routes/equipe/+page.server.ts
var load = async ({ url }) => {
	const editId = url.searchParams.get("edit") ? Number(url.searchParams.get("edit")) : null;
	const [membros, edit] = await Promise.all([prisma.equipe.findMany({ orderBy: { cargo: "asc" } }), editId ? prisma.equipe.findUnique({ where: { id: editId } }) : null]);
	return {
		membros,
		edit,
		showForm: url.searchParams.has("add") || !!editId
	};
};
var actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const nick = data.get("nick")?.trim();
		const cargo = data.get("cargo")?.trim();
		if (!nick || !cargo) return fail(400, { error: "Nick e cargo são obrigatórios" });
		try {
			await prisma.equipe.create({ data: {
				nick,
				cargo
			} });
		} catch {
			return fail(409, { error: "Já existe um membro com esse nick" });
		}
		redirect(303, "/equipe");
	},
	update: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		const nick = data.get("nick")?.trim();
		const cargo = data.get("cargo")?.trim();
		if (!nick || !cargo) return fail(400, { error: "Nick e cargo são obrigatórios" });
		try {
			await prisma.equipe.update({
				where: { id },
				data: {
					nick,
					cargo
				}
			});
		} catch {
			return fail(409, { error: "Já existe um membro com esse nick" });
		}
		redirect(303, "/equipe");
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		try {
			await prisma.equipe.delete({ where: { id } });
		} catch {
			return fail(500, { error: "Erro ao remover membro" });
		}
		redirect(303, "/equipe");
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-7GsDOe8o.js')).default;
const server_id = "src/routes/equipe/+page.server.ts";
const imports = ["_app/immutable/nodes/6.BItaHybu.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-g9Uut1fE.js.map
