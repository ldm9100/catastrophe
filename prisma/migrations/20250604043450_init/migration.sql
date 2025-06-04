-- CreateTable
CREATE TABLE "POST" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "POST_pkey" PRIMARY KEY ("id")
);
