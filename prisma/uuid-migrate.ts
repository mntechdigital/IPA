import { PrismaClient } from '@prisma/client';
import { SINGLETON, stableUuid } from '../src/lib/seed-ids';

const prisma = new PrismaClient();

type IdRow = { id: string; [k: string]: any };

async function main() {
  const already = await prisma.$queryRawUnsafe<IdRow[]>(`SELECT id FROM \`HomePageData\` LIMIT 1`);
  if (already.length && already[0].id === SINGLETON.home) {
    console.log('Data migration already applied — skipping.');
    return;
  }

  const beats = await prisma.$queryRawUnsafe<IdRow[]>(`SELECT * FROM \`ResearchBeat\``);
  const team = await prisma.$queryRawUnsafe<IdRow[]>(`SELECT * FROM \`TeamMember\``);
  const pubs = await prisma.$queryRawUnsafe<IdRow[]>(`SELECT * FROM \`Publication\``);
  const inqs = await prisma.$queryRawUnsafe<IdRow[]>(`SELECT * FROM \`Inquiry\``);
  const logs = await prisma.$queryRawUnsafe<IdRow[]>(`SELECT * FROM \`ActivityLog\``);

  const beatMap = new Map<string, string>(beats.map((b) => [b.id, stableUuid(`beat:${b.id}`)]));
  const teamMap = new Map<string, string>(team.map((t) => [t.id, stableUuid(`team:${t.id}`)]));

  for (const b of beats) {
    await prisma.$executeRawUnsafe(`UPDATE \`ResearchBeat\` SET \`id\` = ?, \`slug\` = ? WHERE \`id\` = ?`, beatMap.get(b.id), b.id, b.id);
  }
  for (const t of team) {
    await prisma.$executeRawUnsafe(`UPDATE \`TeamMember\` SET \`id\` = ? WHERE \`id\` = ?`, teamMap.get(t.id), t.id);
  }
  for (const p of pubs) {
    const newBeat = p.beatId ? (beatMap.get(p.beatId) ?? null) : null;
    await prisma.$executeRawUnsafe(`UPDATE \`Publication\` SET \`id\` = ?, \`beatId\` = ? WHERE \`id\` = ?`, stableUuid(`pub:${p.id}`), newBeat, p.id);
  }
  for (const q of inqs) {
    await prisma.$executeRawUnsafe(`UPDATE \`Inquiry\` SET \`id\` = ? WHERE \`id\` = ?`, stableUuid(`inq:${q.id}`), q.id);
  }
  for (const l of logs) {
    await prisma.$executeRawUnsafe(`UPDATE \`ActivityLog\` SET \`id\` = ? WHERE \`id\` = ?`, stableUuid(`act:${l.id}`), l.id);
  }

  const translateHome = (d: any) => {
    if (Array.isArray(d.featuredInquiryIds)) {
      d.featuredInquiryIds = d.featuredInquiryIds.map((x) => beatMap.get(x) ?? x);
    }
    if (d.areasOfInvestigation && Array.isArray(d.areasOfInvestigation.activeCategoryIds)) {
      d.areasOfInvestigation.activeCategoryIds = d.areasOfInvestigation.activeCategoryIds.map((x) => beatMap.get(x) ?? x);
    }
    if (d.featuredTeam && Array.isArray(d.featuredTeam.featuredMemberIds)) {
      d.featuredTeam.featuredMemberIds = d.featuredTeam.featuredMemberIds.map((x) => teamMap.get(x) ?? x);
    }
    return d;
  };

  const rewriteSingleton = async (table: string, newId: string, transform?: (d: any) => any) => {
    const rows = await prisma.$queryRawUnsafe<IdRow[]>(`SELECT * FROM \`${table}\` LIMIT 1`);
    if (!rows.length) return;
    const row = rows[0];
    if (transform && row.data !== undefined && row.data !== null) {
      const parsed = typeof row.data === 'string' ? JSON.parse(row.data) : row.data;
      await prisma.$executeRawUnsafe(`UPDATE \`${table}\` SET \`id\` = ?, \`data\` = ? WHERE \`id\` = ?`, newId, JSON.stringify(transform(parsed)), row.id);
    } else {
      await prisma.$executeRawUnsafe(`UPDATE \`${table}\` SET \`id\` = ? WHERE \`id\` = ?`, newId, row.id);
    }
  };

  await rewriteSingleton('HomePageData', SINGLETON.home, translateHome);
  await rewriteSingleton('SiteSettings', SINGLETON.settings);
  await rewriteSingleton('AboutPageData', SINGLETON.about);
  await rewriteSingleton('ContactPageData', SINGLETON.contact);
  await rewriteSingleton('MonitoringTelemetry', SINGLETON.monitoring);

  const meta = await prisma.$queryRawUnsafe<IdRow[]>(`SELECT * FROM \`CmsMeta\` LIMIT 1`);
  if (meta.length) {
    await prisma.$executeRawUnsafe(`UPDATE \`CmsMeta\` SET \`id\` = ? WHERE \`id\` = ?`, SINGLETON.meta, meta[0].id);
  }

  console.log(`UUID migration complete: ${beats.length} beats, ${team.length} team, ${pubs.length} publications, ${inqs.length} inquiries, ${logs.length} activity logs, 6 singletons.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });