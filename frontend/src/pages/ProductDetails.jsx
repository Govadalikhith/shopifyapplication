import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Star, Heart, Share2, Shield, Truck, RefreshCcw } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await api.post('/cart', { product_id: product.id, quantity });
      navigate('/cart');
    } catch (error) {
      alert('Failed to add to cart');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-primary-50">
      <div className="w-12 h-12 border-t-2 border-primary-900 rounded-full animate-spin"></div>
    </div>
  );

  if (!product) return (
    <div className="max-w-[1400px] mx-auto px-6 py-40 text-center">
      <h2 className="text-4xl font-serif italic mb-8">Artifact not found.</h2>
      <button onClick={() => navigate('/products')} className="btn-gold">Back to Archive</button>
    </div>
  );

  return (
    <div className="pt-40 pb-32 bg-primary-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-primary-900/40 hover:text-primary-900 mb-16 transition-all"
        >
          <ArrowLeft size={14} className="mr-3 group-hover:-translate-x-2 transition-transform" /> 
          Back to Archives
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Visual Gallery */}
          <div className="space-y-8">
            <div className="aspect-[4/5] bg-white p-12 flex items-center justify-center">
              <img 
                src={product.image_url} 
                alt={product.name}
                onError={e => { e.target.onerror = null; e.target.src = `https://placehold.co/600x750/f5f5f4/0c0a09?text=${encodeURIComponent(product.name)}`; }}
                className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-[1s]"
              />
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-square bg-white/50 border border-primary-900/5 hover:border-primary-900/20 transition-all cursor-pointer"></div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-40">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-blue-700 mb-4">{product.category}</p>
                <h1 className="text-5xl md:text-7xl font-serif mb-4">{product.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex text-primary-900/20">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} className={i < 4 ? "text-primary-900" : ""} />)}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-primary-800/40 font-bold">128 Verified Reviews</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="w-12 h-12 rounded-full border border-primary-900/5 flex items-center justify-center hover:bg-white transition-all"><Heart size={18} /></button>
                <button className="w-12 h-12 rounded-full border border-primary-900/5 flex items-center justify-center hover:bg-white transition-all"><Share2 size={18} /></button>
              </div>
            </div>

            <p className="text-3xl font-light text-primary-900 mb-12">${product.price.toFixed(2)}</p>

            <div className="space-y-12 mb-16">
              <div className="flex items-center space-x-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-800/40">Quantity</span>
                <div className="flex items-center border border-primary-900/10 bg-white">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 py-3 hover:bg-primary-50 transition-colors">-</button>
                  <span className="px-8 font-light">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-6 py-3 hover:bg-primary-50 transition-colors">+</button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full btn-gold py-6 text-sm tracking-[0.3em]"
              >
                Acquire Artifact
              </button>
            </div>

            {/* Tabs & Details */}
            <div className="border-t border-primary-900/10 pt-12">
              <div className="flex space-x-12 mb-8">
                {['details', 'provenance', 'shipping'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === tab ? 'text-primary-900' : 'text-primary-800/30'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="prose prose-slate max-w-none">
                {activeTab === 'details' && (
                  <p className="text-lg text-primary-800/60 font-light leading-relaxed">
                    {product.description}
                  </p>
                )}
                {activeTab === 'provenance' && (
                   <p className="text-lg text-primary-800/60 font-light leading-relaxed">
                     Hand-crafted in our Tokyo design studio. Sustainably sourced materials from high-altitude alpine regions.
                   </p>
                )}
                {activeTab === 'shipping' && (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex items-start space-x-4">
                        <Truck size={20} className="text-primary-900/30" />
                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Global Shipping</h4>
                          <p className="text-xs text-primary-800/50">Complimentary on all archival orders.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <RefreshCcw size={20} className="text-primary-900/30" />
                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Lifetime Care</h4>
                          <p className="text-xs text-primary-800/50">Renovation services available for all artifacts.</p>
                        </div>
                      </div>
                   </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
