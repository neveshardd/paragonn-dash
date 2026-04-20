import { t as prisma } from "../../../../chunks/prisma.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/equipe/+server.ts
var GET = async () => {
	return json(await prisma.equipe.findMany({ orderBy: { cargo: "asc" } }), { headers: { "Access-Control-Allow-Origin": "*" } });
};
//#endregion
export { GET };
