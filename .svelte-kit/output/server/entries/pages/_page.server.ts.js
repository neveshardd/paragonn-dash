import { t as prisma } from "../../chunks/prisma.js";
//#region src/routes/+page.server.ts
var load = async () => {
	try {
		const [totalBlog, totalProdutos, totalEquipe, totalCupons] = await Promise.all([
			prisma.blogPost.count(),
			prisma.produto.count(),
			prisma.equipe.count(),
			prisma.cupom.count({ where: { ativo: true } })
		]);
		return {
			totalBlog,
			totalProdutos,
			totalEquipe,
			totalCupons,
			recentPosts: await prisma.blogPost.findMany({
				take: 5,
				orderBy: { createdAt: "desc" },
				select: {
					id: true,
					titulo: true,
					autor: true,
					dataHorario: true,
					publicado: true
				}
			}),
			recentProdutos: await prisma.produto.findMany({
				take: 5,
				orderBy: { createdAt: "desc" },
				include: {
					categoria: true,
					servidor: true
				}
			})
		};
	} catch {
		return {
			totalBlog: 0,
			totalProdutos: 0,
			totalEquipe: 0,
			totalCupons: 0,
			recentPosts: [],
			recentProdutos: []
		};
	}
};
//#endregion
export { load };
