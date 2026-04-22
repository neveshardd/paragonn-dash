<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	import logo from '$lib/assets/logo.png';

	let { children } = $props();
	let sidebarOpen = $state(false);

	function active(path: string) {
		if (path === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(path);
	}

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}
</script>

<div class="layout" class:sidebar-open={sidebarOpen}>
	<div 
		class="sidebar-overlay" 
		role="button" 
		tabindex="0" 
		onclick={() => sidebarOpen = false} 
		onkeydown={(e) => e.key === 'Enter' && (sidebarOpen = false)}
		aria-label="Fechar menu"
	></div>

	<aside class="sidebar">
		<div class="brand">
			<img src={logo} alt="Paragonn" style="height: 36px; width: auto; display: block;" />
		</div>

		<div class="nav-section">
			<div class="nav-label">Geral</div>
			<a href="/" class="nav-link" class:active={active('/')}>
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
					<rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
				</svg>
				Visão Geral
			</a>
		</div>

		<div class="nav-section">
			<div class="nav-label">Blog</div>
			<a href="/blog" class="nav-link" class:active={active('/blog')}>
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
					<polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
				</svg>
				Postagens
			</a>
		</div>

		<div class="nav-section">
			<div class="nav-label">Loja</div>
			<a href="/loja/produtos" class="nav-link" class:active={active('/loja/produtos')}>
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
					<line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
				</svg>
				Produtos
			</a>
			<a href="/loja/categorias" class="nav-link" class:active={active('/loja/categorias')}>
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
					<line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
				</svg>
				Categorias
			</a>
			<a href="/loja/cupons" class="nav-link" class:active={active('/loja/cupons')}>
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
					<line x1="7" y1="7" x2="7.01" y2="7" />
				</svg>
				Cupons
			</a>
			<a href="/loja/servidores" class="nav-link" class:active={active('/loja/servidores')}>
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
					<line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
				</svg>
				Servidores
			</a>
			<a href="/loja/meta" class="nav-link" class:active={active('/loja/meta')}>
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
				</svg>
				Meta Mensal
			</a>
		</div>

		<div class="nav-section">
			<div class="nav-label">Comunidade</div>
			<a href="/equipe" class="nav-link" class:active={active('/equipe')}>
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
					<circle cx="9" cy="7" r="4" />
					<path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
				</svg>
				Equipe
			</a>
			<a href="/membros" class="nav-link" class:active={active('/membros')}>
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="3" />
					<path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
				</svg>
				Membros
			</a>
		</div>

		<div class="nav-section">
			<div class="nav-label">Sistema</div>
			<a href="/configuracoes" class="nav-link" class:active={active('/configuracoes')}>
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
				</svg>
				Configurações
			</a>
		</div>
	</aside>

	<main class="main">
		<div class="page-header">
			<div style="display: flex; align-items: center;">
				<button class="menu-toggle" onclick={toggleSidebar} aria-label="Alternar menu">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
					</svg>
				</button>
				<div>
					<h1 class="page-title">
						{#if active('/loja')}
							Loja
						{:else if active('/blog')}
							Blog
						{:else if active('/equipe')}
							Equipe
						{:else if active('/membros')}
							Membros
						{:else if active('/configuracoes')}
							Configurações
						{:else}
							Visão Geral
						{/if}
					</h1>
				</div>
			</div>
		</div>

		<div class="page-body">
			{@render children()}
		</div>
	</main>
</div>
