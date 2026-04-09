import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Star, Heart, Share2, Shield, Truck, RefreshCcw, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [openFaq, setOpenFaq] = useState('details');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        
        // Fetch related products
        const allRes = await api.get('/products');
        const related = allRes.data.filter(p => p.category === response.data.category && p.id !== response.data.id).slice(0, 4);
        setRelatedProducts(related);
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
              {/* Variant / Size Selector */}
              <div className="pt-8 border-t border-primary-900/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary-800/60">Select Size</span>
                  <button className="text-[10px] uppercase tracking-widest text-primary-900/60 hover:text-primary-900 underline">Size Chart</button>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-sm font-light transition-all ${selectedSize === size ? 'border border-primary-900 text-primary-900 bg-white' : 'border border-transparent bg-white/50 text-primary-800/50 hover:bg-white'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

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

              {/* Trust Guarantees */}
              <div className="pt-6 flex flex-col space-y-4">
                <div className="flex items-center space-x-3 text-primary-900/60">
                   <ShieldCheck size={16} />
                   <span className="text-[10px] uppercase tracking-widest font-bold">Secure Encrypted Payment</span>
                </div>
                <div className="flex items-center space-x-3 text-primary-900/60">
                   <RefreshCcw size={16} />
                   <span className="text-[10px] uppercase tracking-widest font-bold">Free Returns within 30 days</span>
                </div>
              </div>
            </div>

            {/* FAQ / Accordion Section */}
            <div className="border-t border-primary-900/10 pt-8 mt-16 space-y-2">
              {[
                { id: 'details', title: 'Product Details', content: product.description },
                { id: 'materials', title: 'Materials & Provenance', content: "Hand-crafted in our Tokyo design studio. Sustainably sourced materials from high-altitude alpine regions." },
                { id: 'shipping', title: 'Shipping & Returns', content: "Complimentary global shipping on all archival orders. Returns accepted within 30 days of delivery. Lifetime care and renovation services available for all artifacts." }
              ].map(faq => (
                <div key={faq.id} className="border-b border-primary-900/5 last:border-0 pb-4">
                  <button 
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full flex justify-between items-center py-4 text-[10px] uppercase tracking-widest font-bold text-primary-900 hover:text-primary-900/60 transition-colors"
                  >
                    <span>{faq.title}</span>
                    {openFaq === faq.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === faq.id ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-primary-800/60 font-light leading-relaxed pt-2">{faq.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-40 border-t border-primary-900/10 pt-24">
             <h2 className="text-3xl md:text-5xl font-serif italic mb-16">Related Artifacts.</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {relatedProducts.map(relatedItem => (
                 <Link key={relatedItem.id} to={`/products/${relatedItem.id}`} className="group block">
                   <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-white border border-primary-900/5 p-8">
                     <img src={relatedItem.image_url} alt={relatedItem.name} className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"/>
                   </div>
                   <p className="text-[9px] uppercase tracking-widest text-primary-800/40 mb-1">{relatedItem.category}</p>
                   <h4 className="text-lg font-serif group-hover:italic transition-all">{relatedItem.name}</h4>
                   <p className="text-sm font-light text-primary-800/60 mt-1">${relatedItem.price.toFixed(2)}</p>
                 </Link>
               ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
