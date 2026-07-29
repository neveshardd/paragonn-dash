import { bridge, BridgeError } from '$lib/server/bridge';

export const load = async () => {
	try {
		const players = await bridge.getOnlinePlayers();
		return { players, bridgeOffline: false };
	} catch (err) {
		if (err instanceof BridgeError) {
			return { players: [], bridgeOffline: true };
		}
		throw err;
	}
};
