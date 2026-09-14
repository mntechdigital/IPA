export type PageId = 'home' | 'about' | 'work' | 'team' | 'contact' | 'investigation';

export interface NavItem {
  id: PageId;
  label: string;
}

export interface InvestigationDetailData {
  id: string;
  beatNumber: string;
  category: 'journalism' | 'platforms' | 'public';
  name: string;
  tagline: string;
  description: string;
  image: string;
  outputsCount: string;
  timeframe: string;
  status: 'Active Longitudinal Research' | 'Continuous Monitoring' | 'Annual Cycle';
  leadFellows: string[];
  metrics: { label: string; value: string; detail: string }[];
  overview: string[];
  keyQuestions: string[];
  methodologyDetails: {
    title: string;
    protocol: string;
    frequency: string;
    description: string;
  }[];
  caseStudies: {
    title: string;
    year: string;
    summary: string;
    impact: string;
  }[];
  publications: {
    title: string;
    type: 'Monograph' | 'Policy Brief' | 'Dataset' | 'Peer-Reviewed Paper';
    date: string;
    pagesOrSize: string;
    downloadUrl?: string;
  }[];
}

export interface FocusAreaItem {
  number: string;
  topic: string;
  description: string;
  image: string;
  expandedDetails?: string[];
}

export interface WorkCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  methods: string[];
  sampleInquiries: string[];
  image: string;
  outputsCount: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'leadership' | 'research' | 'advisory' | 'Senior Fellow' | 'Research Fellow' | 'Leadership' | 'Technical Staff' | string;
  teamType?: 'INSTITUTE GOVERNANCE' | 'INVESTIGATIVE CORPS' | string;
  image: string;
  bio: string;
  fullBio?: string;
  researchInterests?: string[];
  focusAreas?: string[];
  education?: string;
  recentPublications?: string[];
  email: string;
  twitter?: string;
  linkedin?: string;
  scholar?: string;
  order?: number;
}

export interface ApproachStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface CoreValue {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
}

export interface MetricItem {
  id?: string;
  label: string;
  value: string;
  detail: string;
}

export interface MethodologyStep {
  step: string;
  label: string;
  summary: string;
}

export interface MethodologyProtocol {
  id: string;
  title: string;
  protocol: string;
  frequency: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  year: string;
  summary: string;
  impact: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  type: string;
  date: string;
  pagesOrSize: string;
  beatId?: string;
  downloadUrl?: string;
  abstract?: string;
  status?: string;
}

export interface ResearchBeat {
  id: string;
  slug?: string;
  beatNumber: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  outputsCount: string;
  timeframe: string;
  status: string;
  leadFellows: string[];
  metrics: MetricItem[];
  overview: string[];
  keyQuestions: string[];
  methodologyDetails: MethodologyProtocol[];
  caseStudies: CaseStudy[];
  publications: PublicationItem[];
  viewCount?: number;
  summary?: string;
  methodology?: string;
  primaryMethodologies?: string[];
  imageTitle?: string;
  imageSubtitle?: string;
  researchNarrative?: string;
}

