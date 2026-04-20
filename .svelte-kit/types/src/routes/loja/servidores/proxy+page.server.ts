// @ts-nocheck
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ url }: Parameters<PageServerLoad>[0]) => {
	const rawEditId = url.searchParams.get('edit');
	const editId = rawEditId && !isNaN(Number(rawEditId)) ? Number(rawEditId) : null;
	const [servidores, edit] = await Promise.all([
		prisma.servidor.findMany({
			orderBy: { nome: 'asc' },
			include: { _count: { select: { produtos: true } } }
		}),
		editId ? prisma.servidor.findUnique({ where: { id: editId } }) : null
	]);
	return { servidores, edit, showForm: url.searchParams.has('add') || !!editId };
};

export const actions = {
	create: async ({ request }: import('./$types').RequestEvent) => {
		const data = await request.formData();
		const nome = (data.get('nome') as string)?.trim();
		const ip = (data.get('ip') as string)?.trim();
		const porta = Number(data.get('porta')) || 25565;
		if (!nome || !ip) return fail(400, { error: 'Nome e IP são obrigatórios' });
		try {
			await prisma.servidor.create({ data: { nome, ip, porta } });
		} catch {
			return fail(409, { error: 'Já existe um servidor com esse nome' });
		}
		redirect(303, '/loja/servidores');
	},

	update: async ({ request }: import('./$types').RequestEvent) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const nome = (data.get('nome') as string)?.trim();
		const ip = (data.get('ip') as string)?.trim();
		const porta = Number(data.get('porta')) || 25565;
		if (!nome || !ip) return fail(400, { error: 'Nome e IP são obrigatórios' });
		try {
			await prisma.servidor.update({ where: { id }, data: { nome, ip, porta } });
		} catch {
			return fail(500, { error: 'Erro ao atualizar servidor' });
		}
		redirect(303, '/loja/servidores');
	},

	delete: async ({ request }: import('./$types').RequestEvent) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		try {
			await prisma.servidor.delete({ where: { id } });
		} catch {
			return fail(400, { error: 'Não é possível deletar: servidor possui produtos vinculados' });
		}
		redirect(303, '/loja/servidores');
	}
};
;null as any as Actions;