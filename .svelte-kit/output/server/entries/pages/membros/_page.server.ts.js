import { n as bridge, t as BridgeError } from "../../../chunks/bridge.js";
//#region src/routes/membros/+page.server.ts
var load = async () => {
	try {
		return {
			players: await bridge.getOnlinePlayers(),
			bridgeOffline: false
		};
	} catch (err) {
		if (err instanceof BridgeError) return {
			players: [],
			bridgeOffline: true
		};
		throw err;
	}
};
//#endregion
export { load };
