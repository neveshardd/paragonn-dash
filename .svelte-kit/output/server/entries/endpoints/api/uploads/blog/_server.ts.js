import { n as getR2Client, r as getR2Config, t as extForContentType } from "../../../../../chunks/r2.js";
import { json } from "@sveltejs/kit";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";
//#region src/routes/api/uploads/blog/+server.ts
var POST = async ({ request }) => {
	const cfg = getR2Config();
	if (!cfg) return json({ error: "Upload desativado: configure R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME e R2_PUBLIC_URL no servidor." }, { status: 503 });
	let body;
	try {
		body = await request.json();
	} catch {
		return json({ error: "JSON inválido" }, { status: 400 });
	}
	const contentType = body.contentType?.trim().toLowerCase();
	if (!contentType || !contentType.startsWith("image/")) return json({ error: "contentType deve ser uma imagem (ex.: image/jpeg)" }, { status: 400 });
	const ext = extForContentType(contentType);
	if (!ext) return json({ error: "Tipo de imagem não suportado (use JPEG, PNG, WebP, GIF ou AVIF)" }, { status: 400 });
	const now = /* @__PURE__ */ new Date();
	const key = `blog/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${randomUUID()}${ext}`;
	return json({
		uploadUrl: await getSignedUrl(getR2Client(), new PutObjectCommand({
			Bucket: cfg.bucket,
			Key: key,
			ContentType: contentType
		}), { expiresIn: 600 }),
		publicUrl: `${cfg.publicBaseUrl}/${key}`,
		key,
		expiresIn: 600
	});
};
//#endregion
export { POST };
