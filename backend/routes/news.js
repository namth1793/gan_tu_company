const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET all news
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const totalRow = db.prepare('SELECT COUNT(*) as total FROM news').get();
    const news = db.prepare(`
      SELECT id, title, slug, excerpt, image_url, author, is_featured, view_count, created_at
      FROM news
      ORDER BY is_featured DESC, created_at DESC
      LIMIT ? OFFSET ?
    `).all(parseInt(limit), offset);

    res.json({
      news,
      total: totalRow.total,
      success: true,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalRow.total,
        totalPages: Math.ceil(totalRow.total / parseInt(limit))
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET news by slug or id
router.get('/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const article = db.prepare(
      'SELECT * FROM news WHERE slug = ? OR id = ?'
    ).get(slug, isNaN(slug) ? -1 : parseInt(slug));

    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });

    db.prepare('UPDATE news SET view_count = view_count + 1 WHERE id = ?').run(article.id);

    const related = db.prepare(`
      SELECT id, title, slug, excerpt, image_url, created_at
      FROM news WHERE id != ? ORDER BY RANDOM() LIMIT 4
    `).all(article.id);

    res.json({ success: true, ...article, related });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
