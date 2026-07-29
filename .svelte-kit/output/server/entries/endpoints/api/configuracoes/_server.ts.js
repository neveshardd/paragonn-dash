import { t as prisma } from "../../../../chunks/prisma.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/configuracoes/+server.ts
var GET = async () => {
	try {
		return json((await prisma.configuracao.findMany()).reduce((acc, curr) => {
			acc[curr.chave] = curr.valor;
			return acc;
		}, {}), { headers: { "Access-Control-Allow-Origin": "*" } });
	} catch (error) {
		console.error("Erro ao buscar configurações:", error);
		return json({ error: "Erro interno" }, { status: 500 });
	}
};
var POST = async ({ request }) => {
	try {
		const body = await request.json();
		const configsToUpdate = Array.isArray(body) ? body : [body];
		if (configsToUpdate.length === 0) return json({ error: "Nenhuma configuração fornecida" }, { status: 400 });
		return json((await Promise.all(configsToUpdate.map(async (item) => {
			const { chave, valor } = item;
			if (!chave || valor === void 0) return null;
			return prisma.configuracao.upsert({
				where: { chave },
				update: { valor: String(valor) },
				create: {
					chave,
					valor: String(valor)
				}
			});
		}))).filter((r) => r !== null), { headers: { "Access-Control-Allow-Origin": "*" } });
	} catch (error) {
		console.error("Erro ao atualizar configuração:", error);
		return json({ error: "Erro interno" }, { status: 500 });
	}
};
var OPTIONS = async () => {
	return new Response(null, { headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type"
	} });
};
//#endregion
export { GET, OPTIONS, POST };
