import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      console.log('Login successful for:', email);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication Failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-primary-50">
      {/* Visual Side */}
      <div className="hidden md:block w-1/2 h-screen fixed top-0 left-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1510519133411-c9902674251e?w=1600&auto=format&fit=crop" 
          className="w-full h-full object-cover grayscale opacity-90" 
          alt="Login Visual"
        />
        <div className="absolute inset-0 bg-primary-900/10"></div>
        <div className="absolute bottom-20 left-20">
           <p className="text-white text-[10px] uppercase tracking-[0.5em] font-bold mb-4 opacity-70">PRIVATE ARCHIVE ACCESS</p>
           <h2 className="text-white text-6xl font-serif italic mb-2">Aethera Studio.</h2>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-grow flex items-center justify-center p-8 md:ml-[50%]">
        <div className="max-w-md w-full">
          <div className="text-center md:text-left mb-16">
            <h1 className="text-6xl font-serif mb-4">Sign In.</h1>
            <p className="text-primary-800/40 uppercase tracking-widest text-xs font-bold leading-relaxed">
              Enter the collective archive to manage your artifacts and provenance.
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
              <label className="text-[10px] uppercase tracking-widest font-bold text-primary-900/40 mb-2 block">Cognitive ID (Email)</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-primary-900/30 py-4 focus:border-primary-900 outline-none transition-all font-light"
                placeholder="id@aethera.co"
              />
            </div>

            <div className="relative">
              <label className="text-[10px] uppercase tracking-widest font-bold text-primary-900/40 mb-2 block">Access Code (Password)</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-primary-900/30 py-4 focus:border-primary-900 outline-none transition-all font-light"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-gold py-6 flex items-center justify-center space-x-6 group"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Authenticate Access</span>
              <ArrowRight size={16} className="group-hover:translate-x-3 transition-transform duration-500" />
            </button>
          </form>

          <div className="mt-16 flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
            <span className="text-primary-800/30">First Expedition?</span>
            <Link to="/register" className="text-primary-900 hover:opacity-50 transition-all border-b border-primary-900 pb-1">Create Access ID</Link>
          </div>
          
          <div className="mt-32 pt-8 border-t border-primary-900/5 flex items-center space-x-4 opacity-20 grayscale">
             <Shield size={16} />
             <span className="text-[8px] uppercase tracking-[0.2em] font-bold">Encrypted via RSA 4096 Bit High-End Security</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
