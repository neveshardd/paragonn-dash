import * as server from '../entries/pages/logs/_page.server.ts.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/logs/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/logs/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.u0VDbSW-.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/S-KyrcF8.js"];
export const stylesheets = [];
export const fonts = [];
