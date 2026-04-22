<script lang="ts">
    import { onMount } from 'svelte';
    
    let { data } = $props();
    
    let discordLink = $state(data.configs.discord_link || 'https://discord.gg/paragonn');
    let serverIP = $state(data.configs.server_ip || 'play.paragonn.com.br');
    let saving = $state(false);
    let message = $state('');

    async function saveConfig(chave: string, valor: string) {
        saving = true;
        message = '';
        try {
            const res = await fetch('/api/configuracoes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chave, valor })
            });
            if (res.ok) {
                message = 'Configuração salva com sucesso!';
            } else {
                message = 'Erro ao salvar configuração.';
            }
        } catch (err) {
            message = 'Erro de conexão.';
        } finally {
            saving = false;
        }
    }
</script>

<div class="space-y-8">
    <div>
        <h1 class="text-3xl font-extrabold tracking-tight">Configurações Globais</h1>
        <p class="text-muted-foreground mt-2">Gerencie os links e parâmetros gerais de todo o ecossistema Paragonn.</p>
    </div>

    <div class="grid gap-6">
        <div class="bg-card border rounded-2xl p-6 shadow-sm">
            <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
                <span class="text-indigo-500">🎮</span> Social & Servidor
            </h3>
            
            <div class="space-y-6">
                <div class="space-y-2">
                    <label for="discord" class="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Link do Discord</label>
                    <div class="flex gap-3">
                        <input 
                            id="discord"
                            type="text" 
                            bind:value={discordLink}
                            placeholder="https://discord.gg/..."
                            class="flex-1 bg-muted/50 border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                        <button 
                            on:click={() => saveConfig('discord_link', discordLink)}
                            disabled={saving}
                            class="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                        >
                            {saving ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </div>

                <div class="space-y-2">
                    <label for="server_ip" class="text-sm font-semibold text-muted-foreground uppercase tracking-wider">IP do Servidor</label>
                    <div class="flex gap-3">
                        <input 
                            id="server_ip"
                            type="text" 
                            bind:value={serverIP}
                            placeholder="play.paragonn.com.br"
                            class="flex-1 bg-muted/50 border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        />
                        <button 
                            on:click={() => saveConfig('server_ip', serverIP)}
                            disabled={saving}
                            class="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                        >
                            {saving ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                    <p class="text-[11px] text-muted-foreground">Este IP será atualizado no Site (Copiadores e Rodapé).</p>
                </div>
            </div>
        </div>
    </div>

    {#if message}
        <div class="fixed bottom-8 right-8 bg-zinc-900 border border-zinc-800 text-white px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full bg-green-500"></div>
                <span class="text-sm font-medium">{message}</span>
            </div>
        </div>
    {/if}
</div>

<style>
    :global(.bg-card) {
        background-color: #111111 !important;
    }
</style>
