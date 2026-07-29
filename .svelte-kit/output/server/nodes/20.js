import * as server from '../entries/pages/punicoes/_page.server.ts.js';

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/punicoes/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/punicoes/+page.server.ts";
export const imports = ["_app/immutable/nodes/20.Bvbo2Ksw.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/S-KyrcF8.js"];
export const stylesheets = [];
export const fonts = [];
