<script lang="ts">
    import { onMount } from 'svelte';
    
    let { data } = $props();
    
    let discordLink = $state(data.configs.discord_link || 'https://discord.gg/paragonn');
    let serverIP = $state(data.configs.server_ip || 'play.paragonn.com.br');
    let saving = $state(false);
    let message = $state('');

    async function saveAll() {
        saving = true;
        message = '';
        try {
            const res = await fetch('/api/configuracoes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify([
                    { chave: 'discord_link', valor: discordLink },
                    { chave: 'server_ip', valor: serverIP }
                ])
            });
            if (res.ok) {
                message = 'Configurações atualizadas com sucesso!';
            } else {
                message = 'Erro ao atualizar configurações.';
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
    <button 
        class="btn btn-primary"
        on:click={saveAll}
        disabled={saving}
    >
        {saving ? 'Salvando...' : 'Salvar Alterações'}
    </button>
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
                <input 
                    id="discord"
                    type="text" 
                    bind:value={discordLink}
                    placeholder="https://discord.gg/..."
                />
                <p class="xs muted">Este link será atualizado automaticamente no Site e na Loja.</p>
            </div>

            <div style="height: 12px;"></div>

            <div class="field">
                <label for="server_ip">IP do Servidor</label>
                <input 
                    id="server_ip"
                    type="text" 
                    bind:value={serverIP}
                    placeholder="play.paragonn.com.br"
                />
                <p class="xs muted">Este IP será atualizado no Site (Copiadores e Rodapé).</p>
            </div>
        </div>
    </div>

    <div style="margin-top: 24px; display: flex; justify-content: flex-end;">
        <button 
            class="btn btn-primary"
            style="padding: 12px 32px; font-weight: 700;"
            on:click={saveAll}
            disabled={saving}
        >
            {saving ? 'Salvando...' : 'Salvar Todas as Configurações'}
        </button>
    </div>
</div>
