import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
	const editId = url.searchParams.get('edit') ? Number(url.searchParams.get('edit')) : null;
	const [membros, edit] = await Promise.all([
		prisma.equipe.findMany({ orderBy: { cargo: 'asc' } }),
		editId ? prisma.equipe.findUnique({ where: { id: editId } }) : null
	]);
	return { membros, edit, showForm: url.searchParams.has('add') || !!editId };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const nick = (data.get('nick') as string)?.trim();
		const cargo = (data.get('cargo') as string)?.trim();
		if (!nick || !cargo) return fail(400, { error: 'Nick e cargo são obrigatórios' });
		try {
			await prisma.equipe.create({ data: { nick, cargo } });
		} catch {
			return fail(409, { error: 'Já existe um membro com esse nick' });
		}
		redirect(303, '/equipe');
	},

	update: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const nick = (data.get('nick') as string)?.trim();
		const cargo = (data.get('cargo') as string)?.trim();
		if (!nick || !cargo) return fail(400, { error: 'Nick e cargo são obrigatórios' });
		try {
			await prisma.equipe.update({ where: { id }, data: { nick, cargo } });
		} catch {
			return fail(409, { error: 'Já existe um membro com esse nick' });
		}
		redirect(303, '/equipe');
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		try {
			await prisma.equipe.delete({ where: { id } });
		} catch {
			return fail(500, { error: 'Erro ao remover membro' });
		}
		redirect(303, '/equipe');
	}
};
