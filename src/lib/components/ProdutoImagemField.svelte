<script lang="ts">
	const MAX_BYTES = 8 * 1024 * 1024;

	let { value = $bindable('') }: { value?: string } = $props();

	let uploading = $state(false);
	let uploadMsg = $state('');
	let fileInput: HTMLInputElement | undefined = $state();

	async function onFile(ev: Event) {
		const input = ev.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		uploadMsg = '';
		if (!file.type.startsWith('image/')) {
			uploadMsg = 'Selecione um arquivo de imagem.';
			return;
		}
		if (file.size > MAX_BYTES) {
			uploadMsg = 'Imagem muito grande (máx. 8 MB).';
			return;
		}

		uploading = true;
		try {
			const presign = await fetch('/api/uploads/produtos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ contentType: file.type || 'application/octet-stream' })
			});
			const data = await presign.json().catch(() => ({}));
			if (!presign.ok) {
				uploadMsg = data.error || 'Não foi possível preparar o upload.';
				return;
			}
			const put = await fetch(data.uploadUrl, {
				method: 'PUT',
				headers: { 'Content-Type': file.type },
				body: file
			});
			if (!put.ok) {
				uploadMsg = 'Falha ao enviar para o armazenamento. Verifique CORS do bucket R2 e a URL pública.';
				return;
			}
			value = data.publicUrl as string;
			uploadMsg = 'Imagem enviada.';
		} catch {
			uploadMsg = 'Erro de rede ao enviar a imagem.';
		} finally {
			uploading = false;
			if (fileInput) fileInput.value = '';
		}
	}
</script>

<div class="produto-imagem-field">
	<div class="field">
		<label for="imagem-url">URL da imagem do produto</label>
		<input
			id="imagem-url"
			name="imagem"
			type="url"
			placeholder="https://… (preenchido após upload ou cole uma URL)"
			bind:value
		/>
	</div>

	<div class="upload-row">
		<input bind:this={fileInput} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onchange={onFile} disabled={uploading} />
		{#if uploading}
			<span class="hint">Enviando…</span>
		{/if}
	</div>

	{#if uploadMsg}
		<p class="msg" class:error={uploadMsg.includes('Falha') || uploadMsg.includes('Erro') || uploadMsg.includes('Não foi') || uploadMsg.includes('muito grande') || uploadMsg.includes('Selecione')}>{uploadMsg}</p>
	{/if}

	{#if value}
		<div class="preview">
			<img src={value} alt="Pré-visualização do produto" referrerpolicy="no-referrer" />
		</div>
	{/if}
</div>

<style>
	.produto-imagem-field {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.upload-row {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}
	.hint {
		font-size: 13px;
		color: var(--muted, #888);
	}
	.msg {
		margin: 0;
		font-size: 13px;
		color: var(--success, #2d8a5e);
	}
	.msg.error {
		color: var(--danger, #c44);
	}
	.preview {
		margin-top: 4px;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid var(--border, #333);
		max-width: 420px;
		background: #111;
	}
	.preview img {
		display: block;
		width: 100%;
		height: auto;
		max-height: 220px;
		object-fit: cover;
	}
</style>
