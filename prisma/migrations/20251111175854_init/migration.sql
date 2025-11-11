/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PoemTags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Poem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Poem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Poem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PoemTags" DROP CONSTRAINT "_PoemTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_PoemTags" DROP CONSTRAINT "_PoemTags_B_fkey";

-- AlterTable
ALTER TABLE "Poem" ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_PoemTags";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Poem" ADD CONSTRAINT "Poem_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
