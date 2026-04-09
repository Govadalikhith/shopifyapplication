import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration sequence interrupted.');
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="w-24 h-24 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-12">
          <CheckCircle2 size={40} strokeWidth={1} />
        </div>
        <h2 className="text-6xl font-serif italic mb-4">Registration Validated.</h2>
        <p className="text-primary-800/40 uppercase tracking-[0.3em] text-[10px] font-bold">Synchronizing your cognitive ID with our archives...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-primary-50">
       {/* Visual Side */}
       <div className="hidden md:block w-1/2 h-screen fixed top-0 left-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600&auto=format&fit=crop" 
          className="w-full h-full object-cover grayscale opacity-90" 
          alt="Register Visual"
        />
        <div className="absolute inset-0 bg-primary-900/10"></div>
        <div className="absolute bottom-20 left-20">
           <p className="text-white text-[10px] uppercase tracking-[0.5em] font-bold mb-4 opacity-70">JOIN THE ARCHIVE</p>
           <h2 className="text-white text-6xl font-serif italic mb-2">Sustainable Legacy.</h2>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center p-8 md:ml-[50%]">
        <div className="max-w-md w-full">
          <div className="text-center md:text-left mb-16">
            <h1 className="text-6xl font-serif mb-4">Create ID.</h1>
            <p className="text-primary-800/40 uppercase tracking-widest text-xs font-bold leading-relaxed">
              Begin your journey with the Aethera collective and explore archival artifacts.
            </p>
          </div>

          {error && (
            <div className="mb-8 p-6 bg-red-50 text-red-600 flex items-center text-xs uppercase tracking-widest font-bold border border-red-100">
              <AlertCircle size={16} className="mr-3 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest font-bold text-primary-900/40 mb-2 block">Your Full Identity</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-transparent border-b border-primary-900/30 py-4 focus:border-primary-900 outline-none transition-all font-light"
                placeholder="First and Surname"
              />
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest font-bold text-primary-900/40 mb-2 block">Cognitive ID (Email)</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-transparent border-b border-primary-900/30 py-4 focus:border-primary-900 outline-none transition-all font-light"
                placeholder="id@aethera.co"
              />
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest font-bold text-primary-900/40 mb-2 block">Private Access Code</label>
              <input 
                type="password" 
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-transparent border-b border-primary-900/30 py-4 focus:border-primary-900 outline-none transition-all font-light"
                placeholder="Min. 6 Characters"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-gold py-6 flex items-center justify-center space-x-6 group"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Initiate Registration</span>
              <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform duration-500" />
            </button>
          </form>

          <div className="mt-16 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
            <span className="text-primary-800/30">Already have an ID?</span>
            <Link to="/login" className="text-primary-900 hover:opacity-50 transition-all border-b border-primary-900 pb-1">Sign In to Archive</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
