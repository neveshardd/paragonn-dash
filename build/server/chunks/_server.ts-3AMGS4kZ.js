import { p as prisma } from './prisma-CBIvUiGq.js';
import { j as json } from './index-qlbAXOsF.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import './index-DBqjc0Yf.js';

//#region src/routes/api/produtos/+server.ts
var GET = async () => {
	return json(await prisma.produto.findMany({
		where: { ativo: true },
		orderBy: { createdAt: "desc" },
		include: {
			categoria: true,
			servidor: true
		}
	}), { headers: { "Access-Control-Allow-Origin": "*" } });
};

export { GET };
//# sourceMappingURL=_server.ts-3AMGS4kZ.js.map
