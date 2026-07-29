import { t as prisma } from "../../../../chunks/prisma.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/produtos/+server.ts
var GET = async () => {
	return json(await prisma.produto.findMany({
		where: { ativo: true },
		orderBy: { createdAt: "desc" },
		include: {
			categoria: true,
			servidor: true
		}
	}), { headers: {
		"Access-Control-Allow-Origin": "*",
		"Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
		"Pragma": "no-cache",
		"Expires": "0"
	} });
};
//#endregion
export { GET };
