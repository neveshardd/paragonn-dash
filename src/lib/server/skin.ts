// A propriedade "textures" do GameProfile vem em base64 de um JSON no formato:
// { "textures": { "SKIN": { "url": "http://textures.minecraft.net/texture/<hash>" } } }
// Isso é o valor cru devolvido pelo próprio protocolo do Minecraft (não é um dado
// que inventamos) - aqui só decodificamos pra extrair a URL da textura.
export function decodeSkinUrl(textureValue: string | null | undefined): string | null {
	if (!textureValue) return null;
	try {
		const decoded = Buffer.from(textureValue, 'base64').toString('utf-8');
		const parsed = JSON.parse(decoded);
		return parsed?.textures?.SKIN?.url ?? null;
	} catch {
		return null;
	}
}

/** O mesmo JSON as vezes traz textures.SKIN.metadata.model = "slim" (braco fino,
 *  estilo Alex) - sem isso, o braco por padrao e "default" (estilo Steve). Passamos
 *  isso explicito pro skinview3d em vez de deixar ele adivinhar (auto-detect roda de
 *  forma assincrona, depois que a gente ja monta a armadura, o que desalinhava a
 *  manga do peitoral em skins slim). */
export function decodeSkinModel(textureValue: string | null | undefined): 'slim' | 'default' {
	if (!textureValue) return 'default';
	try {
		const decoded = Buffer.from(textureValue, 'base64').toString('utf-8');
		const parsed = JSON.parse(decoded);
		return parsed?.textures?.SKIN?.metadata?.model === 'slim' ? 'slim' : 'default';
	} catch {
		return 'default';
	}
}
