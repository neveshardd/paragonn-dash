import { p as prisma } from './prisma-CBIvUiGq.js';
import { f as fail, r as redirect, e as error } from './index-qlbAXOsF.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import './index-DBqjc0Yf.js';

//#region src/routes/loja/produtos/[id]/editar/+page.server.ts
var load = async ({ params }) => {
	const [produto, categorias, servidores] = await Promise.all([
		prisma.produto.findUnique({ where: { id: Number(params.id) } }),
		prisma.categoria.findMany({ orderBy: { nome: "asc" } }),
		prisma.servidor.findMany({ orderBy: { nome: "asc" } })
	]);
	if (!produto) error(404, "Produto não encontrado");
	return {
		produto,
		categorias,
		servidores
	};
};
var actions = { default: async ({ request, params }) => {
	const data = await request.formData();
	const nome = data.get("nome")?.trim();
	const preco = parseFloat(data.get("preco"));
	const descricao = data.get("descricao")?.trim() || null;
	const categoriaId = Number(data.get("categoriaId"));
	const servidorId = Number(data.get("servidorId"));
	const ativo = data.get("ativo") === "on";
	if (!nome || isNaN(preco) || !categoriaId || !servidorId) return fail(400, { error: "Nome, preço, categoria e servidor são obrigatórios" });
	try {
		await prisma.produto.update({
			where: { id: Number(params.id) },
			data: {
				nome,
				preco,
				descricao,
				categoriaId,
				servidorId,
				ativo
			}
		});
	} catch {
		return fail(500, { error: "Erro ao atualizar produto" });
	}
	redirect(303, "/loja/produtos");
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Dn2kmoF3.js')).default;
const server_id = "src/routes/loja/produtos/[id]/editar/+page.server.ts";
const imports = ["_app/immutable/nodes/12.C09neMlb.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-C2bxC1Ok.js.map
