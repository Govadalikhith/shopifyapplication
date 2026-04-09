const db = require('../database/db');

exports.createOrder = (req, res) => {
  const userId = req.user.id;
  
  try {
    // Get cart items
    const cartItems = db.prepare(`
      SELECT c.*, p.price 
      FROM cart_items c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ?
    `).all(userId);

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Start transaction
    const createOrderTx = db.transaction(() => {
      const info = db.prepare('INSERT INTO orders (user_id, total_price) VALUES (?, ?)').run(userId, totalPrice);
      const orderId = info.lastInsertRowid;

      const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
      for (const item of cartItems) {
        insertItem.run(orderId, item.product_id, item.quantity, item.price);
        // Reduce stock
        db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(item.quantity, item.product_id);
      }

      // Clear cart
      db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(userId);

      return orderId;
    });

    const orderId = createOrderTx();
    res.status(201).json({ id: orderId, total_price: totalPrice, message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.getOrderHistory = (req, res) => {
  const userId = req.user.id;
  try {
    const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(userId);
    
    const ordersWithItems = orders.map(order => {
      const items = db.prepare(`
        SELECT oi.*, p.name, p.image_url
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `).all(order.id);
      return { ...order, items };
    });

    res.json(ordersWithItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
};
