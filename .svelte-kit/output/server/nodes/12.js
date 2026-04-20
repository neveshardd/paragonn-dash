import * as server from '../entries/pages/loja/produtos/_id_/editar/_page.server.ts.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/loja/produtos/_id_/editar/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/loja/produtos/[id]/editar/+page.server.ts";
export const imports = ["_app/immutable/nodes/12.C09neMlb.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
export const stylesheets = [];
export const fonts = [];
