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

// POST /api/configuracoes - Atualiza uma configuração
export const POST = async ({ request }) => {
    try {
        const { chave, valor } = await request.json();

        if (!chave || valor === undefined) {
            return json({ error: 'Chave e valor são obrigatórios' }, { status: 400 });
        }

        const config = await prisma.configuracao.upsert({
            where: { chave },
            update: { valor },
            create: { chave, valor }
        });

        return json(config, {
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
