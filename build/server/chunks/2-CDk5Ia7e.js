import { p as prisma } from './prisma-CBIvUiGq.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';

//#region src/routes/+page.server.ts
var load = async () => {
	try {
		const [totalBlog, totalProdutos, totalEquipe, totalCupons] = await Promise.all([
			prisma.blogPost.count(),
			prisma.produto.count(),
			prisma.equipe.count(),
			prisma.cupom.count({ where: { ativo: true } })
		]);
		return {
			totalBlog,
			totalProdutos,
			totalEquipe,
			totalCupons,
			recentPosts: await prisma.blogPost.findMany({
				take: 5,
				orderBy: { createdAt: "desc" },
				select: {
					id: true,
					titulo: true,
					autor: true,
					dataHorario: true,
					publicado: true
				}
			}),
			recentProdutos: await prisma.produto.findMany({
				take: 5,
				orderBy: { createdAt: "desc" },
				include: {
					categoria: true,
					servidor: true
				}
			})
		};
	} catch {
		return {
			totalBlog: 0,
			totalProdutos: 0,
			totalEquipe: 0,
			totalCupons: 0,
			recentPosts: [],
			recentProdutos: []
		};
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-7UfYBifV.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/2.BLpmW9GK.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-CDk5Ia7e.js.map
