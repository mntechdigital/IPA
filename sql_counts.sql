SELECT 'ResearchBeat' as table_name, COUNT(*) as count FROM "ResearchBeat"
UNION ALL
SELECT 'SiteSettings', COUNT(*) FROM "SiteSettings"
UNION ALL
SELECT 'HomePageData', COUNT(*) FROM "HomePageData"
UNION ALL
SELECT 'AboutPageData', COUNT(*) FROM "AboutPageData"
UNION ALL
SELECT 'ContactPageData', COUNT(*) FROM "ContactPageData"
UNION ALL
SELECT 'ResearchPageData', COUNT(*) FROM "ResearchPageData"
UNION ALL
SELECT 'MonitoringTelemetry', COUNT(*) FROM "MonitoringTelemetry"
UNION ALL
SELECT 'TeamMember', COUNT(*) FROM "TeamMember"
UNION ALL
SELECT 'Publication', COUNT(*) FROM "Publication"
UNION ALL
SELECT 'Inquiry', COUNT(*) FROM "Inquiry"
UNION ALL
SELECT 'WorkArea', COUNT(*) FROM "WorkArea"
UNION ALL
SELECT 'WorkProcessPillar', COUNT(*) FROM "WorkProcessPillar"
UNION ALL
SELECT 'ActivityLog', COUNT(*) FROM "ActivityLog";