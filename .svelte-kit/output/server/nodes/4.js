import * as server from '../entries/pages/blog/novo/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/novo/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/novo/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.C6AtNuiU.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/S-KyrcF8.js","_app/immutable/chunks/c1rTvYQ8.js"];
export const stylesheets = ["_app/immutable/assets/BlogImagemField.Cepz0Yri.css"];
export const fonts = [];
