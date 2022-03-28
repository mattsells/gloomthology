-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnCampaigns" DROP CONSTRAINT "UsersOnCampaigns_campaignId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnCampaigns" DROP CONSTRAINT "UsersOnCampaigns_userId_fkey";

-- CreateTable
CREATE TABLE "Connection" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contactId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("contactId","userId")
);

-- AddForeignKey
ALTER TABLE "UsersOnCampaigns" ADD CONSTRAINT "UsersOnCampaigns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnCampaigns" ADD CONSTRAINT "UsersOnCampaigns_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
