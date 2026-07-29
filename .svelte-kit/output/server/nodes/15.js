import * as server from '../entries/pages/loja/produtos/novo/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/loja/produtos/novo/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/loja/produtos/novo/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.xWb8qz3U.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/S-KyrcF8.js","_app/immutable/chunks/CxO-mjpw.js"];
export const stylesheets = ["_app/immutable/assets/ProdutoImagemField.Cfn_GBFQ.css"];
export const fonts = [];
