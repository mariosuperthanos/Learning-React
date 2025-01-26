/*
  Warnings:

  - You are about to drop the column `userId` on the `UserPreference` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userPreferencedId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserPreference" DROP CONSTRAINT "UserPreference_userId_fkey";

-- DropIndex
DROP INDEX "UserPreference_userId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userPreferencedId" TEXT;

-- AlterTable
ALTER TABLE "UserPreference" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "User_userPreferencedId_key" ON "User"("userPreferencedId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userPreferencedId_fkey" FOREIGN KEY ("userPreferencedId") REFERENCES "UserPreference"("id") ON DELETE SET NULL ON UPDATE CASCADE;
