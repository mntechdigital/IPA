import { NavItem } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'work', label: 'Researches' },
  { id: 'team', label: 'Our Team' },
];

export const ORGANIZATION = {
  name: 'Institute of Public Accountability',
  shortName: 'IPA',
  acronym: 'IPA',
  nameBn: 'ইনস্টিটিউট অব পাবলিক অ্যাকাউন্টেবিলিটি',
  shortNameBn: 'আইপিএ',
  tagline: 'Researching Media. Understanding Society.',
  taglineBn: 'গণমাধ্যম নিয়ে গবেষণা। সমাজের গভীর অনুধাবন।',
  subTagline: 'Independent research and analysis for a changing media environment.',
  subTaglineBn: 'পরিবর্তনশীল গণমাধ্যম ও তথ্য ব্যবস্থার জন্য স্বাধীন বিশ্লেষণ ও গবেষণা।',
  established: '2019',
  contact: {
    generalEmail: 'info@mediaresearch.org',
    researchEmail: 'research@mediaresearch.org',
    mediaEmail: 'media@mediaresearch.org',
    phone: '+880 2 984 5512',
    secondaryPhone: '+880 171 000 9821',
    address: 'Level 7, Press & Research Tower, 42 Gulshan Avenue, Dhaka 1212',
    addressBn: 'লেভেল ৭, প্রেস অ্যান্ড রিসার্চ টাওয়ার, ৪২ গুলশান অ্যাভিনিউ, ঢাকা ১২১২',
    hours: 'Sunday – Thursday: 09:00 – 17:30 BST',
    hoursBn: 'রবিবার – বৃহস্পতিবার: সকাল ৯:০০ – বিকাল ৫:৩০ (বাংলাদেশ সময়)',
  },
  socials: [
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'X / Twitter', url: 'https://twitter.com' },
    { name: 'Facebook', url: 'https://facebook.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
  ],
};
