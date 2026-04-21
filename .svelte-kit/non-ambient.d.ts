
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
		RouteId(): "/" | "/api" | "/api/blog" | "/api/blog/[id]" | "/api/categorias" | "/api/equipe" | "/api/goal" | "/api/produtos" | "/api/servidores" | "/api/uploads" | "/api/uploads/blog" | "/api/uploads/produtos" | "/api/webhooks" | "/api/webhooks/mercadopago" | "/blog" | "/blog/novo" | "/blog/[id]" | "/blog/[id]/editar" | "/equipe" | "/loja" | "/loja/categorias" | "/loja/cupons" | "/loja/meta" | "/loja/produtos" | "/loja/produtos/novo" | "/loja/produtos/[id]" | "/loja/produtos/[id]/editar" | "/loja/servidores" | "/membros";
		RouteParams(): {
			"/api/blog/[id]": { id: string };
			"/blog/[id]": { id: string };
			"/blog/[id]/editar": { id: string };
			"/loja/produtos/[id]": { id: string };
			"/loja/produtos/[id]/editar": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/api": { id?: string };
			"/api/blog": { id?: string };
			"/api/blog/[id]": { id: string };
			"/api/categorias": Record<string, never>;
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
			"/equipe": Record<string, never>;
			"/loja": { id?: string };
			"/loja/categorias": Record<string, never>;
			"/loja/cupons": Record<string, never>;
			"/loja/meta": Record<string, never>;
			"/loja/produtos": { id?: string };
			"/loja/produtos/novo": Record<string, never>;
			"/loja/produtos/[id]": { id: string };
			"/loja/produtos/[id]/editar": { id: string };
			"/loja/servidores": Record<string, never>;
			"/membros": Record<string, never>
		};
		Pathname(): "/" | "/api/blog" | `/api/blog/${string}` & {} | "/api/categorias" | "/api/equipe" | "/api/goal" | "/api/produtos" | "/api/servidores" | "/api/uploads/blog" | "/api/uploads/produtos" | "/api/webhooks/mercadopago" | "/blog" | "/blog/novo" | `/blog/${string}/editar` & {} | "/equipe" | "/loja" | "/loja/categorias" | "/loja/cupons" | "/loja/meta" | "/loja/produtos" | "/loja/produtos/novo" | `/loja/produtos/${string}/editar` & {} | "/loja/servidores" | "/membros";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.ico" | "/robots.txt" | string & {};
	}
}