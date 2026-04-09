import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Share2, Play, ArrowRight } from 'lucide-react';

const Footer = () => {
  const categories = ['Apparel', 'Accessories', 'Electronics', 'Studio', 'Living', 'Wellness'];
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <h2 className="text-4xl font-serif italic mb-6">Stay in the Collective.</h2>
            <p className="text-white/40 font-light text-sm mb-8">Exclusive access to archival releases and design studies.</p>
            <div className="flex border-b border-white/10 pb-4">
              <input className="bg-transparent flex-grow text-sm outline-none placeholder-white/20 font-light" placeholder="Your email address" />
              <button className="text-white/40 hover:text-white transition-colors"><ArrowRight size={20} /></button>
            </div>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 mb-6">Collections</p>
            <ul className="space-y-3">
              {categories.map(c => (
                <li key={c}><Link to={`/category/${c}`} className="text-sm text-white/50 hover:text-white transition-colors font-light">{c}</Link></li>
              ))}
              <li><Link to="/products" className="text-sm text-accent-500 hover:text-white transition-colors font-light">All Archives →</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 mb-6">Aethera</p>
            <ul className="space-y-3">
              {['The Studio', 'Sustainability', 'About', 'Careers', 'Contact'].map(l => (
                <li key={l}><Link to={`/${l.toLowerCase().replace(' ', '-')}`} className="text-sm text-white/50 hover:text-white transition-colors font-light">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold">© 2026 AETHERA. All rights reserved.</p>
          <div className="flex space-x-8">
            {[Globe, Share2, Play].map((Icon, i) => (
              <button key={i} className="text-white/20 hover:text-white transition-colors"><Icon size={18} /></button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
