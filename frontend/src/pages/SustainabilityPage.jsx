import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Recycle, Globe, Heart, ArrowRight } from 'lucide-react';

const pillars = [
  { icon: Leaf, title: 'Organic Sourcing', metric: '100%', label: 'Sustainably Sourced Materials', desc: 'Every raw material is traced from origin to artifact — certified organic, ethically harvested, and fully documented.' },
  { icon: Recycle, title: 'Zero Waste Production', metric: '0%', label: 'Landfill Waste', desc: 'Our manufacturing partners operate on closed-loop systems, converting all production waste back into raw material for future artifacts.' },
  { icon: Globe, title: 'Carbon Neutral', metric: '2027', label: 'Carbon Neutral Target', desc: 'We are aggressively offsetting our emissions through high-quality reforestation and renewable energy projects in 8 countries.' },
  { icon: Heart, title: 'Artisan Welfare', metric: '100%', label: 'Fair-Trade Certified Partners', desc: 'Every artisan in our supply chain earns a living wage and benefits from our industry-leading wellbeing programs.' },
];

const SustainabilityPage = () => (
  <div className="bg-primary-50 min-h-screen">
    {/* Hero */}
    <div className="relative h-[80vh] overflow-hidden">
      <img src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover grayscale-[0.3]" alt="Sustainability" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-50 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/70 mb-6">Our Responsibility</p>
          <h1 className="text-7xl md:text-9xl font-serif italic text-white">For the Planet.</h1>
        </div>
      </div>
    </div>

    {/* Manifesto */}
    <section className="py-32 max-w-4xl mx-auto px-6 text-center">
      <p className="text-2xl md:text-3xl font-serif italic text-primary-800/70 leading-relaxed">
        "We believe that true luxury is not a show of excess, but a commitment to permanence — artifacts that outlast trends, respect their origins, and honor the hands that created them."
      </p>
      <div className="w-16 h-px bg-primary-900/20 mx-auto mt-12"></div>
    </section>

    {/* Pillars */}
    <section className="pb-32 max-w-[1400px] mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {pillars.map(({ icon: Icon, title, metric, label, desc }) => (
          <div key={title} className="bg-white p-10">
            <Icon size={28} className="text-primary-800/30 mb-6" />
            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-6xl font-serif italic">{metric}</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-primary-800/40">{label}</span>
            </div>
            <h3 className="text-2xl font-serif mb-4">{title}</h3>
            <p className="text-primary-800/50 font-light leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="bg-primary-900 text-white py-24 text-center">
      <h2 className="text-5xl font-serif italic mb-6">Shop with Purpose.</h2>
      <p className="text-white/40 font-light mb-10">Every artifact acquired is a vote for a more intentional world.</p>
      <Link to="/products" className="inline-flex items-center gap-4 border border-white py-4 px-10 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-primary-900 transition-all">
        Browse the Archive <ArrowRight size={14} />
      </Link>
    </section>
  </div>
);

export default SustainabilityPage;
