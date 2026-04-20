import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	try {
		const [totalBlog, totalProdutos, totalEquipe, totalCupons] = await Promise.all([
			prisma.blogPost.count(),
			prisma.produto.count(),
			prisma.equipe.count(),
			prisma.cupom.count({ where: { ativo: true } })
		]);

		const recentPosts = await prisma.blogPost.findMany({
			take: 5,
			orderBy: { createdAt: 'desc' },
			select: { id: true, titulo: true, autor: true, dataHorario: true, publicado: true }
		});

		const recentProdutos = await prisma.produto.findMany({
			take: 5,
			orderBy: { createdAt: 'desc' },
			include: { categoria: true, servidor: true }
		});

		return { totalBlog, totalProdutos, totalEquipe, totalCupons, recentPosts, recentProdutos };
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
