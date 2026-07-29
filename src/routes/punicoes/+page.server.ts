import { fail } from '@sveltejs/kit';
import { bridge, BridgeError } from '$lib/server/bridge';

export const load = async ({ url }) => {
	const jogador = url.searchParams.get('jogador')?.trim() || '';

	try {
		const punishments = jogador
			? await bridge.getPunishmentsForPlayer(jogador)
			: await bridge.getActivePunishments();
		return { punishments, jogador, bridgeOffline: false };
	} catch (err) {
		if (err instanceof BridgeError) {
			return { punishments: [], jogador, bridgeOffline: true };
		}
		throw err;
	}
};

function requireFields(form: FormData, fields: string[]): string | null {
	for (const field of fields) {
		if (!String(form.get(field) ?? '').trim()) {
			return `Campo obrigatório: ${field}`;
		}
	}
	return null;
}

export const actions = {
	ban: async ({ request, locals }) => {
		const form = await request.formData();
		const error = requireFields(form, ['name', 'reason']);
		if (error) return fail(400, { error });

		const name = String(form.get('name'));
		const reason = String(form.get('reason'));
		const durationHours = Number(form.get('durationHours') ?? 0);
		const issuedBy = (locals as { staffName?: string })?.staffName ?? 'painel';

		try {
			if (durationHours > 0) {
				await bridge.ban(name, reason, issuedBy, Date.now() + durationHours * 3600_000);
			} else {
				await bridge.ban(name, reason, issuedBy);
			}
			return { success: true };
		} catch (err) {
			if (err instanceof BridgeError) return fail(422, { error: err.message });
			throw err;
		}
	},

	unban: async ({ request }) => {
		const form = await request.formData();
		const name = String(form.get('name') ?? '').trim();
		if (!name) return fail(400, { error: 'Campo obrigatório: name' });
		try {
			await bridge.unban(name);
			return { success: true };
		} catch (err) {
			if (err instanceof BridgeError) return fail(422, { error: err.message });
			throw err;
		}
	},

	mute: async ({ request, locals }) => {
		const form = await request.formData();
		const error = requireFields(form, ['name', 'reason']);
		if (error) return fail(400, { error });

		const name = String(form.get('name'));
		const reason = String(form.get('reason'));
		const durationHours = Number(form.get('durationHours') ?? 0);
		const issuedBy = (locals as { staffName?: string })?.staffName ?? 'painel';

		try {
			if (durationHours > 0) {
				await bridge.mute(name, reason, issuedBy, Date.now() + durationHours * 3600_000);
			} else {
				await bridge.mute(name, reason, issuedBy);
			}
			return { success: true };
		} catch (err) {
			if (err instanceof BridgeError) return fail(422, { error: err.message });
			throw err;
		}
	},

	unmute: async ({ request }) => {
		const form = await request.formData();
		const name = String(form.get('name') ?? '').trim();
		if (!name) return fail(400, { error: 'Campo obrigatório: name' });
		try {
			await bridge.unmute(name);
			return { success: true };
		} catch (err) {
			if (err instanceof BridgeError) return fail(422, { error: err.message });
			throw err;
		}
	},

	warn: async ({ request, locals }) => {
		const form = await request.formData();
		const error = requireFields(form, ['name', 'reason']);
		if (error) return fail(400, { error });

		const name = String(form.get('name'));
		const reason = String(form.get('reason'));
		const issuedBy = (locals as { staffName?: string })?.staffName ?? 'painel';

		try {
			await bridge.warn(name, reason, issuedBy);
			return { success: true };
		} catch (err) {
			if (err instanceof BridgeError) return fail(422, { error: err.message });
			throw err;
		}
	}
};
