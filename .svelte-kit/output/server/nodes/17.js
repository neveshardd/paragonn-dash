import * as server from '../entries/pages/loja/servidores/_page.server.ts.js';

export const index = 17;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/loja/servidores/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/loja/servidores/+page.server.ts";
export const imports = ["_app/immutable/nodes/17.CxfLE7S1.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/S-KyrcF8.js"];
export const stylesheets = [];
export const fonts = [];
