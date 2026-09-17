import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

const inputDir = path.resolve(process.cwd(), 'scripts', 'backup');

async function main() {
  const backup = JSON.parse(fs.readFileSync(path.join(inputDir, 'mysql-data.json'), 'utf8'));

  console.log('Importing MySQL data into PostgreSQL...');

  // Import SiteSettings
  const ss = backup.siteSettings[0];
  await prisma.siteSettings.upsert({
    where: { id: ss.id },
    update: { data: ss.data },
    create: { id: ss.id, data: ss.data },
  });
  console.log('  -> SiteSettings imported');

  // Import HomePageData
  const hp = backup.homePageData[0];
  await prisma.homePageData.upsert({
    where: { id: hp.id },
    update: { data: hp.data },
    create: { id: hp.id, data: hp.data },
  });
  console.log('  -> HomePageData imported');

  // Import AboutPageData
  const ap = backup.aboutPageData[0];
  await prisma.aboutPageData.upsert({
    where: { id: ap.id },
    update: { data: ap.data },
    create: { id: ap.id, data: ap.data },
  });
  console.log('  -> AboutPageData imported');

  // Import ContactPageData
  if (backup.contactPageData) {
    const cp = backup.contactPageData[0];
    await prisma.contactPageData.upsert({
      where: { id: cp.id },
      update: { data: cp.data },
      create: { id: cp.id, data: cp.data },
    });
    console.log('  -> ContactPageData imported');
  }

  // Import ResearchPageData
  const rp = backup.researchPageData[0];
  await prisma.researchPageData.upsert({
    where: { id: rp.id },
    update: { data: rp.data },
    create: { id: rp.id, data: rp.data },
  });
  console.log('  -> ResearchPageData imported');

  // Import MonitoringTelemetry
  const mt = backup.monitoringTelemetry[0];
  await prisma.monitoringTelemetry.upsert({
    where: { id: mt.id },
    update: { data: mt.data },
    create: { id: mt.id, data: mt.data },
  });
  console.log('  -> MonitoringTelemetry imported');

  // Import ResearchBeat
  for (const beat of backup.researchBeat) {
    const data = {
      id: beat.id,
      slug: beat.slug ?? null,
      beatNumber: beat.beatNumber,
      category: beat.category,
      name: beat.name,
      tagline: beat.tagline,
      description: beat.description,
      image: beat.image,
      outputsCount: beat.outputsCount,
      timeframe: beat.timeframe,
      status: beat.status,
      viewCount: beat.viewCount ?? 0,
    };
    await prisma.researchBeat.upsert({
      where: { id: beat.id },
      update: data,
      create: data,
    });
  }
  console.log('  -> ResearchBeat imported (' + backup.researchBeat.length + ' beats)');

  // Import TeamMember
  for (const team of backup.teamMember) {
    const data = {
      id: team.id,
      name: team.name,
      role: team.role,
      category: team.category,
      teamType: team.teamType,
      image: team.image,
      bio: team.bio,
      email: team.email,
      twitter: team.twitter,
      linkedin: team.linkedin,
      scholar: team.scholar,
      order: team.order ?? 0,
    };
    await prisma.teamMember.upsert({
      where: { id: team.id },
      update: data,
      create: data,
    });
  }
  console.log('  -> TeamMember imported (' + backup.teamMember.length + ' members)');

  // Import Publication
  for (const pub of backup.publication) {
    const data = {
      id: pub.id,
      title: pub.title,
      type: pub.type,
      date: pub.date,
      pagesOrSize: pub.pagesOrSize ?? '',
      beatId: pub.beatId ?? null,
      downloadUrl: pub.downloadUrl ?? null,
      abstract: pub.abstract ?? null,
      status: pub.status ?? null,
    };
    await prisma.publication.upsert({
      where: { id: pub.id },
      update: data,
      create: data,
    });
  }
  console.log('  -> Publication imported (' + backup.publication.length + ' publications)');

  // Import Inquiry
  for (const inf of backup.inquiry) {
    const data = {
      id: inf.id,
      date: inf.date,
      name: inf.name,
      organization: inf.organization,
      email: inf.email,
      topic: inf.topic,
      message: inf.message,
      status: inf.status,
    };
    await prisma.inquiry.upsert({
      where: { id: inf.id },
      update: data,
      create: data,
    });
  }
  console.log('  -> Inquiry imported (' + backup.inquiry.length + ' inquiries)');

  // Import WorkArea
  for (const area of backup.workArea) {
    const data = {
      id: area.id,
      name: area.name,
      tagline: area.tagline,
      description: area.description,
      outputsCount: area.outputsCount,
      timeframe: area.timeframe,
      status: area.status,
    };
    await prisma.workArea.upsert({
      where: { id: area.id },
      update: data,
      create: data,
    });
  }
  console.log('  -> WorkArea imported (' + backup.workArea.length + ' areas)');

  // Import WorkProcessPillar
  for (const pillar of backup.workProcessPillar) {
    const data = {
      id: pillar.id,
      step: pillar.step,
      title: pillar.title,
      subtitle: pillar.subtitle,
      description: pillar.description,
      highlights: pillar.highlights,
    };
    await prisma.workProcessPillar.upsert({
      where: { id: pillar.id },
      update: data,
      create: data,
    });
  }
  console.log('  -> WorkProcessPillar imported (' + backup.workProcessPillar.length + ' pillars)');

  // Import ActivityLog
  for (const log of backup.activityLog) {
    await prisma.activityLog.upsert({
      where: { id: log.id },
      update: {
        timestamp: log.timestamp,
        action: log.action,
        section: log.section,
        user: log.user,
      },
    });
  }
  console.log('  -> ActivityLog imported (' + backup.activityLog.length + ' logs)');

  console.log('\n=== Import Complete ===');
  const total = Object.keys(backup).reduce((s, k) => s + (backup[k]?.length || 0), 0);
  console.log('Total records imported: ' + total);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());