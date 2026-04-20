import * as server from '../entries/pages/loja/categorias/_page.server.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/loja/categorias/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/loja/categorias/+page.server.ts";
export const imports = ["_app/immutable/nodes/8.Ncul1XtP.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
export const stylesheets = [];
export const fonts = [];
