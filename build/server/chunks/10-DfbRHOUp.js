import { p as prisma } from './prisma-CBIvUiGq.js';
import { f as fail } from './index-qlbAXOsF.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import './index-DBqjc0Yf.js';

//#region src/routes/loja/produtos/+page.server.ts
var load = async () => {
	const [produtos, categorias, servidores] = await Promise.all([
		prisma.produto.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				categoria: true,
				servidor: true
			}
		}),
		prisma.categoria.findMany({ orderBy: { nome: "asc" } }),
		prisma.servidor.findMany({ orderBy: { nome: "asc" } })
	]);
	return {
		produtos,
		categorias,
		servidores
	};
};
var actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		if (!id) return fail(400, { error: "ID inválido" });
		try {
			await prisma.produto.delete({ where: { id } });
			return { success: true };
		} catch {
			return fail(500, { error: "Erro ao deletar produto" });
		}
	},
	toggleAtivo: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		const ativo = data.get("ativo") === "true";
		try {
			await prisma.produto.update({
				where: { id },
				data: { ativo: !ativo }
			});
			return { success: true };
		} catch {
			return fail(500, { error: "Erro ao atualizar produto" });
		}
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Bs3e9fl9.js')).default;
const server_id = "src/routes/loja/produtos/+page.server.ts";
const imports = ["_app/immutable/nodes/10.bswc0HGY.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-DfbRHOUp.js.map
