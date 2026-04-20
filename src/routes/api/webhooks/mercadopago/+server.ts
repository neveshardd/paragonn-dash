import { json } from '@sveltejs/kit';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { prisma } from '$lib/server/prisma';
import { redis } from '$lib/server/redis';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || 'APP_USR-1111111111111111-111111-11111111111111111111-111111111' 
});

export async function POST({ request }) {
    console.log('Mercado Pago Webhook received');
    
    try {
        const body = await request.json();
        const paymentId = body.data?.id || body.resource?.split('/').pop();

        if (body.type === 'payment' || body.action === 'payment.created' || body.action === 'payment.updated') {
            const payment = new Payment(client);
            const pData = await payment.get({ id: paymentId });

            if (pData.status === 'approved') {
                const nick = pData.metadata?.nick;
                const itemsStr = pData.metadata?.items;

                if (nick && itemsStr) {
                    const items = JSON.parse(itemsStr);
                    
                    console.log(`Pagamento aprovado para ${nick}. Gerando entregas...`);

                    // Cria as entregas no banco
                    for (const item of items) {
                        // Busca o produto no banco para pegar o comando correto
                        const dbProduct = await prisma.produto.findUnique({
                            where: { id: Number(item.id) }
                        });

                        const cmd = dbProduct?.comando || `lp user %player% parent add vip`;

                        await prisma.entrega.create({
                            data: {
                                jogador: nick,
                                produto: dbProduct?.nome || `Produto #${item.id}`,
                                comando: cmd,
                                servidor: dbProduct?.servidorId ? 'rankup' : 'global', // Precisaria mapear servidorId para nome
                                status: 'PENDING'
                            }
                        });
                    }

                    // Notifica todos os servidores via Redis para entrega instantânea
                    await redis.publish('paragonn:deliveries', JSON.stringify({
                        player: nick,
                        type: 'NEW_DELIVERY'
                    }));

                    // Registra o pagamento para as estatísticas do dash
                    await prisma.pagamento.create({
                        data: {
                            valor: pData.transaction_amount || 0,
                            status: 'PAID'
                        }
                    });
                }
            }
        }

        return json({ received: true });
    } catch (error) {
        console.error('Webhook Error:', error);
        return json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}
