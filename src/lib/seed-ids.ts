import { createHash } from 'node:crypto';
import type {
  ActivityLog,
  CmsState,
  HomePageData,
  InquirySubmission,
  PublicationItem,
  ResearchBeat,
  TeamMember,
  WorkArea,
  WorkProcessPillar,
} from '../types';

const NAMESPACE = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';

export function stableUuid(name: string): string {
  const ns = Buffer.from(NAMESPACE.replace(/-/g, ''), 'hex');
  const hash = createHash('sha1').update(ns).update(Buffer.from(name, 'utf8')).digest();
  const bytes = Buffer.from(hash.subarray(0, 16));
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString('hex');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export const SINGLETON = {
  meta: stableUuid('ipa-cms-meta'),
  settings: stableUuid('ipa-site-settings'),
  home: stableUuid('ipa-home-page'),
  about: stableUuid('ipa-about-page'),
  contact: stableUuid('ipa-contact-page'),
  research: stableUuid('ipa-research-page'),
  monitoring: stableUuid('ipa-monitoring'),
};

export function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export function translateSeedState(s: CmsState): CmsState {
  const beatMap = new Map<string, string>();
  const researchBeats: Record<string, ResearchBeat> = {};
  for (const key of Object.keys(s.researchBeats)) {
    if (isUuid(key)) {
      beatMap.set(key, key);
      researchBeats[key] = { ...s.researchBeats[key] };
    } else {
      const uuid = stableUuid(`beat:${key}`);
      beatMap.set(key, uuid);
      researchBeats[uuid] = { ...s.researchBeats[key], id: uuid, slug: s.researchBeats[key].slug ?? key };
    }
  }

  const teamMap = new Map<string, string>();
  const team: TeamMember[] = s.team.map((m) => {
    const uuid = isUuid(m.id) ? m.id : stableUuid(`team:${m.id}`);
    teamMap.set(m.id, uuid);
    return { ...m, id: uuid };
  });

  const workAreaMap = new Map<string, string>();
  const workAreas: WorkArea[] = (s.workAreas ?? []).map((wa) => {
    const uuid = isUuid(wa.id) ? wa.id : stableUuid(`work-area:${wa.id}`);
    workAreaMap.set(wa.id, uuid);
    return { ...wa, id: uuid };
  });

  const workPillarMap = new Map<string, string>();
  const workProcessPillars: WorkProcessPillar[] = (s.workProcessPillars ?? []).map((wp) => {
    const uuid = isUuid(wp.id) ? wp.id : stableUuid(`work-pillar:${wp.id}`);
    workPillarMap.set(wp.id, uuid);
    return { ...wp, id: uuid };
  });

  const publications: PublicationItem[] = s.publications.map((p) => ({
    ...p,
    id: isUuid(p.id) ? p.id : stableUuid(`pub:${p.id}`),
    beatId: p.beatId ? (beatMap.get(p.beatId) ?? p.beatId) : undefined,
  }));

  const translateBeatRefs = (ids?: string[]) => (ids ?? []).map((id) => beatMap.get(id) ?? id);
  const translateTeamRefs = (ids?: string[]) =>
    (ids ?? []).map((id) => teamMap.get(id) ?? id);

  const homePage: HomePageData = {
    ...s.homePage,
    featuredInquiryIds: translateBeatRefs(s.homePage.featuredInquiryIds),
    areasOfInvestigation: s.homePage.areasOfInvestigation
      ? { ...s.homePage.areasOfInvestigation, activeCategoryIds: translateBeatRefs(s.homePage.areasOfInvestigation.activeCategoryIds) }
      : s.homePage.areasOfInvestigation,
    featuredTeam: s.homePage.featuredTeam
      ? { ...s.homePage.featuredTeam, featuredMemberIds: translateTeamRefs(s.homePage.featuredTeam.featuredMemberIds) }
      : s.homePage.featuredTeam,
  };

  const inquiries: InquirySubmission[] = s.inquiries.map((q) => ({ ...q, id: isUuid(q.id) ? q.id : stableUuid(`inq:${q.id}`) }));
  const activityLogs: ActivityLog[] = (s.activityLogs ?? []).map((l) => ({ ...l, id: isUuid(l.id) ? l.id : stableUuid(`act:${l.id}`) }));

  return {
    ...s,
    homePage,
    researchBeats,
    team,
    publications,
    inquiries,
    activityLogs,
    workAreas,
    workProcessPillars,
  };
}