-- AlterTable
ALTER TABLE `researchbeat` ADD COLUMN `caseStudiesBn` JSON NULL,
    ADD COLUMN `descriptionBn` TEXT NULL,
    ADD COLUMN `imageSubtitleBn` TEXT NULL,
    ADD COLUMN `imageTitleBn` TEXT NULL,
    ADD COLUMN `keyQuestionsBn` JSON NULL,
    ADD COLUMN `leadFellowsBn` JSON NULL,
    ADD COLUMN `methodologyBn` TEXT NULL,
    ADD COLUMN `methodologyDetailsBn` JSON NULL,
    ADD COLUMN `metricsBn` JSON NULL,
    ADD COLUMN `nameBn` TEXT NULL,
    ADD COLUMN `outputsCountBn` TEXT NULL,
    ADD COLUMN `overviewBn` JSON NULL,
    ADD COLUMN `publicationsBn` JSON NULL,
    ADD COLUMN `researchNarrativeBn` TEXT NULL,
    ADD COLUMN `statusBn` TEXT NULL,
    ADD COLUMN `summaryBn` TEXT NULL,
    ADD COLUMN `taglineBn` TEXT NULL,
    ADD COLUMN `timeframeBn` TEXT NULL;

-- CreateTable
CREATE TABLE `WorkArea` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `tagline` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `methods` JSON NOT NULL,
    `sampleInquiries` JSON NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `outputsCount` VARCHAR(191) NOT NULL,
    `timeframe` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `nameBn` TEXT NULL,
    `taglineBn` TEXT NULL,
    `descriptionBn` TEXT NULL,
    `methodsBn` JSON NULL,
    `sampleInquiriesBn` JSON NULL,
    `imageBn` VARCHAR(191) NULL,
    `outputsCountBn` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WorkProcessPillar` (
    `id` VARCHAR(191) NOT NULL,
    `step` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `highlights` JSON NOT NULL,
    `titleBn` TEXT NULL,
    `subtitleBn` TEXT NULL,
    `descriptionBn` TEXT NULL,
    `highlightsBn` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
