
import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-32 px-6 md:px-24 bg-[#0B0F19] border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
        <div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tighter text-[#E5E7EB]">Let's build<br />the future.</h2>
          <p className="text-[#9CA3AF] text-2xl font-light max-w-xl">
            Currently available for <strong>Data Science</strong> and <strong>Fullstack Engineering</strong> opportunities. Expert in Python analytics and enterprise Java systems.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <p className="text-[11px] font-black tracking-[0.5em] text-[#3B82F6] uppercase">Connect Globally</p>
          <nav className="flex gap-6" aria-label="Social media links">
            {SOCIAL_LINKS.map((link, idx) => (
              <a 
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-[#111827] border border-white/5 rounded-3xl hover:bg-[#3B82F6] hover:border-[#3B82F6] transition-all duration-500 text-white shadow-xl hover:shadow-[#3B82F6]/20 hover:-translate-y-2"
                aria-label={`Visit my ${link.name}`}
              >
                {React.cloneElement(link.icon as React.ReactElement<any>, { size: 28 })}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between text-[#9CA3AF] text-[10px] font-black uppercase tracking-[0.3em]">
        <p>&copy; {new Date().getFullYear()} Karne Ruthvik | Data Scientist Portfolio</p>
        <p>Built with GSAP & Advanced SEO Architecture</p>
      </div>
    </footer>
  );
};

export default Footer;
