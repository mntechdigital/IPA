import React from 'react';
import { motion } from 'motion/react';

interface PageHeroProps {
  label: string;
  title: string;
  description: string;
  breadcrumbs?: string[];
  metadata?: string;
  backgroundImage?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  label,
  title,
  description,
  metadata,
  backgroundImage,
}) => {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#0B2A20] text-white overflow-hidden border-b border-[#144234]">
      {backgroundImage && (
        <>
          <img src={backgroundImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-screen pointer-events-none" />
          <div className="absolute inset-0 bg-[#0B2A20]/65 pointer-events-none" />
        </>
      )}
      {/* Modern ambient gradient and subtle geometric line texture */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#195642]/30 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#D2F843]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
      <div className="absolute inset-0 bg-[radial-gradient(#1B4E3E_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#D2F843] border border-white/15 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#D2F843] shadow-[0_0_8px_#D2F843]" />
              {label}
            </span>
            {metadata && (
              <span className="text-xs font-medium text-white/60 uppercase tracking-widest px-2 py-1">
                / {metadata}
              </span>
            )}
          </div>

          <h1 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-[72px] font-extrabold leading-[1.04] tracking-tight text-white mb-6">
            {title}
          </h1>

          <p className="text-[17px] sm:text-lg md:text-xl font-sans text-white/80 leading-relaxed max-w-2xl font-normal">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
