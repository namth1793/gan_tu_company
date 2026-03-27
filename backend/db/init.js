// Run before server starts — seeds DB only if empty
try {
  const db = require('./database');
  const row = db.prepare('SELECT COUNT(*) as c FROM categories').get();
  if (row.c === 0) {
    console.log('[init] Database empty — seeding...');
    require('./seed');
    console.log('[init] Seed complete.');
  } else {
    console.log(`[init] Database OK (${row.c} categories found).`);
  }
} catch (err) {
  console.error('[init] Seed error:', err.message);
  // Don't exit — let server start anyway
}
