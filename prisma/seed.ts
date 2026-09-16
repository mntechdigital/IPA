import { PrismaClient } from '@prisma/client';
import { INITIAL_CMS_STATE } from '../src/data/initialData';
import { SINGLETON, translateSeedState } from '../src/lib/seed-ids';

const prisma = new PrismaClient();

async function main() {
  const s = translateSeedState(INITIAL_CMS_STATE);

  await prisma.cmsMeta.upsert({
    where: { id: SINGLETON.meta },
    update: { version: s.version, lastUpdated: new Date(s.lastUpdated ?? Date.now()) },
    create: { id: SINGLETON.meta, version: s.version ?? '1.0.0', lastUpdated: new Date(s.lastUpdated ?? Date.now()) },
  });

  await prisma.siteSettings.upsert({ where: { id: SINGLETON.settings }, update: { data: s.settings as object }, create: { id: SINGLETON.settings, data: s.settings as object } });
  await prisma.homePageData.upsert({ where: { id: SINGLETON.home }, update: { data: s.homePage as object }, create: { id: SINGLETON.home, data: s.homePage as object } });
  await prisma.aboutPageData.upsert({ where: { id: SINGLETON.about }, update: { data: s.aboutPage as object }, create: { id: SINGLETON.about, data: s.aboutPage as object } });
  if (s.contactPage) {
    await prisma.contactPageData.upsert({ where: { id: SINGLETON.contact }, update: { data: s.contactPage as object }, create: { id: SINGLETON.contact, data: s.contactPage as object } });
  }
  await prisma.monitoringTelemetry.upsert({ where: { id: SINGLETON.monitoring }, update: { data: s.monitoring as object }, create: { id: SINGLETON.monitoring, data: s.monitoring as object } });

  if (s.researchPage) {
    await prisma.researchPageData.upsert({
      where: { id: SINGLETON.research },
      update: { data: s.researchPage as object },
      create: { id: SINGLETON.research, data: s.researchPage as object },
    });
  }

  await prisma.researchBeat.deleteMany();
  for (const beat of Object.values(s.researchBeats)) {
    await prisma.researchBeat.create({
      data: {
        id: beat.id,
        slug: beat.slug ?? null,
        beatNumber: beat.beatNumber,
        category: beat.category,
        name: beat.name,
        nameBn: beat.nameBn ?? null,
        tagline: beat.tagline,
        taglineBn: beat.taglineBn ?? null,
        description: beat.description,
        descriptionBn: beat.descriptionBn ?? null,
        image: beat.image,
        imageBn: beat.imageBn ?? null,
        outputsCount: beat.outputsCount,
        outputsCountBn: beat.outputsCountBn ?? null,
        timeframe: beat.timeframe,
        timeframeBn: beat.timeframeBn ?? null,
        status: beat.status,
        statusBn: beat.statusBn ?? null,
        leadFellows: (beat.leadFellows ?? []) as never,
        leadFellowsBn: (beat.leadFellowsBn ?? null) as never,
        metrics: (beat.metrics ?? []) as never,
        metricsBn: (beat.metricsBn ?? null) as never,
        overview: (beat.overview ?? []) as never,
        overviewBn: (beat.overviewBn ?? null) as never,
        keyQuestions: (beat.keyQuestions ?? []) as never,
        keyQuestionsBn: (beat.keyQuestionsBn ?? null) as never,
        methodologyDetails: (beat.methodologyDetails ?? []) as never,
        methodologyDetailsBn: (beat.methodologyDetailsBn ?? null) as never,
        caseStudies: (beat.caseStudies ?? []) as never,
        caseStudiesBn: (beat.caseStudiesBn ?? null) as never,
        publications: (beat.publications ?? []) as never,
        publicationsBn: (beat.publicationsBn ?? null) as never,
        summary: beat.summary ?? null,
        methodology: beat.methodology ?? null,
        primaryMethodologies: (beat.primaryMethodologies ?? []) as never,
        primaryMethodologiesBn: (beat.primaryMethodologiesBn ?? null) as never,
        sampleInquiries: (beat.sampleInquiries ?? []) as never,
        sampleInquiriesBn: (beat.sampleInquiriesBn ?? null) as never,
        imageTitle: beat.imageTitle ?? null,
        imageTitleBn: beat.imageTitleBn ?? null,
        imageSubtitle: beat.imageSubtitle ?? null,
        imageSubtitleBn: beat.imageSubtitleBn ?? null,
        researchNarrative: beat.researchNarrative ?? null,
        viewCount: beat.viewCount ?? 0,
      },
    });
  }

  await prisma.workProcessPillar.deleteMany();
  for (const pillar of s.workProcessPillars ?? []) {
    await prisma.workProcessPillar.create({
      data: {
        id: pillar.id,
        step: pillar.step,
        title: pillar.title,
        subtitle: pillar.subtitle,
        description: pillar.description,
        highlights: (pillar.highlights ?? []) as never,
        titleBn: pillar.titleBn ?? null,
        subtitleBn: pillar.subtitleBn ?? null,
        descriptionBn: pillar.descriptionBn ?? null,
        highlightsBn: (pillar.highlightsBn ?? null) as never,
      },
    });
  }

  await prisma.teamMember.deleteMany();
  for (let i = 0; i < s.team.length; i++) {
    const m: any = s.team[i];
    await prisma.teamMember.create({
      data: {
        id: m.id,
        name: m.name,
        nameBn: m.nameBn ?? null,
        role: m.role,
        roleBn: m.roleBn ?? null,
        category: m.category,
        teamType: m.teamType,
        image: m.image,
        bio: m.bio,
        bioBn: m.bioBn ?? null,
        fullBio: m.fullBio,
        fullBioBn: m.fullBioBn ?? null,
        researchInterests: (m.researchInterests ?? []) as never,
        researchInterestsBn: (m.researchInterestsBn ?? null) as never,
        focusAreas: (m.focusAreas ?? []) as never,
        focusAreasBn: (m.focusAreasBn ?? null) as never,
        education: m.education,
        educationBn: m.educationBn ?? null,
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