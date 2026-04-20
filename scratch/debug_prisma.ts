import { prisma } from '../src/lib/server/prisma';

async function main() {
    try {
        console.log('Fetching servidores...');
        const servidores = await prisma.servidor.findMany({
            orderBy: { nome: 'asc' },
            include: { _count: { select: { produtos: true } } }
        });
        console.log('Success:', servidores.length, 'found');
    } catch (error) {
        console.error('FAILED TO FETCH SERVIDORES:');
        console.error(error);
    } finally {
        process.exit();
    }
}

main();
