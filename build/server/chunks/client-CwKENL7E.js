import { Y as index_server_exports } from './internal-BRv7QNSJ.js';
import { n as noop } from './dev-F8WnKEJC.js';

var is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
var placeholder_url = "a:";
if (is_legacy) {
	({
		data: {},
		form: null,
		error: null,
		params: {},
		route: { id: null },
		state: {},
		status: -1,
		url: new URL(placeholder_url)
	});
}
//#endregion
//#region node_modules/@sveltejs/kit/src/runtime/client/client.js
/** @import { RemoteQueryCacheEntry } from './remote-functions/query.svelte.js' */
var { onMount, tick } = index_server_exports;
//# sourceMappingURL=client-CwKENL7E.js.map
