-- AlterTable: singleton PKs Int -> varchar(191) (values cast to string, rewritten to UUIDs by prisma/uuid-migrate.ts)
ALTER TABLE `CmsMeta` MODIFY `id` VARCHAR(191) NOT NULL;
ALTER TABLE `SiteSettings` MODIFY `id` VARCHAR(191) NOT NULL;
ALTER TABLE `HomePageData` MODIFY `id` VARCHAR(191) NOT NULL;
ALTER TABLE `AboutPageData` MODIFY `id` VARCHAR(191) NOT NULL;
ALTER TABLE `ContactPageData` MODIFY `id` VARCHAR(191) NOT NULL;
ALTER TABLE `MonitoringTelemetry` MODIFY `id` VARCHAR(191) NOT NULL;

-- AlterTable: ResearchBeat gains a stable public slug (unique)
ALTER TABLE `ResearchBeat` ADD COLUMN `slug` VARCHAR(191) NULL;
CREATE UNIQUE INDEX `ResearchBeat_slug_key` ON `ResearchBeat`(`slug`);