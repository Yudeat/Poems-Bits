-- CreateTable
CREATE TABLE "PoemLike" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "poemId" INTEGER NOT NULL,

    CONSTRAINT "PoemLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PoemLike_userId_poemId_key" ON "PoemLike"("userId", "poemId");

-- AddForeignKey
ALTER TABLE "PoemLike" ADD CONSTRAINT "PoemLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoemLike" ADD CONSTRAINT "PoemLike_poemId_fkey" FOREIGN KEY ("poemId") REFERENCES "Poem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
