// @ts-nocheck
import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail, redirect, error } from '@sveltejs/kit';

export const load = async ({ params }: Parameters<PageServerLoad>[0]) => {
	const [produto, categorias, servidores] = await Promise.all([
		prisma.produto.findUnique({ where: { id: Number(params.id) } }),
		prisma.categoria.findMany({ orderBy: { nome: 'asc' } }),
		prisma.servidor.findMany({ orderBy: { nome: 'asc' } })
	]);
	if (!produto) error(404, 'Produto não encontrado');
	return { produto, categorias, servidores };
};

export const actions = {
	default: async ({ request, params }: import('./$types').RequestEvent) => {
		const data = await request.formData();
		const nome = (data.get('nome') as string)?.trim();
		const preco = parseFloat(data.get('preco') as string);
		const descricao = (data.get('descricao') as string)?.trim() || null;
		const categoriaId = Number(data.get('categoriaId'));
		const servidorId = Number(data.get('servidorId'));
		const comando = (data.get('comando') as string)?.trim() || 'lp user %player% parent add vip';
		const ativo = data.get('ativo') === 'on';

		if (!nome || isNaN(preco) || !categoriaId || !servidorId) {
			return fail(400, { error: 'Nome, preço, categoria e servidor são obrigatórios' });
		}

		try {
			await prisma.produto.update({
				where: { id: Number(params.id) },
				data: { nome, preco, descricao, categoriaId, servidorId, comando, ativo }
			});
		} catch (e) {
			console.error(e);
			return fail(500, { error: 'Erro ao atualizar produto' });
		}

		redirect(303, '/loja/produtos');
	}
};
;null as any as Actions;