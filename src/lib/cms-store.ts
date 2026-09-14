import 'server-only';

import { db } from './db';
import {
  AboutPageData,
  ActivityLog,
  CmsState,
  ContactPageData,
  HomePageData,
  InquirySubmission,
  MonitoringTelemetry,
  PublicationItem,
  ResearchBeat,
  SiteSettings,
  TeamMember,
} from '../types';
import { INITIAL_CMS_STATE } from '../data/initialData';
import { SINGLETON, translateSeedState } from './seed-ids';

function nowIso(): string {
  return new Date().toISOString();
}

export async function getCmsMeta(): Promise<{ version: string; lastUpdated: string }> {
  const meta = await db.cmsMeta.findUnique({ where: { id: SINGLETON.meta } });
  return { version: meta?.version ?? '1.0.0', lastUpdated: meta?.lastUpdated.toISOString() ?? nowIso() };
}

// ---------- Singleton page blobs ----------

export async function getHomePage(): Promise<HomePageData> {
  const row = await db.homePageData.findUnique({ where: { id: SINGLETON.home } });
  return (row?.data ?? {}) as unknown as HomePageData;
}

export async function updateHomePage(data: HomePageData): Promise<void> {
  await db.homePageData.upsert({ where: { id: SINGLETON.home }, update: { data: data as object }, create: { id: SINGLETON.home, data: data as object } });
}

export async function getAboutPage(): Promise<AboutPageData> {
  const row = await db.aboutPageData.findUnique({ where: { id: SINGLETON.about } });
  return (row?.data ?? {}) as unknown as AboutPageData;
}

export async function updateAboutPage(data: AboutPageData): Promise<void> {
  await db.aboutPageData.upsert({ where: { id: SINGLETON.about }, update: { data: data as object }, create: { id: SINGLETON.about, data: data as object } });
}

export async function getContactPage(): Promise<ContactPageData | null> {
  const row = await db.contactPageData.findUnique({ where: { id: SINGLETON.contact } });
  return row ? (row.data as unknown as ContactPageData) : null;
}

export async function updateContactPage(data: ContactPageData): Promise<void> {
  await db.contactPageData.upsert({ where: { id: SINGLETON.contact }, update: { data: data as object }, create: { id: SINGLETON.contact, data: data as object } });
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const row = await db.siteSettings.findUnique({ where: { id: SINGLETON.settings } });
  return (row?.data ?? {}) as unknown as SiteSettings;
}

export async function updateSiteSettings(data: SiteSettings): Promise<void> {
  await db.siteSettings.upsert({ where: { id: SINGLETON.settings }, update: { data: data as object }, create: { id: SINGLETON.settings, data: data as object } });
}

export async function getMonitoring(): Promise<MonitoringTelemetry> {
  const row = await db.monitoringTelemetry.findUnique({ where: { id: SINGLETON.monitoring } });
  return (row?.data ?? {}) as unknown as MonitoringTelemetry;
}

export async function updateMonitoring(data: MonitoringTelemetry): Promise<void> {
  await db.monitoringTelemetry.upsert({ where: { id: SINGLETON.monitoring }, update: { data: data as object }, create: { id: SINGLETON.monitoring, data: data as object } });
}

// ---------- Research beats ----------

export async function listResearchBeats(): Promise<ResearchBeat[]> {
  const rows = await db.researchBeat.findMany({ orderBy: { beatNumber: 'asc' } });
  return rows as unknown as ResearchBeat[];
}

export async function getResearchBeat(id: string): Promise<ResearchBeat | null> {
  const row = await db.researchBeat.findUnique({ where: { id } });
  return row ? (row as unknown as ResearchBeat) : null;
}

