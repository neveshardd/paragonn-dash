// Prisma 7 configuration — https://www.prisma.io/docs/orm/reference/prisma-config-reference
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
