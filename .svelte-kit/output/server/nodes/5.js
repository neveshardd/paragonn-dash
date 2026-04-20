import * as server from '../entries/pages/blog/_id_/editar/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_id_/editar/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/[id]/editar/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.B3HXHBTH.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
export const stylesheets = [];
export const fonts = [];
