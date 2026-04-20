export const manifest = (() => {
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
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js'))
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
				endpoint: __memo(() => import('./entries/endpoints/api/blog/_server.ts.js'))
			},
			{
				id: "/api/blog/[id]",
				pattern: /^\/api\/blog\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/blog/_id_/_server.ts.js'))
			},
			{
				id: "/api/categorias",
				pattern: /^\/api\/categorias\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/categorias/_server.ts.js'))
			},
			{
				id: "/api/equipe",
				pattern: /^\/api\/equipe\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/equipe/_server.ts.js'))
			},
			{
				id: "/api/produtos",
				pattern: /^\/api\/produtos\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/produtos/_server.ts.js'))
			},
			{
				id: "/api/servidores",
				pattern: /^\/api\/servidores\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/servidores/_server.ts.js'))
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
