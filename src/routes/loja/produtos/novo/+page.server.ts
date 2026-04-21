import type { PageServerLoad, Actions } from './$types';
import { prisma } from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const [categorias, servidores] = await Promise.all([
		prisma.categoria.findMany({ orderBy: { nome: 'asc' } }),
		prisma.servidor.findMany({ orderBy: { nome: 'asc' } })
	]);
	return { categorias, servidores };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const nome = (data.get('nome') as string)?.trim();
		const preco = parseFloat(data.get('preco') as string);
		const descricao = (data.get('descricao') as string)?.trim() || null;
		const categoriaId = Number(data.get('categoriaId'));
		const servidorId = Number(data.get('servidorId'));
		const comando = (data.get('comando') as string)?.trim() || 'lp user %player% parent add vip';
		const imagem = (data.get('imagem') as string)?.trim() || null;
		const ativo = data.get('ativo') === 'on';

		if (!nome || isNaN(preco) || !categoriaId || !servidorId) {
			return fail(400, { error: 'Nome, preço, categoria e servidor são obrigatórios' });
		}

		try {
			await prisma.produto.create({ data: { nome, preco, descricao, imagem, categoriaId, servidorId, comando, ativo } });
		} catch (e) {
			console.error(e);
			return fail(500, { error: 'Erro ao criar produto' });
		}

		redirect(303, '/loja/produtos');
	}
};
