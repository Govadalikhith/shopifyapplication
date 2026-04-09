import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, SlidersHorizontal, ChevronDown, Search as SearchIcon } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [searchParams] = useSearchParams();
  const searchQ = searchParams.get('q') || '';
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await api.post('/cart', { product_id: product.id, quantity: 1 });
      navigate('/cart');
    } catch (error) {
      alert('Failed to add to cart');
    }
  };

  useEffect(() => {
    api.get('/products').then(r => { setProducts(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let list = products;
    if (filter !== 'All') list = list.filter(p => p.category === filter);
    if (searchQ) list = list.filter(p => p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.description?.toLowerCase().includes(searchQ.toLowerCase()));
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, filter, sortBy, searchQ]);

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="w-10 h-10 border-t-2 border-primary-900 rounded-full animate-spin"></div></div>;

  return (
    <div className="pt-36 pb-24 px-6 bg-primary-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16 border-b border-primary-900/10 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-8">
            <div>
              <h1 className="text-6xl md:text-7xl font-serif italic mb-2">{searchQ ? `Results for "${searchQ}"` : 'Archive.'}</h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary-800/40 font-bold">{filteredProducts.length} Artifacts</p>
            </div>
            {/* Sort */}
            <div className="flex items-center gap-3 border border-primary-900/10 px-4 py-2 bg-white">
              <SlidersHorizontal size={14} className="text-primary-800/40" />
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-[10px] uppercase tracking-widest font-bold bg-transparent outline-none text-primary-900 cursor-pointer">
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
          {/* Category Filters */}
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all border ${filter === cat ? 'bg-primary-900 text-white border-primary-900' : 'border-primary-900/10 hover:border-primary-900/40 text-primary-800/50 hover:text-primary-900'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-40 text-center">
            <SearchIcon size={48} className="mx-auto text-primary-900/10 mb-6" />
            <h2 className="text-4xl font-serif italic text-primary-800/30 mb-4">No artifacts found.</h2>
            <p className="text-sm text-primary-800/30">Try adjusting your search or browse all collections.</p>
            <button onClick={() => setFilter('All')} className="mt-8 btn-outline">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="group bg-white">
                <Link to={`/products/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-primary-50">
                  <img src={product.image_url} alt={product.name}
                    onError={e => { e.target.onerror = null; e.target.src = `https://placehold.co/400x530/f5f5f4/0c0a09?text=${encodeURIComponent(product.name)}`; }}
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/5 transition-all" />
                  <div className="absolute bottom-4 left-4 bg-primary-900 text-white text-[8px] uppercase tracking-widest font-bold px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Detail
                  </div>
                </Link>
                <div className="p-5">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-primary-800/40 mb-2">{product.category}</p>
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-lg font-serif mb-3 group-hover:italic transition-all">{product.name}</h3>
                  </Link>
                  <div className="flex justify-between items-center">
                    <span className="font-light text-primary-900">${product.price.toFixed(2)}</span>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-9 h-9 rounded-full border border-primary-900/10 flex items-center justify-center hover:bg-primary-900 hover:text-white transition-all"
                    >
                      <ShoppingBag size={14} />
                    </button>
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

export default Products;
