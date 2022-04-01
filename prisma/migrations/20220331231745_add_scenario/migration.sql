-- CreateEnum
CREATE TYPE "ScenarioResult" AS ENUM ('Failed', 'Success');

-- CreateTable
CREATE TABLE "Scenario" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "locationId" INTEGER NOT NULL,
    "result" "ScenarioResult",

    CONSTRAINT "Scenario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Scenario" ADD CONSTRAINT "Scenario_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
