import { t as building } from "../../../../../chunks/environment.js";
import { t as prisma } from "../../../../../chunks/prisma.js";
import { json } from "@sveltejs/kit";
import { MercadoPagoConfig, Payment } from "mercadopago";
import Redis from "ioredis";
//#region src/lib/server/redis.ts
function createRedis() {
	if (building) return null;
	const instance = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
		maxRetriesPerRequest: null,
		lazyConnect: true,
		retryStrategy: (times) => Math.min(times * 50, 2e3)
	});
	instance.on("error", (err) => {
		if (err.code !== "ECONNREFUSED") console.error("Redis Client Error", err);
	});
	return instance;
}
var redis = createRedis();
//#endregion
//#region src/routes/api/webhooks/mercadopago/+server.ts
var client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || "APP_USR-1111111111111111-111111-11111111111111111111-111111111" });
async function POST({ request }) {
	console.log("Mercado Pago Webhook received");
	try {
		const body = await request.json();
		const paymentId = body.data?.id || body.resource?.split("/").pop();
		if (body.type === "payment" || body.action === "payment.created" || body.action === "payment.updated") {
			const pData = await new Payment(client).get({ id: paymentId });
			if (pData.status === "approved") {
				const nick = pData.metadata?.nick;
				const itemsStr = pData.metadata?.items;
				if (nick && itemsStr) {
					const items = JSON.parse(itemsStr);
					console.log(`Pagamento aprovado para ${nick}. Gerando entregas...`);
					for (const item of items) {
						const dbProduct = await prisma.produto.findUnique({ where: { id: Number(item.id) } });
						const cmd = dbProduct?.comando || `lp user %player% parent add vip`;
						await prisma.entrega.create({ data: {
							jogador: nick,
							produto: dbProduct?.nome || `Produto #${item.id}`,
							comando: cmd,
							servidor: dbProduct?.servidorId ? "rankup" : "global",
							status: "PENDING"
						} });
					}
					await redis.publish("paragonn:deliveries", JSON.stringify({
						player: nick,
						type: "NEW_DELIVERY"
					}));
					await prisma.pagamento.create({ data: {
						valor: pData.transaction_amount || 0,
						status: "PAID"
					} });
				}
			}
		}
		return json({ received: true });
	} catch (error) {
		console.error("Webhook Error:", error);
		return json({ error: "Webhook processing failed" }, { status: 500 });
	}
}
//#endregion
export { POST };
