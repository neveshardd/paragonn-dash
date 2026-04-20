import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const [produtos, categorias, servidores] = await Promise.all([
		prisma.produto.findMany({
			orderBy: { createdAt: 'desc' },
			include: { categoria: true, servidor: true }
		}),
		prisma.categoria.findMany({ orderBy: { nome: 'asc' } }),
		prisma.servidor.findMany({ orderBy: { nome: 'asc' } })
	]);
	return { produtos, categorias, servidores };
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		if (!id) return fail(400, { error: 'ID inválido' });
		try {
			await prisma.produto.delete({ where: { id } });
			return { success: true };
		} catch {
			return fail(500, { error: 'Erro ao deletar produto' });
		}
	},

	toggleAtivo: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));
		const ativo = data.get('ativo') === 'true';
		try {
			await prisma.produto.update({ where: { id }, data: { ativo: !ativo } });
			return { success: true };
		} catch {
			return fail(500, { error: 'Erro ao atualizar produto' });
		}
	}
};
