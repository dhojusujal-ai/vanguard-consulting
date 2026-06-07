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
      content.websiteSettings.contactPhone = '+977 9705387380';
      await pool.query("update public.site_content set content = $1 where id = 'main'", [JSON.stringify(content)]);
      console.log("Updated phone number in database!");
    } else {
      console.log("No content found in the database. Wait, let's create it?");
    }
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

main();
