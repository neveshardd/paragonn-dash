import { p as prisma } from './prisma-CBIvUiGq.js';
import { f as fail } from './index-qlbAXOsF.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import './index-DBqjc0Yf.js';

//#region src/routes/blog/+page.server.ts
var load = async () => {
	return { posts: await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } }) };
};
var actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		if (!id) return fail(400, { error: "ID inválido" });
		try {
			await prisma.blogPost.delete({ where: { id } });
			return { success: true };
		} catch {
			return fail(500, { error: "Erro ao deletar postagem" });
		}
	},
	togglePublicado: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		const publicado = data.get("publicado") === "true";
		try {
			await prisma.blogPost.update({
				where: { id },
				data: { publicado: !publicado }
			});
			return { success: true };
		} catch {
			return fail(500, { error: "Erro ao atualizar" });
		}
	}
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-M1_RwKzk.js')).default;
const server_id = "src/routes/blog/+page.server.ts";
const imports = ["_app/immutable/nodes/3.Bum5Ci5h.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-BGvrGN86.js.map
