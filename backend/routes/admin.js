const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db/database');
const auth = require('../middleware/auth');

const SECRET = process.env.JWT_SECRET || 'gantu_secret_2026';

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
  if (!admin || !bcrypt.compareSync(password, admin.password))
    return res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu' });
  const token = jwt.sign({ id: admin.id, username: admin.username }, SECRET, { expiresIn: '7d' });
  res.json({ token, username: admin.username });
});

// Stats
router.get('/stats', auth, (req, res) => {
  const total_products = db.prepare('SELECT COUNT(*) as c FROM products').get().c;
  const total_news = db.prepare('SELECT COUNT(*) as c FROM news').get().c;
  const total_contacts = db.prepare('SELECT COUNT(*) as c FROM contacts').get().c;
  const new_contacts = db.prepare("SELECT COUNT(*) as c FROM contacts WHERE status = 'new'").get().c;
  const contacts_by_month = db.prepare(`
    SELECT strftime('%m/%Y', created_at) as month, COUNT(*) as count
    FROM contacts
    WHERE created_at >= date('now', '-6 months')
    GROUP BY strftime('%Y-%m', created_at)
    ORDER BY created_at ASC
  `).all();
  res.json({ total_products, total_news, total_contacts, new_contacts, contacts_by_month });
});

// Products CRUD
router.get('/products', auth, (req, res) => {
  const { page = 1, limit = 15, search = '' } = req.query;
  const offset = (page - 1) * limit;
  const where = search ? `WHERE p.name LIKE '%${search}%' OR p.code LIKE '%${search}%'` : '';
  const products = db.prepare(`
    SELECT p.*, c.name as category_name FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ${where} ORDER BY p.id DESC LIMIT ? OFFSET ?
  `).all(Number(limit), offset);
  const total = db.prepare(`SELECT COUNT(*) as c FROM products p ${where}`).get().c;
  res.json({ products, total, page: Number(page), limit: Number(limit) });
});

router.post('/products', auth, (req, res) => {
  const { category_id, name, slug, code, price, description, specifications, image_url, is_featured } = req.body;
  try {
    const result = db.prepare(`
      INSERT INTO products (category_id, name, slug, code, price, description, specifications, image_url, is_featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(category_id, name, slug || name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''), code, price || 'Liên hệ', description, specifications, image_url, is_featured ? 1 : 0);
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/products/:id', auth, (req, res) => {
  const { category_id, name, slug, code, price, description, specifications, image_url, is_featured, is_active } = req.body;
  try {
    db.prepare(`
      UPDATE products SET category_id=?, name=?, slug=?, code=?, price=?, description=?, specifications=?, image_url=?, is_featured=?, is_active=?
      WHERE id=?
    `).run(category_id, name, slug, code, price, description, specifications, image_url, is_featured ? 1 : 0, is_active !== false ? 1 : 0, req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/products/:id', auth, (req, res) => {
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// News CRUD
router.get('/news', auth, (req, res) => {
  const { page = 1, limit = 15 } = req.query;
  const offset = (page - 1) * limit;
  const news = db.prepare('SELECT * FROM news ORDER BY id DESC LIMIT ? OFFSET ?').all(Number(limit), offset);
  const total = db.prepare('SELECT COUNT(*) as c FROM news').get().c;
  res.json({ news, total });
});

router.post('/news', auth, (req, res) => {
  const { title, slug, excerpt, content, image_url, is_featured } = req.body;
  try {
    const result = db.prepare(`
      INSERT INTO news (title, slug, excerpt, content, image_url, is_featured)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(title, slug || title.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'') + '-' + Date.now(), excerpt, content, image_url, is_featured ? 1 : 0);
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/news/:id', auth, (req, res) => {
  const { title, slug, excerpt, content, image_url, is_featured } = req.body;
  try {
    db.prepare(`
      UPDATE news SET title=?, slug=?, excerpt=?, content=?, image_url=?, is_featured=? WHERE id=?
    `).run(title, slug, excerpt, content, image_url, is_featured ? 1 : 0, req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/news/:id', auth, (req, res) => {
  db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Contacts
router.get('/contacts', auth, (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC LIMIT ? OFFSET ?').all(Number(limit), offset);
  const total = db.prepare('SELECT COUNT(*) as c FROM contacts').get().c;
  res.json({ contacts, total });
});

router.patch('/contacts/:id', auth, (req, res) => {
  db.prepare('UPDATE contacts SET status = ? WHERE id = ?').run(req.body.status, req.params.id);
  res.json({ success: true });
});

router.delete('/contacts/:id', auth, (req, res) => {
  db.prepare('DELETE FROM contacts WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
