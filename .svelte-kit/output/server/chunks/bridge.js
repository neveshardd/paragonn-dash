//#region src/lib/server/bridge.ts
var BRIDGE_API_URL = process.env.BRIDGE_API_URL || "http://localhost:8090";
var BRIDGE_API_KEY = process.env.BRIDGE_API_KEY || "changeme";
var BridgeError = class extends Error {
	status;
	constructor(status, message) {
		super(message);
		this.status = status;
	}
};
async function request(path, init) {
	const res = await fetch(`${BRIDGE_API_URL}${path}`, {
		...init,
		headers: {
			Authorization: `Bearer ${BRIDGE_API_KEY}`,
			"Content-Type": "application/json",
			...init?.headers ?? {}
		}
	});
	if (!res.ok) {
		let message = `Bridge respondeu ${res.status}`;
		try {
			const body = await res.json();
			if (body?.error) message = body.error;
		} catch {}
		throw new BridgeError(res.status, message);
	}
	return res.json();
}
var bridge = {
	getOnlinePlayers: () => request("/api/players/online"),
	getPlayerProfile: (name) => request(`/api/players/${encodeURIComponent(name)}/profile`),
	getBalance: (name) => request(`/api/economy/${encodeURIComponent(name)}`),
	updateBalance: (name, op, amount) => request(`/api/economy/${encodeURIComponent(name)}`, {
		method: "POST",
		body: JSON.stringify({
			op,
			amount
		})
	}),
	getActivePunishments: (page = 0) => request(`/api/punishments/active?page=${page}`),
	getPunishmentsForPlayer: (name) => request(`/api/punishments/${encodeURIComponent(name)}`),
	ban: (name, reason, issuedBy, expiresAt) => request("/api/punishments/ban", {
		method: "POST",
		body: JSON.stringify({
			name,
			reason,
			issuedBy,
			expiresAt
		})
	}),
	unban: (name) => request("/api/punishments/unban", {
		method: "POST",
		body: JSON.stringify({ name })
	}),
	mute: (name, reason, issuedBy, expiresAt) => request("/api/punishments/mute", {
		method: "POST",
		body: JSON.stringify({
			name,
			reason,
			issuedBy,
			expiresAt
		})
	}),
	unmute: (name) => request("/api/punishments/unmute", {
		method: "POST",
		body: JSON.stringify({ name })
	}),
	warn: (name, reason, issuedBy) => request("/api/punishments/warn", {
		method: "POST",
		body: JSON.stringify({
			name,
			reason,
			issuedBy
		})
	}),
	getLogs: (page = 0, type) => request(`/api/logs?page=${page}${type ? `&type=${encodeURIComponent(type)}` : ""}`)
};
//#endregion
export { bridge as n, BridgeError as t };
