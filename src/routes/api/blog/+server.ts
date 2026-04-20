import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET = async () => {
	const posts = await prisma.blogPost.findMany({
		where: { publicado: true },
		orderBy: { dataHorario: 'desc' }
	});
	return json(posts, {
		headers: { 'Access-Control-Allow-Origin': '*' }
	});
};
