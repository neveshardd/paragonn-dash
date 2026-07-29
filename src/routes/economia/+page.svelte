<script lang="ts">
	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();

	let amount = $state(0);
</script>

<svelte:head><title>Economia — Paragonn Panel</title></svelte:head>

<div class="page-header">
	<div>
		<div class="page-title">Economia</div>
		<div class="page-sub">Consulte e ajuste o saldo (cash) de um jogador</div>
	</div>
</div>

<div class="page-body">
	<form method="GET" action="/economia" class="form-block">
		<div class="form-block-head">Buscar jogador</div>
		<div class="form-body">
			<div class="form-row">
				<div class="field" style="flex:2">
					<label for="jogador">Nome do jogador</label>
					<input id="jogador" name="jogador" type="text" placeholder="ex: neveshardd" value={data.jogador} required />
				</div>
				<div class="field" style="justify-content:flex-end; display:flex; align-items:flex-end;">
					<button type="submit" class="btn btn-primary">Buscar</button>
				</div>
			</div>
		</div>
	</form>

	{#if form?.error}
		<div class="alert alert-error" style="margin-top:16px">{form.error}</div>
	{/if}

	{#if data.jogador && data.bridgeOffline}
		<div class="alert alert-error" style="margin-top:16px">
			{data.notFound ? `Jogador "${data.jogador}" nunca entrou no servidor.` : 'paragonn-bridge indisponível ou paragonn-core não carregado.'}
		</div>
	{/if}

	{#if data.jogador && data.balance !== null}
		<div class="form-block" style="margin-top:16px">
			<div class="form-block-head">{data.jogador}</div>
			<div class="form-body">
				<div class="stat-card" style="max-width:220px; margin-bottom:16px">
					<div class="stat-label">Saldo atual</div>
					<div style="font-size:24px; font-weight:700">{data.balance.toLocaleString('pt-BR')}</div>
				</div>

				<form method="POST" action="?/update">
					<input type="hidden" name="jogador" value={data.jogador} />
					<div class="form-row">
						<div class="field" style="max-width:160px">
							<label for="amount">Quantia</label>
							<input id="amount" name="amount" type="number" min="0" bind:value={amount} required />
						</div>
						<div class="field" style="justify-content:flex-end; display:flex; align-items:flex-end; gap:8px;">
							<button type="submit" name="op" value="add" class="btn btn-primary">Adicionar</button>
							<button type="submit" name="op" value="remove" class="btn btn-danger">Remover</button>
							<button type="submit" name="op" value="set" class="btn">Definir</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	{/if}
</div>
