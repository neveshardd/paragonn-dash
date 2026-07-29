import { t as prisma } from "../../../../chunks/prisma.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/categorias/+server.ts
var GET = async () => {
	return json(await prisma.categoria.findMany({ orderBy: { nome: "asc" } }), { headers: {
		"Access-Control-Allow-Origin": "*",
		"Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
	} });
};
//#endregion
export { GET };
