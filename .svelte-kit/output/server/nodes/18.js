import * as server from '../entries/pages/membros/_page.server.ts.js';

export const index = 18;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/membros/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/membros/+page.server.ts";
export const imports = ["_app/immutable/nodes/18.O4X21rHT.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/S-KyrcF8.js"];
export const stylesheets = [];
export const fonts = [];
