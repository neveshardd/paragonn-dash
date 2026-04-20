import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export async function GET() {
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const [goal, payments] = await Promise.all([
            prisma.serverGoal.findFirst(),
            prisma.pagamento.aggregate({
                where: {
                    status: 'PAID',
                    createdAt: { gte: startOfMonth }
                },
                _sum: { valor: true }
            })
        ]);
        
        const currentSum = payments._sum.valor || 0;
        
        let finalGoal = goal;
        if (!finalGoal) {
            finalGoal = await prisma.serverGoal.create({
                data: { id: 1, target: 1000, current: currentSum }
            });
        } else {
            // Update the 'current' field in the goal record to stay synced
            finalGoal.current = currentSum;
        }

        return json(finalGoal, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
            }
        });
    } catch (error) {
        console.error('Error fetching goal:', error);
        return json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST({ request }) {
    try {
        const { target, current } = await request.json();

        const goal = await prisma.serverGoal.upsert({
            where: { id: 1 },
            update: {
                target: parseFloat(target),
                current: parseFloat(current),
                lastUpdated: new Date()
            },
            create: {
                id: 1,
                target: parseFloat(target),
                current: parseFloat(current)
            }
        });

        return json(goal);
    } catch (error) {
        console.error('Error updating goal:', error);
        return json({ error: 'Failed to update goal' }, { status: 500 });
    }
}
