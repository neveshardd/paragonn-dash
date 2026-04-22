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

<svelte:head><title>Configurações Globais — Paragonn Panel</title></svelte:head>

<div class="page-header">
    <div>
        <div class="page-title">Configurações Globais</div>
        <div class="page-sub">Gerencie os links e parâmetros gerais do ecossistema.</div>
    </div>
</div>

<div class="page-body">
    {#if message}
        <div class="alert {message.includes('Erro') ? 'alert-error' : 'alert-success'}">
            {message}
        </div>
    {/if}

    <div class="form-block">
        <div class="form-block-head">🎮 Social & Servidor</div>
        <div class="form-body">
            <div class="field">
                <label for="discord">Link do Discord</label>
                <div class="row">
                    <input 
                        id="discord"
                        type="text" 
                        bind:value={discordLink}
                        placeholder="https://discord.gg/..."
                    />
                    <button 
                        class="btn btn-primary"
                        on:click={() => saveConfig('discord_link', discordLink)}
                        disabled={saving}
                    >
                        {saving ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
                <p class="xs muted">Este link será atualizado automaticamente no Site e na Loja.</p>
            </div>

            <div style="height: 12px;"></div>

            <div class="field">
                <label for="server_ip">IP do Servidor</label>
                <div class="row">
                    <input 
                        id="server_ip"
                        type="text" 
                        bind:value={serverIP}
                        placeholder="play.paragonn.com.br"
                    />
                    <button 
                        class="btn btn-primary"
                        on:click={() => saveConfig('server_ip', serverIP)}
                        disabled={saving}
                    >
                        {saving ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
                <p class="xs muted">Este IP será atualizado no Site (Copiadores e Rodapé).</p>
            </div>
        </div>
    </div>
</div>
