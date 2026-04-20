import * as server from '../entries/pages/blog/novo/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/novo/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/novo/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.DgvOX2BP.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/BMRk7WTg.js"];
export const stylesheets = [];
export const fonts = [];
