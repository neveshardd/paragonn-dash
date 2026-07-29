import * as server from '../entries/pages/membros/_nick_/_page.server.ts.js';

export const index = 19;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/membros/_nick_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/membros/[nick]/+page.server.ts";
export const imports = ["_app/immutable/nodes/19.E8aRgoo7.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/C8Qz27k1.js","_app/immutable/chunks/S-KyrcF8.js","_app/immutable/chunks/DqBooIze.js"];
export const stylesheets = ["_app/immutable/assets/19.DeAUU-6f.css"];
export const fonts = [];
