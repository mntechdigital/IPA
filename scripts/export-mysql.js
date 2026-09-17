import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

const outputDir = path.resolve(process.cwd(), 'scripts', 'backup');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

async function main() {
  const data = {};

  console.log('Exporting CmsMeta...');
  data.cmsMeta = await prisma.cmsMeta.findMany();

  console.log('Exporting SiteSettings...');
  data.siteSettings = await prisma.siteSettings.findMany();

  console.log('Exporting HomePageData...');
  data.homePageData = await prisma.homePageData.findMany();

  console.log('Exporting AboutPageData...');
  data.aboutPageData = await prisma.aboutPageData.findMany();

  console.log('Exporting ContactPageData...');
  data.contactPageData = await prisma.contactPageData.findMany();

  console.log('Exporting ResearchPageData...');
  data.researchPageData = await prisma.researchPageData.findMany();

  console.log('Exporting MonitoringTelemetry...');
  data.monitoringTelemetry = await prisma.monitoringTelemetry.findMany();

  console.log('Exporting ResearchBeat...');
  data.researchBeat = await prisma.researchBeat.findMany();

  console.log('Exporting TeamMember...');
  data.teamMember = await prisma.teamMember.findMany();

  console.log('Exporting Publication...');
  data.publication = await prisma.publication.findMany();

  console.log('Exporting Inquiry...');
  data.inquiry = await prisma.inquiry.findMany();

  console.log('Exporting WorkArea...');
  data.workArea = await prisma.workArea.findMany();

  console.log('Exporting WorkProcessPillar...');
  data.workProcessPillar = await prisma.workProcessPillar.findMany();

  console.log('Exporting ActivityLog...');
  data.activityLog = await prisma.activityLog.findMany();

  const outputPath = path.join(outputDir, 'mysql-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`\nBackup saved to: ${outputPath}`);
  console.log(`Total records: ${Object.values(data).reduce((sum, arr) => sum + (arr?.length || 0), 0)}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
