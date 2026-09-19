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
  topicBn?: string;
  descriptionBn?: string;
  expandedDetailsBn?: string[];
  imageBn?: string;
}

export interface WorkArea {
  id: string;
  name: string;
  tagline: string;
  description: string;
  methods: string[];
  sampleInquiries: string[];
  image: string;
  outputsCount: string;
  timeframe: string;
  status: string;
  nameBn?: string;
  taglineBn?: string;
  descriptionBn?: string;
  methodsBn?: string[];
  sampleInquiriesBn?: string[];
  imageBn?: string;
  outputsCountBn?: string;
}

export interface WorkProcessPillar {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  titleBn?: string;
  subtitleBn?: string;
  descriptionBn?: string;
  highlightsBn?: string[];
}

export interface WorkCategory {
  id: string;
  category?: string;
  name: string;
  tagline: string;
  description: string;
  methods: string[];
  sampleInquiries: string[];
  image: string;
  outputsCount: string;
  nameBn?: string;
  taglineBn?: string;
  descriptionBn?: string;
  methodsBn?: string[];
  sampleInquiriesBn?: string[];
  imageBn?: string;
  outputsCountBn?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  nameBn?: string;
  role: string;
  roleBn?: string;
  category: 'leadership' | 'research' | 'advisory' | 'Senior Fellow' | 'Research Fellow' | 'Leadership' | 'Technical Staff' | string;
  teamType?: 'INSTITUTE GOVERNANCE' | 'INVESTIGATIVE CORPS' | string;
  image: string;
  bio: string;
  bioBn?: string;
  fullBio?: string;
  fullBioBn?: string;
  researchInterests?: string[];
  researchInterestsBn?: string[];
  focusAreas?: string[];
  focusAreasBn?: string[];
  education?: string;
  educationBn?: string;
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
  labelBn?: string;
  value: string;
  valueBn?: string;
  detail: string;
  detailBn?: string;
}

export interface MethodologyStep {
  step: string;
  label: string;
  summary: string;
  labelBn?: string;
  summaryBn?: string;
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
  nameBn?: string;
  taglineBn?: string;
  descriptionBn?: string;
  summaryBn?: string;
  methodologyBn?: string;
  researchNarrativeBn?: string;
  statusBn?: string;
  timeframeBn?: string;
  outputsCountBn?: string;
  imageTitleBn?: string;
  imageSubtitleBn?: string;
  leadFellowsBn?: string[];
  metricsBn?: { label?: string; value?: string; detail?: string }[];
  overviewBn?: string[];
  keyQuestionsBn?: string[];
  methodologyDetailsBn?: { title?: string; protocol?: string; frequency?: string; description?: string }[];
  caseStudiesBn?: { title?: string; year?: string; summary?: string; impact?: string }[];
  publicationsBn?: { title?: string; type?: string; date?: string; pagesOrSize?: string }[];
  sampleInquiries?: string[];
  sampleInquiriesBn?: string[];
  primaryMethodologiesBn?: string[];
  imageBn?: string;
}

export interface CoreTenet {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
  titleBn?: string;
  descriptionBn?: string;
  detailBn?: string;
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
  titleBn?: string;
  descriptionBn?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  subheading?: string;
  titleBn?: string;
  descriptionBn?: string;
  subheadingBn?: string;
}

export interface FaqItem {
  id: string;
  category: string;
  categoryLabel?: string;
  question: string;
  answer: string;
  highlights?: string[];
  questionBn?: string;
  answerBn?: string;
  highlightsBn?: string[];
  categoryLabelBn?: string;
}

export interface FooterLinkItem {
  label: string;
  url: string;
  labelBn?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
  titleBn?: string;
}

