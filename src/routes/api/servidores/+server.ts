import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET = async () => {
    try {
        const servidores = await prisma.servidor.findMany({
            orderBy: { nome: 'asc' }
        });
        return json(servidores, {
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    } catch (error) {
        console.error('Erro ao buscar servidores:', error);
        return json({ error: 'Erro interno' }, { status: 500 });
    }
};
