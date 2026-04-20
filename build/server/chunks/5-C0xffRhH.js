import { p as prisma } from './prisma-CBIvUiGq.js';
import { f as fail, r as redirect, e as error } from './index-qlbAXOsF.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import './index-DBqjc0Yf.js';

//#region src/routes/blog/[id]/editar/+page.server.ts
var load = async ({ params }) => {
	const post = await prisma.blogPost.findUnique({ where: { id: Number(params.id) } });
	if (!post) error(404, "Postagem não encontrada");
	return { post };
};
var actions = { default: async ({ request, params }) => {
	const data = await request.formData();
	const titulo = data.get("titulo")?.trim();
	const autor = data.get("autor")?.trim();
	const descricao = data.get("descricao")?.trim();
	const imagem = data.get("imagem")?.trim() || null;
	const publicado = data.get("publicado") === "on";
	const raw = data.get("dataHorario");
	const dataHorario = raw ? new Date(raw) : void 0;
	if (!titulo || !autor || !descricao) return fail(400, { error: "Título, autor e descrição são obrigatórios" });
	try {
		await prisma.blogPost.update({
			where: { id: Number(params.id) },
			data: {
				titulo,
				autor,
				descricao,
				imagem,
				publicado,
				...dataHorario && { dataHorario }
			}
		});
	} catch {
		return fail(500, { error: "Erro ao atualizar postagem" });
	}
	redirect(303, "/blog");
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CxPAKr15.js')).default;
const server_id = "src/routes/blog/[id]/editar/+page.server.ts";
const imports = ["_app/immutable/nodes/5.B3HXHBTH.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-C0xffRhH.js.map
