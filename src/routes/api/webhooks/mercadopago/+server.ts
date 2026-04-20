import { json } from '@sveltejs/kit';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { prisma } from '$lib/server/prisma';

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
                        // Se o produto tiver um comando configurado, usamos ele. 
                        // Caso contrário, usamos um comando padrão de teste.
                        const cmd = item.cmd || `lp user %player% parent add vip_${item.id}`;

                        await prisma.entrega.create({
                            data: {
                                jogador: nick,
                                produto: `Produto #${item.id}`,
                                comando: cmd,
                                servidor: 'rankup',
                                status: 'PENDING'
                            }
                        });
                    }

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
