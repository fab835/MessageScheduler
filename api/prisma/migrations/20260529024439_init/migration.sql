-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'QUEUED', 'ACCEPTED', 'SENT', 'DELIVERED', 'RECEIVED', 'FAILED');

-- CreateTable
CREATE TABLE "messages" (
    "uid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'DRAFT',
    "scheduled_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE INDEX "messages_status_scheduled_date_idx" ON "messages"("status", "scheduled_date");
