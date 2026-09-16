export interface SectionAppTileDef {
  id: string;
  appNumber: string;
  title: string;
  tagline: string;
  icon: string;
  category: 'home' | 'about' | 'research' | 'teams' | 'contact' | 'branding' | 'work';
  badgeColor?: 'purple' | 'green' | 'blue' | 'amber' | 'rose';
  fieldsCount: number;
  previewHint: string;
}

export interface PageAppHubDef {
  pageId: 'home' | 'about' | 'research' | 'teams' | 'contact' | 'branding' | 'work';
  pageTitle: string;
  pageSubtitle: string;
  routePath: string;
  apps: SectionAppTileDef[];
}

export const APP_GRID_PAGES: Record<string, PageAppHubDef> = {
  home: {
    pageId: 'home',
    pageTitle: 'Home Page App Grid',
    pageSubtitle: 'Manage every individual section and interactive widget rendered across the live Home Page',
    routePath: '/admin/pages/home',
    apps: [
      {
        id: 'home-hero',
        appNumber: 'App 1',
        title: 'Hero Section & Stat Badges',
        tagline: 'Established tag, eyebrow badge, headline, subtitle, background image, and counter badge',
        icon: 'Sparkles',
        category: 'home',
        badgeColor: 'purple',
        fieldsCount: 6,
        previewHint: 'Top primary screen area with Independent Observatory · Est. 2019 badge and telemetry metrics'
      },
      {
        id: 'home-public-interest',
        appNumber: 'App 2',
        title: 'Built for Public Interest Banner',
        tagline: 'Banner headline, description narrative, image upload, and four key points',
        icon: 'ShieldCheck',
        category: 'home',
        badgeColor: 'green',
        fieldsCount: 4,
        previewHint: 'Institutional mandate showcase with hardcoded Public Interest badge'
      },
      {
        id: 'home-what-we-do',
        appNumber: 'App 3',
        title: 'What We Do App',
        tagline: 'Section header, subheader, and three dynamic cards with text or image content',
        icon: 'LayoutGrid',
        category: 'home',
        badgeColor: 'blue',
        fieldsCount: 6,
        previewHint: 'Interactive 4-column cards (Newsroom Audits, Broadcast Archiving, etc.)'
      },
      {
        id: 'home-ticker',
        appNumber: 'App 3',
        title: 'Ticker Marquee',
        tagline: 'Scrolling marquee items in English and Bangla with speed control',
        icon: 'ScrollText',
        category: 'home',
        badgeColor: 'amber',
        fieldsCount: 4,
        previewHint: 'Infinite scrolling banner below public interest section'
      },
      {
        id: 'home-who-we-are-home',
        appNumber: 'App 4',
        title: 'Who We Are (Home) Section',
        tagline: 'Home Who We Are heading, descriptions, badge and CTA in both languages',
        icon: 'Building2',
        category: 'home',
        badgeColor: 'blue',
        fieldsCount: 8,
        previewHint: '01 / 05 introduction block on home page'
      },
      {
        id: 'home-what-we-do-v2',
        appNumber: 'App 5',
        title: 'What We Do App',
        tagline: 'Section header, subheader, and three dynamic cards with text or image content',
        icon: 'LayoutGrid',
        category: 'home',
        badgeColor: 'blue',
        fieldsCount: 6,
        previewHint: 'Interactive 3-column cards (Newsroom Audits, Broadcast Archiving, etc.)'
      },
      {
        id: 'home-focus-areas',
        appNumber: 'App 6',
        title: 'Focus Areas Items',
        tagline: 'Manage 6 focus area cards with topic, description, image and expanded details (EN/BN)',
        icon: 'Compass',
        category: 'home',
        badgeColor: 'green',
        fieldsCount: 12,
        previewHint: 'AREAS OF FOCUS 03 / 05 interactive list'
      },
      {
        id: 'home-quote',
        appNumber: 'App 7',
        title: 'Core Quote Banner App',
        tagline: 'Main quote text, author subtitle, badge, and methodology CTA',
        icon: 'Quote',
        category: 'home',
        badgeColor: 'amber',
        fieldsCount: 5,
        previewHint: '“Better understanding begins with better research” focus banner'
      },
      {
        id: 'home-how-we-work',
        appNumber: 'App 8',
        title: 'How We Work App',
        tagline: '4-Step methodological process cards with step badges and summaries',
        icon: 'GitBranch',
        category: 'home',
        badgeColor: 'green',
        fieldsCount: 6,
        previewHint: 'Inquiry → Protocol → Evidence → Public Knowledge flow'
      },
      {
        id: 'home-featured-team',
        appNumber: 'App 9',
        title: 'Featured Team Preview',
        tagline: 'Dynamic toggle & selection for researcher cards displayed on the home page',
        icon: 'Users',
        category: 'home',
        badgeColor: 'blue',
        fieldsCount: 4,
        previewHint: 'Controls homepage researcher spotlight grid'
      },
      {
        id: 'home-bottom-cta',
        appNumber: 'App 10',
        title: 'Bottom Call-to-Action Banner',
        tagline: 'Final call-to-action title, narrative and primary action button',
        icon: 'Megaphone',
        category: 'home',
        badgeColor: 'purple',
        fieldsCount: 4,
        previewHint: 'Pre-footer conversion banner for dataset inquiries'
      },
    ]
  },
  about: {
    pageId: 'about',
    pageTitle: 'About Us App Grid',
    pageSubtitle: 'Manage institutional history, governance pillars, methodological ethics, and observatories',
    routePath: '/admin/pages/about',
    apps: [
      {
        id: 'about-hero',
        appNumber: 'App 1',
        title: 'About Hero Banner',
        tagline: 'Main title, subtext narrative, header background styling & badges',
        icon: 'Sparkles',
        category: 'about',
        badgeColor: 'purple',
        fieldsCount: 4,
        previewHint: 'Organizational introduction and header presentation'
      },
      {
        id: 'about-who-we-are',
        appNumber: 'App 2',
        title: 'Who We Are Block',
        tagline: 'Heading, description, and badge text displayed beneath the heading',
        icon: 'Building2',
        category: 'about',
        badgeColor: 'blue',
        fieldsCount: 3,
        previewHint: 'Foundational history, research facilities, and photo showcase'
      },
      {
        id: 'about-pillars',
        appNumber: 'App 3',
        title: 'Mission & Vision Grid',
        tagline: '4 App Cards for core institutional pillars (Title, Quote text, Badge)',
        icon: 'Target',
        category: 'about',
        badgeColor: 'green',
        fieldsCount: 8,
        previewHint: 'Independence, Evidence, Transparency, and Public Interest pillars'
      },
    ]
  },
  research: {
    pageId: 'research',
    pageTitle: 'Research Page App Grid',
    pageSubtitle: 'Manage the public Research (/work) page: hero, tracks, filter pills, CTA, and operational pillars',
    routePath: '/admin/pages/research',
    apps: [
      {
        id: 'research-hero',
        appNumber: 'App 1',
        title: 'Hero Section',
        tagline: 'Research page headline, label, description, metadata tag, and background image (EN/BN)',
        icon: 'Sparkles',
        category: 'research',
        badgeColor: 'purple',
        fieldsCount: 6,
        previewHint: 'Primary top banner with headline and background imagery'
      },
      {
        id: 'research-areas',
        appNumber: 'App 2',
        title: 'Areas & Filters',
        tagline: 'Section badge, title, catalog reload tooltip, and category filter button labels (EN/BN)',
        icon: 'Filter',
        category: 'research',
        badgeColor: 'blue',
        fieldsCount: 8,
        previewHint: 'Header controls and filter pills (Journalism, Platforms, Public)'
      },
      {
        id: 'research-tracks',
        appNumber: 'App 3',
        title: 'Research Tracks',
        tagline: 'Manage the 6 core research programs, methodologies, inquiries, fellows, and metrics',
        icon: 'Layers',
        category: 'research',
        badgeColor: 'green',
        fieldsCount: 16,
        previewHint: 'The 6 primary research beats driving both the cards on /work and the investigation details'
      },
      {
        id: 'research-cta',
        appNumber: 'App 4',
        title: 'Call to Action (CTA)',
        tagline: 'Institutional collaboration banner, badges, titles, descriptions, and action buttons (EN/BN)',
        icon: 'MessageSquare',
        category: 'research',
        badgeColor: 'amber',
        fieldsCount: 6,
        previewHint: 'Bottom conversion section inviting researchers and partners to connect'
      },
      {
        id: 'research-pillars',
        appNumber: 'App 5',
        title: 'Research Pillars',
        tagline: 'Manage 4 operational modalities (Research, Analysis, Monitoring, Insights) with highlights (EN/BN)',
        icon: 'Columns',
        category: 'research',
        badgeColor: 'purple',
        fieldsCount: 10,
        previewHint: '4 core operational modalities outlining institutional research methodology'
      }
    ]
  },
  teams: {
    pageId: 'teams',
    pageTitle: 'Teams Page App Grid',
    pageSubtitle: 'Manage research directorate, fellows, computational analysts, and advisory fellows',
    routePath: '/admin/pages/teams',
    apps: [
      {
        id: 'teams-hero',
        appNumber: 'App 1',
        title: 'Teams Page Hero',
        tagline: 'Main page heading, introductory mission statement, and directory statistics',
        icon: 'Sparkles',
        category: 'teams',
        badgeColor: 'purple',
        fieldsCount: 3,
        previewHint: 'Header banner introducing the interdisciplinary team'
      },
      {
        id: 'teams-leadership',
        appNumber: 'App 2',
        title: 'Directorate & Leadership App',
        tagline: 'Executive directors, principal investigators, photos, bios, credentials & emails',
        icon: 'Award',
        category: 'teams',
        badgeColor: 'blue',
        fieldsCount: 10,
        previewHint: 'Leadership profiles with modal bio editor and domain tags'
      },
      {
        id: 'teams-researchers',
        appNumber: 'App 3',
        title: 'Researchers & Analysts App',
        tagline: 'Senior fellows, investigative reporters, and data analysts manager',
        icon: 'Users',
        category: 'teams',
        badgeColor: 'green',
        fieldsCount: 10,
        previewHint: 'Full directory of empirical fellows and computational researchers'
      },
      {
        id: 'teams-advisory',
        appNumber: 'App 4',
        title: 'Independent Scientific Advisory App',
        tagline: 'External advisory board, academic peers, and visiting scholars list',
        icon: 'GraduationCap',
        category: 'teams',
        badgeColor: 'amber',
        fieldsCount: 8,
        previewHint: 'Peer review and scientific integrity advisory board'
      }
    ]
  },
  contact: {
    pageId: 'contact',
    pageTitle: 'Contact Us App Grid',
    pageSubtitle: 'Manage direct observatory channels, desk emails, inquiries inbox, and FAQ accordion',
    routePath: '/admin/pages/contact',
    apps: [
      {
        id: 'contact-hero',
        appNumber: 'App 1',
        title: 'Let’s Start a Conversation Hero',
        tagline: 'Hero heading, subtitle, badge, and high-resolution background asset',
        icon: 'MessageSquare',
        category: 'contact',
        badgeColor: 'purple',
        fieldsCount: 4,
        previewHint: 'Top communication screen with clean typography'
      },
      {
        id: 'contact-details',
        appNumber: 'App 2',
        title: 'Direct Contact Details App',
        tagline: 'Phone numbers, toll-free lines, support emails, physical office & hours',
        icon: 'MapPin',
        category: 'contact',
        badgeColor: 'blue',
        fieldsCount: 6,
        previewHint: 'Physical headquarters address and direct contact lines'
      },
      {
        id: 'contact-messages',
        appNumber: 'App 3',
        title: 'Contact Messages List App',
        tagline: 'View messages submitted from the website Contact Us form',
        icon: 'Inbox',
        category: 'contact',
        badgeColor: 'green',
        fieldsCount: 1,
        previewHint: 'Contact form submissions with sender, email, subject, message, and status'
      },
      {
        id: 'contact-faqs',
        appNumber: 'App 4',
        title: 'FAQ Accordion Manager App',
        tagline: 'Category tabs and collapsible Question/Answer rich-text repeater',
        icon: 'HelpCircle',
        category: 'contact',
        badgeColor: 'amber',
        fieldsCount: 4,
        previewHint: 'Accordion questions covering data access, ethics & fellowships'
      }
    ]
  },
  branding: {
    pageId: 'branding',
    pageTitle: 'Header and Footer Branding App Grid',
    pageSubtitle: 'Manage header and footer logos, optional text, and footer description',
    routePath: '/admin/branding',
    apps: [
      {
        id: 'branding-header',
        appNumber: 'App 1',
        title: 'Header and Footer Branding App',
        tagline: 'Manage header and footer logo images, optional text, and footer description',
        icon: 'Globe',
        category: 'branding',
        badgeColor: 'purple',
        fieldsCount: 5,
        previewHint: 'Header and footer logo images, text, and footer description'
      },
      {
        id: 'branding-links',
        appNumber: 'App 2',
        title: 'Social & Navigation Links App',
        tagline: 'Manage social media links displayed across the website footer',
        icon: 'Share2',
        category: 'branding',
        badgeColor: 'green',
        fieldsCount: 6,
        previewHint: 'Dynamic social media handles'
      },
      {
        id: 'branding-navigation',
        appNumber: 'App 3',
        title: 'Navigation Menu',
        tagline: 'Manage header navigation items (EN/BN labels, URLs, order)',
        icon: 'Navigation',
        category: 'branding',
        badgeColor: 'blue',
        fieldsCount: 5,
        previewHint: 'Header Home, About, Researches, Team, Contact'
      },
      {
        id: 'branding-footer',
        appNumber: 'App 4',
        title: 'Footer Branding & Bottom Links',
        tagline: 'Manage footer tagline, copyright, license and bottom bar links (EN/BN)',
        icon: 'LayoutGrid',
        category: 'branding',
        badgeColor: 'amber',
        fieldsCount: 8,
        previewHint: 'Footer tagline, copyright and privacy/terms links'
      }
    ]
  }
};
