require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const db = require('./database/db');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the local public folder (pre-built frontend)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Main Routes
app.use('/api', apiRoutes);

// SPA Fallback: Serve index.html for any non-API routes (Express 5 compatible wildcard)
app.get('(.*)', (req, res) => {
  if (req.path.startsWith('/api')) return;
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Seed basic data if products empty
const seedData = () => {
  const products = db.prepare('SELECT count(*) as count FROM products').get();
  if (products.count === 0) {
    const insert = db.prepare(`
      INSERT INTO products (name, price, description, image_url, category, stock)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    // Apparel
    insert.run('Archival Wool Coat', 850.00, 'Hand-stitched from recycled alpine wool. A lifetime silhouette for the minimalist traveler.', 'https://images.unsplash.com/photo-1539533377285-b9dfb0ee4c83?w=800&auto=format&fit=crop', 'Apparel', 10);
    insert.run('Molecular Cotton Tee', 120.00, 'Engineered at the molecular level for unparalleled softness and moisture regulation.', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop', 'Apparel', 100);
    insert.run('Raw Denim Trousers', 320.00, 'Selvedge denim sourced from Okayama. Unwashed to age with your movement.', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop', 'Apparel', 40);

    // Accessories
    insert.run('Titanium Chronograph', 1200.00, 'Aerospace-grade titanium housing. Swiss movement. Stripped of everything but time.', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop', 'Accessories', 5);
    insert.run('Alpine Leather Weekend', 550.00, 'Vegetable-tanned leather from the Austrian Alps. Water-resistant and structurally reinforced.', 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&auto=format&fit=crop', 'Accessories', 15);
    insert.run('Silver Mono Earring', 180.00, 'Solid .925 sterling silver. A singular statement piece for asymmetric styling.', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop', 'Accessories', 50);

    // Electronics
    insert.run('Aethera H1 Headphones', 450.00, 'Active noise cancellation filtered through high-fidelity aluminum drivers.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop', 'Electronics', 25);
    insert.run('Solid State Turntable', 950.00, 'Belt-driven precision for the analog purist. Minimal resonance, maximum clarity.', 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&auto=format&fit=crop', 'Electronics', 8);
    insert.run('Obsidian Smartphone Case', 85.00, 'Forged from volcanic glass composite. Indestructible, yet lighter than air.', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop', 'Electronics', 200);

    // Studio
    insert.run('Concrete Desk Organiser', 140.00, 'Cast in ultra-high-performance concrete. Stability for your cognitive flow.', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop', 'Studio', 60);
    insert.run('Aluminum Desk Lamp', 280.00, 'Machined from a single block of industrial aluminum. Warm spectrum LEDs.', 'https://images.unsplash.com/photo-1534073828943-f801091bb270?w=800&auto=format&fit=crop', 'Studio', 30);
    insert.run('Archive Fountain Pen', 220.00, 'Ebonite body with a 14k gold nib. Forged for the permanence of thought.', 'https://images.unsplash.com/photo-1583485088034-697b5bc54cdc?w=800&auto=format&fit=crop', 'Studio', 45);

    console.log('Database seeded with 12 premium minimalist products.');
  }
};

seedData();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
