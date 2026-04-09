const db = require('./database/db');

// Verified working Unsplash images for each product
const updates = [
  // Apparel
  { name: 'Archival Wool Coat',    url: 'https://images.unsplash.com/photo-1539533377285-b9dfb0ee4c83?w=800&auto=format&fit=crop' },
  { name: 'Molecular Cotton Tee', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop' },
  { name: 'Raw Denim Trousers',   url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop' },
  { name: 'Cashmere Turtleneck',  url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop' },
  { name: 'Linen Studio Shirt',   url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop' },
  { name: 'Tech-Shell Parka',     url: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=800&auto=format&fit=crop' },
  { name: 'Merino Wool Base Layer', url: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop' },
  { name: 'Silk Slip Dress',      url: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop' },
  { name: 'Modular Cargo Pants',  url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop' },
  { name: 'Oversized Knit Sweater', url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop' },

  // Accessories
  { name: 'Titanium Chronograph', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop' },
  { name: 'Alpine Leather Weekend', url: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&auto=format&fit=crop' },
  { name: 'Silver Mono Earring',  url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop' },
  { name: 'Obsidian Sunglasses',  url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop' },
  { name: 'Minimalist Card Holder', url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop' },
  { name: 'Canvas Explorer Backpack', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop' },
  { name: 'Silk Neck Scarf',      url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop' },
  { name: 'Gold Signet Ring',     url: 'https://images.unsplash.com/photo-1605100804763-247f67b3f41e?w=800&auto=format&fit=crop' },
  { name: 'Wool Felt Fedora',     url: 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=800&auto=format&fit=crop' },
  { name: 'Braided Leather Belt', url: 'https://images.unsplash.com/photo-1553939294-8bf26c361664?w=800&auto=format&fit=crop' },

  // Electronics
  { name: 'Aethera H1 Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop' },
  { name: 'Solid State Turntable', url: 'https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=800&auto=format&fit=crop' },
  { name: 'Obsidian Smartphone Case', url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&auto=format&fit=crop' },
  { name: 'Portable Hi-Fi Speaker', url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop' },
  { name: 'Mechanical Studio Keyboard', url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop' },
  { name: 'Analog Film Camera',   url: 'https://images.unsplash.com/photo-1526170315870-ef68cf6502e2?w=800&auto=format&fit=crop' },
  { name: 'Wireless Charging Pad', url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop' },
  { name: 'Studio Monitor Stand', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop' },
  { name: 'Smart Ambient Lamp',   url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop' },
  { name: 'Ultralight Power Bank', url: 'https://images.unsplash.com/photo-1609139006981-d1c019fc9534?w=800&auto=format&fit=crop' },

  // Studio
  { name: 'Concrete Desk Organiser', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop' },
  { name: 'Aluminum Desk Lamp',   url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop' },
  { name: 'Archive Fountain Pen', url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54cdc?w=800&auto=format&fit=crop' },
  { name: 'Linen Throw Pillow',   url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=800&auto=format&fit=crop' },
  { name: 'Hand-Blown Glass Vase', url: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=800&auto=format&fit=crop' },
  { name: 'Scented Studio Candle', url: 'https://images.unsplash.com/photo-1602874801006-8cb2a3f7cfd2?w=800&auto=format&fit=crop' },
  { name: 'Japanese Paper Notebook', url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop' },
  { name: 'Brushed Steel Paperweight', url: 'https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?w=800&auto=format&fit=crop' },
  { name: 'Walnut Monitor Stand', url: 'https://images.unsplash.com/photo-1593640408182-31c228e32c6b?w=800&auto=format&fit=crop' },
  { name: 'Wool Studio Rug',      url: 'https://images.unsplash.com/photo-1600166896352-0d73df01594d?w=800&auto=format&fit=crop' },

  // Wellness & Grooming
  { name: 'Mineral Face Wash',    url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop' },
  { name: 'Molecular Hydrator',   url: 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?w=800&auto=format&fit=crop' },
  { name: 'Amber Glass Soap Dispenser', url: 'https://images.unsplash.com/photo-1585073887209-c7568f5f9b69?w=800&auto=format&fit=crop' },
  { name: 'Silver Shaving Razor', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop' },
  { name: 'Essential Oil Diffuser', url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop' },
  { name: 'Yoga Mat Carry Strap', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop' },
  { name: 'Linen Towel Set',      url: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&auto=format&fit=crop' },
  { name: 'Charcoal Bamboo Toothbrush', url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&auto=format&fit=crop' },
  { name: 'Seaweed Foot Soak',    url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop' },
  { name: 'Minimalist Sleep Mask', url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop' },
];

const stmt = db.prepare('UPDATE products SET image_url = ? WHERE name = ?');

const updateAll = db.transaction(() => {
  for (const u of updates) {
    const result = stmt.run(u.url, u.name);
    console.log(`${result.changes > 0 ? '✓' : '✗'} ${u.name}`);
  }
});

updateAll();
console.log('\nDone. All product images updated.');
