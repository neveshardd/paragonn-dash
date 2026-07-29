// Cliente para a API HTTP do paragonn-bridge (plugin do servidor 1.8.8).
// Expõe jogadores online, perfil (skin/arma/armadura), economia, punições e logs.

const BRIDGE_API_URL = process.env.BRIDGE_API_URL || 'http://localhost:8090';
const BRIDGE_API_KEY = process.env.BRIDGE_API_KEY || 'changeme';

export class BridgeError extends Error {
	status: number;
	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const res = await fetch(`${BRIDGE_API_URL}${path}`, {
		...init,
		headers: {
			Authorization: `Bearer ${BRIDGE_API_KEY}`,
			'Content-Type': 'application/json',
			...(init?.headers ?? {})
		}
	});

	if (!res.ok) {
		let message = `Bridge respondeu ${res.status}`;
		try {
			const body = await res.json();
			if (body?.error) message = body.error;
		} catch {
			// resposta sem corpo JSON, mantém mensagem padrão
		}
		throw new BridgeError(res.status, message);
	}

	return res.json() as Promise<T>;
}

export interface OnlinePlayerRef {
	uuid: string;
	name: string;
}

export interface EquipmentPiece {
	material: string;
	durability: number;
	displayName: string | null;
	enchantments: Record<string, number>;
}

export interface ArmorSet {
	helmet: EquipmentPiece | null;
	chestplate: EquipmentPiece | null;
	leggings: EquipmentPiece | null;
	boots: EquipmentPiece | null;
}

export interface PlayerVitals {
	health: number;
	maxHealth: number;
	foodLevel: number;
	saturation: number;
	xpLevel: number;
	xpProgress: number;
}

export interface PlayerProfile {
	uuid: string;
	name: string;
	online: boolean;
	skinTextureValue: string | null;
	skinTextureSignature: string | null;
	heldWeapon: EquipmentPiece | null;
	armor: ArmorSet;
	vitals: PlayerVitals;
	lastSeen: number;
}

export type PunishmentType = 'BAN' | 'TEMP_BAN' | 'MUTE' | 'TEMP_MUTE' | 'WARN';

export interface Punishment {
	type: PunishmentType;
	targetName: string;
	reason: string | null;
	issuedBy: string | null;
	issuedAt: number;
	expiresAt: number | null;
}

export interface ServerLogEntry {
	type: string;
	actor: string;
	message: string;
	timestamp: number;
}

export const bridge = {
	getOnlinePlayers: () => request<OnlinePlayerRef[]>('/api/players/online'),

	getPlayerProfile: (name: string) => request<PlayerProfile>(`/api/players/${encodeURIComponent(name)}/profile`),

	getBalance: (name: string) => request<{ name: string; balance: number }>(`/api/economy/${encodeURIComponent(name)}`),

	updateBalance: (name: string, op: 'set' | 'add' | 'remove', amount: number) =>
		request<{ name: string; balance: number }>(`/api/economy/${encodeURIComponent(name)}`, {
			method: 'POST',
			body: JSON.stringify({ op, amount })
		}),

	getActivePunishments: (page = 0) => request<Punishment[]>(`/api/punishments/active?page=${page}`),

	getPunishmentsForPlayer: (name: string) => request<Punishment[]>(`/api/punishments/${encodeURIComponent(name)}`),

	ban: (name: string, reason: string, issuedBy: string, expiresAt?: number) =>
		request<Punishment[]>('/api/punishments/ban', {
			method: 'POST',
			body: JSON.stringify({ name, reason, issuedBy, expiresAt })
		}),

	unban: (name: string) =>
		request<Punishment[]>('/api/punishments/unban', { method: 'POST', body: JSON.stringify({ name }) }),

	mute: (name: string, reason: string, issuedBy: string, expiresAt?: number) =>
		request<Punishment[]>('/api/punishments/mute', {
			method: 'POST',
			body: JSON.stringify({ name, reason, issuedBy, expiresAt })
		}),

	unmute: (name: string) =>
		request<Punishment[]>('/api/punishments/unmute', { method: 'POST', body: JSON.stringify({ name }) }),

	warn: (name: string, reason: string, issuedBy: string) =>
		request<Punishment[]>('/api/punishments/warn', {
			method: 'POST',
			body: JSON.stringify({ name, reason, issuedBy })
		}),

	getLogs: (page = 0, type?: string) =>
		request<ServerLogEntry[]>(`/api/logs?page=${page}${type ? `&type=${encodeURIComponent(type)}` : ''}`)
};
