import type { Metadata } from 'next';
import TeamView from '../_components/TeamView';
import { listTeamMembers, getSiteSettings } from '../../../lib/cms-store';
import type { TeamMember, SiteSettings } from '../../../types';

export const metadata: Metadata = {
  title: 'Our Team — IPA Media Research',
  description: 'Meet the researchers, analysts, and media experts behind IPA research.',
};

export default async function TeamPage() {
  let teamMembers: TeamMember[] = [];
  let siteSettings: SiteSettings | null = null;

  try {
    [teamMembers, siteSettings] = await Promise.all([listTeamMembers(), getSiteSettings()]);
  } catch (error) {
    console.error('Failed to fetch team data from CMS:', error);
    try {
      teamMembers = await listTeamMembers();
    } catch {}
  }

  return <TeamView teamMembers={teamMembers} siteSettings={siteSettings} />;
}