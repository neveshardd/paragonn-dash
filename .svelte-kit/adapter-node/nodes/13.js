import * as server from '../entries/pages/loja/servidores/_page.server.ts.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/loja/servidores/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/loja/servidores/+page.server.ts";
export const imports = ["_app/immutable/nodes/13.C94p7Zf5.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
export const stylesheets = [];
export const fonts = [];
