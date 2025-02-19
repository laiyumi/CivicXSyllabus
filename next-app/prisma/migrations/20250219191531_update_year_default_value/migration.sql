/*
  Warnings:

  - You are about to alter the column `year` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Year`.

*/
-- AlterTable
ALTER TABLE `Post` MODIFY `year` YEAR NOT NULL DEFAULT 2025;
