import { p as prisma } from './prisma-CBIvUiGq.js';
import { j as json } from './index-qlbAXOsF.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import './index-DBqjc0Yf.js';

//#region src/routes/api/categorias/+server.ts
var GET = async () => {
	return json(await prisma.categoria.findMany({ orderBy: { nome: "asc" } }), { headers: { "Access-Control-Allow-Origin": "*" } });
};

export { GET };
//# sourceMappingURL=_server.ts-erpRusKs.js.map
