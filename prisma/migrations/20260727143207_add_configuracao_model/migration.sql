/*
  Warnings:

  - You are about to drop the column `dataCriacao` on the `entregas_pendentes` table. All the data in the column will be lost.
  - You are about to drop the column `dataEntrega` on the `entregas_pendentes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "entregas_pendentes" DROP COLUMN "dataCriacao",
DROP COLUMN "dataEntrega",
ADD COLUMN     "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data_entrega" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "comando" TEXT NOT NULL DEFAULT 'lp user %player% parent add vip',
ADD COLUMN     "imagem" TEXT;

-- CreateTable
CREATE TABLE "configuracoes" (
    "chave" TEXT NOT NULL,
    "valor" TEXT NOT NULL,

    CONSTRAINT "configuracoes_pkey" PRIMARY KEY ("chave")
);
