-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userPreferencedId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userPreferencedId_fkey" FOREIGN KEY ("userPreferencedId") REFERENCES "UserPreference"("id") ON DELETE CASCADE ON UPDATE CASCADE;
