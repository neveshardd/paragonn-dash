import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET = async ({ params }) => {
    try {
        const id = parseInt(params.id);
        
        if (isNaN(id)) {
            return json({ error: 'ID inválido' }, { status: 400 });
        }

        const post = await prisma.blogPost.findUnique({
            where: { id: id }
        });

        if (!post) {
            return json({ error: 'Post não encontrado' }, { status: 404 });
        }

        return json(post, {
            headers: { 'Access-Control-Allow-Origin': '*' }
        });
    } catch (error) {
        console.error('Erro na API de blog:', error);
        return json({ error: 'Erro interno' }, { status: 500 });
    }
};
