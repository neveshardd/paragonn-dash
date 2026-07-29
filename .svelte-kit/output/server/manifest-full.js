export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","robots.txt","textures/armor/chainmail_layer_1.png","textures/armor/chainmail_layer_2.png","textures/armor/diamond_layer_1.png","textures/armor/diamond_layer_2.png","textures/armor/gold_layer_1.png","textures/armor/gold_layer_2.png","textures/armor/iron_layer_1.png","textures/armor/iron_layer_2.png","textures/armor/leather_layer_1.png","textures/armor/leather_layer_1_overlay.png","textures/armor/leather_layer_2.png","textures/armor/leather_layer_2_overlay.png","textures/hud/heart_empty.png","textures/hud/heart_full.png","textures/hud/heart_half.png","textures/hud/hunger_empty.png","textures/hud/hunger_full.png","textures/hud/hunger_half.png","textures/items/chainmail_boots.png","textures/items/chainmail_chestplate.png","textures/items/chainmail_helmet.png","textures/items/chainmail_leggings.png","textures/items/diamond_axe.png","textures/items/diamond_boots.png","textures/items/diamond_chestplate.png","textures/items/diamond_helmet.png","textures/items/diamond_hoe.png","textures/items/diamond_leggings.png","textures/items/diamond_pickaxe.png","textures/items/diamond_shovel.png","textures/items/diamond_sword.png","textures/items/gold_axe.png","textures/items/gold_boots.png","textures/items/gold_chestplate.png","textures/items/gold_helmet.png","textures/items/gold_hoe.png","textures/items/gold_leggings.png","textures/items/gold_pickaxe.png","textures/items/gold_shovel.png","textures/items/gold_sword.png","textures/items/iron_axe.png","textures/items/iron_boots.png","textures/items/iron_chestplate.png","textures/items/iron_helmet.png","textures/items/iron_hoe.png","textures/items/iron_leggings.png","textures/items/iron_pickaxe.png","textures/items/iron_shovel.png","textures/items/iron_sword.png","textures/items/leather_boots.png","textures/items/leather_boots_tinted.png","textures/items/leather_chestplate.png","textures/items/leather_chestplate_tinted.png","textures/items/leather_helmet.png","textures/items/leather_helmet_tinted.png","textures/items/leather_leggings.png","textures/items/leather_leggings_tinted.png","textures/items/stone_axe.png","textures/items/stone_hoe.png","textures/items/stone_pickaxe.png","textures/items/stone_shovel.png","textures/items/stone_sword.png","textures/items/wood_axe.png","textures/items/wood_hoe.png","textures/items/wood_pickaxe.png","textures/items/wood_shovel.png","textures/items/wood_sword.png"]),
	mimeTypes: {".txt":"text/plain",".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.BeWvuXvV.js",app:"_app/immutable/entry/app.BoQNED9H.js",imports:["_app/immutable/entry/start.BeWvuXvV.js","_app/immutable/chunks/d_kyigh2.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/entry/app.BoQNED9H.js","_app/immutable/chunks/Du8OfwhN.js","_app/immutable/chunks/C8Qz27k1.js","_app/immutable/chunks/S-KyrcF8.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js')),
			__memo(() => import('./nodes/19.js')),
			__memo(() => import('./nodes/20.js'))
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
				id: "/api/configuracoes",
				pattern: /^\/api\/configuracoes\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/configuracoes/_server.ts.js'))
			},
			{
				id: "/api/cupons/validar",
				pattern: /^\/api\/cupons\/validar\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/cupons/validar/_server.ts.js'))
			},
			{
				id: "/api/equipe",
				pattern: /^\/api\/equipe\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/equipe/_server.ts.js'))
			},
			{
				id: "/api/goal",
				pattern: /^\/api\/goal\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/goal/_server.ts.js'))
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
				id: "/api/uploads/blog",
				pattern: /^\/api\/uploads\/blog\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/uploads/blog/_server.ts.js'))
			},
			{
				id: "/api/uploads/produtos",
				pattern: /^\/api\/uploads\/produtos\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/uploads/produtos/_server.ts.js'))
			},
			{
				id: "/api/webhooks/mercadopago",
				pattern: /^\/api\/webhooks\/mercadopago\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/webhooks/mercadopago/_server.ts.js'))
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
				id: "/configuracoes",
				pattern: /^\/configuracoes\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/economia",
				pattern: /^\/economia\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/equipe",
				pattern: /^\/equipe\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/logs",
				pattern: /^\/logs\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/loja",
				pattern: /^\/loja\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/loja/categorias",
				pattern: /^\/loja\/categorias\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/loja/cupons",
				pattern: /^\/loja\/cupons\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/loja/meta",
				pattern: /^\/loja\/meta\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/loja/produtos",
				pattern: /^\/loja\/produtos\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/loja/produtos/novo",
				pattern: /^\/loja\/produtos\/novo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/loja/produtos/[id]/editar",
				pattern: /^\/loja\/produtos\/([^/]+?)\/editar\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/loja/servidores",
				pattern: /^\/loja\/servidores\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/membros",
				pattern: /^\/membros\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/membros/[nick]",
				pattern: /^\/membros\/([^/]+?)\/?$/,
				params: [{"name":"nick","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/punicoes",
				pattern: /^\/punicoes\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
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
