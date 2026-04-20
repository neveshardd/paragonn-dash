const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.DtaQVPl0.js",app:"_app/immutable/entry/app.BCwGM2tY.js",imports:["_app/immutable/entry/start.DtaQVPl0.js","_app/immutable/chunks/CawOmbr3.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/entry/app.BCwGM2tY.js","_app/immutable/chunks/y9KNdQp5.js","_app/immutable/chunks/Bm593DLv.js","_app/immutable/chunks/BMRk7WTg.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-Dg46n1Va.js')),
			__memo(() => import('./chunks/1-BbjTsYi5.js')),
			__memo(() => import('./chunks/2-CDk5Ia7e.js')),
			__memo(() => import('./chunks/3-BGvrGN86.js')),
			__memo(() => import('./chunks/4-BDHvATyX.js')),
			__memo(() => import('./chunks/5-C0xffRhH.js')),
			__memo(() => import('./chunks/6-g9Uut1fE.js')),
			__memo(() => import('./chunks/7--05_dU4z.js')),
			__memo(() => import('./chunks/8-BctCTXdD.js')),
			__memo(() => import('./chunks/9-DMjh5ypl.js')),
			__memo(() => import('./chunks/10-DfbRHOUp.js')),
			__memo(() => import('./chunks/11-1ZxGq343.js')),
			__memo(() => import('./chunks/12-C2bxC1Ok.js')),
			__memo(() => import('./chunks/13-DtzVRskr.js')),
			__memo(() => import('./chunks/14-BFvpk98t.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/blog",
				pattern: /^\/api\/blog\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-DmRyDBP0.js'))
			},
			{
				id: "/api/blog/[id]",
				pattern: /^\/api\/blog\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-C5vmjdUu.js'))
			},
			{
				id: "/api/categorias",
				pattern: /^\/api\/categorias\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-erpRusKs.js'))
			},
			{
				id: "/api/equipe",
				pattern: /^\/api\/equipe\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-Bdd7jmbm.js'))
			},
			{
				id: "/api/produtos",
				pattern: /^\/api\/produtos\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-3AMGS4kZ.js'))
			},
			{
				id: "/api/servidores",
				pattern: /^\/api\/servidores\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BfiRvw-2.js'))
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/blog/novo",
				pattern: /^\/blog\/novo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/blog/[id]/editar",
				pattern: /^\/blog\/([^/]+?)\/editar\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/equipe",
				pattern: /^\/equipe\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/loja",
				pattern: /^\/loja\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/loja/categorias",
				pattern: /^\/loja\/categorias\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/loja/cupons",
				pattern: /^\/loja\/cupons\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/loja/produtos",
				pattern: /^\/loja\/produtos\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/loja/produtos/novo",
				pattern: /^\/loja\/produtos\/novo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/loja/produtos/[id]/editar",
				pattern: /^\/loja\/produtos\/([^/]+?)\/editar\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/loja/servidores",
				pattern: /^\/loja\/servidores\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/membros",
				pattern: /^\/membros\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
