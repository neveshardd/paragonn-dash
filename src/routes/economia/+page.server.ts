import { fail } from '@sveltejs/kit';
import { bridge, BridgeError } from '$lib/server/bridge';

export const load = async ({ url }) => {
	const jogador = url.searchParams.get('jogador')?.trim() || '';
	if (!jogador) {
		return { jogador: '', balance: null, bridgeOffline: false };
	}

	try {
		const result = await bridge.getBalance(jogador);
		return { jogador, balance: result.balance, bridgeOffline: false };
	} catch (err) {
		if (err instanceof BridgeError) {
			return { jogador, balance: null, bridgeOffline: true, notFound: err.status === 404 };
		}
		throw err;
	}
};

export const actions = {
	update: async ({ request }) => {
		const form = await request.formData();
		const jogador = String(form.get('jogador') ?? '').trim();
		const op = String(form.get('op') ?? '') as 'set' | 'add' | 'remove';
		const amount = Number(form.get('amount'));

		if (!jogador || !['set', 'add', 'remove'].includes(op) || !Number.isFinite(amount) || amount < 0) {
			return fail(400, { error: 'Dados inválidos.' });
		}

		try {
			await bridge.updateBalance(jogador, op, amount);
			return { success: true };
		} catch (err) {
			if (err instanceof BridgeError) {
				return fail(422, { error: err.message });
			}
			throw err;
		}
	}
};
