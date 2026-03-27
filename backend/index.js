const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5011;

// Auto-seed database on startup if empty
const db = require('./db/database');
const count = db.prepare('SELECT COUNT(*) as c FROM categories').get();
if (count.c === 0) {
  console.log('Database empty, seeding...');
  require('./db/seed');
}

app.use(cors({
  origin: true, // allow all origins (Railway + Vercel + localhost)
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/news', require('./routes/news'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/videos', require('./routes/videos'));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Gan Tu API is running', port: PORT });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Gan Tu Backend running at http://0.0.0.0:${PORT}`);
});
