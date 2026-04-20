import { t as prisma } from "../../../../../chunks/prisma.js";
import { fail, redirect } from "@sveltejs/kit";
//#region src/routes/loja/produtos/novo/+page.server.ts
var load = async () => {
	const [categorias, servidores] = await Promise.all([prisma.categoria.findMany({ orderBy: { nome: "asc" } }), prisma.servidor.findMany({ orderBy: { nome: "asc" } })]);
	return {
		categorias,
		servidores
	};
};
var actions = { default: async ({ request }) => {
	const data = await request.formData();
	const nome = data.get("nome")?.trim();
	const preco = parseFloat(data.get("preco"));
	const descricao = data.get("descricao")?.trim() || null;
	const categoriaId = Number(data.get("categoriaId"));
	const servidorId = Number(data.get("servidorId"));
	const ativo = data.get("ativo") === "on";
	if (!nome || isNaN(preco) || !categoriaId || !servidorId) return fail(400, { error: "Nome, preço, categoria e servidor são obrigatórios" });
	try {
		await prisma.produto.create({ data: {
			nome,
			preco,
			descricao,
			categoriaId,
			servidorId,
			ativo
		} });
	} catch {
		return fail(500, { error: "Erro ao criar produto" });
	}
	redirect(303, "/loja/produtos");
} };
//#endregion
export { actions, load };
