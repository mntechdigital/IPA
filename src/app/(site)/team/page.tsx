import type { Metadata } from 'next';
import TeamView from '../_components/TeamView';
import { listTeamMembers } from '../../../lib/cms-store';
import type { TeamMember } from '../../../types';

export const metadata: Metadata = {
  title: 'Our Team — IPA Media Research',
  description: 'Meet the researchers, analysts, and media experts behind IPA research.',
};

export default async function TeamPage() {
  let teamMembers: TeamMember[] = [];

  try {
    teamMembers = await listTeamMembers();
  } catch (error) {
    console.error('Failed to fetch team members from CMS:', error);
    // Fall back to empty array - component will show loading state or fallback message
  }

  return <TeamView teamMembers={teamMembers} />;
}