// @ts-nocheck
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ url }: Parameters<PageServerLoad>[0]) => {
	const editId = url.searchParams.get('edit') ? Number(url.searchParams.get('edit')) : null;
	const [categorias, edit] = await Promise.all([
		prisma.categoria.findMany({
			orderBy: { nome: 'asc' },
			include: { _count: { select: { produtos: true } } }
		}),
		editId ? prisma.categoria.findUnique({ where: { id: editId } }) : null
	]);
	return { categorias, edit, showForm: url.searchParams.has('add') || !!editId };
};

export const actions = {
	create: async ({ request }: import('./$types').RequestEvent) => {
		const data = await request.formData();
		const nome = (data.get('nome') as string)?.trim();
		if (!nome) return fail(400, { error: 'Nome é obrigatório' });
		try {
			await prisma.categoria.create({ data: { nome } });
		} catch {
			return fail(409, { error: 'Já existe uma categoria com esse nome' });
		}
		redirect(303, '/loja/categorias');
	},

	update: async ({ request }: import('./$types').RequestEvent) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const nome = (data.get('nome') as string)?.trim();
		if (!nome) return fail(400, { error: 'Nome é obrigatório' });
		try {
			await prisma.categoria.update({ where: { id }, data: { nome } });
		} catch {
			return fail(409, { error: 'Já existe uma categoria com esse nome' });
		}
		redirect(303, '/loja/categorias');
	},

	delete: async ({ request }: import('./$types').RequestEvent) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		try {
			await prisma.categoria.delete({ where: { id } });
		} catch {
			return fail(400, { error: 'Não é possível deletar: categoria possui produtos vinculados' });
		}
		redirect(303, '/loja/categorias');
	}
};
;null as any as Actions;