import { t as prisma } from "../../../../chunks/prisma.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/servidores/+server.ts
var GET = async () => {
	try {
		return json(await prisma.servidor.findMany({ orderBy: { nome: "asc" } }), { headers: { "Access-Control-Allow-Origin": "*" } });
	} catch (error) {
		console.error("Erro ao buscar servidores:", error);
		return json({ error: "Erro interno" }, { status: 500 });
	}
};
//#endregion
export { GET };
