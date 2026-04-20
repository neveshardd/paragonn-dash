import { t as prisma } from "../../../../../chunks/prisma.js";
import { error, fail, redirect } from "@sveltejs/kit";
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
//#endregion
export { actions, load };
