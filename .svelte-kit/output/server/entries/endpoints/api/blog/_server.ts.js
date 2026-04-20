import { t as prisma } from "../../../../chunks/prisma.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/blog/+server.ts
var GET = async () => {
	return json(await prisma.blogPost.findMany({
		where: { publicado: true },
		orderBy: { dataHorario: "desc" }
	}), { headers: { "Access-Control-Allow-Origin": "*" } });
};
//#endregion
export { GET };
