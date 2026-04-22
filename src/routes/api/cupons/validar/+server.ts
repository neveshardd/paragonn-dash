import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST = async ({ request }) => {
	try {
		const { codigo } = await request.json();
		
		if (!codigo) {
			return json({ error: 'Código do cupom é obrigatório' }, { 
				status: 400,
				headers: { 'Access-Control-Allow-Origin': '*' }
			});
		}

		const cupom = await prisma.cupom.findUnique({
			where: { codigo: codigo.trim().toUpperCase() }
		});

		if (!cupom) {
			return json({ error: 'Cupom não encontrado' }, { 
				status: 404,
				headers: { 'Access-Control-Allow-Origin': '*' }
			});
		}

		if (!cupom.ativo) {
			return json({ error: 'Este cupom não está mais ativo' }, { 
				status: 400,
				headers: { 'Access-Control-Allow-Origin': '*' }
			});
		}

		if (cupom.expira && new Date(cupom.expira) < new Date()) {
			return json({ error: 'Este cupom já expirou' }, { 
				status: 400,
				headers: { 'Access-Control-Allow-Origin': '*' }
			});
		}

		return json({
			codigo: cupom.codigo,
			desconto: cupom.desconto
		}, {
			headers: { 'Access-Control-Allow-Origin': '*' }
		});

	} catch (error) {
		console.error('Erro ao validar cupom:', error);
		return json({ error: 'Erro interno ao validar cupom' }, { 
			status: 500,
			headers: { 'Access-Control-Allow-Origin': '*' }
		});
	}
};

export const OPTIONS = async () => {
	return new Response(null, {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type'
		}
	});
};
