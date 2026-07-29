//#region node_modules/@sveltejs/kit/src/runtime/app/paths/internal/server.js
var base = "";
var assets = base;
var app_dir = "_app";
var initial = {
	base,
	assets
};
initial.base;
/**
* @param {{ base: string, assets: string }} paths
*/
function override(paths) {
	base = paths.base;
	assets = paths.assets;
}
function reset() {
	base = initial.base;
	assets = initial.assets;
}
/** @param {string} path */
function set_assets(path) {
	assets = initial.assets = path;
}
/**
* `$env/dynamic/public`
* @type {Record<string, string>}
*/
var public_env = {};
/** @param {any} error */
var fix_stack_trace = (error) => error?.stack;
/** @type {(environment: Record<string, string>) => void} */
function set_private_env(environment) {}
/** @type {(environment: Record<string, string>) => void} */
function set_public_env(environment) {
	public_env = environment;
}
//#endregion
export { app_dir as a, override as c, set_public_env as i, reset as l, public_env as n, assets as o, set_private_env as r, base as s, fix_stack_trace as t, set_assets as u };
