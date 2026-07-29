
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/blog" | "/api/blog/[id]" | "/api/categorias" | "/api/configuracoes" | "/api/cupons" | "/api/cupons/validar" | "/api/equipe" | "/api/goal" | "/api/produtos" | "/api/servidores" | "/api/uploads" | "/api/uploads/blog" | "/api/uploads/produtos" | "/api/webhooks" | "/api/webhooks/mercadopago" | "/blog" | "/blog/novo" | "/blog/[id]" | "/blog/[id]/editar" | "/configuracoes" | "/economia" | "/equipe" | "/logs" | "/loja" | "/loja/categorias" | "/loja/cupons" | "/loja/meta" | "/loja/produtos" | "/loja/produtos/novo" | "/loja/produtos/[id]" | "/loja/produtos/[id]/editar" | "/loja/servidores" | "/membros" | "/membros/[nick]" | "/punicoes";
		RouteParams(): {
			"/api/blog/[id]": { id: string };
			"/blog/[id]": { id: string };
			"/blog/[id]/editar": { id: string };
			"/loja/produtos/[id]": { id: string };
			"/loja/produtos/[id]/editar": { id: string };
			"/membros/[nick]": { nick: string }
		};
		LayoutParams(): {
			"/": { id?: string; nick?: string };
			"/api": { id?: string };
			"/api/blog": { id?: string };
			"/api/blog/[id]": { id: string };
			"/api/categorias": Record<string, never>;
			"/api/configuracoes": Record<string, never>;
			"/api/cupons": Record<string, never>;
			"/api/cupons/validar": Record<string, never>;
			"/api/equipe": Record<string, never>;
			"/api/goal": Record<string, never>;
			"/api/produtos": Record<string, never>;
			"/api/servidores": Record<string, never>;
			"/api/uploads": Record<string, never>;
			"/api/uploads/blog": Record<string, never>;
			"/api/uploads/produtos": Record<string, never>;
			"/api/webhooks": Record<string, never>;
			"/api/webhooks/mercadopago": Record<string, never>;
			"/blog": { id?: string };
			"/blog/novo": Record<string, never>;
			"/blog/[id]": { id: string };
			"/blog/[id]/editar": { id: string };
			"/configuracoes": Record<string, never>;
			"/economia": Record<string, never>;
			"/equipe": Record<string, never>;
			"/logs": Record<string, never>;
			"/loja": { id?: string };
			"/loja/categorias": Record<string, never>;
			"/loja/cupons": Record<string, never>;
			"/loja/meta": Record<string, never>;
			"/loja/produtos": { id?: string };
			"/loja/produtos/novo": Record<string, never>;
			"/loja/produtos/[id]": { id: string };
			"/loja/produtos/[id]/editar": { id: string };
			"/loja/servidores": Record<string, never>;
			"/membros": { nick?: string };
			"/membros/[nick]": { nick: string };
			"/punicoes": Record<string, never>
		};
		Pathname(): "/" | "/api/blog" | `/api/blog/${string}` & {} | "/api/categorias" | "/api/configuracoes" | "/api/cupons/validar" | "/api/equipe" | "/api/goal" | "/api/produtos" | "/api/servidores" | "/api/uploads/blog" | "/api/uploads/produtos" | "/api/webhooks/mercadopago" | "/blog" | "/blog/novo" | `/blog/${string}/editar` & {} | "/configuracoes" | "/economia" | "/equipe" | "/logs" | "/loja" | "/loja/categorias" | "/loja/cupons" | "/loja/meta" | "/loja/produtos" | "/loja/produtos/novo" | `/loja/produtos/${string}/editar` & {} | "/loja/servidores" | "/membros" | `/membros/${string}` & {} | "/punicoes";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.ico" | "/robots.txt" | "/textures/armor/chainmail_layer_1.png" | "/textures/armor/chainmail_layer_2.png" | "/textures/armor/diamond_layer_1.png" | "/textures/armor/diamond_layer_2.png" | "/textures/armor/gold_layer_1.png" | "/textures/armor/gold_layer_2.png" | "/textures/armor/iron_layer_1.png" | "/textures/armor/iron_layer_2.png" | "/textures/armor/leather_layer_1.png" | "/textures/armor/leather_layer_1_overlay.png" | "/textures/armor/leather_layer_2.png" | "/textures/armor/leather_layer_2_overlay.png" | "/textures/hud/heart_empty.png" | "/textures/hud/heart_full.png" | "/textures/hud/heart_half.png" | "/textures/hud/hunger_empty.png" | "/textures/hud/hunger_full.png" | "/textures/hud/hunger_half.png" | "/textures/items/chainmail_boots.png" | "/textures/items/chainmail_chestplate.png" | "/textures/items/chainmail_helmet.png" | "/textures/items/chainmail_leggings.png" | "/textures/items/diamond_axe.png" | "/textures/items/diamond_boots.png" | "/textures/items/diamond_chestplate.png" | "/textures/items/diamond_helmet.png" | "/textures/items/diamond_hoe.png" | "/textures/items/diamond_leggings.png" | "/textures/items/diamond_pickaxe.png" | "/textures/items/diamond_shovel.png" | "/textures/items/diamond_sword.png" | "/textures/items/gold_axe.png" | "/textures/items/gold_boots.png" | "/textures/items/gold_chestplate.png" | "/textures/items/gold_helmet.png" | "/textures/items/gold_hoe.png" | "/textures/items/gold_leggings.png" | "/textures/items/gold_pickaxe.png" | "/textures/items/gold_shovel.png" | "/textures/items/gold_sword.png" | "/textures/items/iron_axe.png" | "/textures/items/iron_boots.png" | "/textures/items/iron_chestplate.png" | "/textures/items/iron_helmet.png" | "/textures/items/iron_hoe.png" | "/textures/items/iron_leggings.png" | "/textures/items/iron_pickaxe.png" | "/textures/items/iron_shovel.png" | "/textures/items/iron_sword.png" | "/textures/items/leather_boots.png" | "/textures/items/leather_boots_tinted.png" | "/textures/items/leather_chestplate.png" | "/textures/items/leather_chestplate_tinted.png" | "/textures/items/leather_helmet.png" | "/textures/items/leather_helmet_tinted.png" | "/textures/items/leather_leggings.png" | "/textures/items/leather_leggings_tinted.png" | "/textures/items/stone_axe.png" | "/textures/items/stone_hoe.png" | "/textures/items/stone_pickaxe.png" | "/textures/items/stone_shovel.png" | "/textures/items/stone_sword.png" | "/textures/items/wood_axe.png" | "/textures/items/wood_hoe.png" | "/textures/items/wood_pickaxe.png" | "/textures/items/wood_shovel.png" | "/textures/items/wood_sword.png" | string & {};
	}
}