export async function createResearchBeat(data: ResearchBeat): Promise<ResearchBeat> {
  const row = await db.researchBeat.create({
    data: {
      id: data.id || undefined,
      slug: data.slug || undefined,
      beatNumber: data.beatNumber,
      category: data.category,
      name: data.name,
      tagline: data.tagline,
      description: data.description,
      image: data.image,
      outputsCount: data.outputsCount,
      timeframe: data.timeframe,
      status: data.status,
      leadFellows: (data.leadFellows ?? []) as never,
      metrics: (data.metrics ?? []) as never,
      overview: (data.overview ?? []) as never,
      keyQuestions: (data.keyQuestions ?? []) as never,
      methodologyDetails: (data.methodologyDetails ?? []) as never,
      caseStudies: (data.caseStudies ?? []) as never,
      publications: (data.publications ?? []) as never,
      summary: data.summary,
      methodology: data.methodology,
      primaryMethodologies: (data.primaryMethodologies ?? []) as never,
      imageTitle: data.imageTitle,
      imageSubtitle: data.imageSubtitle,
      researchNarrative: data.researchNarrative,
      viewCount: data.viewCount ?? 0,
    },
  });
  return row as unknown as ResearchBeat;
}

export async function updateResearchBeat(id: string, data: ResearchBeat): Promise<ResearchBeat> {
  const row = await db.researchBeat.update({
    where: { id },
    data: {
      beatNumber: data.beatNumber,
      category: data.category,
      name: data.name,
      tagline: data.tagline,
      description: data.description,
      image: data.image,
      outputsCount: data.outputsCount,
      timeframe: data.timeframe,
      status: data.status,
      leadFellows: (data.leadFellows ?? []) as never,
      metrics: (data.metrics ?? []) as never,
      overview: (data.overview ?? []) as never,
      keyQuestions: (data.keyQuestions ?? []) as never,
      methodologyDetails: (data.methodologyDetails ?? []) as never,
      caseStudies: (data.caseStudies ?? []) as never,
      publications: (data.publications ?? []) as never,
      summary: data.summary,
      methodology: data.methodology,
      primaryMethodologies: (data.primaryMethodologies ?? []) as never,
      imageTitle: data.imageTitle,
      imageSubtitle: data.imageSubtitle,
      researchNarrative: data.researchNarrative,
      viewCount: data.viewCount ?? 0,
    },
  });
  return row as unknown as ResearchBeat;
}

export async function deleteResearchBeat(id: string): Promise<void> {
  await db.researchBeat.delete({ where: { id } });
}

// ---------- Team ----------

export async function listTeamMembers(): Promise<TeamMember[]> {
  const rows = await db.teamMember.findMany({ orderBy: { order: 'asc' } });
  return rows as unknown as TeamMember[];
}

export async function getTeamMember(id: string): Promise<TeamMember | null> {
  const row = await db.teamMember.findUnique({ where: { id } });
  return row ? (row as unknown as TeamMember) : null;
}

export async function createTeamMember(data: TeamMember): Promise<TeamMember> {
  const row = await db.teamMember.create({
    data: {
      id: data.id || undefined,
      name: data.name,
      role: data.role,
      category: data.category,
      teamType: data.teamType,
      image: data.image,
      bio: data.bio,
      fullBio: data.fullBio,
      researchInterests: (data.researchInterests ?? []) as never,
      focusAreas: (data.focusAreas ?? []) as never,
      education: data.education,
      recentPublications: (data.recentPublications ?? []) as never,
      email: data.email,
      twitter: data.twitter,
      linkedin: data.linkedin,
      scholar: data.scholar,
      order: data.order ?? 0,
    },
  });
  return row as unknown as TeamMember;
}

export async function updateTeamMember(id: string, data: TeamMember): Promise<TeamMember> {
  const row = await db.teamMember.update({
    where: { id },
    data: {
      name: data.name,
      role: data.role,
      category: data.category,
      teamType: data.teamType,
      image: data.image,
      bio: data.bio,
      fullBio: data.fullBio,
      researchInterests: (data.researchInterests ?? []) as never,
      focusAreas: (data.focusAreas ?? []) as never,
      education: data.education,
      recentPublications: (data.recentPublications ?? []) as never,
      email: data.email,
      twitter: data.twitter,
      linkedin: data.linkedin,
      scholar: data.scholar,
      order: data.order ?? 0,
    },
  });
  return row as unknown as TeamMember;
}

