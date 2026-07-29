import { S3Client } from "@aws-sdk/client-s3";
//#region src/lib/server/r2.ts
var client = null;
function getR2Config() {
	const accountId = process.env.R2_ACCOUNT_ID?.trim();
	const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
	const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
	const bucket = process.env.R2_BUCKET_NAME?.trim();
	const publicBaseUrl = process.env.R2_PUBLIC_URL?.trim()?.replace(/\/$/, "") ?? "";
	if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicBaseUrl) return null;
	return {
		accountId,
		accessKeyId,
		secretAccessKey,
		bucket,
		publicBaseUrl
	};
}
function getR2Client() {
	const cfg = getR2Config();
	if (!cfg) throw new Error("R2 não configurado: defina R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME e R2_PUBLIC_URL");
	if (!client) client = new S3Client({
		region: "auto",
		endpoint: `https://${cfg.accountId}.r2.cloudflarestorage.com`,
		credentials: {
			accessKeyId: cfg.accessKeyId,
			secretAccessKey: cfg.secretAccessKey
		}
	});
	return client;
}
function extForContentType(contentType) {
	return {
		"image/jpeg": ".jpg",
		"image/jpg": ".jpg",
		"image/png": ".png",
		"image/webp": ".webp",
		"image/gif": ".gif",
		"image/avif": ".avif"
	}[contentType.toLowerCase()] ?? null;
}
//#endregion
export { getR2Client as n, getR2Config as r, extForContentType as t };
