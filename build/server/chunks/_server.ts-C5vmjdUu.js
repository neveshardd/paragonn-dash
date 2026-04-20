import { p as prisma } from './prisma-CBIvUiGq.js';
import { j as json } from './index-qlbAXOsF.js';
import 'dotenv/config';
import '@prisma/adapter-pg';
import 'node:path';
import 'node:url';
import '@prisma/client/runtime/client';
import './index-DBqjc0Yf.js';

//#region src/routes/api/blog/[id]/+server.ts
var GET = async ({ params }) => {
	try {
		const id = parseInt(params.id);
		if (isNaN(id)) return json({ error: "ID inválido" }, { status: 400 });
		const post = await prisma.blogPost.findUnique({ where: { id } });
		if (!post) return json({ error: "Post não encontrado" }, { status: 404 });
		return json(post, { headers: { "Access-Control-Allow-Origin": "*" } });
	} catch (error) {
		console.error("Erro na API de blog:", error);
		return json({ error: "Erro interno" }, { status: 500 });
	}
};

export { GET };
//# sourceMappingURL=_server.ts-C5vmjdUu.js.map
