-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('COMPLETE', 'INCOMPLETE');

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "cityEventStatus" "EventStatus" NOT NULL DEFAULT E'INCOMPLETE',
ADD COLUMN     "roadEventStatus" "EventStatus" NOT NULL DEFAULT E'INCOMPLETE';
