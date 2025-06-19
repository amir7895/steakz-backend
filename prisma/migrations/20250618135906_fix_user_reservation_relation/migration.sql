/*
  Warnings:

  - You are about to drop the column `date` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `guests` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `numberOfGuests` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableNumber` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "date",
DROP COLUMN "guests",
DROP COLUMN "time",
ADD COLUMN     "numberOfGuests" INTEGER NOT NULL,
ADD COLUMN     "reservedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "specialRequests" TEXT,
ADD COLUMN     "tableNumber" INTEGER NOT NULL;
