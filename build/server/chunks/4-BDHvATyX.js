import { p as prisma } from './prisma-CBIvUiGq.js';
import { f as fail, r as redirect } from './index-qlbAXOsF.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import './index-DBqjc0Yf.js';

//#region src/routes/blog/novo/+page.server.ts
var load = async () => ({});
var actions = { default: async ({ request }) => {
	const data = await request.formData();
	const titulo = data.get("titulo")?.trim();
	const autor = data.get("autor")?.trim();
	const descricao = data.get("descricao")?.trim();
	const imagem = data.get("imagem")?.trim() || null;
	const publicado = data.get("publicado") === "on";
	const raw = data.get("dataHorario");
	const dataHorario = raw ? new Date(raw) : /* @__PURE__ */ new Date();
	if (!titulo || !autor || !descricao) return fail(400, {
		error: "Título, autor e descrição são obrigatórios",
		titulo,
		autor,
		descricao,
		imagem
	});
	try {
		await prisma.blogPost.create({ data: {
			titulo,
			autor,
			descricao,
			imagem,
			publicado,
			dataHorario
		} });
	} catch {
		return fail(500, { error: "Erro ao criar postagem" });
	}
	redirect(303, "/blog");
} };

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	actions: actions,
	load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Bv4xI6Bf.js')).default;
const server_id = "src/routes/blog/novo/+page.server.ts";
const imports = ["_app/immutable/nodes/4.DgvOX2BP.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-BDHvATyX.js.map
