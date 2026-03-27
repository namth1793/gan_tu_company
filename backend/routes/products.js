const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET featured products
router.get('/featured', (req, res) => {
  try {
    const { limit = 8 } = req.query;
    const products = db.prepare(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_featured = 1 AND p.is_active = 1
      ORDER BY p.created_at DESC
      LIMIT ?
    `).all(parseInt(limit));
    res.json({ products, total: products.length, success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET all products with filters
router.get('/', (req, res) => {
  try {
    const { category_id, cat_slug, page = 1, limit = 12, search = '' } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let whereClause = 'WHERE p.is_active = 1';
    const params = [];

    if (cat_slug) {
      whereClause += ' AND c.slug = ?';
      params.push(cat_slug);
    } else if (category_id) {
      whereClause += ' AND p.category_id = ?';
      params.push(parseInt(category_id));
    }
    if (search) {
      whereClause += ' AND (p.name LIKE ? OR p.code LIKE ? OR p.description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    const totalRow = db.prepare(`
      SELECT COUNT(*) as total
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ${whereClause}
    `).get(...params);

    const products = db.prepare(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ${whereClause}
      ORDER BY p.is_featured DESC, p.created_at DESC
      LIMIT ? OFFSET ?
    `).all(...params, parseInt(limit), offset);

    res.json({
      products,
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

// GET product by slug or id
router.get('/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    let product = db.prepare(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE (p.slug = ? OR p.id = ?) AND p.is_active = 1
    `).get(slug, isNaN(slug) ? -1 : parseInt(slug));

    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    db.prepare('UPDATE products SET view_count = view_count + 1 WHERE id = ?').run(product.id);

    const related = db.prepare(`
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = ? AND p.id != ? AND p.is_active = 1
      LIMIT 4
    `).all(product.category_id, product.id);

    res.json({ success: true, ...product, related });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
