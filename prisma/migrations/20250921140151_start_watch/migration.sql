-- CreateTable
CREATE TABLE "StartWatch" (
    "startWatchId" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "seasonId" INTEGER,
    "episodeId" INTEGER,
    "currentTime" INTEGER NOT NULL,
    CONSTRAINT "StartWatch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "StartWatch_userId_startWatchId_key" ON "StartWatch"("userId", "startWatchId");
