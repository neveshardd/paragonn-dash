import * as server from '../entries/pages/configuracoes/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/configuracoes/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/configuracoes/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.DJrLuJj5.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/S-KyrcF8.js"];
export const stylesheets = [];
export const fonts = [];
