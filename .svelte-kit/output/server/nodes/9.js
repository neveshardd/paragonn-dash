import * as server from '../entries/pages/loja/cupons/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/loja/cupons/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/loja/cupons/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.BYSlJj2p.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
export const stylesheets = [];
export const fonts = [];
