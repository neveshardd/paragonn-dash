import { n as bridge, t as BridgeError } from "../../../chunks/bridge.js";
import { fail } from "@sveltejs/kit";
//#region src/routes/economia/+page.server.ts
var load = async ({ url }) => {
	const jogador = url.searchParams.get("jogador")?.trim() || "";
	if (!jogador) return {
		jogador: "",
		balance: null,
		bridgeOffline: false
	};
	try {
		return {
			jogador,
			balance: (await bridge.getBalance(jogador)).balance,
			bridgeOffline: false
		};
	} catch (err) {
		if (err instanceof BridgeError) return {
			jogador,
			balance: null,
			bridgeOffline: true,
			notFound: err.status === 404
		};
		throw err;
	}
};
var actions = { update: async ({ request }) => {
	const form = await request.formData();
	const jogador = String(form.get("jogador") ?? "").trim();
	const op = String(form.get("op") ?? "");
	const amount = Number(form.get("amount"));
	if (!jogador || ![
		"set",
		"add",
		"remove"
	].includes(op) || !Number.isFinite(amount) || amount < 0) return fail(400, { error: "Dados inválidos." });
	try {
		await bridge.updateBalance(jogador, op, amount);
		return { success: true };
	} catch (err) {
		if (err instanceof BridgeError) return fail(422, { error: err.message });
		throw err;
	}
} };
//#endregion
export { actions, load };
