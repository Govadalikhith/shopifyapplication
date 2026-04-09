import React, { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShoppingBag, SlidersHorizontal, Home, ChevronRight } from 'lucide-react';
import api from '../api';

const categoryHeros = {
  Apparel: { img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop', desc: 'Artisanal garments crafted for permanence, not seasons.' },
  Accessories: { img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&auto=format&fit=crop', desc: 'Objects that complete the ritual. Engineered for longevity.' },
  Electronics: { img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop', desc: 'High-fidelity tools for the discerning mind.' },
  Studio: { img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&auto=format&fit=crop', desc: 'Objects that inhabit your workspace and inspire your work.' },
  Living: { img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=1600&auto=format&fit=crop', desc: 'Curated artifacts for spaces that reflect your philosophy.' },
  Wellness: { img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&auto=format&fit=crop', desc: 'Molecular wellness rituals for somatic restoration.' },
  Grooming: { img: 'https://images.unsplash.com/photo-1616391182219-e080b4d1043a?w=1600&auto=format&fit=crop', desc: 'Precision implements for the daily ritual.' },
};

const CategoryPage = () => {
  const { category } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    api.get('/products').then(r => { setAllProducts(r.data); setLoading(false); }).catch(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [category]);

  const products = useMemo(() => {
    let list = allProducts.filter(p => p.category === category);
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [allProducts, category, sortBy]);

  const hero = categoryHeros[category] || { img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop', desc: 'Curated artifacts from the Aethera archive.' };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="w-10 h-10 border-t-2 border-primary-900 rounded-full animate-spin"></div></div>;

  return (
    <div className="bg-primary-50 min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[55vh] overflow-hidden">
        <img src={hero.img} alt={category} className="w-full h-full object-cover grayscale-[0.3]" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-12 md:p-20">
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/60 mb-3">Collection</p>
          <h1 className="text-6xl md:text-8xl font-serif text-white italic mb-3">{category}.</h1>
          <p className="text-white/60 font-light max-w-sm">{hero.desc}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex items-center space-x-3 text-[10px] uppercase tracking-widest font-bold text-primary-800/30">
        <Link to="/" className="hover:text-primary-900 transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
        <ChevronRight size={10} />
        <Link to="/products" className="hover:text-primary-900 transition-colors">Archive</Link>
        <ChevronRight size={10} />
        <span className="text-primary-900">{category}</span>
      </div>

      {/* Controls */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-6 flex justify-between items-center">
        <p className="text-[10px] uppercase tracking-widest font-bold text-primary-800/40">{products.length} Artifacts</p>
        <div className="flex items-center gap-3 border border-primary-900/10 px-4 py-2 bg-white">
          <SlidersHorizontal size={14} className="text-primary-800/40" />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-[10px] uppercase tracking-widest font-bold bg-transparent outline-none cursor-pointer">
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-24">
        {products.length === 0 ? (
          <div className="py-32 text-center">
            <h2 className="text-4xl font-serif italic text-primary-800/30 mb-4">No artifacts in this collection yet.</h2>
            <Link to="/products" className="btn-gold inline-block mt-6">Browse All Archive</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <div key={product.id} className="group bg-white">
                <Link to={`/products/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-primary-50">
                  <img src={product.image_url} alt={product.name}
                    onError={e => { e.target.onerror = null; e.target.src = `https://placehold.co/400x530/f5f5f4/0c0a09?text=${encodeURIComponent(product.name)}`; }}
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" />
                  <div className="absolute bottom-4 left-4 bg-primary-900 text-white text-[8px] uppercase tracking-widest font-bold px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Detail
                  </div>
                </Link>
                <div className="p-5">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-primary-800/40 mb-2">{product.category}</p>
                  <Link to={`/products/${product.id}`}><h3 className="text-lg font-serif mb-3 group-hover:italic transition-all">{product.name}</h3></Link>
                  <div className="flex justify-between items-center">
                    <span className="font-light text-primary-900">${product.price.toFixed(2)}</span>
                    <Link to={`/products/${product.id}`} className="w-9 h-9 rounded-full border border-primary-900/10 flex items-center justify-center hover:bg-primary-900 hover:text-white transition-all">
                      <ShoppingBag size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
