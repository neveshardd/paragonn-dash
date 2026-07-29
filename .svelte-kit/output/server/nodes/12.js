import * as server from '../entries/pages/loja/cupons/_page.server.ts.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/loja/cupons/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/loja/cupons/+page.server.ts";
export const imports = ["_app/immutable/nodes/12.DT8MgyBM.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/S-KyrcF8.js"];
export const stylesheets = [];
export const fonts = [];
