/*
  Warnings:

  - A unique constraint covering the columns `[age,email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_age_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "User_age_email_key" ON "User"("age", "email");