export interface CoreTenet {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface WhatWeDoCard {
  id: string;
  icon: string;
  iconImage?: string;
  title: string;
  description: string;
  linkUrl: string;
  cardType?: 'text' | 'image';
  image?: string;
  theme?: 'light' | 'image' | 'accent';
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  subheading?: string;
}

export interface FaqItem {
  id: string;
  category: string;
  categoryLabel?: string;
  question: string;
  answer: string;
  highlights?: string[];
}

export interface FooterLinkItem {
  label: string;
  url: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}

export interface HomePageData {
  badge: string;
  badgeBn: string;
  heroHeadline: string;
  heroHeadlineBn: string;
  heroSubtitle: string;
  heroSubtitleBn: string;
  establishedTag: string;
  heroImage: string;
  countersBadge?: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  tenetBadge: string;
  tenetQuote: string;
  tenetQuoteBn: string;
  tenetSubtitle: string;
  tenetSubtitleBn: string;
  tenetImage?: string;
  homeMetrics: MetricItem[];
  featuredInquiryIds: string[];
  publicInterestBanner?: {
    title: string;
    description: string;
    badge: string;
    mediaUrl: string;
    keyPoints?: string[];
    ctaText?: string;
  };
  whatWeDo?: {
    header: string;
    subheader: string;
    cards: WhatWeDoCard[];
  };
  areasOfInvestigation?: {
    title: string;
    subtitle: string;
    filterLabel?: string;
    activeCategoryIds: string[];
    cards?: InvestigationCard[];
  };
  howWeWork?: {
    badge: string;
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  featuredTeam?: {
    title: string;
    subtitle: string;
    showOnHome: boolean;
    featuredMemberIds: string[];
  };
  bottomCta?: {
    title: string;
    narrative: string;
    primaryCtaText: string;
    primaryCtaUrl: string;
    secondaryCtaText: string;
    secondaryCtaUrl: string;
  };
}

export interface InvestigationCard {
  id: string;
  heading: string;
  description: string;
  image?: string;
}

export interface AboutPageData {
  missionBadge: string;
  missionTitle: string;
  missionStory: string[];
  principles: CoreTenet[];
  methodologySteps: MethodologyStep[];
  governanceEthics: string[];
  observatories: {
    name: string;
    role: string;
    address: string;
    phone: string;
    email: string;
  }[];
  heroBanner?: {
    title: string;
    subtext: string;
    bgStyle: 'gradient' | 'minimal' | 'solid' | string;
    badgeText: string;
    bgImage?: string;
  };
  whoWeAre?: {
    heading?: string;
    description?: string;
    badgeText?: string;
    narrative: string[];
    mainPhoto: string;
    highlightCardText: string;
    foundedYear: string;
  };
  missionPillars?: {
    id: string;
    title: string;
    quote: string;
    badge: string;
    description: string;
    image?: string;
  }[];
  fromQuestionsToInsight?: {
    heading: string;
    subheading: string;
    ctaText: string;
    destinationUrl: string;
  };
}

export interface ContactPageData {
  hero: {
    heading: string;
    headingBn?: string;
    subtitle: string;
    subtitleBn?: string;
    bgImage: string;
    badge: string;
    badgeBn?: string;
  };
  directDetails: {
    phone: string;
    phoneLabel?: string;
    tollFreePhone: string;
    tollFreePhoneLabel?: string;
    supportEmail: string;
    researchDeskEmail: string;
    pressEmail?: string;
    officeLocation: string;
    officeLocationBn?: string;
    workingHours: string;
    workingHoursBn?: string;
    googleMapsUrl?: string;
  };
  messageSettings: {
    targetEmail: string;
    autoReply: boolean;
    subjectPrefix: string;
    requireAffiliation: boolean;
  };
  faqs: FaqItem[];
}

export interface SiteSettings {
  siteName: string;
  siteSubtitle: string;
  metaDescription: string;
  ogImage: string;
  contactEmail: string;
  researchDeskEmail: string;
  pressEmail: string;
  officeAddress: string;
  establishedYear: string;
  teamHero?: {
    heading: string;
    subheading: string;
    image: string;
  };
  defaultLanguage: 'en' | 'bn';
  socialLinks: {
    [network: string]: string | undefined;
    twitter?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
  };
  headerBranding?: {
    lightLogoText?: string;
    tagline: string;
    logoUrl?: string;
    darkLogoUrl?: string;
    navCtaText: string;
    navCtaUrl: string;
    announcementBannerText?: string;
    enableBanner?: boolean;
  };
  footerBranding?: {
    footerLogoText?: string;
    logoUrl?: string;
    tagline: string;
    copyrightNotice: string;
    licenseNotice: string;
  };
  accessControl?: {
    administrator: { manageSettings: boolean; manageContent: boolean; manageTeam: boolean };
    editor: { manageSettings: boolean; manageContent: boolean; manageTeam: boolean };
    viewer: { manageSettings: boolean; manageContent: boolean; manageTeam: boolean };
  };
  footerNavigation?: FooterColumn[];
}

export interface InquirySubmission {
  id: string;
  date: string;
  name: string;
  organization: string;
  email: string;
  topic: string;
  message: string;
  requestedDataset?: string;
  status: 'new' | 'reviewed' | 'dispatched' | 'archived';
  notes?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  section: string;
  user: string;
}

export interface MonitoringTelemetry {
  broadcastChannelsLogged: number;
  printEditionsScanned: number;
  articlesIndexed: number;
  interCoderReliability: string;
  activeSurveys: number;
  serverUptime: string;
  lastIngestTimestamp: string;
}

export interface CmsState {
  version: string;
  lastUpdated: string;
  settings: SiteSettings;
  homePage: HomePageData;
  aboutPage: AboutPageData;
  contactPage?: ContactPageData;
  researchBeats: Record<string, ResearchBeat>;
  team: TeamMember[];
  publications: PublicationItem[];
  monitoring: MonitoringTelemetry;
  inquiries: InquirySubmission[];
  activityLogs: ActivityLog[];
}

export type ViewMode = 'cms' | 'frontend' | 'split';