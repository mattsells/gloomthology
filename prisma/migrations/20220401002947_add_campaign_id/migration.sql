/*
  Warnings:

  - Added the required column `campaignId` to the `Scenario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scenario" ADD COLUMN     "campaignId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Scenario" ADD CONSTRAINT "Scenario_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
