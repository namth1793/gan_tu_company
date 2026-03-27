// Single entry point for Railway deployment
// Handles init + server start in one process

const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Init DB and seed if needed
try {
  const db = require('./db/database');
  const row = db.prepare('SELECT COUNT(*) as c FROM categories').get();
  if (row.c === 0) {
    console.log('[server] Seeding database...');
    require('./db/seed');
    console.log('[server] Seed done.');
  } else {
    console.log(`[server] DB ready (${row.c} categories).`);
  }
} catch (err) {
  console.error('[server] DB init error:', err.message);
}

// Start Express
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5011;

app.use(cors({ origin: '*', methods: ['GET','POST','PUT','DELETE','OPTIONS'], allowedHeaders: ['Content-Type','Authorization'] }));
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/products',   require('./routes/products'));
app.use('/api/news',       require('./routes/news'));
app.use('/api/contact',    require('./routes/contact'));
app.use('/api/videos',     require('./routes/videos'));
app.use('/api/admin',      require('./routes/admin'));

app.get('/api/health', (req, res) => res.json({ success: true, message: 'Gan Tu API running', port: PORT }));
app.get('/',            (req, res) => res.json({ message: 'Gan Tu API', health: '/api/health' }));

app.listen(PORT, '0.0.0.0', () => console.log(`[server] Listening on port ${PORT}`));
