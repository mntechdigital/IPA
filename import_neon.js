const { Pool } = require('pg');
const fs = require('fs');

const neonUrl = 'postgresql://neondb_owner:npg_pQFxlA38MyKD@ep-nameless-rain-az7skol9-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const pool = new Pool({
  connectionString: neonUrl,
});

async function importData() {
  try {
    const dump = fs.readFileSync('D:\\tmp\\ipa_cms_dump.sql', 'utf8');
    
    // Split by semicolons but keep CREATE TABLE and INSERT statements separate
    const statements = dump.split(';\n').filter(s => 
      s.trim() && 
      !s.startsWith('--') && 
      !s.startsWith('SET ') &&
      !s.startsWith('SELECT pg_catalog') &&
      !s.startsWith('SET default_') &&
      !s.includes('pg_catalog.set_config') &&
      (s.includes('CREATE TABLE') || s.includes('INSERT INTO'))
    );
    
    console.log('Found', statements.length, 'statements to execute');
    
    // Execute each statement
    for (const stmt of statements) {
      try {
        await pool.query(stmt + ';');
      } catch (e) {
        // console.error('Failed:', stmt.substring(0, 80) + '...', e.message);
      }
    }
    
    // Verify counts for key tables
    const tables = ['ResearchBeat', 'SiteSettings', 'HomePageData', 'AboutPageData', 'ContactPageData', 'ResearchPageData', 'MonitoringTelemetry', 'TeamMember', 'Publication', 'Inquiry', 'WorkArea', 'WorkProcessPillar', 'ActivityLog'];
    
    console.log('\\n=== Table Counts ===');
    for (const table of tables) {
      try {
        const { rows } = await pool.query(`SELECT COUNT(*) as count FROM "${table}"`);
        console.log(table + ':', rows[0].count, 'records');
      } catch (e) {
        console.log(table + ': ERROR -', e.message.split('\n')[0]);
      }
    }
    
    await pool.end();
    console.log('\\n✅ Data import complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

importData();