export interface HomePageData {
  badge: string;
  badgeBn: string;
  heroHeadline: string;
  heroHeadlineBn: string;
  heroSubtitle: string;
  heroSubtitleBn: string;
  establishedTag: string;
  establishedTagBn?: string;
  heroImage: string;
  countersBadge?: string;
  countersBadgeBn?: string;
  primaryCtaText: string;
  primaryCtaTextBn?: string;
  secondaryCtaText: string;
  secondaryCtaTextBn?: string;
  tenetBadge: string;
  tenetBadgeBn?: string;
  tenetQuote: string;
  tenetQuoteBn: string;
  tenetSubtitle: string;
  tenetSubtitleBn: string;
  tenetImage?: string;
  homeMetrics: MetricItem[];
  ticker?: {
    items: string[];
    itemsBn?: string[];
    speedSec?: number;
  };
  whoWeAreHome?: {
    badge: string;
    badgeBn?: string;
    indexLabel: string;
    indexLabelBn?: string;
    heading: string;
    headingBn?: string;
    headingAccent?: string;
    headingAccentBn?: string;
    description: string;
    descriptionBn?: string;
    secondaryDescription: string;
    secondaryDescriptionBn?: string;
    badgeText: string;
    badgeTextBn?: string;
    ctaText: string;
    ctaTextBn?: string;
    ctaUrl: string;
  };
  focusAreas?: {
    label?: string;
    labelBn?: string;
    indexLabel?: string;
    indexLabelBn?: string;
    title?: string;
    titleBn?: string;
    subtitle?: string;
    subtitleBn?: string;
    items: FocusAreaItem[];
  };
  featuredInquiryIds: string[];
  publicInterestBanner?: {
    title: string;
    description: string;
    badge: string;
    mediaUrl: string;
    keyPoints?: string[];
    keyPointsBn?: string[];
    ctaText?: string;
    titleBn?: string;
    descriptionBn?: string;
    badgeBn?: string;
    ctaTextBn?: string;
  };
  whatWeDo?: {
    header: string;
    subheader: string;
    cards: WhatWeDoCard[];
    headerBn?: string;
    subheaderBn?: string;
  };
  areasOfInvestigation?: {
    title: string;
    subtitle: string;
    filterLabel?: string;
    activeCategoryIds: string[];
    cards?: InvestigationCard[];
    titleBn?: string;
    subtitleBn?: string;
    filterLabelBn?: string;
  };
  howWeWork?: {
    badge: string;
    title: string;
    subtitle: string;
    steps: ProcessStep[];
    badgeBn?: string;
    titleBn?: string;
    subtitleBn?: string;
  };
  featuredTeam?: {
    title: string;
    subtitle: string;
    showOnHome: boolean;
    featuredMemberIds: string[];
    titleBn?: string;
    subtitleBn?: string;
  };
  bottomCta?: {
    title: string;
    narrative: string;
    primaryCtaText: string;
    primaryCtaUrl: string;
    secondaryCtaText: string;
    secondaryCtaUrl: string;
    titleBn?: string;
    narrativeBn?: string;
    primaryCtaTextBn?: string;
    secondaryCtaTextBn?: string;
  };
}

export interface InvestigationCard {
  id: string;
  heading: string;
  headingBn?: string;
  description: string;
  descriptionBn?: string;
  image?: string;
  imageBn?: string;
}

export interface AboutPageData {
  principles: CoreTenet[];
  methodologySteps: MethodologyStep[];
  heroBanner?: {
    title: string;
    subtext: string;
    bgStyle: 'gradient' | 'minimal' | 'solid' | string;
    badgeText: string;
    metadata: string;
    bgImage?: string;
    badgeTextBn?: string;
    titleBn?: string;
    subtextBn?: string;
    metadataBn?: string;
    bgImageBn?: string;
  };
  whoWeAre?: {
    heading?: string;
    description?: string;
    badgeText?: string;
    narrative: string[];
    mainPhoto: string;
    foundedYear: string;
    headingBn?: string;
    descriptionBn?: string;
    badgeTextBn?: string;
    narrativeBn?: string[];
    mainPhotoBn?: string;
  };
  missionPillars?: {
    id: string;
    badge: string;
    indexLabel: string;
    title: string;
    description: string;
    image?: string;
    badgeBn?: string;
    indexLabelBn?: string;
    titleBn?: string;
    descriptionBn?: string;
    imageBn?: string;
  }[];
  cta?: {
    badge?: string;
    badgeBn?: string;
    title?: string;
    titleBn?: string;
    narrative?: string;
    narrativeBn?: string;
    primaryText?: string;
    primaryTextBn?: string;
    primaryUrl?: string;
    secondaryText?: string;
    secondaryTextBn?: string;
    secondaryUrl?: string;
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
    metadata?: string;
    metadataBn?: string;
  };
  faqSection?: {
    badge: string;
    badgeBn?: string;
    title: string;
    titleBn?: string;
    subtitle: string;
    subtitleBn?: string;
  };
  directDetails: {
    phone: string;
    phoneBn?: string;
    phoneLabel?: string;
    phoneLabelBn?: string;
    tollFreePhone: string;
    tollFreePhoneBn?: string;
    tollFreePhoneLabel?: string;
    tollFreePhoneLabelBn?: string;
    supportEmail: string;
    supportEmailBn?: string;
    supportEmailLabel?: string;
    supportEmailLabelBn?: string;
    researchDeskEmail: string;
    researchDeskEmailBn?: string;
    researchDeskEmailLabel?: string;
    researchDeskEmailLabelBn?: string;
    pressEmail: string;
    pressEmailBn?: string;
    pressEmailLabel?: string;
    pressEmailLabelBn?: string;
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
    subjectPrefixBn?: string;
  };
  faqs: FaqItem[];
}

