const db = require('./database/db');

const products = [
  // Apparel (1-10)
  ['Archival Wool Coat', 850.00, 'Hand-stitched from recycled alpine wool. A lifetime silhouette for the minimalist traveler.', 'https://images.unsplash.com/photo-1539533377285-b9dfb0ee4c83', 'Apparel', 10],
  ['Molecular Cotton Tee', 120.00, 'Engineered at the molecular level for unparalleled softness and moisture regulation.', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab', 'Apparel', 100],
  ['Raw Denim Trousers', 320.00, 'Selvedge denim sourced from Okayama. Unwashed to age with your movement.', 'https://images.unsplash.com/photo-1542272604-787c3835535d', 'Apparel', 40],
  ['Cashmere Turtleneck', 450.00, 'Grade A Mongolian cashmere. Timeless elegance and warmth.', 'https://images.unsplash.com/photo-1576566582418-b13469b1293e', 'Apparel', 25],
  ['Linen Studio Shirt', 180.00, 'Breathable Belgian linen for the modern creator. Relaxed fit.', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c', 'Apparel', 35],
  ['Tech-Shell Parka', 600.00, 'Waterproof membrane with taped seams. Built for urban landscapes.', 'https://images.unsplash.com/photo-1544022613-e87f17a784de', 'Apparel', 15],
  ['Merino Wool Base Layer', 95.00, 'Odour-resistant and temperature-regulating. Essential for layering.', 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633', 'Apparel', 60],
  ['Silk Slip Dress', 280.00, 'Sand-washed mulberry silk. Effortless drape for evenings.', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8', 'Apparel', 20],
  ['Modular Cargo Pants', 240.00, 'Water-repellent ripstop with 8 pockets. Performance utility.', 'https://images.unsplash.com/photo-1624371414361-e6e8ea001167', 'Apparel', 45],
  ['Oversized Knit Sweater', 220.00, 'Chunky knit with ethical alpaca blend. Warmth in architectural form.', 'https://images.unsplash.com/photo-1517231939042-d636ca7f367e', 'Apparel', 30],

  // Accessories (11-20)
  ['Titanium Chronograph', 1200.00, 'Aerospace-grade titanium housing. Swiss movement. Stripped of everything but time.', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', 'Accessories', 5],
  ['Alpine Leather Weekend', 550.00, 'Vegetable-tanned leather from the Austrian Alps. Water-resistant and structurally reinforced.', 'https://images.unsplash.com/photo-1547949003-9792a18a2601', 'Accessories', 15],
  ['Silver Mono Earring', 180.00, 'Solid .925 sterling silver. A singular statement piece for asymmetric styling.', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908', 'Accessories', 50],
  ['Obsidian Sunglasses', 350.00, 'Polarized lenses with handcrafted acetate frames. Total UV protection.', 'https://images.unsplash.com/photo-1511499767390-90342f56771d', 'Accessories', 25],
  ['Minimalist Card Holder', 85.00, 'Full-grain Italian leather. Holds 6 cards with zero bulk.', 'https://images.unsplash.com/photo-1627123424574-724758594e93', 'Accessories', 100],
  ['Canvas Explorer Backpack', 210.00, 'Heavy-duty waxed canvas with brass hardware. Built for the daily commute.', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62', 'Accessories', 40],
  ['Silk Neck Scarf', 120.00, 'Hand-printed archival patterns. Versatile minimalist accessory.', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3', 'Accessories', 35],
  ['Gold Signet Ring', 650.00, '18k solid gold with matte finish. A symbol of permanence.', 'https://images.unsplash.com/photo-1605100804763-247f67b3f41e', 'Accessories', 12],
  ['Wool Felt Fedora', 160.00, 'Blocked by hand in the UK. Water-repellent wool felt.', 'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a', 'Accessories', 18],
  ['Braided Leather Belt', 95.00, 'Hand-braided in Florence. Ages beautifully with use.', 'https://images.unsplash.com/photo-1553935294-8bf26c361664', 'Accessories', 55],

  // Electronics (21-30)
  ['Aethera H1 Headphones', 450.00, 'Active noise cancellation filtered through high-fidelity aluminum drivers.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', 'Electronics', 25],
  ['Solid State Turntable', 950.00, 'Belt-driven precision for the analog purist. Minimal resonance, maximum clarity.', 'https://images.unsplash.com/photo-1603048588665-791ca8aea617', 'Electronics', 8],
  ['Obsidian Smartphone Case', 85.00, 'Forged from volcanic glass composite. Indestructible, yet lighter than air.', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef', 'Electronics', 200],
  ['Portable Hi-Fi Speaker', 320.00, '360-degree sound with 20h battery life. Sand-blasted aluminum finish.', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1', 'Electronics', 45],
  ['Mechanical Studio Keyboard', 280.00, 'Aluminum chassis with hot-swappable switches. Precision typing.', 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae', 'Electronics', 30],
  ['Analog Film Camera', 420.00, 'Restored vintage rangefinder. Captured moments with molecular texture.', 'https://images.unsplash.com/photo-1526170315870-ef68cf6502e2', 'Electronics', 10],
  ['Wireless Charging Pad', 75.00, 'Stone-coated minimalist charger. Fast charging for all devices.', 'https://images.unsplash.com/photo-1586816829370-1616ed3fc58a', 'Electronics', 80],
  ['Studio Monitor Stand', 110.00, 'Powder-coated steel with dampening pads. Elevate your cognitive flow.', 'https://images.unsplash.com/photo-1593642632559-0c6d3df72011', 'Electronics', 50],
  ['Smart Ambient Lamp', 195.00, 'Adjustable color temp via companion app. Atmospheric precision.', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62', 'Electronics', 65],
  ['Ultralight Power Bank', 65.00, '10,000mAh in a titanium-look shell. Energy in high-density form.', 'https://images.unsplash.com/photo-1609139006981-d1c019fc9534', 'Electronics', 120],

  // Studio & Living (31-40)
  ['Concrete Desk Organiser', 140.00, 'Cast in ultra-high-performance concrete. Stability for your cognitive flow.', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7', 'Studio', 60],
  ['Aluminum Desk Lamp', 280.00, 'Machined from a single block of industrial aluminum. Warm spectrum LEDs.', 'https://images.unsplash.com/photo-1534073828943-f801091bb270', 'Studio', 30],
  ['Archive Fountain Pen', 220.00, 'Ebonite body with a 14k gold nib. Forged for the permanence of thought.', 'https://images.unsplash.com/photo-1583485088034-697b5bc54cdc', 'Studio', 45],
  ['Linen Throw Pillow', 75.00, 'Feather-filled with hand-dyed cover. Soft texture, structured form.', 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6', 'Living', 85],
  ['Hand-Blown Glass Vase', 165.00, 'Architectural form in smoked glass. Hand-blown in Copenhagen.', 'https://images.unsplash.com/photo-1581783898377-1c85bf937427', 'Living', 25],
  ['Scented Studio Candle', 45.00, 'Notes of Cedar, Sandalwood, and Ink. 60 hours of curated atmosphere.', 'https://images.unsplash.com/photo-1602872030219-cbf9280d463d', 'Studio', 150],
  ['Japanese Paper Notebook', 35.00, 'Grid-ruled with archival-grade paper. Acid-free and fountain pen friendly.', 'https://images.unsplash.com/photo-1531346878377-a5be20888e57', 'Studio', 200],
  ['Brushed Steel Paperweight', 90.00, 'Solid sphere with perfect balance. Industrial weight for the desk.', 'https://images.unsplash.com/photo-1586075010633-2470acfd8e33', 'Studio', 40],
  ['Walnut Monitor Stand', 180.00, 'Sustainably harvested American walnut. Natural warmth for the workstation.', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', 'Studio', 20],
  ['Wool Studio Rug', 450.00, 'Geometric pattern in monochrome tones. Flat-weave for minimal maintenance.', 'https://images.unsplash.com/photo-1600166896352-0d73df01594d', 'Living', 15],

  // Wellness & Grooming (41-50)
  ['Mineral Face Wash', 32.00, 'Volcanic ash and sea salt minerals. Deep cleansing molecular formula.', 'https://images.unsplash.com/photo-1556228720-195a672e8a03', 'Wellness', 120],
  ['Molecular Hydrator', 55.00, 'Hyaluronic acid with deep-sea extracts. Unparalleled skin resonance.', 'https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0', 'Wellness', 90],
  ['Amber Glass Soap Dispenser', 45.00, 'Heavy-duty amber glass with minimalist pump. Studio utility for the home.', 'https://images.unsplash.com/photo-1600673882311-30c3165b6831', 'Wellness', 150],
  ['Silver Shaving Razor', 120.00, 'Precision-weighted safety razor. Forged steel for a lifetime of precision.', 'https://images.unsplash.com/photo-1616391182219-e080b4d1043a', 'Grooming', 40],
  ['Essential Oil Diffuser', 145.00, 'Ceramic ultrasonic diffuser. Atmospheric regulation for high-growth environments.', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108', 'Wellness', 35],
  ['Yoga Mat Carry Strap', 25.00, 'Natural cotton webbing. Minimalist transport for somatic practice.', 'https://images.unsplash.com/photo-1592433380061-6894084360e5', 'Wellness', 200],
  ['Linen Towel Set', 110.00, 'Waffle-knit ultra-absorbent linen. Dries 3x faster than cotton.', 'https://images.unsplash.com/photo-1583947581924-860bda332f18', 'Living', 50],
  ['Charcoal Bamboo Toothbrush', 8.00, 'Biodegradable organic bamboo. Minimalist oral hygiene.', 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04', 'Wellness', 500],
  ['Seaweed Foot Soak', 28.00, 'Wild-harvested Atlantic seaweed. Mineral-rich somatic recovery.', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15', 'Wellness', 75],
  ['Minimalist Sleep Mask', 40.00, 'Padded silk for absolute darkness. Cognitive restoration protocol.', 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd', 'Wellness', 100]
];

const insert = db.prepare(`
  INSERT INTO products (name, price, description, image_url, category, stock)
  VALUES (?, ?, ?, ?, ?, ?)
`);

db.transaction(() => {
  // Clear constraint-heavy tables first
  db.prepare('DELETE FROM order_items').run();
  db.prepare('DELETE FROM cart_items').run();
  db.prepare('DELETE FROM products').run();
  
  for (const p of products) {
    const imageUrl = p[3] + '?w=800&auto=format&fit=crop';
    insert.run(p[0], p[1], p[2], imageUrl, p[4], p[5]);
  }
})();

console.log('Seeded 50 premium products successfully.');
