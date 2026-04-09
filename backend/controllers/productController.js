const db = require('../database/db');

exports.getAllProducts = (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products').all();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.getProductById = (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

exports.createProduct = (req, res) => {
  const { name, price, description, image_url, category, stock } = req.body;
  try {
    const info = db.prepare(`
      INSERT INTO products (name, price, description, image_url, category, stock)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, price, description, image_url, category, stock);
    res.status(201).json({ id: info.lastInsertRowid, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

exports.updateProduct = (req, res) => {
  const { name, price, description, image_url, category, stock } = req.body;
  try {
    const info = db.prepare(`
      UPDATE products SET name = ?, price = ?, description = ?, image_url = ?, category = ?, stock = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(name, price, description, image_url, category, stock, req.params.id);
    
    if (info.changes === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

exports.deleteProduct = (req, res) => {
  try {
    const info = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    if (info.changes === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
