<script lang="ts">
    import { onMount } from 'svelte';

    let target = $state(1000);
    let current = $state(0);
    let loading = $state(true);
    let saving = $state(false);
    let success = $state(false);

    onMount(async () => {
        try {
            const res = await fetch('/api/goal');
            if (res.ok) {
                const data = await res.json();
                target = data.target;
                current = data.current;
            }
        } catch (err) {
            console.error(err);
        } finally {
            loading = false;
        }
    });

    async function handleSave() {
        saving = true;
        success = false;
        try {
            const res = await fetch('/api/goal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ target, current })
            });

            if (res.ok) {
                success = true;
                setTimeout(() => { success = false; }, 3000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            saving = false;
        }
    }
</script>

<div class="page-header">
	<div>
		<h1 class="page-title">Configurações da Loja</h1>
		<p class="page-sub">Gerencie a meta mensal do servidor.</p>
	</div>
</div>

<div class="page-body">
    {#if loading}
        <div class="empty">Carregando dados da meta...</div>
    {:else}
        <div class="form-block">
            <div class="form-block-head">
                <span>Editar Meta de Lançamento</span>
            </div>
            
            <div class="form-body">
                <div class="form-row">
                    <div class="field">
                        <label for="target">Valor Alvo (A ser atingido no mês)</label>
                        <input 
                            id="target"
                            type="number" 
                            bind:value={target}
                            placeholder="Ex: 1000"
                        />
                    </div>
                </div>
                
                <p style="font-size: 11px; color: var(--muted); margin-top: 4px;">
                    O valor acumulado é calculado automaticamente com base nas vendas reais e não pode ser editado.
                </p>

                {#if success}
                    <div class="alert alert-success" style="margin-top: 10px;">
                        Meta atualizada com sucesso!
                    </div>
                {/if}
            </div>

            <div class="form-foot">
                <button 
                    class="btn btn-primary" 
                    onclick={handleSave}
                    disabled={saving}
                >
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </div>
        </div>

        <div class="section" style="margin-top: 40px; max-width: 700px;">
            <div class="sec-head">
                <span class="sec-title">Status Atual (Visualização na Loja)</span>
            </div>
            <div style="background: var(--surface); padding: 24px; border: 1px solid var(--border); border-radius: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="font-weight: 700; font-size: 13px;">Arrecadado este mês</span>
                    <span style="font-weight: 700; font-size: 15px; color: var(--primary);">
                        {Math.min(Math.round((current / target) * 100), 100)}%
                    </span>
                </div>
                <div style="height: 10px; background: #e2e8f0; border-radius: 99px; overflow: hidden;">
                    <div 
                        style="height: 100%; background: var(--primary); transition: width 0.5s ease; width: {Math.min(Math.round((current / target) * 100), 100)}%"
                    ></div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 10px; font-size: 11px; color: var(--muted); font-weight: 600; text-transform: uppercase;">
                    <span>R$ {current.toFixed(2)} acumulados</span>
                    <span>Meta: R$ {target.toFixed(2)}</span>
                </div>
            </div>
        </div>
    {/if}
</div>
