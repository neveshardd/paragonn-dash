import { t as prisma } from "../../../chunks/prisma.js";
import { fail } from "@sveltejs/kit";
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
//#endregion
export { actions, load };
