/*
  Warnings:

  - You are about to drop the column `category` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `partySize` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `specialNote` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `guests` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Made the column `customerId` on table `Reservation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_customerId_fkey";

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "createdAt",
DROP COLUMN "partySize",
DROP COLUMN "specialNote",
DROP COLUMN "updatedAt",
ADD COLUMN     "guests" INTEGER NOT NULL,
ALTER COLUMN "customerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
