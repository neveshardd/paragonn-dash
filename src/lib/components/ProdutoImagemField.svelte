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
		<div class="input-group">
			<input
				id="imagem-url"
				name="imagem"
				type="url"
				placeholder="https://… (preenchido após upload ou cole uma URL)"
				bind:value
			/>
			{#if value}
				<button type="button" class="btn-clear" onclick={() => value = ''} title="Remover imagem">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
			{/if}
		</div>
	</div>

	<div class="upload-area">
		<input 
			bind:this={fileInput} 
			type="file" 
			accept="image/jpeg,image/png,image/webp,image/gif,image/avif" 
			onchange={onFile} 
			hidden 
		/>
		
		<button 
			type="button" 
			class="btn-upload" 
			onclick={() => fileInput?.click()} 
			disabled={uploading}
		>
			{#if uploading}
				<svg class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
					<path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
				</svg>
				Enviando...
			{:else}
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
					<polyline points="17 8 12 3 7 8"></polyline>
					<line x1="12" y1="3" x2="12" y2="15"></line>
				</svg>
				Fazer upload de imagem
			{/if}
		</button>
		
		<span class="hint">Tamanho máximo: 8MB. Formato 1:1 recomendado.</span>
	</div>

	{#if uploadMsg}
		<p class="msg" class:error={uploadMsg.includes('Falha') || uploadMsg.includes('Erro') || uploadMsg.includes('Não foi') || uploadMsg.includes('muito grande') || uploadMsg.includes('Selecione')}>{uploadMsg}</p>
	{/if}

	{#if value}
		<div class="preview-card">
			<div class="preview-header">Pré-visualização do Produto</div>
			<div class="preview-content">
				<img 
					src={value} 
					alt="Pré-visualização" 
					onerror={() => {
						uploadMsg = 'ERRO: A imagem não carregou. Verifique se o R2_PUBLIC_URL no .env está correto e se o bucket tem "Public Access" ativado no Cloudflare.';
					}}
				/>
			</div>
		</div>
	{/if}
</div>

<style>
	.produto-imagem-field {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin: 8px 0;
	}

	.input-group {
		display: flex;
		position: relative;
	}

	.btn-clear {
		position: absolute;
		right: 8px;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		color: var(--muted);
		padding: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
	}
	.btn-clear:hover {
		background: rgba(0,0,0,0.05);
		color: var(--danger);
	}

	.upload-area {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.btn-upload {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		background: #f1f5f9;
		border: 1px dashed #cbd5e1;
		border-radius: 8px;
		color: #475569;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-upload:hover:not(:disabled) {
		background: #e2e8f0;
		border-color: #94a3b8;
		color: #1e293b;
	}

	.btn-upload:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.hint {
		font-size: 12px;
		color: var(--muted);
	}

	.msg {
		margin: 0;
		font-size: 13px;
		color: var(--success, #16a34a);
		font-weight: 500;
	}
	.msg.error {
		color: var(--danger, #dc2626);
	}

	.preview-card {
		border: 1px solid var(--border);
		border-radius: 12px;
		overflow: hidden;
		background: #fff;
		max-width: 400px;
	}

	.preview-header {
		padding: 8px 12px;
		background: #f8fafc;
		border-bottom: 1px solid var(--border);
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		color: #64748b;
		letter-spacing: 0.05em;
	}

	.preview-content {
		padding: 24px;
		background: #f1f5f9;
		display: flex;
		justify-content: center;
	}

	.preview-content img {
		max-width: 100%;
		max-height: 200px;
		border-radius: 8px;
		box-shadow: 0 8px 16px rgba(0,0,0,0.12);
		background: #fff;
		aspect-ratio: 1;
		object-fit: contain;
	}

	.spin {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
</style>
