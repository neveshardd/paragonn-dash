import { json } from '@sveltejs/kit';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { RequestHandler } from './$types';
import { extForContentType, getR2Client, getR2Config } from '$lib/server/r2';
import { randomUUID } from 'node:crypto';

export const POST: RequestHandler = async ({ request }) => {
	const cfg = getR2Config();
	if (!cfg) {
		return json(
			{
				error:
					'Upload desativado: configure R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME e R2_PUBLIC_URL no servidor.'
			},
			{ status: 503 }
		);
	}

	let body: { contentType?: string };
	try {
		body = await request.json();
	} catch {
		return json({ error: 'JSON inválido' }, { status: 400 });
	}

	const contentType = (body.contentType as string)?.trim().toLowerCase();
	if (!contentType || !contentType.startsWith('image/')) {
		return json({ error: 'contentType deve ser uma imagem (ex.: image/jpeg)' }, { status: 400 });
	}

	const ext = extForContentType(contentType);
	if (!ext) {
		return json({ error: 'Tipo de imagem não suportado (use JPEG, PNG, WebP, GIF ou AVIF)' }, { status: 400 });
	}

	const now = new Date();
	const y = now.getUTCFullYear();
	const m = String(now.getUTCMonth() + 1).padStart(2, '0');
	const key = `blog/${y}/${m}/${randomUUID()}${ext}`;

	const client = getR2Client();
	const command = new PutObjectCommand({
		Bucket: cfg.bucket,
		Key: key,
		ContentType: contentType
	});

	const uploadUrl = await getSignedUrl(client, command, { expiresIn: 600 });
	const publicUrl = `${cfg.publicBaseUrl}/${key}`;

	return json({
		uploadUrl,
		publicUrl,
		key,
		expiresIn: 600
	});
};
