import { t as prisma } from "../../../chunks/prisma.js";
//#region src/routes/configuracoes/+page.server.ts
var load = async () => {
	return { configs: (await prisma.configuracao.findMany()).reduce((acc, curr) => {
		acc[curr.chave] = curr.valor;
		return acc;
	}, {}) };
};
//#endregion
export { load };
