import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail, redirect, error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const post = await prisma.blogPost.findUnique({ where: { id: Number(params.id) } });
	if (!post) error(404, 'Postagem não encontrada');
	return { post };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const titulo = (data.get('titulo') as string)?.trim();
		const autor = (data.get('autor') as string)?.trim();
		const descricao = (data.get('descricao') as string)?.trim();
		const imagem = (data.get('imagem') as string)?.trim() || null;
		const publicado = data.get('publicado') === 'on';
		const raw = data.get('dataHorario') as string;
		const dataHorario = raw ? new Date(raw) : undefined;

		if (!titulo || !autor || !descricao) {
			return fail(400, { error: 'Título, autor e descrição são obrigatórios' });
		}

		try {
			await prisma.blogPost.update({
				where: { id: Number(params.id) },
				data: { titulo, autor, descricao, imagem, publicado, ...(dataHorario && { dataHorario }) }
			});
		} catch {
			return fail(500, { error: 'Erro ao atualizar postagem' });
		}

		redirect(303, '/blog');
	}
};
