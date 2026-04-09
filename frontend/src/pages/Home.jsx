import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ShieldCheck, Globe, Infinity as InfinityIcon, Quote, Star, ShoppingBag } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();
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
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setFeaturedProducts(response.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-primary-50">
      {/* Hero Section - Asymmetrical & Sophisticated */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale opacity-80" 
            alt="Hero Visual"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50 via-primary-50/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-blue-700 mb-6">ESTABLISHED 2026</p>
            <h1 className="text-7xl md:text-9xl font-serif leading-[0.9] mb-8 text-primary-900">
              Modern <br /> <span className="italic">Essentials.</span>
            </h1>
            <p className="text-lg text-primary-800/60 font-light leading-relaxed mb-12 max-w-sm">
              Artisanal craftsmanship meets molecular precision. Explore our curated selection of lifestyle artifacts.
            </p>
            <div className="flex items-center space-x-10">
              <Link to="/products" className="btn-gold group flex items-center">
                Explore Shop <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={16} />
              </Link>
              <button className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-full border border-primary-900/10 flex items-center justify-center group-hover:bg-primary-900 group-hover:text-white transition-all">
                  <Play size={16} fill="currentColor" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold">Watch Film</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="bg-white border-y border-primary-900/10 py-10 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center gap-8 text-primary-900/60 font-light text-[11px] uppercase tracking-widest font-bold">
          <div className="flex items-center space-x-4"><ShieldCheck size={18} className="text-primary-900/40" /><span>Secure Encrypted Checkout</span></div>
          <div className="hidden md:block w-px h-6 bg-primary-900/10"></div>
          <div className="flex items-center space-x-4"><Globe size={18} className="text-primary-900/40" /><span>Complimentary Global Dispatch</span></div>
          <div className="hidden md:block w-px h-6 bg-primary-900/10"></div>
          <div className="flex items-center space-x-4"><InfinityIcon size={18} className="text-primary-900/40" /><span>Lifetime Artifact Renovation</span></div>
        </div>
      </div>

      {/* Featured Collections */}
      <section className="py-24 px-6 bg-primary-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Apparel', 'Accessories', 'Electronics', 'Studio'].map((cat) => (
              <Link key={cat} to={`/category/${cat}`} className="group relative aspect-[4/5] overflow-hidden bg-white hover:bg-primary-900 transition-colors duration-500 flex flex-col justify-between p-10 border border-primary-900/5">
                <h3 className="text-3xl font-serif group-hover:text-white group-hover:italic transition-all">{cat}.</h3>
                <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white">
                  <span className="text-[10px] uppercase tracking-widest font-bold">Explore</span>
                  <ArrowRight size={20} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="space-y-6">
              <div className="w-px h-12 bg-primary-900/20"></div>
              <h3 className="text-3xl font-serif">Conscious Materiality</h3>
              <p className="text-primary-800/50 leading-relaxed font-light">We source exclusively from sustainable ecosystems, ensuring every fiber tells a story of regeneration.</p>
            </div>
            <div className="space-y-6">
              <div className="w-px h-12 bg-primary-900/20"></div>
              <h3 className="text-3xl font-serif">Molecular Design</h3>
              <p className="text-primary-800/50 leading-relaxed font-light">Precision engineering at the smallest scale results in artifacts that last for generations, not seasons.</p>
            </div>
            <div className="space-y-6">
              <div className="w-px h-12 bg-primary-900/20"></div>
              <h3 className="text-3xl font-serif">Timeless Utility</h3>
              <p className="text-primary-800/50 leading-relaxed font-light">Minimalist aesthetics stripped of the unnecessary, focused purely on functionality and form.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 space-y-8 md:space-y-0">
            <div className="max-w-md">
              <h2 className="text-5xl md:text-6xl font-serif mb-6">The Curator's <br /> <span className="italic">Selection.</span></h2>
              <p className="text-primary-800/50 font-light">Our most requested artifacts, handpicked by the Aethera design studio.</p>
            </div>
            <Link to="/products" className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-primary-900 py-3 hover:opacity-50 transition-all">
              Shop All Archive
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative">
                <Link to={`/products/${product.id}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-primary-100">
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out"
                    />
                    <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/10 transition-all"></div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-primary-800/40 mb-2">{product.category}</p>
                      <h4 className="text-xl font-serif group-hover:italic transition-all">{product.name}</h4>
                    </div>
                    <p className="text-sm font-light text-primary-800/60">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 shadow-sm border border-primary-900/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary-900 hover:text-white z-10"
                >
                  <ShoppingBag size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-primary-50 border-t border-primary-900/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <Quote className="mx-auto mb-12 text-primary-900/20" size={48} />
          <h2 className="text-4xl md:text-5xl font-serif italic mb-24">Echoes from the collective.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left">
            {[
              { text: "An extraordinary intersection of tactile quality and brutalist design. The H1 Headphones are unparalleled.", author: "E. Ryu", locale: "Tokyo, JP" },
              { text: "The Raw Denim trousers age like architecture. Every fold is a testament to the rigorous construction.", author: "M. Vance", locale: "Berlin, DE" },
              { text: "Beyond commerce. Receiving an artifact from Aethera feels like being trusted with a piece of the future.", author: "S. Al-Fayed", locale: "London, UK" }
            ].map((review, i) => (
              <div key={i} className="space-y-6">
                <div className="flex space-x-1 text-primary-900"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                <p className="text-lg font-light leading-relaxed text-primary-800">"{review.text}"</p>
                <div className="pt-6 border-t border-primary-900/10">
                  <p className="text-[10px] uppercase tracking-widest font-bold mb-1">{review.author}</p>
                  <p className="text-[10px] uppercase tracking-widest text-primary-800/40">{review.locale}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action / Newsletter */}
      <section className="py-40 bg-primary-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-6xl md:text-8xl font-serif italic mb-12 italic">Evolve Your Experience.</h2>
          <p className="text-lg text-white/50 font-light mb-16 leading-relaxed">
            Join the Aethera collective for exclusive access to archival releases and molecular design studies.
          </p>
          <form className="flex flex-col sm:flex-row max-w-lg mx-auto border-b border-white/30 focus-within:border-white transition-colors pb-2" onSubmit={(e) => { e.preventDefault(); alert('Subscribed to the collective.'); }}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="flex-grow bg-transparent outline-none px-4 py-3 placeholder-white/30 text-white text-sm font-light"
            />
            <button type="submit" className="uppercase tracking-widest text-[10px] font-bold px-6 hover:text-white/50 transition-colors mt-4 sm:mt-0">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
