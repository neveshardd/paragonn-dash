import { redirect } from "@sveltejs/kit";
//#region src/routes/loja/+page.server.ts
var load = async () => redirect(301, "/loja/produtos");
//#endregion
export { load };
