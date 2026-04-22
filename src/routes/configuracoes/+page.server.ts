import { prisma } from '$lib/server/prisma';

export const load = async () => {
    const configs = await prisma.configuracao.findMany();
    const configMap = configs.reduce((acc, curr) => {
        acc[curr.chave] = curr.valor;
        return acc;
    }, {} as Record<string, string>);

    return { configs: configMap };
};
