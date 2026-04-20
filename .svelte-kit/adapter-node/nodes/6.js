import * as server from '../entries/pages/equipe/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/equipe/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/equipe/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.BItaHybu.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
export const stylesheets = [];
export const fonts = [];