export interface ResearchPageData {
  hero: {
    label: string;
    labelBn?: string;
    title: string;
    titleBn?: string;
    description: string;
    descriptionBn?: string;
    metadata: string;
    metadataBn?: string;
    backgroundImage: string;
  };
  areasSection: {
    badge: string;
    badgeBn?: string;
    title: string;
    titleBn?: string;
    refreshTooltip: string;
    refreshTooltipBn?: string;
  };
  cta: {
    badge: string;
    badgeBn?: string;
    title: string;
    titleBn?: string;
    narrative: string;
    narrativeBn?: string;
    primaryText: string;
    primaryTextBn?: string;
    primaryUrl: string;
    secondaryText: string;
    secondaryTextBn?: string;
    secondaryUrl: string;
  };
  whatOurWorkLooksLike?: {
    badge: string;
    badgeBn?: string;
    title: string;
    titleBn?: string;
    description: string;
    descriptionBn?: string;
  };
}

export interface SiteSettings {
  siteName: string;
  siteNameBn?: string;
  siteSubtitle: string;
  metaDescription: string;
  ogImage: string;
  contactEmail: string;
  researchDeskEmail: string;
  pressEmail: string;
  officeAddress: string;
  addressBn?: string;
  phone?: string;
  establishedYear: string;
  teamHero?: {
    heading: string;
    headingBn?: string;
    subheading: string;
    subheadingBn?: string;
    label?: string;
    labelBn?: string;
    metadata?: string;
    metadataBn?: string;
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
    lightLogoTextBn?: string;
    tagline: string;
    taglineBn?: string;
    logoUrl?: string;
    darkLogoUrl?: string;
    navCtaText: string;
    navCtaTextBn?: string;
    navCtaUrl: string;
    announcementBannerText?: string;
    announcementBannerTextBn?: string;
    enableBanner?: boolean;
  };
  footerBranding?: {
    footerLogoText?: string;
    footerLogoTextBn?: string;
    logoUrl?: string;
    tagline: string;
    taglineBn?: string;
    copyrightNotice: string;
    copyrightNoticeBn?: string;
    licenseNotice: string;
    licenseNoticeBn?: string;
  };
  navigation?: {
    id: string;
    label: string;
    labelBn?: string;
    url: string;
    order?: number;
  }[];
  footerBottomLinks?: {
    label: string;
    labelBn?: string;
    url?: string;
  }[];
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
  tickerSpeedSec?: number;
}

export interface CmsState {
  version: string;
  lastUpdated: string;
  settings: SiteSettings;
  homePage: HomePageData;
  aboutPage: AboutPageData;
  contactPage?: ContactPageData;
  researchPage: ResearchPageData;
  researchBeats: Record<string, ResearchBeat>;
  team: TeamMember[];
  publications: PublicationItem[];
  monitoring: MonitoringTelemetry;
  inquiries: InquirySubmission[];
  activityLogs: ActivityLog[];
  workAreas: WorkArea[];
  workProcessPillars: WorkProcessPillar[];
}

export type ViewMode = 'cms' | 'frontend' | 'split';