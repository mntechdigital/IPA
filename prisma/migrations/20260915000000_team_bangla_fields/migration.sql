-- Add Bangla fields to TeamMember for dynamic CMS localization
ALTER TABLE `TeamMember` ADD COLUMN `nameBn` TEXT NULL;
ALTER TABLE `TeamMember` ADD COLUMN `roleBn` TEXT NULL;
ALTER TABLE `TeamMember` ADD COLUMN `bioBn` TEXT NULL;
ALTER TABLE `TeamMember` ADD COLUMN `fullBioBn` TEXT NULL;
ALTER TABLE `TeamMember` ADD COLUMN `researchInterestsBn` JSON NULL;
ALTER TABLE `TeamMember` ADD COLUMN `focusAreasBn` JSON NULL;
ALTER TABLE `TeamMember` ADD COLUMN `educationBn` TEXT NULL;
