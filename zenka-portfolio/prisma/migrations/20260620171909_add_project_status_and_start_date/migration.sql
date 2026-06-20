/*
  Warnings:

  - Added the required column `startDate` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('InDevelopment', 'Completed', 'Maintained', 'Archived');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'Completed';
