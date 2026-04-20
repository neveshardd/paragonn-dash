import * as server from '../entries/pages/loja/produtos/novo/_page.server.ts.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/loja/produtos/novo/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/loja/produtos/novo/+page.server.ts";
export const imports = ["_app/immutable/nodes/11.CqkdmkZB.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
export const stylesheets = [];
export const fonts = [];
