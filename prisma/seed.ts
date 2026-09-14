import { PrismaClient } from '@prisma/client';
import { INITIAL_CMS_STATE } from '../src/data/initialData';

const prisma = new PrismaClient();

async function main() {
  const s = INITIAL_CMS_STATE;

  await prisma.cmsMeta.upsert({
    where: { id: 1 },
    update: { version: s.version, lastUpdated: new Date(s.lastUpdated ?? Date.now()) },
    create: { id: 1, version: s.version ?? '1.0.0', lastUpdated: new Date(s.lastUpdated ?? Date.now()) },
  });

  await prisma.siteSettings.upsert({ where: { id: 1 }, update: { data: s.settings as object }, create: { id: 1, data: s.settings as object } });
  await prisma.homePageData.upsert({ where: { id: 1 }, update: { data: s.homePage as object }, create: { id: 1, data: s.homePage as object } });
  await prisma.aboutPageData.upsert({ where: { id: 1 }, update: { data: s.aboutPage as object }, create: { id: 1, data: s.aboutPage as object } });
  if (s.contactPage) {
    await prisma.contactPageData.upsert({ where: { id: 1 }, update: { data: s.contactPage as object }, create: { id: 1, data: s.contactPage as object } });
  }
  await prisma.monitoringTelemetry.upsert({ where: { id: 1 }, update: { data: s.monitoring as object }, create: { id: 1, data: s.monitoring as object } });

  await prisma.researchBeat.deleteMany();
  for (const beat of Object.values(s.researchBeats)) {
    await prisma.researchBeat.create({
      data: {
        id: beat.id,
        beatNumber: beat.beatNumber,
        category: beat.category,
        name: beat.name,
        tagline: beat.tagline,
        description: beat.description,
        image: beat.image,
        outputsCount: beat.outputsCount,
        timeframe: beat.timeframe,
        status: beat.status,
        leadFellows: (beat.leadFellows ?? []) as never,
        metrics: (beat.metrics ?? []) as never,
        overview: (beat.overview ?? []) as never,
        keyQuestions: (beat.keyQuestions ?? []) as never,
        methodologyDetails: (beat.methodologyDetails ?? []) as never,
        caseStudies: (beat.caseStudies ?? []) as never,
        publications: (beat.publications ?? []) as never,
        summary: beat.summary,
        methodology: beat.methodology,
        primaryMethodologies: (beat.primaryMethodologies ?? []) as never,
        imageTitle: beat.imageTitle,
        imageSubtitle: beat.imageSubtitle,
        researchNarrative: beat.researchNarrative,
        viewCount: beat.viewCount,
      },
    });
  }

  await prisma.teamMember.deleteMany();
  for (let i = 0; i < s.team.length; i++) {
    const m = s.team[i];
    await prisma.teamMember.create({
      data: {
        id: m.id,
        name: m.name,
        role: m.role,
        category: m.category,
        teamType: m.teamType,
        image: m.image,
        bio: m.bio,
        fullBio: m.fullBio,
        researchInterests: (m.researchInterests ?? []) as never,
        focusAreas: (m.focusAreas ?? []) as never,
        education: m.education,
        recentPublications: (m.recentPublications ?? []) as never,
        email: m.email,
        twitter: m.twitter,
        linkedin: m.linkedin,
        scholar: m.scholar,
        order: m.order ?? i,
      },
    });
  }

  await prisma.publication.deleteMany();
  for (const pub of s.publications) {
    await prisma.publication.create({
      data: {
        id: pub.id,
        title: pub.title,
        type: pub.type,
        date: pub.date,
        pagesOrSize: pub.pagesOrSize ?? '',
        beatId: pub.beatId,
        downloadUrl: pub.downloadUrl,
        abstract: pub.abstract,
        status: pub.status,
      },
    });
  }

  await prisma.inquiry.deleteMany();
  for (const q of s.inquiries) {
    await prisma.inquiry.create({
      data: {
        id: q.id,
        date: q.date,
        name: q.name,
        organization: q.organization,
        email: q.email,
        topic: q.topic,
        message: q.message,
        requestedDataset: q.requestedDataset,
        status: q.status,
        notes: q.notes,
      },
    });
  }

  await prisma.activityLog.deleteMany();
  for (const log of s.activityLogs) {
    await prisma.activityLog.create({
      data: { id: log.id, timestamp: log.timestamp, action: log.action, section: log.section, user: log.user },
    });
  }

  console.log(`Seed complete: ${Object.keys(s.researchBeats).length} beats, ${s.team.length} team, ${s.publications.length} publications, ${s.inquiries.length} inquiries.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());