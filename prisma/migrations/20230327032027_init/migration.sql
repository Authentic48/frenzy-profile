-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "SocialMedia" AS ENUM ('FACEBOOK', 'TWITTER', 'TIKTOK', 'INSTAGRAM', 'SNAPCHAT');

-- CreateTable
CREATE TABLE "profile" (
    "uuid" TEXT NOT NULL,
    "user_uuid" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "location" TEXT,
    "age" INTEGER,
    "height" TEXT,
    "gender" "Gender" NOT NULL,
    "interests" TEXT[],
    "photos" TEXT[],
    "languages" TEXT[],

    CONSTRAINT "profile_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "social_medias" (
    "uuid" TEXT NOT NULL,
    "name" "SocialMedia" NOT NULL,
    "username" TEXT NOT NULL,
    "profile_uuid" VARCHAR(36) NOT NULL,

    CONSTRAINT "social_medias_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_uuid_key" ON "profile"("user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "social_medias_profile_uuid_name_key" ON "social_medias"("profile_uuid", "name");

-- AddForeignKey
ALTER TABLE "social_medias" ADD CONSTRAINT "social_medias_profile_uuid_fkey" FOREIGN KEY ("profile_uuid") REFERENCES "profile"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
