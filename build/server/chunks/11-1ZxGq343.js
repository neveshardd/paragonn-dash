import { p as prisma } from './prisma-CBIvUiGq.js';
import { f as fail, r as redirect } from './index-qlbAXOsF.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import './index-DBqjc0Yf.js';

//#region src/routes/loja/produtos/novo/+page.server.ts
var load = async () => {
	const [categorias, servidores] = await Promise.all([prisma.categoria.findMany({ orderBy: { nome: "asc" } }), prisma.servidor.findMany({ orderBy: { nome: "asc" } })]);
	return {
		categorias,
		servidores
	};
};
var actions = { default: async ({ request }) => {
	const data = await request.formData();
	const nome = data.get("nome")?.trim();
	const preco = parseFloat(data.get("preco"));
	const descricao = data.get("descricao")?.trim() || null;
	const categoriaId = Number(data.get("categoriaId"));
	const servidorId = Number(data.get("servidorId"));
	const ativo = data.get("ativo") === "on";
	if (!nome || isNaN(preco) || !categoriaId || !servidorId) return fail(400, { error: "Nome, preço, categoria e servidor são obrigatórios" });
	try {
		await prisma.produto.create({ data: {
			nome,
			preco,
			descricao,
			categoriaId,
			servidorId,
			ativo
		} });
	} catch {
		return fail(500, { error: "Erro ao criar produto" });
	}
	redirect(303, "/loja/produtos");
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 11;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DRD4sR3x.js')).default;
const server_id = "src/routes/loja/produtos/novo/+page.server.ts";
const imports = ["_app/immutable/nodes/11.CqkdmkZB.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=11-1ZxGq343.js.map
