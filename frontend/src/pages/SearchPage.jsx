import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, ShoppingBag, ArrowRight } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(q);
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
    api.get('/products').then(r => { setAllProducts(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => { setQuery(q); }, [q]);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return allProducts.filter(p =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.description?.toLowerCase().includes(q.toLowerCase()) ||
      p.category?.toLowerCase().includes(q.toLowerCase())
    );
  }, [allProducts, q]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) setSearchParams({ q: query.trim() });
  };

  const suggestions = ['Archival Wool', 'Titanium', 'Headphones', 'Studio', 'Wellness', 'Leather'];

  return (
    <div className="pt-36 pb-24 px-6 bg-primary-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        {/* Search Input */}
        <div className="max-w-3xl mb-16">
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary-800/30 mb-6">Search the Archive</p>
          <form onSubmit={handleSearch} className="border-b-2 border-primary-900/10 focus-within:border-primary-900 transition-all flex items-center pb-4">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search artifacts..."
              className="flex-grow text-4xl md:text-5xl font-serif bg-transparent outline-none placeholder-primary-900/10 text-primary-900"
            />
            <button type="submit" className="text-primary-900/30 hover:text-primary-900 ml-4">
              <SearchIcon size={24} />
            </button>
          </form>
          {/* Quick Suggestions */}
          <div className="mt-6 flex flex-wrap gap-3">
            {suggestions.map(s => (
              <button key={s} onClick={() => setSearchParams({ q: s })}
                className="px-4 py-2 text-[10px] uppercase tracking-widest font-bold border border-primary-900/10 hover:bg-primary-900 hover:text-white transition-all">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-24"><div className="w-10 h-10 border-t-2 border-primary-900 rounded-full animate-spin"></div></div>
        ) : !q ? (
          <div className="py-24 text-center">
            <SearchIcon size={48} className="mx-auto text-primary-900/10 mb-6" />
            <p className="text-primary-800/30 font-light">Begin typing to search the archive.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="py-24">
            <p className="text-[10px] uppercase tracking-widest font-bold text-primary-800/30 mb-6">0 results for "{q}"</p>
            <h2 className="text-4xl font-serif italic text-primary-800/40 mb-12">No artifacts found.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Apparel', 'Electronics', 'Studio'].map(cat => (
                <Link key={cat} to={`/category/${cat}`} className="group border border-primary-900/5 bg-white p-8 hover:border-primary-900/20 transition-all">
                  <h3 className="font-serif text-2xl mb-3">{cat}</h3>
                  <p className="text-sm text-primary-800/40 font-light mb-4">Browse the full {cat.toLowerCase()} collection.</p>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-accent-600 flex items-center gap-2 group-hover:gap-4 transition-all">Explore <ArrowRight size={12} /></span>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-primary-800/40 mb-10">{results.length} result{results.length !== 1 ? 's' : ''} for "{q}"</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {results.map(product => (
                <div key={product.id} className="group bg-white">
                  <Link to={`/products/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-primary-50">
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" />
                  </Link>
                  <div className="p-5">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-primary-800/40 mb-2">{product.category}</p>
                    <Link to={`/products/${product.id}`}><h3 className="text-lg font-serif mb-3 group-hover:italic transition-all">{product.name}</h3></Link>
                    <div className="flex justify-between items-center">
                      <span className="font-light">${product.price.toFixed(2)}</span>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
