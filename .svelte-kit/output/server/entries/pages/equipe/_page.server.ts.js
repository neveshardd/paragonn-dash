import { t as prisma } from "../../../chunks/prisma.js";
import { fail, redirect } from "@sveltejs/kit";
//#region src/routes/equipe/+page.server.ts
var load = async ({ url }) => {
	const editId = url.searchParams.get("edit") ? Number(url.searchParams.get("edit")) : null;
	const [membros, edit] = await Promise.all([prisma.equipe.findMany({ orderBy: { cargo: "asc" } }), editId ? prisma.equipe.findUnique({ where: { id: editId } }) : null]);
	return {
		membros,
		edit,
		showForm: url.searchParams.has("add") || !!editId
	};
};
var actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const nick = data.get("nick")?.trim();
		const cargo = data.get("cargo")?.trim();
		if (!nick || !cargo) return fail(400, { error: "Nick e cargo são obrigatórios" });
		try {
			await prisma.equipe.create({ data: {
				nick,
				cargo
			} });
		} catch {
			return fail(409, { error: "Já existe um membro com esse nick" });
		}
		redirect(303, "/equipe");
	},
	update: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		const nick = data.get("nick")?.trim();
		const cargo = data.get("cargo")?.trim();
		if (!nick || !cargo) return fail(400, { error: "Nick e cargo são obrigatórios" });
		try {
			await prisma.equipe.update({
				where: { id },
				data: {
					nick,
					cargo
				}
			});
		} catch {
			return fail(409, { error: "Já existe um membro com esse nick" });
		}
		redirect(303, "/equipe");
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		try {
			await prisma.equipe.delete({ where: { id } });
		} catch {
			return fail(500, { error: "Erro ao remover membro" });
		}
		redirect(303, "/equipe");
	}
};
//#endregion
export { actions, load };
