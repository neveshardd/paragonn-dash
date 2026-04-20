import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET = async () => {
	const produtos = await prisma.produto.findMany({
		where: { ativo: true },
		orderBy: { createdAt: 'desc' },
		include: { categoria: true, servidor: true }
	});
	return json(produtos, {
		headers: { 'Access-Control-Allow-Origin': '*' }
	});
};