export async function deleteTeamMember(id: string): Promise<void> {
  await db.teamMember.delete({ where: { id } });
}

// ---------- Publications ----------

export async function listPublications(): Promise<PublicationItem[]> {
  const rows = await db.publication.findMany({ orderBy: { date: 'desc' } });
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    type: r.type,
    date: r.date,
    pagesOrSize: r.pagesOrSize,
    beatId: r.beatId ?? undefined,
    downloadUrl: r.downloadUrl ?? undefined,
    abstract: r.abstract ?? undefined,
    status: r.status ?? undefined,
  }));
}

export async function getPublication(id: string): Promise<PublicationItem | null> {
  const row = await db.publication.findUnique({ where: { id } });
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    type: row.type,
    date: row.date,
    pagesOrSize: row.pagesOrSize,
    beatId: row.beatId ?? undefined,
    downloadUrl: row.downloadUrl ?? undefined,
    abstract: row.abstract ?? undefined,
    status: row.status ?? undefined,
  };
}

export async function createPublication(data: PublicationItem): Promise<PublicationItem> {
  const row = await db.publication.create({
    data: {
      id: data.id || undefined,
      title: data.title,
      type: data.type,
      date: data.date,
      pagesOrSize: data.pagesOrSize ?? '',
      beatId: data.beatId ?? null,
      downloadUrl: data.downloadUrl ?? null,
      abstract: data.abstract ?? null,
      status: data.status ?? null,
    },
  });
  return { ...row, pagesOrSize: row.pagesOrSize, beatId: row.beatId ?? undefined } as PublicationItem;
}

export async function updatePublication(id: string, data: PublicationItem): Promise<PublicationItem> {
  const row = await db.publication.update({
    where: { id },
    data: {
      title: data.title,
      type: data.type,
      date: data.date,
      pagesOrSize: data.pagesOrSize ?? '',
      beatId: data.beatId ?? null,
      downloadUrl: data.downloadUrl ?? null,
      abstract: data.abstract ?? null,
      status: data.status ?? null,
    },
  });
  return { ...row, beatId: row.beatId ?? undefined } as PublicationItem;
}

export async function deletePublication(id: string): Promise<void> {
  await db.publication.delete({ where: { id } });
}

// ---------- Inquiries ----------

export async function listInquiries(): Promise<InquirySubmission[]> {
  const rows = await db.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
  return rows.map((r) => ({
    id: r.id,
    date: r.date,
    name: r.name,
    organization: r.organization,
    email: r.email,
    topic: r.topic,
    message: r.message,
    requestedDataset: r.requestedDataset ?? undefined,
    status: r.status as InquirySubmission['status'],
    notes: r.notes ?? undefined,
  }));
}

export async function updateInquiry(id: string, data: Partial<Pick<InquirySubmission, 'status' | 'notes'>>): Promise<InquirySubmission> {
  const row = await db.inquiry.update({
    where: { id },
    data: { status: data.status, notes: data.notes ?? null },
  });
  return {
    id: row.id,
    date: row.date,
    name: row.name,
    organization: row.organization,
    email: row.email,
    topic: row.topic,
    message: row.message,
    requestedDataset: row.requestedDataset ?? undefined,
    status: row.status as InquirySubmission['status'],
    notes: row.notes ?? undefined,
  };
}

// ---------- Activity ----------

export async function listActivityLogs(): Promise<ActivityLog[]> {
  const rows = await db.activityLog.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
  return rows.map((r) => ({ id: r.id, timestamp: r.timestamp, action: r.action, section: r.section, user: r.user }));
}

// ---------- Create helpers ----------

