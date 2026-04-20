<script lang="ts">
	import type { PageData, ActionData } from './$types';
	let { data, form }: { data: PageData; form: ActionData } = $props();

	const fmtDate = (d: Date | string | null) =>
		d ? new Date(d).toLocaleDateString('pt-BR') : '—';

	const expiraLocal = (d: Date | string | null) => {
		if (!d) return '';
		const dt = new Date(d);
		dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
		return dt.toISOString().slice(0, 10);
	};
</script>

<svelte:head><title>Cupons — Paragonn Panel</title></svelte:head>

<div class="page-header">
	<div>
		<div class="page-title">Cupons</div>
		<div class="page-sub">{data.cupons.length} cupom(ns)</div>
	</div>
	{#if !data.showForm}
		<a href="?add" class="btn btn-primary">+ Novo Cupom</a>
	{/if}
</div>

<div class="page-body">
	{#if form?.error}
		<div class="alert alert-error">{form.error}</div>
	{/if}

	{#if data.showForm}
		<form method="POST" action={data.edit ? '?/update' : '?/create'}>
			<div class="form-block">
				<div class="form-block-head">
					{data.edit ? `Editar Cupom #${data.edit.id}` : 'Novo Cupom'}
					<a href="/loja/cupons" class="btn btn-ghost btn-sm">✕</a>
				</div>
				<div class="form-body">
					{#if data.edit}
						<input type="hidden" name="id" value={data.edit.id} />
					{/if}
					<div class="form-row">
						<div class="field">
							<label for="codigo">Código *</label>
							<input id="codigo" name="codigo" type="text" placeholder="EX: PROMO10" required value={data.edit?.codigo ?? ''} style="text-transform:uppercase" />
						</div>
						<div class="field">
							<label for="desconto">Desconto (%) *</label>
							<input id="desconto" name="desconto" type="number" min="1" max="100" placeholder="10" required value={data.edit?.desconto ?? ''} />
						</div>
						<div class="field">
							<label for="expira">Expira em</label>
							<input id="expira" name="expira" type="date" value={expiraLocal(data.edit?.expira ?? null)} />
						</div>
					</div>
					<div class="check-row">
						<input id="ativo" name="ativo" type="checkbox" checked={data.edit ? data.edit.ativo : true} />
						<label for="ativo">Cupom ativo</label>
					</div>
				</div>
				<div class="form-foot">
					<button type="submit" class="btn btn-primary">{data.edit ? 'Salvar' : 'Criar'}</button>
					<a href="/loja/cupons" class="btn">Cancelar</a>
				</div>
			</div>
		</form>
	{/if}

	<div class="tbl-wrap">
		<table>
			<thead>
				<tr>
					<th>#</th>
					<th>Código</th>
					<th>Desconto</th>
					<th>Expira</th>
					<th>Status</th>
					<th style="text-align:right">Ações</th>
				</tr>
			</thead>
			<tbody>
				{#each data.cupons as c}
					<tr>
						<td class="muted sm">{c.id}</td>
						<td><span class="mono" style="font-weight:600">{c.codigo}</span></td>
						<td><span class="badge badge-amber">{c.desconto}% OFF</span></td>
						<td class="muted sm">{fmtDate(c.expira)}</td>
						<td><span class="badge {c.ativo ? 'badge-green' : 'badge-red'}">{c.ativo ? 'Ativo' : 'Inativo'}</span></td>
						<td class="act">
							<a href="?edit={c.id}" class="btn btn-ghost btn-sm">Editar</a>
							<form method="POST" action="?/delete" style="display:inline">
								<input type="hidden" name="id" value={c.id} />
								<button type="submit" class="btn btn-danger btn-sm">Deletar</button>
							</form>
						</td>
					</tr>
				{:else}
					<tr><td colspan="6"><div class="empty">Nenhum cupom. <a href="?add" style="color:var(--primary)">Criar o primeiro.</a></div></td></tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
