import * as server from '../entries/pages/loja/produtos/_page.server.ts.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/loja/produtos/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/loja/produtos/+page.server.ts";
export const imports = ["_app/immutable/nodes/14.Co2vuLm8.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/S-KyrcF8.js"];
export const stylesheets = ["_app/immutable/assets/14.mjddJ7kA.css"];
export const fonts = [];
