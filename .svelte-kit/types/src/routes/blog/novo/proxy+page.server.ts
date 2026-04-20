// @ts-nocheck
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const load = async () => ({ });

export const actions = {
	default: async ({ request }: import('./$types').RequestEvent) => {
		const data = await request.formData();
		const titulo = (data.get('titulo') as string)?.trim();
		const autor = (data.get('autor') as string)?.trim();
		const descricao = (data.get('descricao') as string)?.trim();
		const imagem = (data.get('imagem') as string)?.trim() || null;
		const publicado = data.get('publicado') === 'on';
		const raw = data.get('dataHorario') as string;
		const dataHorario = raw ? new Date(raw) : new Date();

		if (!titulo || !autor || !descricao) {
			return fail(400, { error: 'Título, autor e descrição são obrigatórios', titulo, autor, descricao, imagem });
		}

		try {
			await prisma.blogPost.create({ data: { titulo, autor, descricao, imagem, publicado, dataHorario } });
		} catch {
			return fail(500, { error: 'Erro ao criar postagem' });
		}

		redirect(303, '/blog');
	}
};
;null as any as PageServerLoad;;null as any as Actions;