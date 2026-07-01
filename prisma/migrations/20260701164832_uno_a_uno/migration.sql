/*
  Warnings:

  - You are about to drop the column `dri` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `fin` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `pac` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `pas` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `tec` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "dri",
DROP COLUMN "fin",
DROP COLUMN "pac",
DROP COLUMN "pas",
DROP COLUMN "tec";

-- CreateTable
CREATE TABLE "PlayerAttributes" (
    "id" SERIAL NOT NULL,
    "pac" INTEGER NOT NULL,
    "tec" INTEGER NOT NULL,
    "dri" INTEGER NOT NULL,
    "fin" INTEGER NOT NULL,
    "pas" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "PlayerAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerAttributes_playerId_key" ON "PlayerAttributes"("playerId");

-- AddForeignKey
ALTER TABLE "PlayerAttributes" ADD CONSTRAINT "PlayerAttributes_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
