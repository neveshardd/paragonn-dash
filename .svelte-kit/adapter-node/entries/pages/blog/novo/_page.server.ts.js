import { t as prisma } from "../../../../chunks/prisma.js";
import { fail, redirect } from "@sveltejs/kit";
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
//#endregion
export { actions, load };
