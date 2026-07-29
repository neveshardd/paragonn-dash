import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
	const servidor = await prisma.servidor.upsert({
		where: { nome: 'Servidor Principal' },
		update: {},
		create: {
			nome: 'Servidor Principal',
			ip: 'play.paragonn.com.br',
			porta: 25565
		}
	});

	const categoria = await prisma.categoria.upsert({
		where: { nome: 'VIPs' },
		update: {},
		create: { nome: 'VIPs' }
	});

	await prisma.produto.upsert({
		where: { id: 1 },
		update: {},
		create: {
			id: 1,
			nome: 'VIP Diamante',
			preco: 29.9,
			descricao: 'Cargo VIP com benefícios exclusivos no servidor.',
			categoriaId: categoria.id,
			servidorId: servidor.id,
			ativo: true,
			comando: 'lp user %player% parent add vip'
		}
	});

	await prisma.cupom.upsert({
		where: { codigo: 'BEMVINDO10' },
		update: {},
		create: {
			codigo: 'BEMVINDO10',
			desconto: 10,
			ativo: true
		}
	});

	await prisma.equipe.upsert({
		where: { nick: 'Admin' },
		update: {},
		create: {
			nick: 'Admin',
			cargo: 'Dono'
		}
	});

	await prisma.blogPost.upsert({
		where: { id: 1 },
		update: {},
		create: {
			id: 1,
			titulo: 'Bem-vindo ao Paragonn!',
			autor: 'Equipe Paragonn',
			descricao: 'Este é o primeiro post do blog. Edite ou apague pelo painel.',
			publicado: true
		}
	});

	await prisma.serverGoal.upsert({
		where: { id: 1 },
		update: {},
		create: {
			id: 1,
			target: 1000.0,
			current: 0.0
		}
	});

	await prisma.configuracao.upsert({
		where: { chave: 'discord_link' },
		update: {},
		create: { chave: 'discord_link', valor: 'https://discord.gg/paragonn' }
	});

	await prisma.configuracao.upsert({
		where: { chave: 'server_ip' },
		update: {},
		create: { chave: 'server_ip', valor: 'play.paragonn.com.br' }
	});

	console.log('Seed concluído: um registro de cada modelo foi criado (ou já existia).');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
