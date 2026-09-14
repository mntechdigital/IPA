import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { ContactFormData } from '../types';
import { RichTextEditor } from './RichTextEditor';
import { useLanguage } from '../context/LanguageContext';

export const ContactForm: React.FC = () => {
  const { isBn, t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getCleanText = (html: string) => {
    if (typeof document === 'undefined') return html;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = t('Please provide your full name.', 'অনুগ্রহ করে আপনার পুরো নাম লিখুন।');
    }
    if (!formData.email.trim()) {
      errs.email = t('Please provide your email address.', 'অনুগ্রহ করে আপনার ইমেইল ঠিকানা দিন।');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = t('Please enter a valid email address.', 'অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা দিন।');
    }
    if (!formData.subject.trim()) {
      errs.subject = t('Please state the subject of your inquiry.', 'অনুগ্রহ করে অনুসন্ধানের বিষয়টি লিখুন।');
    }
    
    const cleanMsg = getCleanText(formData.message).trim();
    if (!cleanMsg) {
      errs.message = t('Please provide a message or inquiry overview.', 'অনুগ্রহ করে আপনার বার্তা বা অনুসন্ধানের বিবরণ দিন।');
    } else if (cleanMsg.length < 15) {
      errs.message = t('Message must be at least 15 characters.', 'বার্তাটি কমপক্ষে ১৫ অক্ষরের হতে হবে।');
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate realistic institutional dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        organization: '',
        subject: '',
        message: '',
      });
    }, 800);
  };

  return (
    <div className="rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] p-8 sm:p-10 lg:p-12 shadow-sm">
      <div className="mb-8">
        <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B2A20]/5 text-[#0B2A20] text-xs font-bold uppercase tracking-wider border border-[#0B2A20]/10">
          <span className="w-2 h-2 rounded-full bg-[#D2F843]" />
          <span>{t('Direct Communication', 'সরাসরি যোগাযোগ')}</span>
        </div>
        <h3 className="font-sans text-3xl sm:text-4xl text-[#0B2A20] font-extrabold tracking-tight">
          {t('Send Us a Message', 'আমাদের বার্তা পাঠান')}
        </h3>
        <p className="text-sm font-sans text-[#556B62] mt-2">
          {t(
            'We welcome inquiries from academic researchers, journalists, civic institutions, and potential collaborators.',
            'গবেষক, সাংবাদিক, নাগরিক সংগঠন এবং সহযোগীদের অনুসন্ধান ও যোগাযোগকে আমরা আন্তরিকভাবে স্বাগত জানাই।'
          )}
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-8 bg-[#F6F9F4] border border-[#E2EAE4] rounded-2xl text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#0B2A20] text-[#D2F843] flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-7 h-7 text-[#D2F843]" />
          </div>
          <h4 className="font-sans font-extrabold text-2xl text-[#0B2A20]">
            {t('Message Received', 'বার্তাটি গৃহীত হয়েছে')}
          </h4>
          <p className="text-sm font-sans text-[#556B62] max-w-md mx-auto leading-relaxed">
            {t(
              "Thank you for contacting us. We'll get back to you as soon as possible. Our secretariat typically responds within two business days.",
              'আমাদের সাথে যোগাযোগ করার জন্য ধন্যবাদ। আমাদের সচিবালয় সাধারণত দুই কার্যদিবসের মধ্যে উত্তর প্রদান করে থাকে।'
            )}
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#0B2A20] text-[#D2F843] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#195642] transition-colors cursor-pointer"
          >
            {t('← Send another message', '← আরেকটি বার্তা পাঠান')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-mono uppercase tracking-wider text-[#0B2A20] font-semibold mb-2"
              >
                {t('Full Name', 'পুরো নাম')} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={isBn ? 'মো. আরিফুল ইসলাম' : 'Dr. Eleanor Vance'}
                className={`w-full px-4 py-3 rounded-xl bg-[#F6F9F4] text-sm text-[#0D1F18] placeholder:text-[#556B62]/60 border transition-all outline-none ${
                  errors.fullName
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-[#E2EAE4] focus:border-[#0B2A20]'
                }`}
              />
              {errors.fullName && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-wider text-[#0B2A20] font-semibold mb-2"
              >
                {t('Email Address', 'ইমেইল ঠিকানা')} <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className={`w-full px-4 py-3 rounded-xl bg-[#F6F9F4] text-sm text-[#0D1F18] placeholder:text-[#556B62]/60 border transition-all outline-none ${
                  errors.email
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-[#E2EAE4] focus:border-[#0B2A20]'
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Organization */}
            <div>
              <label
                htmlFor="organization"
                className="block text-xs font-mono uppercase tracking-wider text-[#0B2A20] font-semibold mb-2"
              >
                {t('Organization / Institution', 'প্রতিষ্ঠান / সংস্থা')}
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder={isBn ? 'বিশ্ববিদ্যালয়, গণমাধ্যম, এনজিও বা ব্যক্তিগত' : 'University, Newsroom, NGO, or Independent'}
                className="w-full px-4 py-3 rounded-xl bg-[#F6F9F4] text-sm text-[#0D1F18] placeholder:text-[#556B62]/60 border border-[#E2EAE4] focus:border-[#0B2A20] transition-all outline-none"
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-mono uppercase tracking-wider text-[#0B2A20] font-semibold mb-2"
              >
                {t('Subject', 'বিষয়')} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={isBn ? 'গবেষণা অনুসন্ধান / মিডিয়া মন্তব্য / ফেলোশিপ' : 'Research Inquiry / Media Request / Fellowship'}
                className={`w-full px-4 py-3 rounded-xl bg-[#F6F9F4] text-sm text-[#0D1F18] placeholder:text-[#556B62]/60 border transition-all outline-none ${
                  errors.subject
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-[#E2EAE4] focus:border-[#0B2A20]'
                }`}
              />
              {errors.subject && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.subject}
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="contact-message-editor"
                className="block text-xs font-mono uppercase tracking-wider text-[#0B2A20] font-semibold"
              >
                {t('Message', 'বার্তা')} <span className="text-red-600">*</span>
              </label>
              <span className="text-[11px] font-mono text-[#556B62]">
                {isBn
                  ? `${getCleanText(formData.message).trim().length} অক্ষর · রিচ টেক্সট সক্রিয়`
                  : `${getCleanText(formData.message).trim().length} chars · Rich Text Enabled`}
              </span>
            </div>
            <RichTextEditor
              id="contact-message-editor"
              value={formData.message}
              onChange={(val) => {
                setFormData((prev) => ({ ...prev, message: val }));
                if (errors.message) {
                  setErrors((prev) => ({ ...prev, message: undefined }));
                }
              }}
              placeholder={
                isBn
                  ? 'আপনার অনুসন্ধান, পটভূমি বা প্রয়োজনীয় তথ্য বিস্তারিত লিখুন...'
                  : 'Please describe your inquiry, context, or requested research dataset...'
              }
              minHeight="160px"
              hasError={Boolean(errors.message)}
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.message}
              </p>
            )}
            <p className="mt-1.5 text-[11px] text-[#556B62]">
              {t(
                'Supports rich text styling: bold, italic, underline, lists, quotes, and links.',
                'রিচ টেক্সট ফরম্যাটিং সমর্থিত: বোল্ড, ইটালিক, আন্ডারলাইন, তালিকা, উদ্ধৃতি ও লিঙ্ক।'
              )}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs font-sans text-[#556B62] max-w-sm">
              {t(
                'Inquiries are processed in accordance with institutional confidentiality protocols.',
                'সকল বার্তা প্রাতিষ্ঠানিক গোপনীয়তা নীতি অনুসারে বিবেচনা করা হয়।'
              )}
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto rounded-full px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-wider bg-[#0B2A20] text-[#D2F843] hover:bg-[#195642] shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-2"
            >
              <span className="whitespace-nowrap">
                {isSubmitting ? t('Transmitting...', 'প্রেরণ করা হচ্ছে...') : t('Send Message', 'বার্তা পাঠান')}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D2F843] shrink-0" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
