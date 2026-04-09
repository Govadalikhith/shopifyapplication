import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Pen, Layers, Globe } from 'lucide-react';

const StudioPage = () => (
  <div className="bg-primary-50 min-h-screen">
    {/* Hero */}
    <div className="relative h-screen flex items-end overflow-hidden">
      <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale-[0.4]" alt="Studio" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pb-24 text-white">
        <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/50 mb-4">Aethera Studio</p>
        <h1 className="text-7xl md:text-9xl font-serif italic mb-6">Where Objects <br /> Are Born.</h1>
        <p className="text-white/60 font-light max-w-lg text-lg leading-relaxed">Our design studio is the nerve center of every artifact — a space of molecular precision and artisanal craft.</p>
      </div>
    </div>

    {/* Process */}
    <section className="py-32 max-w-[1400px] mx-auto px-6 lg:px-12">
      <h2 className="text-5xl font-serif mb-24">The Design Process.</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
        {[
          { step: '01', title: 'Ideation', icon: Pen, desc: 'Every artifact begins as a sketch — a pure vision stripped of compromise, driven only by function and beauty.' },
          { step: '02', title: 'Engineering', icon: Layers, desc: 'Precision CAD modeling and material science converge to ensure every specification is achieved at the molecular level.' },
          { step: '03', title: 'Craftsmanship', icon: Globe, desc: 'Partnering with master artisans across 12 countries, we bring each artifact to life with human hands and dedicated expertise.' },
        ].map(({ step, title, icon: Icon, desc }) => (
          <div key={step} className="border-t border-primary-900/10 pt-8">
            <p className="text-[10px] uppercase tracking-widest font-bold text-primary-800/30 mb-6">{step}</p>
            <Icon size={24} className="mb-6 text-primary-800/40" />
            <h3 className="text-3xl font-serif mb-6">{title}</h3>
            <p className="text-primary-800/50 font-light leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="bg-primary-900 text-white py-32 text-center">
      <h2 className="text-6xl font-serif italic mb-8">Explore the Studio Collection.</h2>
      <p className="text-white/40 font-light mb-12">Objects designed for the workspace of the future.</p>
      <Link to="/category/Studio" className="btn-outline border-white text-white hover:bg-white hover:text-primary-900 inline-flex items-center gap-4">
        Shop Studio <ArrowRight size={16} />
      </Link>
    </section>
  </div>
);

export default StudioPage;
