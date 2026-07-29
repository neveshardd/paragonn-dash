import * as server from '../entries/pages/blog/_id_/editar/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_id_/editar/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/[id]/editar/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.Dl-WuNwZ.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/S-KyrcF8.js","_app/immutable/chunks/c1rTvYQ8.js"];
export const stylesheets = ["_app/immutable/assets/BlogImagemField.Cepz0Yri.css"];
export const fonts = [];
