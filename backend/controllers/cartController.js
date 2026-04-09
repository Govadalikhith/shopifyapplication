const db = require('../database/db');

exports.getCart = (req, res) => {
  const userId = req.user.id;
  try {
    const items = db.prepare(`
      SELECT c.*, p.name, p.price, p.image_url 
      FROM cart_items c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
    `).all(userId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

exports.addToCart = (req, res) => {
  const userId = req.user.id;
  const { product_id, quantity } = req.body;
  try {
    // Check if item already exists
    const existing = db.prepare('SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?').get(userId, product_id);
    
    if (existing) {
      db.prepare('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?').run(quantity || 1, existing.id);
    } else {
      db.prepare('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)').run(userId, product_id, quantity || 1);
    }
    res.status(201).json({ message: 'Added to cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

exports.updateQuantity = (req, res) => {
  const { quantity } = req.body;
  try {
    db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?').run(quantity, req.params.id, req.user.id);
    res.json({ message: 'Quantity updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quantity' });
  }
};

exports.removeFromCart = (req, res) => {
  try {
    db.prepare('DELETE FROM cart_items WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
    res.json({ message: 'Removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
};
