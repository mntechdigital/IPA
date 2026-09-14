import 'server-only';

import type { HomePageData, ResearchBeat, SiteSettings, TeamMember } from '../types';
import { getHomePage, getSiteSettings, listResearchBeats, listTeamMembers } from './cms-store';

export interface SiteContent {
  settings: Partial<SiteSettings>;
  homePage: Partial<HomePageData>;
  beats: ResearchBeat[];
  featuredBeats: ResearchBeat[];
  team: TeamMember[];
  featuredTeamMembers: TeamMember[];
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const [settings, homePage, beats, team] = await Promise.all([
      getSiteSettings(),
      getHomePage(),
      listResearchBeats(),
      listTeamMembers(),
    ]);

    const beatList = beats ?? [];
    const teamList = team ?? [];

    const featuredIds = homePage?.featuredInquiryIds ?? [];
    const featuredBeats = featuredIds.length
      ? featuredIds
          .map((id) => beatList.find((b) => b.id === id || b.slug === id))
          .filter((b): b is ResearchBeat => Boolean(b))
      : [];
    const featuredList = featuredBeats.length ? featuredBeats : beatList;

    const featuredTeamIds = homePage?.featuredTeam?.showOnHome ? homePage.featuredTeam.featuredMemberIds ?? [] : [];
    const featuredTeamMembers = featuredTeamIds.length
      ? featuredTeamIds
          .map((id) => teamList.find((m) => m.id === id))
          .filter((m): m is TeamMember => Boolean(m))
      : [];
    const featuredTeamList = featuredTeamMembers.length ? featuredTeamMembers : teamList.slice(0, 4);

    return {
      settings: (settings ?? {}) as Partial<SiteSettings>,
      homePage: (homePage ?? {}) as Partial<HomePageData>,
      beats: beatList,
      featuredBeats: featuredList,
      team: teamList,
      featuredTeamMembers: featuredTeamList,
    };
  } catch (err) {
    console.error('site-content: falling back to static content', err);
    return {
      settings: {},
      homePage: {},
      beats: [],
      featuredBeats: [],
      team: [],
      featuredTeamMembers: [],
    };
  }
}