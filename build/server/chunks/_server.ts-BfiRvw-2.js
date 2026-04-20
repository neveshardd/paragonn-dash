import { p as prisma } from './prisma-CBIvUiGq.js';
import { j as json } from './index-qlbAXOsF.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import './index-DBqjc0Yf.js';

//#region src/routes/api/servidores/+server.ts
var GET = async () => {
	try {
		return json(await prisma.servidor.findMany({ orderBy: { nome: "asc" } }), { headers: { "Access-Control-Allow-Origin": "*" } });
	} catch (error) {
		console.error("Erro ao buscar servidores:", error);
		return json({ error: "Erro interno" }, { status: 500 });
	}
};

export { GET };
//# sourceMappingURL=_server.ts-BfiRvw-2.js.map
