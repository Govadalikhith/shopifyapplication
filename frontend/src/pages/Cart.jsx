import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, MoveRight, ShoppingBag, CreditCard, ArrowRight } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart');
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, newQty) => {
    if (newQty < 1) return;
    try {
      await api.put(`/cart/${id}`, { quantity: newQty });
      fetchCart();
    } catch (error) {
      alert('Failed to update quantity');
    }
  };

  const removeItem = async (id) => {
    try {
      await api.delete(`/cart/${id}`);
      fetchCart();
    } catch (error) {
      alert('Failed to remove item');
    }
  };

  const handleCheckout = async () => {
    try {
      await api.post('/orders');
      alert('Order placed successfully. Your artifact will be dispatched shortly.');
      navigate('/');
    } catch (error) {
      alert('Checkout failed');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-primary-50">
      <div className="w-12 h-12 border-t-2 border-primary-900 rounded-full animate-spin"></div>
    </div>
  );

  if (cartItems.length === 0) return (
    <div className="max-w-[1400px] mx-auto px-6 py-40 text-center">
      <h1 className="text-7xl font-serif italic mb-8">Cart is empty.</h1>
      <p className="text-primary-800/40 uppercase tracking-widest text-xs font-bold mb-12">No artifacts currently selected for acquisition.</p>
      <Link to="/products" className="btn-gold inline-flex items-center">
        Return to archive <ArrowRight className="ml-3" size={16} />
      </Link>
    </div>
  );

  return (
    <div className="pt-40 pb-32 bg-primary-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h1 className="text-6xl md:text-8xl font-serif italic mb-20 border-b border-primary-900/10 pb-12">Your Bag.</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Items */}
          <div className="lg:col-span-8 space-y-12">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-12 pb-12 border-b border-primary-900/5">
                <div className="w-40 h-52 bg-white p-6 overflow-hidden flex-shrink-0">
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-contain grayscale" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-serif mb-2">{item.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-primary-800/40 font-bold">Provenance: Premium Archive</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-primary-800/20 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="flex items-center space-x-12 mt-8">
                     <div className="flex items-center border border-primary-900/10 bg-white">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-4 py-2 hover:bg-primary-50">-</button>
                        <span className="px-6 text-sm font-light">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-4 py-2 hover:bg-primary-50">+</button>
                     </div>
                     <p className="text-xl font-light text-primary-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white p-10 lg:sticky lg:top-40">
              <h2 className="text-2xl font-serif mb-8 pb-4 border-b border-primary-900/5">Check Out.</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between text-sm font-light text-primary-800/60">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-light text-primary-800/60">
                  <span>Acquisition Fee</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-sm font-light text-primary-800/60">
                  <span>Global Dispatch</span>
                  <span>$0.00</span>
                </div>
                <div className="pt-6 border-t border-primary-900/5 flex justify-between items-baseline">
                  <span className="text-xl font-serif">Total</span>
                  <span className="text-3xl font-light text-primary-900">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full btn-gold py-6 text-[10px] tracking-[0.3em]"
              >
                Finalize Acquisition
              </button>
              
              <div className="mt-12 space-y-4">
                 <div className="flex items-center space-x-4 text-[9px] uppercase tracking-widest text-primary-800/40 font-bold">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Secure Encrypted Payment</span>
                 </div>
                 <p className="text-[10px] text-primary-800/30 leading-relaxed italic">
                   All metadata regarding your transaction is stored on private, high-security infrastructure.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
