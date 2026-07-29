import { n as bridge, t as BridgeError } from "../../../../chunks/bridge.js";
import { error } from "@sveltejs/kit";
//#region src/lib/server/skin.ts
function decodeSkinUrl(textureValue) {
	if (!textureValue) return null;
	try {
		const decoded = Buffer.from(textureValue, "base64").toString("utf-8");
		return JSON.parse(decoded)?.textures?.SKIN?.url ?? null;
	} catch {
		return null;
	}
}
/** O mesmo JSON as vezes traz textures.SKIN.metadata.model = "slim" (braco fino,
*  estilo Alex) - sem isso, o braco por padrao e "default" (estilo Steve). Passamos
*  isso explicito pro skinview3d em vez de deixar ele adivinhar (auto-detect roda de
*  forma assincrona, depois que a gente ja monta a armadura, o que desalinhava a
*  manga do peitoral em skins slim). */
function decodeSkinModel(textureValue) {
	if (!textureValue) return "default";
	try {
		const decoded = Buffer.from(textureValue, "base64").toString("utf-8");
		return JSON.parse(decoded)?.textures?.SKIN?.metadata?.model === "slim" ? "slim" : "default";
	} catch {
		return "default";
	}
}
//#endregion
//#region src/routes/membros/[nick]/+page.server.ts
var load = async ({ params }) => {
	try {
		const profile = await bridge.getPlayerProfile(params.nick);
		return {
			profile,
			skinUrl: decodeSkinUrl(profile.skinTextureValue),
			skinModel: decodeSkinModel(profile.skinTextureValue)
		};
	} catch (err) {
		if (err instanceof BridgeError && err.status === 404) throw error(404, "Jogador não encontrado");
		throw error(503, "paragonn-bridge indisponível");
	}
};
//#endregion
export { load };
