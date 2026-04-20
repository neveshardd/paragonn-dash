// @ts-nocheck
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
	return { posts };
};

export const actions = {
	delete: async ({ request }: import('./$types').RequestEvent) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'ID inválido' });
		try {
			await prisma.blogPost.delete({ where: { id } });
			return { success: true };
		} catch {
			return fail(500, { error: 'Erro ao deletar postagem' });
		}
	},

	togglePublicado: async ({ request }: import('./$types').RequestEvent) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const publicado = data.get('publicado') === 'true';
		try {
			await prisma.blogPost.update({ where: { id }, data: { publicado: !publicado } });
			return { success: true };
		} catch {
			return fail(500, { error: 'Erro ao atualizar' });
		}
	}
};
;null as any as PageServerLoad;;null as any as Actions;