export async function createInquiry(data: Omit<InquirySubmission, 'id' | 'date'>): Promise<InquirySubmission> {
  const date = new Date().toISOString().slice(0, 10);
  const row = await db.inquiry.create({
    data: { date, name: data.name, organization: data.organization, email: data.email, topic: data.topic, message: data.message, requestedDataset: data.requestedDataset ?? null, status: data.status ?? 'new', notes: null },
  });
  return { id: row.id, date: row.date, name: row.name, organization: row.organization, email: row.email, topic: row.topic, message: row.message, requestedDataset: row.requestedDataset ?? undefined, status: row.status as InquirySubmission['status'] };
}

// ---------- Reset / Import ----------

export async function resetCmsData(): Promise<void> {
  await db.activityLog.deleteMany();
  await db.inquiry.deleteMany();
  await db.publication.deleteMany();
  await db.teamMember.deleteMany();
  await db.researchBeat.deleteMany();
  await db.monitoringTelemetry.deleteMany();
  await db.contactPageData.deleteMany();
  await db.aboutPageData.deleteMany();
  await db.homePageData.deleteMany();
  await db.siteSettings.deleteMany();
  await db.cmsMeta.deleteMany();

  const s = translateSeedState(INITIAL_CMS_STATE);
  await db.cmsMeta.create({ data: { id: SINGLETON.meta, version: s.version ?? '1.0.0', lastUpdated: new Date(s.lastUpdated ?? Date.now()) } });
  await db.siteSettings.create({ data: { id: SINGLETON.settings, data: s.settings as object } });
  await db.homePageData.create({ data: { id: SINGLETON.home, data: s.homePage as object } });
  await db.aboutPageData.create({ data: { id: SINGLETON.about, data: s.aboutPage as object } });
  if (s.contactPage) await db.contactPageData.create({ data: { id: SINGLETON.contact, data: s.contactPage as object } });
  await db.monitoringTelemetry.create({ data: { id: SINGLETON.monitoring, data: s.monitoring as object } });
  for (const beat of Object.values(s.researchBeats)) {
    await db.researchBeat.create({ data: { id: beat.id, slug: beat.slug ?? null, beatNumber: beat.beatNumber, category: beat.category, name: beat.name, tagline: beat.tagline, description: beat.description, image: beat.image, outputsCount: beat.outputsCount, timeframe: beat.timeframe, status: beat.status, leadFellows: (beat.leadFellows ?? []) as never, metrics: (beat.metrics ?? []) as never, overview: (beat.overview ?? []) as never, keyQuestions: (beat.keyQuestions ?? []) as never, methodologyDetails: (beat.methodologyDetails ?? []) as never, caseStudies: (beat.caseStudies ?? []) as never, publications: (beat.publications ?? []) as never, summary: beat.summary, methodology: beat.methodology, primaryMethodologies: (beat.primaryMethodologies ?? []) as never, imageTitle: beat.imageTitle, imageSubtitle: beat.imageSubtitle, researchNarrative: beat.researchNarrative, viewCount: beat.viewCount ?? 0 } });
  }
  for (let i = 0; i < s.team.length; i++) { const m = s.team[i]; await db.teamMember.create({ data: { id: m.id, name: m.name, role: m.role, category: m.category, teamType: m.teamType, image: m.image, bio: m.bio, fullBio: m.fullBio, researchInterests: (m.researchInterests ?? []) as never, focusAreas: (m.focusAreas ?? []) as never, education: m.education, recentPublications: (m.recentPublications ?? []) as never, email: m.email, twitter: m.twitter, linkedin: m.linkedin, scholar: m.scholar, order: m.order ?? i } }); }
  for (const pub of s.publications) { await db.publication.create({ data: { id: pub.id, title: pub.title, type: pub.type, date: pub.date, pagesOrSize: pub.pagesOrSize ?? '', beatId: pub.beatId ?? null, downloadUrl: pub.downloadUrl ?? null, abstract: pub.abstract ?? null, status: pub.status ?? null } }); }
  for (const q of s.inquiries) { await db.inquiry.create({ data: { id: q.id, date: q.date, name: q.name, organization: q.organization, email: q.email, topic: q.topic, message: q.message, requestedDataset: q.requestedDataset ?? null, status: q.status, notes: q.notes ?? null } }); }
  for (const log of s.activityLogs) { await db.activityLog.create({ data: { id: log.id, timestamp: log.timestamp, action: log.action, section: log.section, user: log.user } }); }
}

