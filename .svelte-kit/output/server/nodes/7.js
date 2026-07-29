import * as server from '../entries/pages/economia/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/economia/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/economia/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.BVYADlKj.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/S-KyrcF8.js"];
export const stylesheets = [];
export const fonts = [];
