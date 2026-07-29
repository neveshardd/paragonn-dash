import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
//#region src/lib/server/prisma.ts
var globalForPrisma = globalThis;
var connectionString = process.env.DATABASE_URL;
var prisma = new PrismaClient({
	adapter: new PrismaPg({ connectionString }),
	log: process.env.NODE_ENV === "development" ? [
		"query",
		"error",
		"warn"
	] : ["error"]
});
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
//#endregion
export { prisma as t };
