import * as server from '../entries/pages/loja/categorias/_page.server.ts.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/loja/categorias/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/loja/categorias/+page.server.ts";
export const imports = ["_app/immutable/nodes/11.CNQxAHw2.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/S-KyrcF8.js"];
export const stylesheets = [];
export const fonts = [];
