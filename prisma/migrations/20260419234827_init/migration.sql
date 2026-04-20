-- CreateTable
CREATE TABLE "blog_posts" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "dataHorario" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT,
    "publicado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servidores" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "porta" INTEGER NOT NULL DEFAULT 25565,

    CONSTRAINT "servidores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT,
    "categoriaId" INTEGER NOT NULL,
    "servidorId" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cupons" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "desconto" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "expira" TIMESTAMP(3),

    CONSTRAINT "cupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipe" (
    "id" SERIAL NOT NULL,
    "nick" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,

    CONSTRAINT "equipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "categorias"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "servidores_nome_key" ON "servidores"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "cupons_codigo_key" ON "cupons"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "equipe_nick_key" ON "equipe"("nick");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_servidorId_fkey" FOREIGN KEY ("servidorId") REFERENCES "servidores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
