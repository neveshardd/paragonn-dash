import * as server from '../entries/pages/blog/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.DTqMhDBr.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/S-KyrcF8.js"];
export const stylesheets = ["_app/immutable/assets/3.I_I0S6YE.css"];
export const fonts = [];
