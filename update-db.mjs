import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://postgres.hxgqdgqhvktlmrkwoync:sujal123dhoju@aws-1-ap-south-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  try {
    const result = await pool.query("select content from public.site_content where id = 'main' limit 1;");
    if (result.rows.length > 0) {
      const content = result.rows[0].content;

      // Fix hero highlight capitalization
      if (content.pageSections) {
        content.pageSections.heroHighlight = 'Global Education Starts Here.';
        console.log('Set heroHighlight to: Global Education Starts Here.');
      }

      await pool.query("update public.site_content set content = $1 where id = 'main'", [JSON.stringify(content)]);
      console.log('Database updated successfully!');
    } else {
      console.log('No content found in the database.');
    }
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

main();
