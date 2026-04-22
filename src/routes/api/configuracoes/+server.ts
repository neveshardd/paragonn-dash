import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

// GET /api/configuracoes - Retorna todas as configurações
export const GET = async () => {
    try {
        const configs = await prisma.configuracao.findMany();
        const configMap = configs.reduce((acc, curr) => {
            acc[curr.chave] = curr.valor;
            return acc;
        }, {} as Record<string, string>);
        
        return json(configMap, {
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    } catch (error) {
        console.error('Erro ao buscar configurações:', error);
        return json({ error: 'Erro interno' }, { status: 500 });
    }
};

// POST /api/configuracoes - Atualiza uma ou várias configurações
export const POST = async ({ request }) => {
    try {
        const body = await request.json();
        const configsToUpdate = Array.isArray(body) ? body : [body];

        if (configsToUpdate.length === 0) {
            return json({ error: 'Nenhuma configuração fornecida' }, { status: 400 });
        }

        const results = await Promise.all(
            configsToUpdate.map(async (item) => {
                const { chave, valor } = item;
                if (!chave || valor === undefined) return null;
                
                return prisma.configuracao.upsert({
                    where: { chave },
                    update: { valor: String(valor) },
                    create: { chave, valor: String(valor) }
                });
            })
        );

        const filteredResults = results.filter(r => r !== null);

        return json(filteredResults, {
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    } catch (error) {
        console.error('Erro ao atualizar configuração:', error);
        return json({ error: 'Erro interno' }, { status: 500 });
    }
};

export const OPTIONS = async () => {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
};
