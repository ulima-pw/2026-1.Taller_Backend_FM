-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "nat" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "pac" INTEGER NOT NULL,
    "tec" INTEGER NOT NULL,
    "dri" INTEGER NOT NULL,
    "fin" INTEGER NOT NULL,
    "pas" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);
