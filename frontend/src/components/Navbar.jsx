import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (user) {
      api.get('/cart').then(r => setCartCount(r.data.reduce((sum, item) => sum + item.quantity, 0))).catch(() => {});
    } else {
      setCartCount(0);
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'Apparel', path: '/category/Apparel', icon: '👔' },
    { name: 'Accessories', path: '/category/Accessories', icon: '⌚' },
    { name: 'Electronics', path: '/category/Electronics', icon: '🎧' },
    { name: 'Studio', path: '/category/Studio', icon: '✏️' },
    { name: 'Living', path: '/category/Living', icon: '🏠' },
    { name: 'Wellness', path: '/category/Wellness', icon: '🌿' },
    { name: 'Grooming', path: '/category/Grooming', icon: '💈' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary-900 text-white text-center py-2 px-4 flex justify-center items-center relative z-[60]">
        <span className="text-[10px] uppercase tracking-widest font-bold">Complimentary global dispatch on all archival artifacts.</span>
      </div>

      <header className={`fixed left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'top-0 premium-blur py-3' : 'top-8 bg-transparent py-5'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-primary-900" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={22} />
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Collections Dropdown */}
            <div className="relative" onMouseEnter={() => setCollectionsOpen(true)} onMouseLeave={() => setCollectionsOpen(false)}>
              <button className="nav-link uppercase tracking-[0.2em] text-[10px] flex items-center gap-1">
                Collections <ChevronDown size={10} className={`transition-transform ${collectionsOpen ? 'rotate-180' : ''}`} />
              </button>
              {collectionsOpen && (
                <div className="absolute top-full left-0 w-56 bg-white shadow-premium border border-primary-900/5 py-4 z-50">
                  {categories.map(cat => (
                    <Link key={cat.name} to={cat.path} className="flex items-center space-x-3 px-6 py-3 hover:bg-primary-50 transition-colors">
                      <span className="text-base">{cat.icon}</span>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-primary-800">{cat.name}</span>
                    </Link>
                  ))}
                  <div className="border-t border-primary-900/5 mt-2 pt-2">
                    <Link to="/products" className="flex items-center px-6 py-3 hover:bg-primary-50 transition-colors">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-accent-600">View All Archive →</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/studio" className="nav-link uppercase tracking-[0.2em] text-[10px]">The Studio</Link>
            <Link to="/sustainability" className="nav-link uppercase tracking-[0.2em] text-[10px]">Sustainability</Link>
          </nav>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-2xl md:text-3xl font-bold tracking-[0.3em] text-primary-900">
              AETHERA<span className="text-accent-600">.</span>
            </span>
          </Link>

          {/* Action Icons */}
          <div className="flex items-center space-x-5">
            <button onClick={() => setSearchOpen(true)} className="text-primary-900/70 hover:text-primary-900 transition-colors" title="Search">
              <Search size={20} />
            </button>
            {user ? (
              <>
                <Link to="/cart" className="relative text-primary-900/70 hover:text-primary-900 transition-colors" title="Cart">
                  <ShoppingBag size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent-600 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button onClick={handleLogout} className="hidden sm:block text-primary-900/70 hover:text-red-500 transition-colors" title="Sign Out">
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link to="/login" className="text-primary-900/70 hover:text-primary-900 transition-colors" title="Sign In">
                <User size={20} />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Full-Screen Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-8">
          <button onClick={() => setSearchOpen(false)} className="absolute top-8 right-8 text-primary-900/40 hover:text-primary-900">
            <X size={32} />
          </button>
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary-800/40 mb-8">Search the Archive</p>
          <form onSubmit={handleSearch} className="w-full max-w-2xl">
            <div className="relative border-b-2 border-primary-900/10 focus-within:border-primary-900 transition-all pb-4">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artifacts..."
                className="w-full text-4xl md:text-6xl font-serif bg-transparent outline-none placeholder-primary-900/10 text-primary-900"
              />
              <button type="submit" className="absolute right-0 bottom-4 text-primary-900/30 hover:text-primary-900 transition-colors">
                <Search size={28} />
              </button>
            </div>
          </form>
          <div className="mt-12 flex flex-wrap gap-4">
            {categories.map(cat => (
              <button key={cat.name} onClick={() => { navigate(cat.path); setSearchOpen(false); }}
                className="px-5 py-2 border border-primary-900/10 text-[10px] uppercase tracking-widest font-bold hover:bg-primary-900 hover:text-white transition-all">
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-12">
            <span className="text-xl font-bold tracking-widest">AETHERA.</span>
            <button onClick={() => setMobileMenuOpen(false)}><X size={28} /></button>
          </div>
          <div className="space-y-2">
            <p className="text-[9px] uppercase tracking-widest text-primary-800/30 font-bold mb-4">Collections</p>
            {categories.map(cat => (
              <Link key={cat.name} to={cat.path} onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-4 py-4 border-b border-primary-900/5">
                <span>{cat.icon}</span>
                <span className="text-xl font-serif">{cat.name}</span>
              </Link>
            ))}
            <Link to="/studio" onClick={() => setMobileMenuOpen(false)} className="flex py-4 border-b border-primary-900/5 text-xl font-serif">The Studio</Link>
            <Link to="/sustainability" onClick={() => setMobileMenuOpen(false)} className="flex py-4 border-b border-primary-900/5 text-xl font-serif">Sustainability</Link>
          </div>
          <div className="mt-auto pt-12">
            {user ? (
              <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="btn-outline w-full">Sign Out</button>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn-gold block text-center w-full">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
