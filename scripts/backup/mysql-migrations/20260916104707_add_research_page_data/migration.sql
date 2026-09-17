-- AlterTable
ALTER TABLE `researchbeat` ADD COLUMN `imageBn` VARCHAR(191) NULL,
    ADD COLUMN `primaryMethodologiesBn` JSON NULL,
    ADD COLUMN `sampleInquiries` JSON NULL,
    ADD COLUMN `sampleInquiriesBn` JSON NULL;

-- CreateTable
CREATE TABLE `ResearchPageData` (
    `id` VARCHAR(191) NOT NULL,
    `data` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
