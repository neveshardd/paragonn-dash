import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET = async () => {
	const equipe = await prisma.equipe.findMany({
		orderBy: { cargo: 'asc' }
	});
	return json(equipe, {
		headers: { 'Access-Control-Allow-Origin': '*' }
	});
};
