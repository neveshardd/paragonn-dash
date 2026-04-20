import { t as prisma } from "../../../../chunks/prisma.js";
import { fail, redirect } from "@sveltejs/kit";
//#region src/routes/loja/cupons/+page.server.ts
var load = async ({ url }) => {
	const editId = url.searchParams.get("edit") ? Number(url.searchParams.get("edit")) : null;
	const [cupons, edit] = await Promise.all([prisma.cupom.findMany({ orderBy: { id: "desc" } }), editId ? prisma.cupom.findUnique({ where: { id: editId } }) : null]);
	return {
		cupons,
		edit,
		showForm: url.searchParams.has("add") || !!editId
	};
};
var actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const codigo = data.get("codigo")?.trim().toUpperCase();
		const desconto = Number(data.get("desconto"));
		const ativo = data.get("ativo") === "on";
		const expiraRaw = data.get("expira");
		const expira = expiraRaw ? new Date(expiraRaw) : null;
		if (!codigo || isNaN(desconto) || desconto < 1 || desconto > 100) return fail(400, { error: "Código e desconto (1–100%) são obrigatórios" });
		try {
			await prisma.cupom.create({ data: {
				codigo,
				desconto,
				ativo,
				expira
			} });
		} catch {
			return fail(409, { error: "Já existe um cupom com esse código" });
		}
		redirect(303, "/loja/cupons");
	},
	update: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		const codigo = data.get("codigo")?.trim().toUpperCase();
		const desconto = Number(data.get("desconto"));
		const ativo = data.get("ativo") === "on";
		const expiraRaw = data.get("expira");
		const expira = expiraRaw ? new Date(expiraRaw) : null;
		if (!codigo || isNaN(desconto)) return fail(400, { error: "Dados inválidos" });
		try {
			await prisma.cupom.update({
				where: { id },
				data: {
					codigo,
					desconto,
					ativo,
					expira
				}
			});
		} catch {
			return fail(500, { error: "Erro ao atualizar cupom" });
		}
		redirect(303, "/loja/cupons");
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get("id"));
		try {
			await prisma.cupom.delete({ where: { id } });
		} catch {
			return fail(500, { error: "Erro ao deletar cupom" });
		}
		redirect(303, "/loja/cupons");
	}
};
//#endregion
export { actions, load };
