import * as server from '../entries/pages/equipe/_page.server.ts.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/equipe/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/equipe/+page.server.ts";
export const imports = ["_app/immutable/nodes/8.Chj3KP3I.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/S-KyrcF8.js"];
export const stylesheets = [];
export const fonts = [];
