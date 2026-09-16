import React from 'react';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';
import { WorkCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { WORK_AREAS_BN } from '../data/translations';

interface WorkCardProps {
  work: WorkCategory;
  index: number;
  onExplore?: (work: WorkCategory) => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({ work, index, onExplore }) => {
  const { isBn, t } = useLanguage();
  const isEven = index % 2 === 0;
  const numStr = (index + 1).toString().padStart(2, '0');
  const fallbackWork = isBn && WORK_AREAS_BN[work.id] ? WORK_AREAS_BN[work.id] : null;

  const displayName = isBn ? (work.nameBn || fallbackWork?.nameBn || work.name) : work.name;
  const displayTagline = isBn ? (work.taglineBn || fallbackWork?.taglineBn || work.tagline) : work.tagline;
  const displayDescription = isBn ? (work.descriptionBn || fallbackWork?.descriptionBn || work.description) : work.description;
  const displayMethods = isBn
    ? ((work.methodsBn && work.methodsBn.length > 0) ? work.methodsBn : (fallbackWork?.methodsBn || work.methods))
    : work.methods;
  const displayImage = (isBn && work.imageBn) ? work.imageBn : work.image;

  return (
    <div className="rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] transition-all duration-300 hover:shadow-xl hover:border-[#0B2A20] overflow-hidden">
      <div className={`grid grid-cols-1 lg:grid-cols-12 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        {/* Visual Column */}
        <div
          className={`lg:col-span-5 relative overflow-hidden bg-neutral-100 ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <div className="relative h-72 sm:h-88 lg:h-full min-h-[320px]">
            <img
              src={displayImage}
              alt={displayName}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 bg-[#0B2A20] text-[#D2F843] font-mono text-xs px-3 py-1.5 rounded-full font-bold tracking-wider uppercase shadow-md">
              {isBn ? `গবেষণা ০${index + 1}` : `Research ${numStr}`}
            </div>
          </div>
        </div>

        {/* Text & Content Column */}
        <div
          className={`lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-[#0B2A20] mb-4">
              <span className="hidden">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D2F843]" />
                {t('Inquiry Domain', 'অনুসন্ধানী ক্ষেত্র')}
              </span>
              <span className="font-mono text-[#556B62]">
                {isBn ? `সূচক / ০${index + 1}` : `INDEX / ${numStr}`}
              </span>
            </div>

            <h3 className="font-sans text-3xl sm:text-4xl text-[#0B2A20] font-extrabold tracking-tight mb-3">
              {displayName}
            </h3>

            <p className="font-sans text-base sm:text-lg text-[#195642] mb-5 leading-snug font-medium">
              “{displayTagline}”
            </p>

            <p className="font-sans text-sm sm:text-base text-[#556B62] leading-relaxed mb-6 font-normal">
              {displayDescription}
            </p>

            {/* Methodological Benchmarks */}
            <div className="mb-6 pt-5 border-t border-[#E2EAE4]">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#0B2A20] mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#195642]" />
                {t('Primary Methodologies', 'প্রধান গবেষণা পদ্ধতিসমূহ')}
              </div>
              <div className="flex flex-wrap gap-2">
                {displayMethods.map((method, mIdx) => (
                  <span
                    key={mIdx}
                    className="inline-block text-xs font-sans px-3 py-1.5 rounded-xl bg-[#F6F9F4] border border-[#E2EAE4] text-[#0D1F18] font-medium"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Sample Inquiries */}
            <div className="hidden">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#0B2A20] mb-3 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#195642]" />
                {t('Sample Investigations & Datasets', 'নমুনা অনুসন্ধান ও উপাত্ত')}
              </div>
              <ul className="space-y-2 text-xs font-sans text-[#0D1F18]">
                {((isBn ? (work.sampleInquiriesBn || fallbackWork?.sampleInquiriesBn || work.sampleInquiries) : work.sampleInquiries) || []).map((inquiry, iIdx) => (
                  <li key={iIdx} className="flex items-start gap-2">
                    <span className="text-[#195642] font-mono mt-0.5">↳</span>
                    <span>{inquiry}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E2EAE4] flex items-center justify-between">
            <span className="hidden">
              {t('Open Access Public Archive', 'উন্মুক্ত নাগরিক মহাফেজখানা')}
            </span>
            {onExplore && (
              <button
                onClick={() => onExplore(work)}
                className="group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0B2A20] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#144234] transition-all cursor-pointer"
              >
                <span>{t('Examine Focus Area', 'ক্ষেত্রটি বিস্তারিত দেখুন')}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#D2F843]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