export async function importCmsState(payload: Partial<CmsState>): Promise<void> {
  const merged = { ...INITIAL_CMS_STATE, ...payload, settings: { ...INITIAL_CMS_STATE.settings, ...(payload.settings || {}) }, homePage: { ...INITIAL_CMS_STATE.homePage, ...(payload.homePage || {}) }, aboutPage: { ...INITIAL_CMS_STATE.aboutPage, ...(payload.aboutPage || {}) }, contactPage: payload.contactPage || INITIAL_CMS_STATE.contactPage, researchBeats: payload.researchBeats ?? INITIAL_CMS_STATE.researchBeats, team: payload.team ?? INITIAL_CMS_STATE.team, publications: payload.publications ?? INITIAL_CMS_STATE.publications, monitoring: payload.monitoring ?? INITIAL_CMS_STATE.monitoring, inquiries: payload.inquiries ?? INITIAL_CMS_STATE.inquiries, activityLogs: payload.activityLogs ?? [] };
  const s = translateSeedState(merged);
  await resetCmsData();
  await db.cmsMeta.update({ where: { id: SINGLETON.meta }, data: { version: s.version ?? '1.0.0', lastUpdated: new Date(s.lastUpdated ?? Date.now()) } });
  await db.siteSettings.update({ where: { id: SINGLETON.settings }, data: { data: s.settings as object } });
  await db.homePageData.update({ where: { id: SINGLETON.home }, data: { data: s.homePage as object } });
  await db.aboutPageData.update({ where: { id: SINGLETON.about }, data: { data: s.aboutPage as object } });
  if (s.contactPage) { await db.contactPageData.upsert({ where: { id: SINGLETON.contact }, update: { data: s.contactPage as object }, create: { id: SINGLETON.contact, data: s.contactPage as object } }); }
  await db.monitoringTelemetry.update({ where: { id: SINGLETON.monitoring }, data: { data: s.monitoring as object } });
  for (const beat of Object.values(s.researchBeats)) {
    await db.researchBeat.upsert({ where: { id: beat.id }, update: { slug: beat.slug ?? null, beatNumber: beat.beatNumber, category: beat.category, name: beat.name, tagline: beat.tagline, description: beat.description, image: beat.image, outputsCount: beat.outputsCount, timeframe: beat.timeframe, status: beat.status, leadFellows: (beat.leadFellows ?? []) as never, metrics: (beat.metrics ?? []) as never, overview: (beat.overview ?? []) as never, keyQuestions: (beat.keyQuestions ?? []) as never, methodologyDetails: (beat.methodologyDetails ?? []) as never, caseStudies: (beat.caseStudies ?? []) as never, publications: (beat.publications ?? []) as never, summary: beat.summary, methodology: beat.methodology, primaryMethodologies: (beat.primaryMethodologies ?? []) as never, imageTitle: beat.imageTitle, imageSubtitle: beat.imageSubtitle, researchNarrative: beat.researchNarrative, viewCount: beat.viewCount ?? 0 }, create: { id: beat.id, slug: beat.slug ?? null, beatNumber: beat.beatNumber, category: beat.category, name: beat.name, tagline: beat.tagline, description: beat.description, image: beat.image, outputsCount: beat.outputsCount, timeframe: beat.timeframe, status: beat.status, leadFellows: (beat.leadFellows ?? []) as never, metrics: (beat.metrics ?? []) as never, overview: (beat.overview ?? []) as never, keyQuestions: (beat.keyQuestions ?? []) as never, methodologyDetails: (beat.methodologyDetails ?? []) as never, caseStudies: (beat.caseStudies ?? []) as never, publications: (beat.publications ?? []) as never, summary: beat.summary, methodology: beat.methodology, primaryMethodologies: (beat.primaryMethodologies ?? []) as never, imageTitle: beat.imageTitle, imageSubtitle: beat.imageSubtitle, researchNarrative: beat.researchNarrative, viewCount: beat.viewCount ?? 0 } });
  }
  for (let i = 0; i < s.team.length; i++) { const m = s.team[i]; await db.teamMember.upsert({ where: { id: m.id }, update: { name: m.name, role: m.role, category: m.category, teamType: m.teamType, image: m.image, bio: m.bio, fullBio: m.fullBio, researchInterests: (m.researchInterests ?? []) as never, focusAreas: (m.focusAreas ?? []) as never, education: m.education, recentPublications: (m.recentPublications ?? []) as never, email: m.email, twitter: m.twitter, linkedin: m.linkedin, scholar: m.scholar, order: m.order ?? i }, create: { id: m.id, name: m.name, role: m.role, category: m.category, teamType: m.teamType, image: m.image, bio: m.bio, fullBio: m.fullBio, researchInterests: (m.researchInterests ?? []) as never, focusAreas: (m.focusAreas ?? []) as never, education: m.education, recentPublications: (m.recentPublications ?? []) as never, email: m.email, twitter: m.twitter, linkedin: m.linkedin, scholar: m.scholar, order: m.order ?? i } }); }
  for (const pub of s.publications) { await db.publication.upsert({ where: { id: pub.id }, update: { title: pub.title, type: pub.type, date: pub.date, pagesOrSize: pub.pagesOrSize ?? '', beatId: pub.beatId ?? null, downloadUrl: pub.downloadUrl ?? null, abstract: pub.abstract ?? null, status: pub.status ?? null }, create: { id: pub.id, title: pub.title, type: pub.type, date: pub.date, pagesOrSize: pub.pagesOrSize ?? '', beatId: pub.beatId ?? null, downloadUrl: pub.downloadUrl ?? null, abstract: pub.abstract ?? null, status: pub.status ?? null } }); }
  for (const q of s.inquiries) { await db.inquiry.upsert({ where: { id: q.id }, update: { date: q.date, name: q.name, organization: q.organization, email: q.email, topic: q.topic, message: q.message, requestedDataset: q.requestedDataset ?? null, status: q.status, notes: q.notes ?? null }, create: { id: q.id, date: q.date, name: q.name, organization: q.organization, email: q.email, topic: q.topic, message: q.message, requestedDataset: q.requestedDataset ?? null, status: q.status, notes: q.notes ?? null } }); }
}

// ---------- Full snapshot ----------

export async function getCmsStateSnapshot(): Promise<Partial<CmsState>> {
  const [settings, homePage, aboutPage, contactPage, researchBeats, team, publications, monitoring, inquiries, activityLogs, meta] =
    await Promise.all([
      getSiteSettings(),
      getHomePage(),
      getAboutPage(),
      getContactPage(),
      listResearchBeats(),
      listTeamMembers(),
      listPublications(),
      getMonitoring(),
      listInquiries(),
      listActivityLogs(),
      getCmsMeta(),
    ]);

  const beatsRecord: Record<string, ResearchBeat> = {};
  for (const b of researchBeats) {
    beatsRecord[b.id] = b;
  }
  return {
    version: meta.version,
    lastUpdated: meta.lastUpdated,
    settings,
    homePage,
    aboutPage,
    contactPage: contactPage ?? undefined,
    researchBeats: beatsRecord,
    team,
    publications,
    monitoring,
    inquiries,
    activityLogs,
  };
}