import { S3Client } from '@aws-sdk/client-s3';

let client: S3Client | null = null;

export type R2Config = {
	accountId: string;
	accessKeyId: string;
	secretAccessKey: string;
	bucket: string;
	publicBaseUrl: string;
};

export function getR2Config(): R2Config | null {
	const accountId = process.env.R2_ACCOUNT_ID?.trim();
	const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
	const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
	const bucket = process.env.R2_BUCKET_NAME?.trim();
	const publicBaseUrl = process.env.R2_PUBLIC_URL?.trim()?.replace(/\/$/, '') ?? '';

	if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicBaseUrl) {
		return null;
	}

	return { accountId, accessKeyId, secretAccessKey, bucket, publicBaseUrl };
}

export function getR2Client(): S3Client {
	const cfg = getR2Config();
	if (!cfg) {
		throw new Error('R2 não configurado: defina R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME e R2_PUBLIC_URL');
	}

	if (!client) {
		client = new S3Client({
			region: 'auto',
			endpoint: `https://${cfg.accountId}.r2.cloudflarestorage.com`,
			credentials: {
				accessKeyId: cfg.accessKeyId,
				secretAccessKey: cfg.secretAccessKey
			}
		});
	}

	return client;
}

export function extForContentType(contentType: string): string | null {
	const map: Record<string, string> = {
		'image/jpeg': '.jpg',
		'image/jpg': '.jpg',
		'image/png': '.png',
		'image/webp': '.webp',
		'image/gif': '.gif',
		'image/avif': '.avif'
	};
	return map[contentType.toLowerCase()] ?? null;
}
