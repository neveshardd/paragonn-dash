import { error } from '@sveltejs/kit';
import { bridge, BridgeError } from '$lib/server/bridge';
import { decodeSkinUrl, decodeSkinModel } from '$lib/server/skin';

export const load = async ({ params }) => {
	try {
		const profile = await bridge.getPlayerProfile(params.nick);
		return {
			profile,
			skinUrl: decodeSkinUrl(profile.skinTextureValue),
			skinModel: decodeSkinModel(profile.skinTextureValue)
		};
	} catch (err) {
		if (err instanceof BridgeError && err.status === 404) {
			throw error(404, 'Jogador não encontrado');
		}
		throw error(503, 'paragonn-bridge indisponível');
	}
};
