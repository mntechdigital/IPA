import React from 'react';

interface SectionHeadingProps {
  label?: string;
  index?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  index,
  title,
  description,
  align = 'left',
  dark = false,
  className = '',
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center mx-auto' : ''} ${className}`}>
      {(label || index) && (
        <div
          className={`flex items-center gap-4 mb-4 ${
            align === 'center' ? 'justify-center' : 'justify-between'
          }`}
        >
          {label && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0B2A20]/5 text-[#0B2A20] border border-[#0B2A20]/10">
              <span className="w-2 h-2 rounded-full bg-[#D2F843] shadow-[0_0_8px_#D2F843]" />
              <span className={dark ? 'text-white' : 'text-[#0B2A20]'}>{label}</span>
            </div>
          )}
          {index && (
            <span className={`font-mono text-xs uppercase tracking-widest ${dark ? 'text-white/60' : 'text-[#556B62]'}`}>
              {index}
            </span>
          )}
        </div>
      )}

      <h2
        className={`font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold leading-[1.12] tracking-tight mb-5 ${
          dark ? 'text-white' : 'text-[#0B2A20]'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`text-base md:text-lg leading-relaxed max-w-2xl font-sans font-normal ${
            dark ? 'text-white/70' : 'text-[#556B62]'
          } ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

