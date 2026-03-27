const express = require('express');
const router = express.Router();
const db = require('../db/database');

// POST contact form
router.post('/', (req, res) => {
  try {
    const { full_name, phone, email, company, message, product_interest } = req.body;

    if (!full_name || !phone) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập họ tên và số điện thoại' });
    }

    const result = db.prepare(`
      INSERT INTO contacts (full_name, phone, email, company, message, product_interest)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(full_name, phone, email || null, company || null, message || null, product_interest || null);

    res.json({
      success: true,
      message: 'Yêu cầu của bạn đã được gửi thành công! Chúng tôi sẽ liên hệ trong vòng 24 giờ.',
      id: result.lastInsertRowid
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET all contacts (admin)
router.get('/', (req, res) => {
  try {
    const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
