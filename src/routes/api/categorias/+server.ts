import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET = async () => {
	const categorias = await prisma.categoria.findMany({
		orderBy: { nome: 'asc' }
	});
	return json(categorias, {
		headers: { 
			'Access-Control-Allow-Origin': '*',
			'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
		}
	});
};
