import { p as prisma } from './prisma-CBIvUiGq.js';
import { j as json } from './index-qlbAXOsF.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import './index-DBqjc0Yf.js';

//#region src/routes/api/blog/+server.ts
var GET = async () => {
	return json(await prisma.blogPost.findMany({
		where: { publicado: true },
		orderBy: { dataHorario: "desc" }
	}), { headers: { "Access-Control-Allow-Origin": "*" } });
};

export { GET };
//# sourceMappingURL=_server.ts-DmRyDBP0.js.map
