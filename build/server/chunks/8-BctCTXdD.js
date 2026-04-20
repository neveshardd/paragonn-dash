import { p as prisma } from './prisma-CBIvUiGq.js';
import { f as fail, r as redirect } from './index-qlbAXOsF.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import './index-DBqjc0Yf.js';

//#region src/routes/loja/categorias/+page.server.ts
var load = async ({ url }) => {
	const editId = url.searchParams.get("edit") ? Number(url.searchParams.get("edit")) : null;
	const [categorias, edit] = await Promise.all([prisma.categoria.findMany({
		orderBy: { nome: "asc" },
		include: { _count: { select: { produtos: true } } }
	}), editId ? prisma.categoria.findUnique({ where: { id: editId } }) : null]);
	return {
		categorias,
		edit,
		showForm: url.searchParams.has("add") || !!editId
	};
};
var actions = {
	create: async ({ request }) => {
		const nome = (await request.formData()).get("nome")?.trim();
		if (!nome) return fail(400, { error: "Nome é obrigatório" });
		try {
			await prisma.categoria.create({ data: { nome } });
		} catch {
			return fail(409, { error: "Já existe uma categoria com esse nome" });
		}
		redirect(303, "/loja/categorias");
	},
	update: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		const nome = data.get("nome")?.trim();
		if (!nome) return fail(400, { error: "Nome é obrigatório" });
		try {
			await prisma.categoria.update({
				where: { id },
				data: { nome }
			});
		} catch {
			return fail(409, { error: "Já existe uma categoria com esse nome" });
		}
		redirect(303, "/loja/categorias");
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		try {
			await prisma.categoria.delete({ where: { id } });
		} catch {
			return fail(400, { error: "Não é possível deletar: categoria possui produtos vinculados" });
		}
		redirect(303, "/loja/categorias");
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-y50DDUlO.js')).default;
const server_id = "src/routes/loja/categorias/+page.server.ts";
const imports = ["_app/immutable/nodes/8.Ncul1XtP.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-BctCTXdD.js.map
