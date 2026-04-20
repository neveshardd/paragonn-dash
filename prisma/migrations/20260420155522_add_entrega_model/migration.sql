-- CreateTable
CREATE TABLE "entregas_pendentes" (
    "id" SERIAL NOT NULL,
    "jogador" TEXT NOT NULL,
    "produto" TEXT NOT NULL,
    "comando" TEXT NOT NULL,
    "servidor" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataEntrega" TIMESTAMP(3),

    CONSTRAINT "entregas_pendentes_pkey" PRIMARY KEY ("id")
);
