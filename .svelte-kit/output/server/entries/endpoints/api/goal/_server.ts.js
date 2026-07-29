import { t as prisma } from "../../../../chunks/prisma.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/goal/+server.ts
async function GET() {
	try {
		const startOfMonth = /* @__PURE__ */ new Date();
		startOfMonth.setDate(1);
		startOfMonth.setHours(0, 0, 0, 0);
		const [goal, payments] = await Promise.all([prisma.serverGoal.findFirst(), prisma.pagamento.aggregate({
			where: {
				status: "PAID",
				createdAt: { gte: startOfMonth }
			},
			_sum: { valor: true }
		})]);
		const currentSum = payments._sum.valor || 0;
		let finalGoal = goal;
		if (!finalGoal) finalGoal = await prisma.serverGoal.create({ data: {
			id: 1,
			target: 1e3,
			current: currentSum
		} });
		else finalGoal.current = currentSum;
		return json(finalGoal, { headers: {
			"Access-Control-Allow-Origin": "*",
			"Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
		} });
	} catch (error) {
		console.error("Error fetching goal:", error);
		return json({ error: "Internal Server Error" }, {
			status: 500,
			headers: { "Access-Control-Allow-Origin": "*" }
		});
	}
}
async function POST({ request }) {
	try {
		const { target, current } = await request.json();
		return json(await prisma.serverGoal.upsert({
			where: { id: 1 },
			update: {
				target: parseFloat(target),
				current: parseFloat(current),
				lastUpdated: /* @__PURE__ */ new Date()
			},
			create: {
				id: 1,
				target: parseFloat(target),
				current: parseFloat(current)
			}
		}));
	} catch (error) {
		console.error("Error updating goal:", error);
		return json({ error: "Failed to update goal" }, { status: 500 });
	}
}
//#endregion
export { GET, POST };
