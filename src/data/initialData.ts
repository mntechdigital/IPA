import { CmsState } from "../types";

export const INITIAL_CMS_STATE: CmsState = {
  version: "1.0.0",
  lastUpdated: "2026-09-08T14:12:12.092Z",
  settings: {
    siteName: "IPA — Institute of Public Affairs",
    siteSubtitle: "Institute of Public Affairs",
    metaDescription:
      "Independent media research observatory focused on journalism, digital platforms, public opinion, and institutional accountability.",
    ogImage:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=2200&q=85",
    contactEmail: "info@mediaresearch.org",
    researchDeskEmail: "research@mediaresearch.org",
    pressEmail: "media@mediaresearch.org",
    officeAddress:
      "Level 7, Press & Research Tower, 42 Gulshan Avenue, Dhaka 1212",
    siteNameBn: "ইনস্টিটিউট অব পাবলিক অ্যাফেয়ার্স",
    phone: "+880 2 984 5512",
    addressBn:
      "লেভেল ৭, প্রেস অ্যান্ড রিসার্চ টাওয়ার, ৪২ গুলশান অ্যাভিনিউ, ঢাকা ১২১২",
    establishedYear: "2019",
    defaultLanguage: "en",
    socialLinks: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com/ipa-observatory",
      youtube: "https://youtube.com",
      facebook: "https://facebook.com",
    },
    headerBranding: {
      lightLogoText: "IPA",
      lightLogoTextBn: "IPA",
      tagline: "Institute of Public Affairs",
      navCtaText: "Contact Us",
      navCtaUrl: "/research",
      announcementBannerText:
        "New 2026 National Media Trust Barometer Published",
      enableBanner: true,
    },
    footerBranding: {
      footerLogoText: "Institute of Public Affairs",
      tagline:
        "Rigorous empirical research observing media ecosystems, newsroom autonomy, algorithmic governance, and democratic public spheres.",
      copyrightNotice:
        "© 2021–2026 Institute of Public Affairs. Open Access Research.",
      licenseNotice:
        "All data and publications distributed under Creative Commons Attribution 4.0 International (CC BY 4.0).",
    },
    footerNavigation: [
      {
        title: "Observatory",
        links: [
          { label: "About Us", url: "/about" },
          { label: "Research Beats", url: "/research" },
          { label: "Research Team", url: "/teams" },
          { label: "Methodology", url: "/about#methodology" },
        ],
      },
      {
        title: "Publications & Data",
        links: [
          { label: "Monographs & Papers", url: "/publications" },
          { label: "Broadcast Telemetry", url: "/research/media-monitoring" },
          { label: "Public Datasets", url: "/research" },
          { label: "Codebooks & Standard", url: "/about#codebooks" },
        ],
      },
      {
        title: "Engage & Inquire",
        links: [
          { label: "Contact Desk", url: "/contact" },
          { label: "Request Custom Dataset", url: "/contact#dataset-request" },
          { label: "Press & Media Inquiries", url: "/contact#press" },
          { label: "Academic Fellowships", url: "/teams#fellowships" },
        ],
      },
    ],
    teamHero: {
      heading: "The People Behind Our Work.",
      headingBn: "আমাদের কাজের পেছনের গবেষক দল",
      subheading:
        "Our team brings together researchers, analysts, and professionals with diverse experience across media, journalism, research, technology, and communications.",
      subheadingBn:
        "আমাদের দলে রয়েছেন গণমাধ্যম, সাংবাদিকতা, প্রযুক্তি ও যোগাযোগ খাতের অভিজ্ঞ গবেষক ও বিশ্লেষকবৃন্দ।",
      label: "OUR TEAM",
      labelBn: "আমাদের টিম",
      metadata: "Fellows, Directors & Methodologists",
      metadataBn: "ফেলো, পরিচালক ও গবেষকবৃন্দ",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2200&q=85",
    },
  },
  homePage: {
    badge: "INDEPENDENT MEDIA RESEARCH OBSERVATORY",
    badgeBn: "স্বাধীন গণমাধ্যম গবেষণা মানমন্দির",
    heroHeadline: "Researching Media. Understanding Society.",
    heroHeadlineBn: "গণমাধ্যম গবেষণা। সমাজকে অনুধাবন।",
    heroSubtitle:
        "The Institute of Public Affairs operates empirical observatories tracking journalism, digital platforms, public trust, and institutional transparency in an era of platform restructuring.",
    heroSubtitleBn:
      "ইনস্টিটিউট অব পাবলিক অ্যাফেয়ার্স প্ল্যাটফর্ম পুনর্গঠনের যুগে সাংবাদিকতা, ডিজিটাল প্ল্যাটফর্ম, জনবিশ্বাস ও প্রাতিষ্ঠানিক জবাবদিহিতা পর্যালোচনায় স্বাধীন ও তথ্যভিত্তিক মানমন্দির পরিচালনা করে।",
    establishedTag: "Established 2021 · Dhaka & Global Partner Observatories",
    heroImage:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=2200&q=85",
    countersBadge: "COUNTERS BAR",
    countersBadgeBn: "",
    primaryCtaText: "Explore Researches",
    primaryCtaTextBn: "",
    secondaryCtaText: "Read Methodology",
    secondaryCtaTextBn: "",
    tenetBadge: "INSTITUTIONAL CORE TENET",
    tenetBadgeBn: "প্রতিষ্ঠানের মূল দর্শন",
    tenetQuote: "“Better understanding begins with better research.”",
    tenetQuoteBn: "“সঠিক অনুধাবনের ভিত্তি হলো নির্ভুল ও নির্মোহ গবেষণা।”",
    tenetSubtitle:
      "Our work seeks to make the changing media environment easier to understand through independent research and thoughtful analysis.",
    tenetSubtitleBn:
      "আমাদের কাজ স্বাধীন গবেষণা ও গঠনমূলক বিশ্লেষণের মাধ্যমে পরিবর্তনশীল গণমাধ্যম ব্যবস্থাকে আরো সুস্পষ্টভাবে অনুধাবন করতে সাহায্য করে।",
    homeMetrics: [
      {
        id: "m1",
        label: "Experience",
        labelBn: "",
        value: "12+ Years",
        valueBn: "",
        detail: "Empirical media research & monitoring",
        detailBn: "",
      },
      {
        id: "m2",
        label: "Research Lines",
        labelBn: "",
        value: "6 Beats",
        valueBn: "",
        detail: "Active continuous investigation domains",
        detailBn: "",
      },
      {
        id: "m3",
        label: "Indexed Records",
        labelBn: "",
        value: "480,000+",
        valueBn: "",
        detail: "Broadcast, print & algorithmic archives",
        detailBn: "",
      },
      {
        id: "m4",
        label: "Replication Benchmark",
        labelBn: "",
        value: "99.4%",
        valueBn: "",
        detail: "Inter-coder reliability cross-validated",
        detailBn: "",
      },
    ],
    featuredInquiryIds: [
      "media-journalism",
      "digital-media",
      "media-monitoring",
      "public-opinion",
      "media-democracy",
      "technology-ai",
    ],
    publicInterestBanner: {
      badge: "BUILT FOR PUBLIC INTEREST",
      badgeBn: "জনস্বarthে নিবেদিত",
      title: "Empirical Research For Transparent Institutions",
      titleBn:
        "একটি স্বাধীন গবেষণা মানমন্দির হিসেবে যাত্রা শুরু করে বর্তমানে সমাজের জন্য ৬টি গুরুত্বপূর্ণ ক্ষেত্রে নিয়োজিত।",
      description:
        "The Institute of Public Affairs conducts independent, evidence-based research into news ecosystems, algorithmic feeds, broadcast coverage, and public perceptions to defend press freedom and civic awareness.",
      descriptionBn:
        "আমরা তথ্যের বস্তুনিষ্ঠতা, অ্যালগরিদম বিস্তার এবং গণমাধ্যমের টেকসই রূপান্তর নিরীক্ষণ করি। আমাদের সকল গবেষণা Pratiband",
      mediaUrl:
        "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1600&q=80",
      keyPoints: [
        "Independent research",
        "Open-access evidence",
        "Public-interest methods",
        "Transparent institutions",
      ],
      ctaText: "Explore Research Beats",
      ctaTextBn: "",
    },
    whatWeDo: {
      header: "What We Do",
      headerBn: "আমরা যা করি",
      subheader:
        "Independent inquiry across the digital and broadcast media landscape",
      subheaderBn:
        "আমরা গবেষণা, নিবিড় বিশ্লেষণ ও নিরবচ্ছিন্ন নিরীক্ষার মাধ্যমে গণমাধ্যমের স্বাধীনতা ও রূপান্তর বিশ্লেষণ করি।",
      cards: [
        {
          id: "wwd-1",
          icon: "Search",
          title: "Research",
          titleBn: "",
          description:
            "We formulate rigorous empirical questions targeting institutional shifts, journalistic autonomy, and media transformations.",
          descriptionBn:
            "আমরা মiddleware পর্যায়ের সমীক্ষা, গবেষণামূলক সাক্ষাৎকার এবং কাঠামোগত পর্যালোচনার মাধ্যমে গণmiddlewareের স্বাধীনতা ও রূপান্তর বিশ্লেষণ করি।",
          linkUrl: "/research",
          cardType: "text",
          theme: "light",
        },
        {
          id: "wwd-2",
          icon: "Database",
          title: "Evidence",
          titleBn: "নিরবচ্ছিন্ন সম্প্রচার ও ডিজিটাল আর্কাইভাল",
          description:
            "We assemble verifiable empirical material: multi-channel broadcast archives, stratified audience panels, and computational traces.",
          descriptionBn:
            "১৮টি স্যাটেলাইট টিভি চ্যানেল, ৩২টি জাতীয় দৈনিক ও ১২০টির বেশি ডিজিটাল পোর্টাল সার্বক্ষণিক সংরক্ষণ ও নিরীক্ষণ।",
          linkUrl: "/research",
          cardType: "image",
          theme: "image",
          image:
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
        },
        {
          id: "wwd-3",
          icon: "BarChart3",
          title: "Monitoring & Public Insights",
          titleBn: "মনিটরিং ও জনস্বার্থ ইনসাইট",
          description:
            "We monitor narratives, algorithmic distribution, and audience perception across broadcast and digital platforms.",
          descriptionBn:
            "আমরা প্রचार মাধ্যম ও প্ল্যাটফর্ম অ্যালগরিদম নিরীক্ষণ করে নাগরিক দায়বদ্ধতার জন্য উন্মুক্ত ও নির্ভরযোগ্য তথ্য-উপাত্ত তৈরি করি।",
          linkUrl: "/research",
          cardType: "text",
          theme: "accent",
        },
      ],
    },
    areasOfInvestigation: {
      title: "Areas of Investigation",
      titleBn: "আমরা যেসব ক্ষেত্রে কাজ করি",
      subtitle:
        "Explore our six active longitudinal research programs monitoring media and democracy",
      subtitleBn:
        "সংবাদের বস্তুনিষ্ঠতা, প্ল্যাটফর্মের প্রভাব এবং নাগরিক প্রতিক্রিয়ায় নিয়ে নিবেদিত ৬টি বিশেষ গবেষণা ক্ষেত্র।",
      filterLabel: "All Research Tracks",
      filterLabelBn: "",
      activeCategoryIds: [
        "media-journalism",
        "digital-media",
        "media-monitoring",
        "public-opinion",
        "media-democracy",
        "technology-ai",
      ],
    },
    howWeWork: {
      badge: "OUR METHODOLOGICAL DISCIPLINE",
      badgeBn: "",
      title: "How We Work",
      titleBn: "",
      subtitle: "From urgent inquiries to open-access public knowledge",
      subtitleBn: "",
      steps: [
        {
          step: "01",
          subheading: "PIPELINE",
          subheadingBn: "",
          title: "Research",
          titleBn: "",
          description:
            "We formulate rigorous empirical questions targeting institutional shifts, journalistic autonomy, and media transformations.",
          descriptionBn: "",
        },
        {
          step: "02",
          subheading: "PIPELINE",
          subheadingBn: "",
          title: "Evidence",
          titleBn: "",
          description:
            "We assemble verifiable empirical material: multi-channel broadcast archives, stratified audience panels, and computational traces.",
          descriptionBn: "",
        },
        {
          step: "03",
          subheading: "PIPELINE",
          subheadingBn: "",
          title: "Analysis",
          titleBn: "",
          description:
            "We deploy cross-verified quantitative coding, network topology, and qualitative ethnography to detect patterns and anomalies.",
          descriptionBn: "",
        },
        {
          step: "04",
          subheading: "PIPELINE",
          subheadingBn: "",
          title: "Insight",
          titleBn: "",
          description:
            "We translate complex findings into accessible monographs, interactive visual repositories, and policy briefings for civic stakeholders.",
          descriptionBn: "",
        },
      ],
    },
    featuredTeam: {
      title: "Featured Researchers",
      titleBn: "",
      subtitle:
        "Interdisciplinary scholars, investigative journalists, and computational scientists leading our observatories",
      subtitleBn: "",
      showOnHome: true,
      featuredMemberIds: [
        "tariqul-islam",
        "elena-rostova",
        "marcus-chen",
        "ayesha-siddiqua",
      ],
    },
    bottomCta: {
      title: "Support Independent Media Research",
      titleBn: "",
      narrative:
        "Explore open datasets, request specialized newsroom audits, or collaborate with our empirical research fellows.",
      narrativeBn: "",
      primaryCtaText: "Request Dataset Access",
      primaryCtaTextBn: "গবেষণাসমূহ দেখুন",
      primaryCtaUrl: "/contact",
      secondaryCtaText: "Download Annual Report",
      secondaryCtaTextBn: "",
      secondaryCtaUrl: "/publications",
    },
  },
  aboutPage: {
    heroBanner: {
      badgeText: "ABOUT THE ORGANIZATION",
      badgeTextBn: "আমাদের পরিচিতি",
      title: "Independent Research for a Changing Media World.",
      titleBn: "পরিবর্তনশীল গণমাধ্যমের জন্য স্বাধীন গবেষণা",
      subtext:
        "We research the systems, technologies, institutions, and behaviors shaping today's media and information environment.",
      subtextBn:
        "আমরা সমকালীন তথ্য ও গণমাধ্যম জগৎকে রূপদানকারী ব্যবস্থা, প্রযুক্তি, প্রতিষ্ঠান এবং আচরণ নিয়ে গবেষণা করি।",
      metadata: "Institutional Profile",
      metadataBn: "প্রাতিষ্ঠানিক পরিচিতি",
      bgStyle: "gradient",
      bgImage:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=85",
    },
    whoWeAre: {
      badgeText: "Institutional Foundation",
      badgeTextBn: "প্রাতিষ্ঠানিক ভিত্তি",
      heading: "Who We Are",
      headingBn: "আমরা কারা",
      description:
        "is an independent media research organization dedicated to developing a deeper understanding of media, journalism, and information.",
      descriptionBn:
        "একটি স্বাধীন গণমাধ্যম গবেষণা সংস্থা, যা গণমাধ্যম, সাংবাদিকতা ও তথ্য ব্যবস্থা অনুধাবনে নিবেদিত।",
      nameTag: "IPA — Institute of Public Affairs",
      nameTagBn: "ইনস্টিটিউট অব পাবলিক অ্যাফেয়ার্স",
      narrative: [
        "We examine how traditional and digital media operate, how audiences interact with information, and how technological and social changes are reshaping the media environment.",
        "Through independent research and analysis, we aim to make complex developments easier to understand and contribute meaningful knowledge to public discussion.",
      ],
      narrativeBn: [
        "আমরা অনুসন্ধান করি কীভাবে ঐতিহ্যবাহী ও ডিজিটাল মিডিয়া পরিচালিত হয়, দর্শকরা তথ্যের সাথে কীভাবে যুক্ত হন এবং প্রযুক্তিগত ও সামাজিক রূপান্তর কীভাবে মিডিয়া পরিবেশকে প্রভাবিত করছে।",
        "নিরপেক্ষ গবেষণা ও তথ্যভিত্তিক বিশ্লেষণের মাধ্যমে আমরা জটিল বিষয়গুলোকে সহজবোধ্য করে তুলি এবং নাগরিক আলোচনায় বস্তুনিষ্ঠ অবদান রাখি।",
      ],
      mainPhoto:
        "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
      foundedYear: "2019",
    },
    missionPillars: [
      {
        id: "mission",
        badge: "Our Mission",
        badgeBn: "আমাদের লক্ষ্য",
        indexLabel: "01 / PURPOSE",
        indexLabelBn: "০১ / মূল লক্ষ্য",
        title:
          '"To produce credible, independent, and accessible research that contributes to a better understanding of media and its role in society."',
        titleBn:
          '"বিশ্বাসযোগ্য, স্বাধীন ও উন্মুক্ত গবেষণার মাধ্যমে গণমাধ্যম এবং সমাজে এর তাৎপর্য সম্পর্কে মানুষের বোঝাপড়া সুদৃঢ় করা।"',
        description:
          "We ensure that public conversations regarding information integrity are supported by verifiable empirical benchmarks rather than ideological posturing.",
        descriptionBn:
          "আমরা নিশ্চিত করি যে তথ্য ব্যবস্থা নিয়ে গণআলাপচারিতা যেন কোনো ধারণাভিত্তিক অনুমানের বদলে যাচাইযোগ্য তথ্য-উপাত্ত দ্বারা পরিচালিত হয়।",
      },
      {
        id: "vision",
        badge: "Our Vision",
        badgeBn: "আমাদের রূপকল্প",
        indexLabel: "02 / OUTLOOK",
        indexLabelBn: "০২ / রূপকল্প",
        title:
          '"We envision an informed society where media and information can be better understood through independent research, evidence, and open analysis."',
        titleBn:
          '"আমরা এমন একটি সচেতন সমাজ কল্পনা করি যেখানে স্বাধীন গবেষণা, নির্ভরযোগ্য তথ্য-প্রমাণ ও উন্মুক্ত বিশ্লেষণের মাধ্যমে গণমাধ্যম ও তথ্যের গুরুত্ব স্পষ্টভাবে উপলব্ধ হয়।"',
        description:
          "An information ecosystem where journalists are safeguarded, citizens are empowered with critical literacy, and digital platforms are transparent to the public.",
        descriptionBn:
          "এমন একটি মুক্ত তথ্য পরিমণ্ডল যেখানে সাংবাদিকদের স্বাধীনতা সুরক্ষিত থাকে, নাগরিকরা সচেতন ও ক্ষমতাবান হন এবং ডিজিটাল প্ল্যাটফর্মসমূহ জনস্বার্থে দায়বদ্ধ থাকে।",
      },
      {
        id: "goal",
        badge: "Our Goal",
        badgeBn: "আমাদের লক্ষ্য",
        indexLabel: "03 / IMPACT",
        indexLabelBn: "০৩ / প্রভাব",
        title:
          "Turn rigorous evidence into insight that strengthens public accountability.",
        titleBn:
          "নির্ভুল তথ্য-প্রমাণকে এমন অন্তর্দৃষ্টিতে রূপ দেওয়া যা জনস্বার্থ ও জবাবদিহিতা শক্তিশালী করে।",
        description:
          "We connect careful research with practical knowledge for journalists, institutions, and communities.",
        descriptionBn:
          "সাংবাদিক, প্রতিষ্ঠান ও সম্প্রদায়ের জন্য আমরা সতর্ক গবেষণাকে ব্যবহারিক জ্ঞানের সঙ্গে যুক্ত করি।",
      },
      {
        id: "practice",
        badge: "Our Practice",
        badgeBn: "আমাদের কর্মপদ্ধতি",
        indexLabel: "04 / METHOD",
        indexLabelBn: "০৪ / পদ্ধতি",
        title: "Research that remains open, useful, and accountable.",
        titleBn: "এমন গবেষণা যা উন্মুক্ত, কার্যকর ও জবাবদিহিমূলক।",
        description:
          "From fieldwork to public reporting, every step is designed to make evidence easier to examine and act upon.",
        descriptionBn:
          "মাঠপর্যায়ের গবেষণা থেকে জনসমক্ষে প্রতিবেদন—প্রতিটি ধাপ তথ্য-প্রমাণকে সহজে যাচাই ও প্রয়োগযোগ্য করে তোলে।",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85",
      },
    ],
    principles: [
      {
        id: "val-1",
        number: "01",
        title: "Independence",
        description: "We protect the independence and integrity of our research.",
        detail:
          "Our operational governance is strictly insulated from partisan agendas, commercial pressure, and external funders. Research questions and methodological determinations belong entirely to our investigative fellows.",
      },
      {
        id: "val-2",
        number: "02",
        title: "Evidence",
        description: "We prioritize reliable evidence over assumptions.",
        detail:
          "Every assertion is grounded in reproducible empirical data. Where datasets have limitations or uncertainty intervals, we document them candidly rather than presenting speculative conclusions.",
      },
      {
        id: "val-3",
        number: "03",
        title: "Rigour",
        description:
          "We approach research with care, transparency, and methodological discipline.",
        detail:
          "All studies undergo internal peer review, cross-coder reliability validation, and stringent ethical review to ensure adherence to international social science protocols.",
      },
      {
        id: "val-4",
        number: "04",
        title: "Transparency",
        description: "We communicate our findings and methods clearly.",
        detail:
          "We disclose our sample sizes, coding taxonomies, margin of error, and research instruments openly. We believe public scrutiny strengthens research validity.",
      },
      {
        id: "val-5",
        number: "05",
        title: "Public Value",
        description:
          "We seek to produce research that contributes to meaningful public understanding.",
        detail:
          "Our work is not meant for academic silos alone. We produce clear, open-access resources that inform citizens, empower journalists, and elevate civic discourse.",
      },
    ],
    methodologySteps: [
      {
        step: "QUESTION",
        label: "Identify Critical Inquiries",
        summary:
          "Framing urgent social questions about information power, newsroom stability, and digital media dynamics.",
      },
      {
        step: "RESEARCH",
        label: "Design Rigorous Methodology",
        summary:
          "Selecting multi-method protocols spanning survey instruments, ethnographic observation, and platform telemetry.",
      },
      {
        step: "EVIDENCE",
        label: "Gather Primary Datasets",
        summary:
          "Harvesting raw multi-channel broadcasts, newspaper archives, and stratified representative sample panels.",
      },
      {
        step: "ANALYSIS",
        label: "Decode Underlying Patterns",
        summary:
          "Executing computational NLP, longitudinal sentiment trends, and qualitative thematic evaluations.",
      },
      {
        step: "INSIGHT",
        label: "Publish Civic Knowledge",
        summary:
          "Delivering open-access research briefs, executive policy briefings, and interactive datasets for society.",
      },
    ],
    cta: {
      badge: "Institutional Collaboration & Inquiry",
      badgeBn: "প্রাতিষ্ঠানিক সহযোগিতা ও অনুসন্ধান",
      title:
        "Let’s Understand the Media Landscape Together.",
      titleBn: "আসুন একসাথে গণমাধ্যমের পরিমণ্ডলকে অনুধাবন করি।",
      narrative:
        "Whether you’re interested in our work, exploring a research collaboration, or simply want to learn more about the organization, we’d be happy to hear from you.",
      narrativeBn:
        "আপনি আমাদের গবেষণায় আগ্রহী হোন, যৌথ গবেষণার সুযোগ খুঁজুন বা সংস্থা সম্পর্কে আরও জানতে চান—আমরা আপনার মতামতকে স্বাগত জানাই।",
      primaryText: "Get in Touch",
      primaryTextBn: "যোগাযোগ করুন",
      primaryUrl: "/contact",
      secondaryText: "Browse All Research Areas",
      secondaryTextBn: "সকল গবেষণা ক্ষেত্র দেখুন",
      secondaryUrl: "/work",
    },
  },
  contactPage: {
    hero: {
      badge: "COMMUNICATIONS & INQUIRIES",
      badgeBn: "যোগাযোগ ও অনুসন্ধান",
      heading: "Let's Start a Conversation.",
      headingBn: "আমাদের সাথে যোগাযোগ করুন",
      subtitle:
        "Direct communication channels for academic researchers, investigative journalists, policy institutions, and public dataset requests.",
      subtitleBn:
        "গবেষক, সাংবাদিক ও অংশীদারদের জন্য আমাদের যোগাযোগের দরজা সর্বদা উন্মুক্ত।",
      bgImage:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      metadata: "Direct Communications & Field Office",
      metadataBn: "সরাসরি যোগাযোগ ও সচিবালয়",
    },
    faqSection: {
      badge: "KNOWLEDGE BASE & PROTOCOLS",
      badgeBn: "উন্মুক্ত প্রশ্নোত্তর ও তথ্যভাণ্ডার",
      title: "Frequently Asked Questions",
      titleBn: "সাধারণ জিজ্ঞাসাসমূহ (FAQ)",
      subtitle:
        "Essential guidelines regarding our research standards, open datasets, peer review protocols, and public inquiry workflows.",
      subtitleBn: "",
    },
    directDetails: {
      phone: "+880 2 984 5512",
      phoneLabel: "Phone",
      phoneLabelBn: "",
      tollFreePhone: "+880 171 000 9821",
      tollFreePhoneLabel: "Toll-Free",
      tollFreePhoneLabelBn: "",
      supportEmail: "info@mediaresearch.org",
      supportEmailLabelBn: "",
      researchDeskEmail: "research@mediaresearch.org",
      researchDeskEmailLabelBn: "",
      pressEmail: "media@mediaresearch.org",
      pressEmailLabelBn: "",
      officeLocation:
        "Level 7, Press & Research Tower, 42 Gulshan Avenue, Dhaka 1212, Bangladesh",
      officeLocationBn:
        "লেভেল ৭, প্রেস অ্যান্ড রিসার্চ টাওয়ার, ৪২ গুলশান অ্যাভিনিউ, ঢাকা ১২১২, বাংলাদেশ",
      workingHours: "Sunday – Thursday: 09:00 – 17:30 BST",
      workingHoursBn: "রবিবার – বৃহস্পতিবার: সকাল ০৯:০০ – বিকাল ১৭:৩০ (বিএসটি)",
      googleMapsUrl: "https://maps.google.com/?q=Gulshan+Avenue+Dhaka",
    },
    messageSettings: {
      targetEmail: "inquiries@mediaresearch.org",
      autoReply: true,
      subjectPrefix: "[IPA Research Inquiry]",
      subjectPrefixBn: "",
      requireAffiliation: false,
    },
    faqs: [
      {
        id: "faq-datasets",
        category: "resources",
        categoryLabel: "Public Resources",
        categoryLabelBn: "",
        question:
          "How can academic researchers and institutions request access to IPA datasets?",
        questionBn: "",
        answer:
          "We provide open access to anonymized survey microdata, platform audit logs, and longitudinal media tracking corpora to accredited researchers, universities, and civil society investigators under open academic data agreements. Dataset requests can be submitted via the contact form above or sent directly to research@mediaresearch.org with a brief outline of the research intent and institutional affiliation.",
        answerBn: "",
        highlights: [
          "Accessible via Open Academic License",
          "Longitudinal newsroom tracking archives (2019–present)",
          "Algorithmic recommendation scrape logs with full provenance metadata",
        ],
        highlightsBn: ["", "", ""],
      },
      {
        id: "faq-methodology",
        category: "methodology",
        categoryLabel: "Methodology & Audits",
        categoryLabelBn: "",
        question:
          "What scientific standards and peer-review protocols govern IPA published studies?",
        questionBn: "",
        answer:
          "Every investigation published by IPA follows rigorous pre-registered methodologies, statistical validation checks, and reproducible open-science protocols. Primary empirical briefs undergo double-blind peer review by external methodologists from affiliated universities before publication. All computational pipelines and audit models are benchmarked against standardized algorithmic ethics guidelines.",
        answerBn: "",
        highlights: [
          "Pre-registered research designs & transparency registries",
          "Dual-analyst independent qualitative and quantitative verification",
          "Open-source computational codebooks hosted on public research repos",
        ],
        highlightsBn: ["", "", ""],
      },
      {
        id: "faq-licensing",
        category: "resources",
        categoryLabel: "Public Resources",
        categoryLabelBn: "",
        question:
          "Are IPA publications, policy frameworks, and monitors freely accessible to the public?",
        questionBn: "",
        answer:
          "Yes. In accordance with our public interest mission, all research reports, quarterly monitors, whitepapers, and pedagogical toolkits are published free of paywalls under Creative Commons licensing (CC BY-NC 4.0). Academic institutions, civil society organizations, and civic journalists are encouraged to read, cite, and redistribute our findings with appropriate attribution.",
        answerBn: "",
        highlights: [
          "100% open-access without subscription or paywall tiers",
          "Complete citation bibliographies & DOIs provided for scholarly indexation",
          "High-resolution charts and infographics available for classroom instruction",
        ],
        highlightsBn: ["", "", ""],
      },
      {
        id: "faq-ethics-sources",
        category: "ethics",
        categoryLabel: "Ethics & Confidentiality",
        categoryLabelBn: "",
        question:
          "How does the institute safeguard whistleblower sources and interview respondent privacy?",
        questionBn: "",
        answer:
          "IPA conducts research under Institutional Review Board (IRB) ethical approval and strict cryptographic source-protection protocols. Respondent survey identifiers are cryptographically salted and anonymized before analytical ingestion. Qualitative interview notes and whistleblower submissions are maintained in air-gapped, encrypted volumes accessible exclusively to principal investigators.",
        answerBn: "",
        highlights: [
          "Institutional Review Board (IRB) compliance for human-subject research",
          "Cryptographic identity stripping and differential privacy mechanisms",
          "Strict non-disclosure commitments for institutional source interviews",
        ],
        highlightsBn: ["", "", ""],
      },
      {
        id: "faq-newsroom-collabs",
        category: "partnerships",
        categoryLabel: "Partnerships",
        categoryLabelBn: "",
        question:
          "How can newsrooms and civic organizations partner with IPA on investigative audits?",
        questionBn: "",
        answer:
          "We regularly partner with regional, national, and community newsrooms to perform computational data investigations, verify digital platform amplification anomalies, and map disinformation ecosystems. We provide newsrooms with computational tool training, specialized data journalism workshops, and collaborative forensic assistance on public interest investigations.",
        answerBn: "",
        highlights: [
          "Tailored newsroom data audit clinics and investigative tooling",
          "Joint investigation syndication across public media channels",
          "Data verification assistance for contested computational claims",
        ],
        highlightsBn: ["", "", ""],
      },
      {
        id: "faq-press-commentary",
        category: "partnerships",
        categoryLabel: "Partnerships",
        categoryLabelBn: "",
        question:
          "Can journalists quote IPA fellows or request broadcast commentary on breaking developments?",
        questionBn: "",
        answer:
          "Yes. Our resident researchers, directors, and methodology fellows regularly provide expert commentary, background briefings, and television analysis on media policy, algorithmic accountability, and civic information trends. Urgent broadcast or press inquiries submitted to media@mediaresearch.org or our hotline are typically addressed within two hours.",
        answerBn: "",
        highlights: [
          "Rapid response desk for breaking media & platform policy developments",
          "Bilingual expert spokespersons for broadcast, radio, and print outlets",
          "Embargoed advance research briefings for credentialed science reporters",
        ],
        highlightsBn: ["", "", ""],
      },
    ],
  },
  researchPage: {
    hero: {
      label: "RESEARCHES",
      labelBn: "গবেষণাসমূহ",
      title: "Exploring the Forces Shaping Media.",
      titleBn: "গণমাধ্যম ও সমাজের পারস্পরিক গতিশীলতা নিয়ে গবেষণা।",
      description:
        "Our work examines the changing relationships between media, technology, journalism, information, and society.",
      descriptionBn:
        "আমাদের গবেষণাসমূহ গণমাধ্যম, প্রযুক্তি, সাংবাদিকতা এবং সমাজের আন্তঃসম্পর্ককে তথ্য-প্রমাণের ভিত্তিতে বিশ্লেষণ করে।",
      metadata: "Research Portfolio & Inquiry Areas",
      metadataBn: "গবেষণা পোর্টফোলিও ও অনুসন্ধানী ক্ষেত্রসমূহ",
      backgroundImage:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=85",
    },
    areasSection: {
      badge: "SIX RESEARCH AREAS",
      badgeBn: "ছয়টি প্রধান গবেষণা ক্ষেত্র",
      title: "Areas of Investigation",
      titleBn: "অনুসন্ধানের ক্ষেত্রসমূহ",
      refreshTooltip: "Refresh Research Catalog",
      refreshTooltipBn: "গবেষণা তালিকা রিফ্রেশ করুন",
    },
    cta: {
      badge: "Institutional Collaboration & Inquiry",
      badgeBn: "প্রাতিষ্ঠানিক সহযোগিতা ও অনুসন্ধান",
      title: "Let’s Understand the Media Landscape Together.",
      titleBn: "আসুন একসাথে গণমাধ্যমের পরিমণ্ডলকে অনুধাবন করি।",
      narrative:
        "Whether you’re interested in our work, exploring a research collaboration, or simply want to learn more about the organization, we’d be happy to hear from you.",
      narrativeBn:
        "আপনি আমাদের গবেষণায় আগ্রহী হোন, যৌথ গবেষণার সুযোগ খুঁজুন বা সংস্থা সম্পর্কে আরও জানতে চান—আমরা আপনার মতামতকে স্বাগত জানাই।",
      primaryText: "Get in Touch",
      primaryTextBn: "যোগাযোগ করুন",
      primaryUrl: "/contact",
      secondaryText: "Browse All Research Areas",
      secondaryTextBn: "সকল গবেষণা ক্ষেত্র দেখুন",
      secondaryUrl: "/work",
    },
    whatOurWorkLooksLike: {
      badge: "CORE MODALITIES",
      badgeBn: "মূল কর্মপদ্ধতি",
      title: "What Our Work Looks Like",
      titleBn: "আমাদের কাজের রূপরেখা",
      description:
        "We execute research through four distinct operational pillars, spanning long-term scientific inquiry to real-time broadcast monitoring.",
      descriptionBn:
        "আমরা চারটি পৃথক স্তম্ভের মাধ্যমে গবেষণা পরিচালনা করি—দীর্ঘমেয়াদী বৈজ্ঞানিক অনুসন্ধান থেকে শুরু করে রিয়েল-টাইম সম্প্রচার পর্যবেক্ষণ।",
    },
  },
  researchBeats: {
    "media-journalism": {
      id: "media-journalism",
primaryMethodologies: [
        "Content analysis",
        "Newsroom ethnographies",
        "Financial disclosures audit",
        "In-depth editor interviews"
      ],
      primaryMethodologiesBn: [
        "বিষয়বস্তু বিশ্লেষণ",
        "নিউজরুম জাতিবিজ্ঞানগত অধ্যয়ন",
        "আর্থিক প্রಕাশনা অডিট",
        "গভীর এডিটর সাক্ষাত্কার"
      ],
      sampleInquiries: [
        "The Economics of Local Press: Survival Strategies of Regional Newsrooms (2023–2025)",
        "Editorial Autonomy Under Digital Platform Pressures: A Comparative South Asian Study",
        "Fact-Checking Verification Protocols Across 40 Major Daily Newsrooms"
],
      sampleInquiriesBn: ["", "", ""],
      beatNumber: "01",
      category: "journalism",
      name: "Media & Journalism",
      tagline:
        "Newsroom structures, editorial independence, and the future of reportage.",
      description:
        "Researching journalism, news organizations, editorial practices, newsroom transformation, and the future of news in an era of platform restructuring.",
      image:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
      outputsCount: "24 Reports & Monographs",
      timeframe: "2021 – Present (Longitudinal)",
      status: "Active Longitudinal Beat",
      nameBn: "",
      taglineBn: "",
      descriptionBn: "",
      statusBn: "",
      timeframeBn: "",
      outputsCountBn: "",
      imageTitleBn: "",
      imageSubtitleBn: "",
      leadFellowsBn: ["", "", ""],
      metricsBn: [
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
      ],
      overviewBn: ["", "", ""],
      keyQuestionsBn: ["", "", "", ""],
      methodologyDetailsBn: [
        { title: "", protocol: "", frequency: "", description: "" },
        { title: "", protocol: "", frequency: "", description: "" },
        { title: "", protocol: "", frequency: "", description: "" },
      ],
      caseStudiesBn: [
        { title: "", year: "", summary: "", impact: "" },
        { title: "", year: "", summary: "", impact: "" },
      ],
      publicationsBn: [
        { title: "", type: "", date: "", pagesOrSize: "" },
        { title: "", type: "", date: "", pagesOrSize: "" },
        { title: "", type: "", date: "", pagesOrSize: "" },
      ],
      leadFellows: ["Dr. Eleanor Vance", "Tariq Rahman", "Maya Lin"],
      metrics: [
        {
          label: "Newsrooms Audited",
          value: "48 Outlets",
          detail: "National, regional & hyper-local desks",
        },
        {
          label: "Interviews Conducted",
          value: "180+ Editors",
          detail: "Chief editors, bureau chiefs & reporters",
        },
        {
          label: "Monographs Released",
          value: "24 Studies",
          detail: "Peer-reviewed open access papers",
        },
        {
          label: "Editorial Policy Audits",
          value: "100% Verified",
          detail: "Cross-checked with ethical bylaws",
        },
      ],
      overview: [
        "The Media & Journalism investigation beat examines the structural, economic, and institutional transformations reshaping contemporary news organizations. We evaluate how the collapse of traditional print and broadcast advertising revenues has altered editorial autonomy, reporting budgets, and local accountability journalism.",
        "Through extensive newsroom ethnographies, financial transparency audits, and interviews with working journalists, our research maps the fault lines between commercial pressures, state regulatory interventions, and investigative integrity across South Asia and global developing democracies.",
        "Our outputs provide empirical evidence to media owners, editorial councils, labor unions, and international press freedom monitors seeking durable, public-interest financing models.",
      ],
      keyQuestions: [
        "How are regional and vernacular newsrooms sustaining field reporting amid severe platform monetization cuts?",
        "What institutional mechanisms best protect editorial independence from commercial advertisers and political patrons?",
        "To what extent are verification protocols holding up against 24/7 breaking news cycles and social media aggregation?",
        "What newsroom labor models ensure fair compensation, retention, and safety for investigative beat reporters?",
      ],
      methodologyDetails: [
        {
          title: "Newsroom Ethnographies & Field Observation",
          protocol:
            "Structured on-site participant observation across news cycles",
          frequency: "Quarterly field observation across 12 selected newsrooms",
          description:
            "Researchers spend 2 to 4 weeks embedded within daily editorial desks, observing morning pitch meetings, copy desks, verification checks, and editorial dispute resolutions.",
        },
        {
          title: "Financial & Ownership Disclosures Audit",
          protocol:
            "Corporate registry cross-referencing and revenue stream breakdown",
          frequency: "Annual comprehensive audit",
          description:
            "Tracing holding companies, cross-media ownership patterns, advertising revenue ratios, and debt obligations to identify potential editorial vulnerabilities.",
        },
        {
          title: "Editorial Autonomy Survey Panel",
          protocol:
            "Double-anonymized psychometric and behavioral questionnaire",
          frequency: "Bi-annual panel of 250 active journalists",
          description:
            "Tracking self-censorship indices, direct managerial interference, salary delays, and digital security threats encountered during investigative reportage.",
        },
      ],
      caseStudies: [
        {
          title:
            "The Economics of Local Press: Survival Strategies of Regional Newsrooms",
          year: "2024–2025",
          summary:
            "A 24-month investigation into 18 district-level newspapers discovering that 72% relied on civic patronage or non-journalistic side-businesses to fund operations.",
          impact:
            "Cited in the Parliamentary Standing Committee Brief on Regional Media Sustainability.",
        },
        {
          title:
            "Verification Protocols in the Age of Coordinated Disinformation",
          year: "2023",
          summary:
            "Audit of verification desks across 40 major dailies during national crisis events, mapping failure points in viral image debunking.",
          impact:
            "Adopted by the Editors Guild as a benchmark for newsroom verification handbooks.",
        },
      ],
      publications: [
        {
          title:
            "State of Newsroom Autonomy: National Editorial Survey Report (2025)",
          type: "Monograph",
          date: "November 2025",
          pagesOrSize: "142 Pages · PDF",
        },
        {
          title: "Local Press Viability Index: Methodology & Findings",
          type: "Policy Brief",
          date: "August 2025",
          pagesOrSize: "36 Pages · PDF",
        },
        {
          title: "South Asian Newsroom Editorial Structure Dataset (2022–2025)",
          type: "Dataset",
          date: "June 2025",
          pagesOrSize: "18.4 MB · CSV/JSON",
        },
      ],
    },
    "digital-media": {
      id: "digital-media",
primaryMethodologies: [
        "Algorithmic auditing",
        "Network graph mapping",
        "Audience telemetry analysis",
        "Platform API harvesting"
      ],
      primaryMethodologiesBn: [
        "অ্যালগরিদমিক অডিটিং",
        "নেটওয়ার্ক গ্রাফ ম্যাপিং",
        "দর্শক টেলিমেট্রি বিশ্লেষণ",
        "প্ল্যাটফর্ম এপিআই সংগ্রহ"
      ],
      sampleInquiries: [
        "Short-Form Video News Consumption Patterns Among Young Adults (18–25)",
        "Cross-Platform Disinformation Trajectories During Breaking Humanitarian Events",
        "Feed Recommendation Velocity and Informational Narrowing: A 12-Month Field Study"
],
      sampleInquiriesBn: ["", "", ""],
      beatNumber: "02",
      category: "platforms",
      name: "Digital Media",
      tagline:
        "Platform dynamics, feed architecture, and digital audience behaviour.",
      description:
        "Examining how digital platforms are transforming the production, distribution, and consumption of information across mobile and network channels.",
      image:
        "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1200&q=80",
      outputsCount: "31 Inquiries & Policy Papers",
      timeframe: "2020 – Present (Continuous)",
      status: "Continuous Monitoring",
      nameBn: "",
      taglineBn: "",
      descriptionBn: "",
      statusBn: "",
      timeframeBn: "",
      outputsCountBn: "",
      imageTitleBn: "",
      imageSubtitleBn: "",
      leadFellowsBn: ["", "", ""],
      metricsBn: [
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
      ],
      overviewBn: ["", "", ""],
      keyQuestionsBn: ["", "", "", ""],
      methodologyDetailsBn: [
        { title: "", protocol: "", frequency: "", description: "" },
        { title: "", protocol: "", frequency: "", description: "" },
        { title: "", protocol: "", frequency: "", description: "" },
      ],
      caseStudiesBn: [
        { title: "", year: "", summary: "", impact: "" },
        { title: "", year: "", summary: "", impact: "" },
      ],
      publicationsBn: [
        { title: "", type: "", date: "", pagesOrSize: "" },
        { title: "", type: "", date: "", pagesOrSize: "" },
        { title: "", type: "", date: "", pagesOrSize: "" },
      ],
      leadFellows: ["Dr. Sarah Jenkins", "Tariq Rahman", "Farhan Kabir"],
      metrics: [
        {
          label: "Data Points Tracked",
          value: "4.2M Posts",
          detail: "Algorithmic feed samples gathered",
        },
        {
          label: "User Telemetry Cohort",
          value: "1,200 Citizens",
          detail: "Donated browser & mobile data sessions",
        },
        {
          label: "Platform APIs Monitored",
          value: "8 Networks",
          detail: "Social, messaging & video platforms",
        },
        {
          label: "Recommendation Audits",
          value: "540 Audits",
          detail: "Simulated persona test runs",
        },
      ],
      overview: [
        "The Digital Media beat investigates the algorithmic curation, feed mechanics, and attention economics governing major digital platforms. We assess how algorithmic optimization for engagement impacts information quality, user polarization, and public debate.",
        "Our team uses computational data collection, sock-puppet audit personas, and voluntary telemetry donation from diverse citizen cohorts to measure platform recommendation trajectories and viral distribution cycles.",
        "We place special emphasis on closed messaging platforms (WhatsApp, Telegram) and short-form video ecosystems (TikTok, Reels, YouTube Shorts) where information diffusion occurs outside of search indexing.",
      ],
      keyQuestions: [
        "How do recommendation engines prioritize emotionally charged content over verified institutional reporting?",
        "What are the vectors of cross-platform information laundering from private messaging channels into broadcast media?",
        "How is the shift toward algorithmic short-form video altering civic comprehension among young voters?",
        "What technical interventions allow independent researchers to audit walled-garden platform feeds safely?",
      ],
      methodologyDetails: [
        {
          title: "Algorithmic Persona Auditing (Reverse Engineering)",
          protocol:
            "Controlled synthetic persona bots simulating diverse consumption archetypes",
          frequency: "Continuous daily automated harvesting",
          description:
            "Simulating demographic archetypes across fresh mobile instances to capture baseline recommendation algorithms and detect radicalization pathways or engagement rabbit holes.",
        },
        {
          title: "Cross-Platform Network Graph Mapping",
          protocol:
            "Dynamic directed graph analysis measuring node centrality and propagation speed",
          frequency: "Event-triggered during major breaking information events",
          description:
            "Tracking how claims originate on 4chan/Reddit/Telegram, get picked up by micro-influencers on TikTok, and migrate to verified mainstream journalists on X.",
        },
        {
          title: "Citizen Telemetry & Screen-Time Donors",
          protocol:
            "Privacy-preserving voluntary browser extensions and mobile log donation",
          frequency: "Ongoing longitudinal panel with 1,200 participants",
          description:
            "Evaluating real-world news exposure, dark patterns, sponsored content cloaking, and cognitive fatigue among authenticated real users.",
        },
      ],
      caseStudies: [
        {
          title:
            "Short-Form Video News Consumption Patterns Among Young Adults (18–25)",
          year: "2024",
          summary:
            "Empirical examination of 350,000 video impressions showing that 64% of young news consumers received primary geopolitical updates via algorithmic feeds rather than search.",
          impact:
            "Presented at the International Association for Media and Communication Research (IAMCR).",
        },
        {
          title:
            "Cross-Platform Disinformation Trajectories During Breaking Events",
          year: "2023–2024",
          summary:
            "Documenting the average 18-minute lag between anonymous Telegram coordination and algorithmic amplification on algorithmic video platforms.",
          impact: "Incorporated into UNESCO Media Literacy Curricula.",
        },
      ],
      publications: [
        {
          title: "Algorithmic Feed Velocity and Informational Narrowing (2025)",
          type: "Peer-Reviewed Paper",
          date: "October 2025",
          pagesOrSize: "28 Pages · PDF",
        },
        {
          title: "Platform Governance and Closed Messaging Auditing Handbook",
          type: "Policy Brief",
          date: "July 2025",
          pagesOrSize: "48 Pages · PDF",
        },
        {
          title: "Cross-Platform Viral Diffusion Telemetry Repository",
          type: "Dataset",
          date: "March 2025",
          pagesOrSize: "142 MB · SQLite / JSON",
        },
      ],
    },
    "media-monitoring": {
      id: "media-monitoring",
primaryMethodologies: [
        "24/7 Automated Broadcast Recording",
        "Optical Character Recognition for Print",
        "Lexical Sentiment Indexing",
        "Multi-Language Tagging"
      ],
      primaryMethodologiesBn: [
        "২৪/৭ স্বয়ংক্রিয় সম্প্রচার রেকর্ডিং",
        "মুদ্রিত এনটিআর জন্য অপ্টিক্যাল ক্যарак্টার রিকগনিশন",
        "শব্দভিত্তিক সেন্টিমেন্ট ইন্ডেক্সিং",
        "বহুভাষিক ট্যাগিং"
      ],
      sampleInquiries: [
        "National Broadcast Framing of Climate & Monsoonal Displacement: 2020–2025",
        "Representation and Voice: Women as News Sources in Prime-Time Television",
        "Quarterly Cross-Outlet Monitor on Public Health Communications"
],
      sampleInquiriesBn: ["", "", ""],
      beatNumber: "03",
      category: "journalism",
      name: "Media Monitoring",
      tagline:
        "Systematic observation across broadcast, print, and digital spectrums.",
      description:
        "Tracking media coverage, narratives, trends, and emerging issues across television, print, online media, and social platforms using standardized coding metrics.",
      image:
        "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80",
      outputsCount: "18 Longitudinal Datasets",
      timeframe: "2019 – Present (Continuous 24/7)",
      status: "Continuous Monitoring",
      nameBn: "",
      taglineBn: "",
      descriptionBn: "",
      statusBn: "",
      timeframeBn: "",
      outputsCountBn: "",
      imageTitleBn: "",
      imageSubtitleBn: "",
      leadFellowsBn: ["", "", ""],
      metricsBn: [
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
      ],
      overviewBn: ["", "", ""],
      keyQuestionsBn: ["", "", "", ""],
      methodologyDetailsBn: [
        { title: "", protocol: "", frequency: "", description: "" },
        { title: "", protocol: "", frequency: "", description: "" },
        { title: "", protocol: "", frequency: "", description: "" },
      ],
      caseStudiesBn: [
        { title: "", year: "", summary: "", impact: "" },
        { title: "", year: "", summary: "", impact: "" },
      ],
      publicationsBn: [
        { title: "", type: "", date: "", pagesOrSize: "" },
        { title: "", type: "", date: "", pagesOrSize: "" },
        { title: "", type: "", date: "", pagesOrSize: "" },
      ],
      leadFellows: ["Dr. Marcus Vance", "Nusrat Jahan", "Maya Lin"],
      metrics: [
        {
          label: "Broadcast Channels Logged",
          value: "28 Streams",
          detail: "Continuous 24/7 video recording",
        },
        {
          label: "Print Editions Scanned",
          value: "34 Dailies",
          detail: "High-resolution OCR archives",
        },
        {
          label: "Articles Indexed",
          value: "850,000+",
          detail: "Searchable multi-language corpus",
        },
        {
          label: "Inter-Coder Reliability",
          value: "κ = 0.91",
          detail: "Krippendorff’s alpha validation",
        },
      ],
      overview: [
        "The Media Monitoring Observatory constitutes IPA’s largest technical infrastructure. Operating round-the-clock recording and automated transcription facilities, this beat creates authoritative longitudinal records of national broadcast television, national dailies, and digital news portals.",
        "Our computational linguistic pipelines process speech-to-text transcripts, perform named entity recognition (NER), and compute topic salience indices to track how news narratives evolve in response to domestic and international crises.",
        "All monitoring is executed using standardized codebooks trained on strict academic inter-coder reliability metrics, ensuring objective, replicable data for researchers and civil society.",
      ],
      keyQuestions: [
        "How do prime-time broadcast debates frame marginalized communities during national crises?",
        "What percentage of broadcast talk-show airtime is allocated to substantive policy debate versus partisan spectacle?",
        "How does the speed of story adoption differ between state-backed broadcasters and independent digital outlets?",
        "What are the measurable biases in visual representation and speaker selection on major television news networks?",
      ],
      methodologyDetails: [
        {
          title: "24/7 Automated Broadcast Recording & ASR Transcription",
          protocol:
            "Lossless MPEG-TS ingest with fine-tuned multi-lingual speech recognition",
          frequency: "Real-time continuous 24/7 capture",
          description:
            "Capturing 28 satellite television news channels simultaneously with automated timestamping, speaker segmentation, and closed-caption verification.",
        },
        {
          title: "Print OCR & Layout Geometry Reconstruction",
          protocol:
            "High-DPI archival scanning with full-page spatial coordinate tagging",
          frequency: "Daily 05:00 BST ingestion cycle",
          description:
            "Cataloging front-page banner headlines, above-the-fold placement weights, column centimeter calculations, and display advertisement ratios.",
        },
        {
          title: "Double-Blind Framing & Sentiment Coding",
          protocol:
            "Standardized Krippendorff alpha coding with blinded secondary reviewer",
          frequency: "Weekly sample batches of 500 articles/clips",
          description:
            "Evaluating frame attribution (conflict, human interest, economic consequence, morality) with strict statistical reliability testing.",
        },
      ],
      caseStudies: [
        {
          title:
            "National Broadcast Framing of Climate & Monsoonal Displacement (2020–2025)",
          year: "2024",
          summary:
            "5-year retrospective of 1,200 hours of prime-time news showing climate events framed as natural tragedies rather than systemic governance challenges 81% of the time.",
          impact:
            "Shared with the Ministry of Environment and international climate research coalitions.",
        },
        {
          title:
            "Representation and Voice: Women as News Sources in Prime-Time News",
          year: "2023",
          summary:
            "Comprehensive analysis revealing that female experts constituted only 11.2% of quoted economic and national security authorities on broadcast television.",
          impact:
            "Prompted the creation of the National Female Expert Directory for broadcasters.",
        },
      ],
      publications: [
        {
          title:
            "Five-Year Longitudinal Broadcast Observatory Report (2020–2025)",
          type: "Monograph",
          date: "December 2025",
          pagesOrSize: "210 Pages · PDF",
        },
        {
          title: "Media Representation & Gender Parity in News Sourcing",
          type: "Policy Brief",
          date: "September 2025",
          pagesOrSize: "42 Pages · PDF",
        },
        {
          title:
            "National Broadcast Headline Corpus & Sentiment Index (2021–2025)",
          type: "Dataset",
          date: "July 2025",
          pagesOrSize: "420 MB · Parquet / CSV",
        },
      ],
    },
    "public-opinion": {
      id: "public-opinion",
primaryMethodologies: [
        "Stratified Random Sampling",
        "Deliberative Polling Panels",
        "Cognitive Reception Interviews",
        "Misperception Diagnostics"
      ],
      primaryMethodologiesBn: [
        "স্তরভিত্তি যাদুকরী নমুনা গ্রহণ",
        "বিবেচনামূলক মতামত প্যানেল",
        "সংজ্ঞানাত্মক গ্রহণ সাক্ষাত্কার",
        "ভ্রান্ত ধারণা ডায়াগনস্টিক্স"
      ],
      sampleInquiries: [
        "The National Media Trust Index: 5th Annual Citizen Perception Survey",
        "How Voters Navigate Contradictory Claims on Social Platforms During General Elections",
        "Socioeconomic Factors in Rural vs. Urban Digital Information Access"
],
      sampleInquiriesBn: ["", "", ""],
      beatNumber: "04",
      category: "public",
      name: "Public Opinion",
      tagline:
        "Citizen reception, institutional trust, and factual comprehension.",
      description:
        "Exploring how people consume, interpret, and respond to news and information through nationwide survey panels and qualitative focus sessions.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      outputsCount: "12 Nationwide Polls",
      timeframe: "2020 – Present (Annual Surveys)",
      status: "Annual Cycle",
      nameBn: "",
      taglineBn: "",
      descriptionBn: "",
      statusBn: "",
      timeframeBn: "",
      outputsCountBn: "",
      imageTitleBn: "",
      imageSubtitleBn: "",
      leadFellowsBn: ["", "", ""],
      metricsBn: [
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
      ],
      overviewBn: ["", "", ""],
      keyQuestionsBn: ["", "", "", ""],
      methodologyDetailsBn: [
        { title: "", protocol: "", frequency: "", description: "" },
        { title: "", protocol: "", frequency: "", description: "" },
        { title: "", protocol: "", frequency: "", description: "" },
      ],
      caseStudiesBn: [
        { title: "", year: "", summary: "", impact: "" },
        { title: "", year: "", summary: "", impact: "" },
      ],
      publicationsBn: [
        { title: "", type: "", date: "", pagesOrSize: "" },
        { title: "", type: "", date: "", pagesOrSize: "" },
        { title: "", type: "", date: "", pagesOrSize: "" },
      ],
      leadFellows: ["Dr. Marcus Vance", "Maya Lin", "Dr. Eleanor Vance"],
      metrics: [
        {
          label: "Citizens Surveyed",
          value: "18,500+",
          detail: "Stratified probability-based sample",
        },
        {
          label: "Geographic Coverage",
          value: "64 Districts",
          detail: "Urban, semi-urban & rural divisions",
        },
        {
          label: "Margin of Error",
          value: "±2.1%",
          detail: "95% confidence interval standard",
        },
        {
          label: "Focus Groups",
          value: "96 Sessions",
          detail: "In-depth qualitative deliberation",
        },
      ],
      overview: [
        "The Public Opinion investigation beat measures the citizen side of the media ecosystem. How do people verify information? Whom do they trust when claims conflict? How do socioeconomic standing, digital literacy, and political affiliation shape susceptibility to misinformation?",
        "Our research employs rigorous probability-based nationwide surveys alongside deliberative polling panels to move beyond simplistic approval ratings and understand the cognitive mechanics of public belief formation.",
        "Findings are openly published to assist educators, policymakers, and civic institutions in designing media literacy programs that genuinely resonate with citizens’ daily realities.",
      ],
      keyQuestions: [
        "What institutional factors determine whether a citizen trusts an official government release versus a viral social post?",
        "How does digital news consumption correlate with factual knowledge on key scientific, economic, and electoral issues?",
        "What are the specific information voids in rural communities that make them susceptible to coordinated panic campaigns?",
        "Can short-form media literacy interventions demonstrably improve citizen verification habits over time?",
      ],
      methodologyDetails: [
        {
          title: "Stratified Multi-Stage Cluster Probability Sampling",
          protocol:
            "Face-to-face and computer-assisted telephone interviews (CATI)",
          frequency: "Annual flagship survey (n = 4,000 per wave)",
          description:
            "Sampling across all 8 administrative divisions, stratified by urban/rural proportion, gender, age, and educational attainment.",
        },
        {
          title: "Deliberative Polling Panels & Focus Groups",
          protocol:
            "Moderated small-group citizen dialogues with expert testimony inputs",
          frequency: "Quarterly regional focus panels",
          description:
            "Tracking how citizens update beliefs when presented with balanced, peer-reviewed evidence and structured cross-partisan discussions.",
        },
        {
          title: "Cognitive Misperception Diagnostic Batteries",
          protocol: "Factor-analyzed psychometric comprehension tests",
          frequency: "Integrated into all survey waves",
          description:
            "Distinguishing between confident misperceptions, uninformed guesses, and partisan cheerleading during survey responses.",
        },
      ],
      caseStudies: [
        {
          title: "The National Media Trust Index (5th Annual Report)",
          year: "2024–2025",
          summary:
            "Longitudinal study revealing a 14-point drop in trust toward national broadcast news, accompanied by a 22-point surge in reliance on community messaging groups.",
          impact:
            "Widely featured by academic press and national editorial conferences.",
        },
        {
          title:
            "Socioeconomic Factors in Rural vs. Urban Digital Information Access",
          year: "2023",
          summary:
            "Detailed study across 24 rural sub-districts identifying data package pricing and device sharing as major obstacles to information verification.",
          impact: "Informed national digital inclusion grant criteria.",
        },
      ],
      publications: [
        {
          title:
            "National Media Trust Index: 5th Annual Citizen Perception Survey",
          type: "Monograph",
          date: "October 2025",
          pagesOrSize: "168 Pages · PDF",
        },
        {
          title:
            "Navigating Viral Rumors: Citizen Verification Behaviors in Election Years",
          type: "Policy Brief",
          date: "May 2025",
          pagesOrSize: "34 Pages · PDF",
        },
        {
          title: "IPA Nationwide Public Opinion Microdata (Wave 1 – 5)",
          type: "Dataset",
          date: "January 2025",
          pagesOrSize: "85 MB · SPSS / Stata / CSV",
        },
      ],
    },
    "media-democracy": {
      id: "media-democracy",
primaryMethodologies: [
        "Legislative record tracing",
        "Defamation & media law reviews",
        "Civic dialogue observation",
        "Electoral debate discourse analysis"
      ],
      primaryMethodologiesBn: [
        "আইনগত রেকর্ড অনুসরণ",
        "মানহানি ও মিডিয়া আইন পর্যালোচনা",
        "নাগরিক সংলাপ পর্যবেক্ষণ",
        "নির্বাচনী বিতর্ক বարկ विश্লেষণ"
      ],
      sampleInquiries: [
        "The State of Press Freedom and Digital Regulatory Frameworks in South Asia",
        "Civic Deliberation in the Age of Coordinated Disinformation Campaigns",
        "Public Service Media Funding Models: Global Precedents and Regional Applications"
],
      sampleInquiriesBn: ["", "", ""],
      beatNumber: "05",
      category: "public",
      name: "Media & Democracy",
      tagline:
        "Public interest journalism, civic discourse, and institutional accountability.",
      description:
        "Examining the relationship between media, public discourse, democratic participation, and society in both established and transitioning informational environments.",
      image:
        "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
      outputsCount: "19 Research Monographs",
      timeframe: "2019 – Present (Longitudinal)",
      status: "Active Longitudinal Beat",
      nameBn: "",
      taglineBn: "",
      descriptionBn: "",
      statusBn: "",
      timeframeBn: "",
      outputsCountBn: "",
      imageTitleBn: "",
      imageSubtitleBn: "",
      leadFellowsBn: ["", "", ""],
      metricsBn: [
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
      ],
      overviewBn: ["", "", ""],
      keyQuestionsBn: ["", "", "", ""],
      methodologyDetailsBn: [
        { title: "", protocol: "", frequency: "", description: "" },
        { title: "", protocol: "", frequency: "", description: "" },
        { title: "", protocol: "", frequency: "", description: "" },
      ],
      caseStudiesBn: [
        { title: "", year: "", summary: "", impact: "" },
        { title: "", year: "", summary: "", impact: "" },
      ],
      publicationsBn: [
        { title: "", type: "", date: "", pagesOrSize: "" },
        { title: "", type: "", date: "", pagesOrSize: "" },
        { title: "", type: "", date: "", pagesOrSize: "" },
      ],
      leadFellows: ["Dr. Eleanor Vance", "Farhan Kabir", "Tariq Rahman"],
      metrics: [
        {
          label: "Legal Cases Tracked",
          value: "310+ Cases",
          detail: "Defamation, cyber-law & contempt trials",
        },
        {
          label: "Elections Monitored",
          value: "4 Cycles",
          detail: "Comprehensive electoral media coverage",
        },
        {
          label: "Freedom Indexes Audited",
          value: "12 Global Metrics",
          detail: "Regional methodological calibration",
        },
        {
          label: "Civil Society Briefings",
          value: "45 Briefs",
          detail: "Delivered to judicial & legal defense panels",
        },
      ],
      overview: [
        "The Media & Democracy investigation beat analyzes the legal, regulatory, and institutional environment conditioning independent media. A vibrant democracy requires that journalists can question power without facing arbitrary criminalization, financial strangulation, or regulatory suppression.",
        "We monitor media-related litigation, cybersecurity legislation enforcement, press card accreditation revocations, and government advertisement withholding. Our legal scholars cross-examine statutory law against constitutional free speech guarantees.",
        "Our publications serve as an essential empirical reference for constitutional lawyers, human rights watchdogs, press freedom rapporteurs, and international legal advocates.",
      ],
      keyQuestions: [
        "How are modern digital security statutes being applied to curtail investigative reporting on public procurement?",
        "What regulatory architectures safeguard public service media from becoming tools of incumbent state propaganda?",
        "How does state advertisement allocation create covert financial leverage over private news publishers?",
        "What legal protections exist for whistleblower sources communicating with journalists via encrypted digital channels?",
      ],
      methodologyDetails: [
        {
          title: "Judicial Docket Tracing & Case Law Repository",
          protocol:
            "Systematic courthouse court-record auditing across high court divisions",
          frequency: "Monthly legal docket review",
          description:
            "Tracking all charges filed against journalists, bloggers, and civic activists under defamation, state secrets, and cybersecurity statutes.",
        },
        {
          title: "Public Procurement & Ad-Spend Reconciliation",
          protocol:
            "Freedom of Information requests and budget allocation forensics",
          frequency: "Bi-annual fiscal reconciliation",
          description:
            "Correlating state advertising expenditures against newsroom editorial stances to identify punitive budget withdrawal patterns.",
        },
        {
          title: "Electoral Campaign Discourse Analysis",
          protocol:
            "Quantitative candidate airtime and valence scoring across networks",
          frequency: "Active during national and municipal election seasons",
          description:
            "Scoring fair-play and balanced coverage compliance across broadcast channels during election cycles.",
        },
      ],
      caseStudies: [
        {
          title:
            "The State of Press Freedom and Digital Regulatory Frameworks in South Asia",
          year: "2024",
          summary:
            "A 300-page comparative monograph investigating the diffusion of restrictive online speech laws across six South Asian jurisdictions.",
          impact:
            "Submitted as amicus curiae evidence in high court constitutional challenges.",
        },
        {
          title:
            "Public Service Media Funding Models: Global Precedents and Regional Applications",
          year: "2023–2024",
          summary:
            "Comparative fiscal analysis designing an independent endowment-based trust structure to insulate public broadcasting from direct treasury control.",
          impact:
            "Adopted as a reference whitepaper by the Media Reform Commission.",
        },
      ],
      publications: [
        {
          title:
            "Press Under Pressure: Legal Harassment of Investigative Journalists (2020–2025)",
          type: "Monograph",
          date: "January 2026",
          pagesOrSize: "194 Pages · PDF",
        },
        {
          title:
            "Government Advertising Allocation as a Tool of Editorial Coercion",
          type: "Policy Brief",
          date: "August 2025",
          pagesOrSize: "52 Pages · PDF",
        },
        {
          title: "National Digital Security Case Law Legal Dataset (2018–2025)",
          type: "Dataset",
          date: "April 2025",
          pagesOrSize: "24 MB · CSV / JSON",
        },
      ],
    },
    "technology-ai": {
      id: "technology-ai",
primaryMethodologies: [
        "Model reverse engineering",
        "Synthetic media benchmark testing",
        "Newsroom automation audits",
        "Provenance verification trials"
      ],
      primaryMethodologiesBn: [
        "মডেল রিভার্স ইঞ্জিনিয়ারিং",
        "সিন্থেটিক মিডিয়া বেঞ্চমার্ক টেস্টিং",
        "নিউজরুম অটোমেশন অডিট",
        "প্রমাণকরণ যাচাই পরীক্ষা"
      ],
      sampleInquiries: [
        "Generative AI in the Newsroom: A Survey of Adoption, Editorial Oversight, and Guidelines",
        "Watermarking and Cryptographic Provenance in High-Risk Visual Evidence",
        "The Impact of Large Language Models on Search Retrieval and Citation of Investigative Journalism"
],
      sampleInquiriesBn: ["", "", ""],
      beatNumber: "06",
      category: "platforms",
      name: "Technology & AI",
      tagline:
        "Machine intelligence, synthesis engines, and computational ethics in media.",
      description:
        "Studying how artificial intelligence, algorithms, and emerging technologies are transforming media production, automated editing, and public knowledge verification.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      outputsCount: "15 Whitepapers & Guidelines",
      timeframe: "2022 – Present (High-Growth)",
      status: "Active Longitudinal Beat",
      nameBn: "",
      taglineBn: "",
      descriptionBn: "",
      statusBn: "",
      timeframeBn: "",
      outputsCountBn: "",
      imageTitleBn: "",
      imageSubtitleBn: "",
      leadFellowsBn: ["", "", ""],
      metricsBn: [
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
        { label: "", value: "", detail: "" },
      ],
      overviewBn: ["", "", ""],
      keyQuestionsBn: ["", "", "", ""],
      methodologyDetailsBn: [
        { title: "", protocol: "", frequency: "", description: "" },
        { title: "", protocol: "", frequency: "", description: "" },
        { title: "", protocol: "", frequency: "", description: "" },
      ],
      caseStudiesBn: [
        { title: "", year: "", summary: "", impact: "" },
        { title: "", year: "", summary: "", impact: "" },
      ],
      publicationsBn: [
        { title: "", type: "", date: "", pagesOrSize: "" },
        { title: "", type: "", date: "", pagesOrSize: "" },
        { title: "", type: "", date: "", pagesOrSize: "" },
      ],
      leadFellows: ["Dr. Sarah Jenkins", "Farhan Kabir", "Nusrat Jahan"],
      metrics: [
        {
          label: "Synthetic Models Tested",
          value: "45 LLMs & Gen-AI",
          detail: "Text, image, voice & video synthesis",
        },
        {
          label: "Newsrooms Surveyed on AI",
          value: "62 Organizations",
          detail: "Adoption, tooling & oversight guidelines",
        },
        {
          label: "Watermark Robustness Trials",
          value: "12,000 Assets",
          detail: "Compression, crop & noise stress testing",
        },
        {
          label: "Detection Accuracy Benchmark",
          value: "94.2% ROC-AUC",
          detail: "In-house multimodal provenance suite",
        },
      ],
      overview: [
        "The Technology & AI investigation beat operates at the cutting edge of generative AI, computational newsrooms, synthetic disinformation, and cryptographic verification. As generative language models and deepfake synthesis tools proliferate, the cost of manufacturing synthetic realism drops to near zero.",
        "We conduct reverse-engineering trials on foundation models, benchmark automated detection algorithms against adversarial evasion tactics, and examine how automated journalism workflows impact journalistic jobs and editorial accountability.",
        "Our computational team produces open-source provenance toolkits, technical auditing whitepapers, and ethical guidelines to help newsrooms responsibly adopt AI while preserving evidentiary credibility.",
      ],
      keyQuestions: [
        "Can cryptographic provenance (C2PA) and invisible watermarks withstand adversarial re-encoding on consumer social platforms?",
        "How are commercial newsrooms utilizing generative AI for copy-editing, translation, and summary generation without hallucination risks?",
        "What are the vulnerabilities of LLM search retrieval systems when answering inquiries on disputed historical or political facts?",
        "What copyright and licensing models ensure investigative reporters are compensated when their work trains proprietary AI models?",
      ],
      methodologyDetails: [
        {
          title: "Adversarial Synthetic Benchmark Testing",
          protocol:
            "Perturbation, steganographic watermarking, and evasion trials",
          frequency: "Monthly model release benchmark cycle",
          description:
            "Stress-testing commercial and open-weight diffusion and audio cloning models against forensic detection pipelines under real-world social compression.",
        },
        {
          title: "Newsroom Automation & Tooling Audits",
          protocol:
            "Technical workflow inspection and human-in-the-loop validation metrics",
          frequency: "Quarterly review with partner editorial labs",
          description:
            "Auditing algorithmic code generation, prompt engineering guardrails, translation models, and automated CMS tagging systems deployed in active newsrooms.",
        },
        {
          title: "Search Retrieval & Hallucination Diagnostics",
          protocol:
            "Automated query injection with verified factual ground truth groundings",
          frequency:
            "Bi-weekly automated testing across 6 major search AI engines",
          description:
            "Measuring factual drift, synthetic hallucination rates, and citation fidelity on complex investigative news stories.",
        },
      ],
      caseStudies: [
        {
          title:
            "Generative AI in the Newsroom: Adoption, Oversight, and Ethical Guidelines",
          year: "2024–2025",
          summary:
            "Survey of 62 newsrooms finding 58% use AI tools daily, but only 19% have formal written disclosure policies for readers.",
          impact:
            "Cited in the Global Forum for Media Development (GFMD) guidelines.",
        },
        {
          title:
            "Watermarking and Cryptographic Provenance in High-Risk Visual Evidence",
          year: "2024",
          summary:
            "Evaluating 12,000 synthetic audio and video files across platforms to test survival rates of cryptographic signatures.",
          impact:
            "Technical findings presented to the Coalition for Content Provenance and Authenticity (C2PA).",
        },
      ],
      publications: [
        {
          title:
            "Artificial Intelligence in Journalism: The State of Play (2025)",
          type: "Monograph",
          date: "December 2025",
          pagesOrSize: "176 Pages · PDF",
        },
        {
          title:
            "Guidelines for Editorial Oversight of Automated Synthesis Tools",
          type: "Policy Brief",
          date: "October 2025",
          pagesOrSize: "40 Pages · PDF",
        },
        {
          title:
            "Multimodal Forensic Audio & Image Detection Benchmark Dataset",
          type: "Dataset",
          date: "August 2025",
          pagesOrSize: "2.1 GB · HuggingFace / Open Data",
        },
      ],
    },
  },
  workAreas: [
    {
      "id": "media-journalism",
      "name": "Media & Journalism",
      "nameBn": "",
      "tagline": "Newsroom structures, editorial independence, and the future of reportage.",
      "taglineBn": "",
      "description": "Researching journalism, news organizations, editorial practices, newsroom transformation, and the future of news in an era of platform restructuring.",
      "descriptionBn": "",
      "methods": [
        "Content analysis",
        "Newsroom ethnographies",
        "Financial disclosures audit",
        "In-depth editor interviews"
      ],
      "methodsBn": [
        "",
        "",
        "",
        ""
      ],
      "sampleInquiries": [
        "The Economics of Local Press: Survival Strategies of Regional Newsrooms (2023–2025)",
        "Editorial Autonomy Under Digital Platform Pressures: A Comparative South Asian Study",
        "Fact-Checking Verification Protocols Across 40 Major Daily Newsrooms"
      ],
      "sampleInquiriesBn": [
        "",
        "",
        ""
      ],
      "image": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
      "imageBn": "",
      "outputsCount": "24 Reports & Monographs",
      "outputsCountBn": "",
      "timeframe": "2021 – Present (Longitudinal)",
      "timeframeBn": "",
      "status": "Active Longitudinal Beat",
      "statusBn": ""
    },
    {
      "id": "digital-media",
      "name": "Digital Media",
      "nameBn": "",
      "tagline": "Platform dynamics, feed architecture, and digital audience behaviour.",
      "taglineBn": "",
      "description": "Examining how digital platforms are transforming the production, distribution, and consumption of information across mobile and network channels.",
      "descriptionBn": "",
      "methods": [
        "Algorithmic auditing",
        "Network graph mapping",
        "Audience telemetry analysis",
        "Platform API harvesting"
      ],
      "methodsBn": [
        "",
        "",
        "",
        ""
      ],
      "sampleInquiries": [
        "Short-Form Video News Consumption Patterns Among Young Adults (18–25)",
        "Cross-Platform Disinformation Trajectories During Breaking Humanitarian Events",
        "Feed Recommendation Velocity and Informational Narrowing: A 12-Month Field Study"
      ],
      "sampleInquiriesBn": [
        "",
        "",
        ""
      ],
      "image": "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1200&q=80",
      "imageBn": "",
      "outputsCount": "31 Inquiries & Policy Papers",
      "outputsCountBn": "",
      "timeframe": "2021 – Present (Longitudinal)",
      "timeframeBn": "",
      "status": "Active Longitudinal Beat",
      "statusBn": ""
    },
    {
      "id": "media-monitoring",
      "name": "Media Monitoring",
      "nameBn": "",
      "tagline": "Systematic observation across broadcast, print, and digital spectrums.",
      "taglineBn": "",
      "description": "Tracking media coverage, narratives, trends, and emerging issues across television, print, online media, and social platforms using standardized coding metrics.",
      "descriptionBn": "",
      "methods": [
        "24/7 Automated Broadcast Recording",
        "Optical Character Recognition for Print",
        "Lexical Sentiment Indexing",
        "Multi-Language Tagging"
      ],
      "methodsBn": [
        "",
        "",
        "",
        ""
      ],
      "sampleInquiries": [
        "National Broadcast Framing of Climate & Monsoonal Displacement: 2020–2025",
        "Representation and Voice: Women as News Sources in Prime-Time Television",
        "Quarterly Cross-Outlet Monitor on Public Health Communications"
      ],
      "sampleInquiriesBn": [
        "",
        "",
        ""
      ],
      "image": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80",
      "imageBn": "",
      "outputsCount": "18 Longitudinal Datasets",
      "outputsCountBn": "",
      "timeframe": "2019 – Present (Continuous 24/7)",
      "timeframeBn": "",
      "status": "Continuous Monitoring",
      "statusBn": ""
    },
    {
      "id": "public-opinion",
      "name": "Public Opinion",
      "nameBn": "",
      "tagline": "Citizen reception, institutional trust, and factual comprehension.",
      "taglineBn": "",
      "description": "Exploring how people consume, interpret, and respond to news and information through nationwide survey panels and qualitative focus sessions.",
      "descriptionBn": "",
      "methods": [
        "Stratified Random Sampling",
        "Deliberative Polling Panels",
        "Cognitive Reception Interviews",
        "Misperception Diagnostics"
      ],
      "methodsBn": [
        "",
        "",
        "",
        ""
      ],
      "sampleInquiries": [
        "The National Media Trust Index: 5th Annual Citizen Perception Survey",
        "How Voters Navigate Contradictory Claims on Social Platforms During General Elections",
        "Socioeconomic Factors in Rural vs. Urban Digital Information Access"
      ],
      "sampleInquiriesBn": [
        "",
        "",
        ""
      ],
      "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      "imageBn": "",
      "outputsCount": "12 Nationwide Polls",
      "outputsCountBn": "",
      "timeframe": "2020 – Present (Annual Surveys)",
      "timeframeBn": "",
      "status": "Annual Cycle",
      "statusBn": ""
    },
    {
      "id": "media-democracy",
      "name": "Media & Democracy",
      "nameBn": "",
      "tagline": "Public interest journalism, civic discourse, and institutional accountability.",
      "taglineBn": "",
      "description": "Examining the relationship between media, public discourse, democratic participation, and society in both established and transitioning informational environments.",
      "descriptionBn": "",
      "methods": [
        "Legislative record tracing",
        "Defamation & media law reviews",
        "Civic dialogue observation",
        "Electoral debate discourse analysis"
      ],
      "methodsBn": [
        "",
        "",
        "",
        ""
      ],
      "sampleInquiries": [
        "The State of Press Freedom and Digital Regulatory Frameworks in South Asia",
        "Civic Deliberation in the Age of Coordinated Disinformation Campaigns",
        "Public Service Media Funding Models: Global Precedents and Regional Applications"
      ],
      "sampleInquiriesBn": [
        "",
        "",
        ""
      ],
      "image": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
      "imageBn": "",
      "outputsCount": "19 Research Monographs",
      "outputsCountBn": "",
      "timeframe": "2021 – Present (Longitudinal)",
      "timeframeBn": "",
      "status": "Active Longitudinal Beat",
      "statusBn": ""
    },
    {
      "id": "technology-ai",
      "name": "Technology & AI",
      "nameBn": "",
      "tagline": "Machine intelligence, synthesis engines, and computational ethics in media.",
      "taglineBn": "",
      "description": "Studying how artificial intelligence, algorithms, and emerging technologies are transforming media production, automated editing, and public knowledge verification.",
      "descriptionBn": "",
      "methods": [
        "Model reverse engineering",
        "Synthetic media benchmark testing",
        "Newsroom automation audits",
        "Provenance verification trials"
      ],
      "methodsBn": [
        "",
        "",
        "",
        ""
      ],
      "sampleInquiries": [
        "Generative AI in the Newsroom: A Survey of Adoption, Editorial Oversight, and Guidelines",
        "Watermarking and Cryptographic Provenance in High-Risk Visual Evidence",
        "The Impact of Large Language Models on Search Retrieval and Citation of Investigative Journalism"
      ],
      "sampleInquiriesBn": [
        "",
        "",
        ""
      ],
      "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      "imageBn": "",
      "outputsCount": "15 Whitepapers & Guidelines",
      "outputsCountBn": "",
      "timeframe": "2022 – Present (High-Growth)",
      "timeframeBn": "",
      "status": "Active Longitudinal Beat",
      "statusBn": ""
    }
  ],
  workProcessPillars: [
    {
      "id": "research",
      "step": "01",
      "title": "Research",
      "titleBn": "গবেষণা",
      "subtitle": "Rigorous Primary Inquiry",
      "subtitleBn": "কঠোর প্রাথমিক অনুসন্ধান",
      "description": "We formulate hypothesis-driven research agendas that investigate structural changes in journalism, platform power, and audience behavior using empirical methods.",
      "descriptionBn": "আমরা অনুমান-চালিত গবেষণা কর্মসূচী প্রণয়ন করি যা সাংবাদিকতা, প্ল্যাটফর্মের ক্ষমতা এবং তথ্যভিত্তিক পদ্ধতির মাধ্যমে দর্শকদের আচরণের কাঠামোগত পরিবর্তন তদন্ত করে।",
      "highlights": [
        "Multi-method survey design",
        "Archival historical analysis",
        "Longitudinal panel monitoring"
      ],
      "highlightsBn": [
        "বহুবিধ জরিপ নকশা",
        "ঐতিহাসিক মহাফেজখানা বিশ্লেষণ",
        "দীর্ঘমেয়াদী প্যানেল পর্যবেক্ষণ"
      ]
    },
    {
      "id": "analysis",
      "step": "02",
      "title": "Analysis",
      "titleBn": "বিশ্লেষণ",
      "subtitle": "Pattern & Narrative Synthesis",
      "subtitleBn": "প্যাটার্ন ও আখ্যান সংশ্লেষণ",
      "description": "We deconstruct complex information flows, coding news content against objective criteria to identify institutional biases, structural shifts, and narrative framing.",
      "descriptionBn": "আমরা জটিল তথ্যপ্রবাহ বিশ্লেষণ করি, প্রাতিষ্ঠানিক পক্ষপাত, কাঠামোগত পরিবর্তন ও আখ্যানের ফ্রেম শনাক্ত করতে বস্তুনিষ্ঠ মানদণ্ডে সংবাদ বিষয়বস্তু কোড করি।",
      "highlights": [
        "Computational text analysis",
        "Comparative framing indexes",
        "Disinformation flow mapping"
      ],
      "highlightsBn": [
        "কম্পিউটেশনাল টেক্সট বিশ্লেষণ",
        "তুলনামূলক ফ্রেমিং সূচক",
        "ভুল তথ্যের প্রবাহ ম্যাপিং"
      ]
    },
    {
      "id": "monitoring",
      "step": "03",
      "title": "Monitoring",
      "titleBn": "পর্যবেক্ষণ",
      "subtitle": "Continuous Environmental Tracking",
      "subtitleBn": "ধারাবাহিক পরিবেশ পর্যবেক্ষণ",
      "description": "We maintain continuous monitoring across hundreds of broadcast channels, digital outlets, and print editions, creating longitudinal datasets of record.",
      "descriptionBn": "আমরা শত শত সম্প্রচার চ্যানেল, ডিজিটাল আউটলেট ও প্রিন্ট সংস্করণ জুড়ে ধারাবাহিক পর্যবেক্ষণ বজায় রাখি এবং দীর্ঘমেয়াদী নির্ভরযোগ্য উপাত্ত ভাণ্ডার তৈরি করি।",
      "highlights": [
        "Multi-lingual indexing",
        "Real-time narrative alerts",
        "Broadcast transcript archiving"
      ],
      "highlightsBn": [
        "বহুভাষিক সূচীকরণ",
        "রিয়েল-টাইম আখ্যান সতর্কতা",
        "সম্প্রচারিত স্ক্রিপ্ট মহাফেজখানা"
      ]
    },
    {
      "id": "insights",
      "step": "04",
      "title": "Insights",
      "titleBn": "অন্তর্দৃষ্টি",
      "subtitle": "Actionable Public Knowledge",
      "subtitleBn": "কার্যকর নাগরিক জ্ঞান",
      "description": "We translate complex empirical datasets into clear, accessible briefs, monographs, and policy frameworks designed for civic understanding and institutional reform.",
      "descriptionBn": "আমরা জটিল তথ্যভিত্তিক উপাত্তকে স্পষ্ট, বোধগম্য গবেষণাপত্র ও নীতিগত কাঠামোতে রূপান্তর করি যা নাগরিক সচেতনতা এবং প্রাতিষ্ঠানিক সংস্কারের জন্য উপযোগী।",
      "highlights": [
        "Open-access research briefs",
        "Executive policy briefings",
        "Interactive data repositories"
      ],
      "highlightsBn": [
        "উন্মুক্ত প্রবেশাধিকার গবেষণা ব্রিফ",
        "নীতিগত সারসংক্ষেপ",
        "ইন্টারেক্টিভ উপাত্ত ভাণ্ডার"
      ]
    }
  ],
  team: [
    {
      id: "tariqul-islam",
      name: "Dr. Tariqul Islam",
      nameBn: "ড. তারিকুল ইসলাম",
      role: "Research Director",
      roleBn: "গবেষণা পরিচালক",
      category: "leadership",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      bio: "Oversees the institute’s research agenda, methodology standards, and academic partnerships. Two decades of experience in media sociology and public communications.",
      bioBn:
        "প্রতিষ্ঠানের গবেষণা কর্মসূচি, পদ্ধতিগত মান এবং একাডেমিক অংশীদারিত্ব পরিচালনা করেন। গণমাধ্যম সমাজবিজ্ঞান ও জনসম্পর্কে দুই দশকের অভিজ্ঞতা।",
      fullBio:
        "Dr. Tariqul Islam has directed media sociology programs across South Asia and Europe. Prior to co-founding the Institute of Public Affairs, he held research appointments at the Reuters Institute and the London School of Economics. His scholarly work focuses on newsroom institutional transformation, editorial autonomy under political transition, and the structural economics of independent press in emerging democracies.",
      fullBioBn:
        "ড. তারিকুল ইসলাম দক্ষিণ এশিয়া ও ইউরোপ জুড়ে গণমাধ্যম সমাজবিজ্ঞান কার্যক্রম পরিচালনা করেছেন। পাবলিক অ্যাফেয়ার্স ইনস্টিটিউট সহ-প্রতিষ্ঠার পূর্বে তিনি রয়টার্স ইনস্টিটিউট ও লন্ডন স্কুল অব ইকোনমিক্সে গবেষণা পদে কাজ করেছেন। তাঁর গবেষণা কাজের মূল বিষয়সমূহ হলো সংবাদালয়ের প্রাতিষ্ঠানিক রূপান্তর, রাজনৈতিক উত্তরণের সময়ে সম্পাদকীয় স্বাধীনতা এবং উদীয়মান গণতন্ত্রে স্বাধীন সংবাদমাধ্যমের কাঠামোগত অর্থনীতি।",
      researchInterests: [
        "Media & Journalism",
        "Media & Democracy",
        "Editorial Autonomy",
        "Comparative Media Systems",
      ],
      researchInterestsBn: [
        "গণমাধ্যম ও সাংবাদিকতা",
        "গণমাধ্যম ও গণতন্ত্র",
        "সম্পাদকীয় স্বাধীনতা",
        "তুলনামূলক গণমাধ্যম ব্যবস্থা",
      ],
      education: "Ph.D. in Media & Communication Studies, University of London",
      educationBn: "লন্ডন বিশ্ববিদ্যালয়, গণমাধ্যম ও যোগাযোগ অধ্যয়নে পিএইচডি",
      recentPublications: [
        "Structural Precarity: The Economic Reorganization of Regional Newsrooms (2024)",
        "Press Freedom in South Asia: Legal Regimes and Digital Realities (2023)",
      ],
      email: "t.islam@mediaresearch.org",
    },
    {
      id: "elena-rostova",
      name: "Dr. Elena Rostova",
      nameBn: "ড. এলেনা রোস্তোভা",
      role: "Deputy Director & Head of Methodologies",
      roleBn: "উপ-পরিচালক ও পদ্ধতি বিভাগ প্রধান",
      category: "leadership",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      bio: "Leads computational social science frameworks, survey design, and data ethics across all research tracks.",
      bioBn:
        "কম্পিউটেশনাল সোশ্যাল সায়েন্স ফ্রেমওয়ার্ক, সার্ভে ডিজাইন এবং সকল গবেষণা ট্র্যাকে ডেটা নীতিশাস্ত্র পরিচালনা করেন।",
      fullBio:
        "Dr. Elena Rostova specializes in quantitative methodology, computational text analysis, and representative survey design. She previously led public opinion modeling initiatives at the European Center for Media Studies. At IPA, she directs our continuous monitoring infrastructure and establishes methodological benchmarks for cross-platform data collection.",
      fullBioBn:
        "ড. এলেনা রোস্তোভা পরিমাণমূলক পদ্ধতিবিদ্যা, কম্পিউটেশনাল টেক্সট বিশ্লেষণ এবং প্রতিনিধিত্বমূলক সার্ভে নকশাকরণে বিশেষজ্ঞ। তিনি ইউরোপীয় মিডিয়া স্টাডিজ সেন্টারে জনমত মডেলিং উদ্যোগ পরিচালনা করেছেন। আইপিএ-তে তিনি আমাদের ক্রমাগত মনিটরিং অবকাঠামো পরিচালনা করেন এবং ক্রস-প্ল্যাটফর্ম ডেটা সংগ্রহের জন্য পদ্ধতিগত বেঞ্চমার্ক নির্ধারণ করেন।",
      researchInterests: [
        "Public Opinion",
        "Computational Social Science",
        "Survey Methodology",
        "Algorithmic Auditing",
      ],
      researchInterestsBn: [
        "জনমত",
        "কম্পিউটেশনাল সোশ্যাল সায়েন্স",
        "সার্ভে পদ্ধতিবিদ্যা",
        "অ্যালগরিদমিক অডিটিং",
      ],
      education: "Ph.D. in Quantitative Sociology, University of Oxford",
      educationBn: "অক্সফোর্ড বিশ্ববিদ্যালয়, পরিমাণমূলক সমাজবিজ্ঞানে পিএইচডি",
      recentPublications: [
        "Disentangling Noise: Methodological Frameworks for High-Volume Social Data (2024)",
        "The National Media Trust Barometer: Methodological Review (2023)",
      ],
      email: "e.rostova@mediaresearch.org",
    },
    {
      id: "marcus-chen",
      name: "Marcus Chen",
      nameBn: "মার্কাস চেন",
      role: "Head of Policy & Institutional Partnerships",
      roleBn: "নীতি ও প্রাতিষ্ঠানিক অংশীদারিত্ব বিভাগ প্রধান",
      category: "leadership",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      bio: "Coordinates engagement with civil society, press councils, international research networks, and policy bodies.",
      bioBn:
        "নাগরিক সমাজ, সংবাদ পরিষদ, আন্তর্জাতিক গবেষণা নেটওয়ার্ক এবং নীতি প্রতিষ্ঠানগুলোর সাথে সম্পর্ক সমন্বয় করেন।",
      fullBio:
        "Marcus Chen brings fifteen years of international experience bridging empirical research and public policy. A former investigative journalist and media law advisor, he translates research findings into actionable policy submissions for independent regulatory consultations, international press freedom tribunals, and academic symposia.",
      fullBioBn:
        "মার্কাস চেন অভিজ্ঞতামূলক গবেষণা ও জননীতির মধ্যে সেতুবন্ধন তৈরিতে পনেরো বছরের আন্তর্জাতিক অভিজ্ঞতা নিয়ে এসেছেন। একজন তদন্তকারী সাংবাদিক ও গণমাধ্যম আইন উপদেষ্টা হিসেবে তিনি গবেষণাফলাফলকে স্বাধীন নিয়ন্ত্রক পরামর্শ, আন্তর্জাতিক সংবাদ স্বাধীনতা ট্রাইবুনাল এবং একাডেমিক সম্মেলনের জন্য কার্যকর নীতি প্রতিবেদনে রূপান্তরিত করেন।",
      researchInterests: [
        "Media Law",
        "Platform Governance",
        "Public Service Broadcasting",
        "Information Rights",
      ],
      researchInterestsBn: [
        "গণমাধ্যম আইন",
        "প্ল্যাটফর্ম শাসন",
        "জনসেবা সম্প্রচার",
        "তথ্য অধিকার",
      ],
      education:
        "LL.M. in International Information & Media Law, Columbia University",
      educationBn:
        "কলাম্বিয়া বিশ্ববিদ্যালয়, আন্তর্জাতিক তথ্য ও গণমাধ্যম আইনে এলএলএম",
      recentPublications: [
        "Regulatory Frontiers: Balancing Platform Accountability with Free Expression (2024)",
      ],
      email: "m.chen@mediaresearch.org",
    },
    {
      id: "ayesha-siddiqua",
      name: "Ayesha Siddiqua",
      nameBn: "আয়েশা সিদ্দিকা",
      role: "Senior Media Analyst — Broadcast & Newsroom Studies",
      roleBn: "বরিষ্ঠ গণমাধ্যম বিশ্লেষক — সম্প্রচার ও সংবাদালয় গবেষণা",
      category: "research",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
      bio: "Directs qualitative newsroom investigations, editor interviews, and prime-time broadcast content framing audits.",
      bioBn:
        "গুণগত সংবাদালয় তদন্ত, সম্পাদক সাক্ষাৎকার এবং প্রাইম-টাইম সম্প্রচার বিষয়বস্তু ফ্রেমিং অডিট পরিচালনা করেন।",
      fullBio:
        "Ayesha Siddiqua has spent a decade analyzing newsroom workflows, representation in prime-time television, and conflict reporting ethics. Her field research spans more than 60 newsrooms across South Asia, focusing on gender representation in editorial boards and safety protocols for investigative journalists.",
      fullBioBn:
        "আয়েশা সিদ্দিকা এক দশক ধরে সংবাদালয়ের কার্যপ্রবাহ, প্রাইম-টাইম টেলিভিশনে প্রতিনিধিত্ব এবং সংঘাত রিপোর্টিং নীতিশাস্ত্র বিশ্লেষণ করে আসছেন। তাঁর ক্ষেত্রগবেষণা দক্ষিণ এশিয়া জুড়ে ৬০-এর বেশি সংবাদালয়কে অন্তর্ভুক্ত করে, যা সম্পাদকীয় পরিষদে লিঙ্গ প্রতিনিধিত্ব এবং তদন্তকারী সাংবাদিকদের নিরাপত্তা প্রোটোকলে মনোযোগী।",
      researchInterests: [
        "Broadcast Framing",
        "Newsroom Ethnography",
        "Gender Representation",
        "Investigative Journalism",
      ],
      researchInterestsBn: [
        "সম্প্রচার ফ্রেমিং",
        "সংবাদালয় নৃতত্ত্ব",
        "লিঙ্গ প্রতিনিধিত্ব",
        "তদন্তকারী সাংবাদিকতা",
      ],
      education: "M.Phil. in Journalism Studies, University of Dhaka",
      educationBn: "ঢাকা বিশ্ববিদ্যালয়, সাংবাদিকতা অধ্যয়নে এমফিল",
      recentPublications: [
        "Gender and Voice in Prime-Time Television Broadcasts: A Five-Year Audit (2024)",
      ],
      email: "a.siddiqua@mediaresearch.org",
    },
    {
      id: "david-k-thorne",
      name: "Dr. David K. Thorne",
      nameBn: "ড. ডেভিড কে. থর্ন",
      role: "Lead Computational Scientist & AI Fellow",
      roleBn: "প্রধান কম্পিউটেশনাল বিজ্ঞানী ও এআই ফেলো",
      category: "research",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      bio: "Researches synthetic media generation, algorithmic curation engines, and machine learning models in journalism.",
      bioBn:
        "সিন্থেটিক মিডিয়া উৎপাদন, অ্যালগরিদমিক কিউরেশন ইঞ্জিন এবং সাংবাদিকতায় মেশিন লার্নিং মডেল নিয়ে গবেষণা করেন।",
      fullBio:
        "Dr. David Thorne works at the intersection of natural language processing and media studies. He investigates algorithmic curation transparency, newsroom AI tool deployment, and provenance architectures for visual and audio documentation. He is a frequent contributor to open-source algorithmic auditing toolkits.",
      fullBioBn:
        "ড. ডেভিড থর্ন ন্যাচারাল ল্যাঙ্গুয়েজ প্রসেসিং ও গণমাধ্যম অধ্যয়নের ছেদবিন্দুতে কাজ করেন। তিনি অ্যালগরিদমিক কিউরেশনের স্বচ্ছতা, সংবাদালয়ে এআই সরঞ্জাম মোতায়েন এবং দৃশ্য-শ্রব্য নথিপত্রের উৎস সনাক্তকরণ স্থাপত্য অনুসন্ধান করেন। তিনি ওপেন-সোর্স অ্যালগরিদমিক অডিটিং টুলকিটের নিয়মিত অবদানকারী।",
      researchInterests: [
        "Technology & AI",
        "Synthetic Media",
        "Algorithmic Transparency",
        "Natural Language Processing",
      ],
      researchInterestsBn: [
        "প্রযুক্তি ও এআই",
        "সিন্থেটিক মিডিয়া",
        "অ্যালগরিদমিক স্বচ্ছতা",
        "ন্যাচারাল ল্যাঙ্গুয়েজ প্রসেসিং",
      ],
      education: "Ph.D. in Computer Science & Information Science, ETH Zurich",
      educationBn: "ইটিএইচ জুরিখ, কম্পিউটার বিজ্ঞান ও তথ্য বিজ্ঞানে পিএইচডি",
      recentPublications: [
        "Provenance and Veracity: Auditing Generative Media in Public Discourse (2025)",
        "Automated Journalism in Practice: Editorial Safeguards and Omission Biases (2024)",
      ],
      email: "d.thorne@mediaresearch.org",
    },
    {
      id: "nusrat-jahan",
      name: "Nusrat Jahan",
      nameBn: "নুসরাত জাহান",
      role: "Lead Public Opinion Analyst & Survey Methodologist",
      roleBn: "প্রধান জনমত বিশ্লেষক ও সার্ভে পদ্ধতিবিদ্যা বিশেষজ্ঞ",
      category: "research",
      image:
        "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80",
      bio: "Designs national representative survey instruments, focus group protocols, and public perception tracking indices.",
      bioBn:
        "জাতীয় প্রতিনিধিত্বমূলক সার্ভে সরঞ্জাম, ফোকাস গ্রুপ প্রোটোকল এবং জনমত ট্র্যাকিং সূচক নকশা করেন।",
      fullBio:
        "Nusrat Jahan leads the organization’s annual National Media Trust Barometer. Her research investigates the cognitive mechanisms through which citizens process disputed news events, evaluate authoritative sourcing, and negotiate information scarcity in rural communities.",
      fullBioBn:
        "নুসরাত জাহান প্রতিষ্ঠানের বার্ষিক জাতীয় গণমাধ্যম বিশ্বাস ব্যারোমিটার পরিচালনা করেন। তাঁর গবেষণা নাগরিকরা বিতর্কিত সংবাদ ঘটনা কীভাবে প্রক্রিয়াকরণ করেন, কর্তৃপক্ষের উৎস মূল্যায়ন করেন এবং গ্রামীণ সম্প্রদায়ে তথ্য অভাবের মধ্যে কীভাবে মোকাবিলা করেন — তার জ্ঞানতাত্ত্বিক কাঠামো অনুসন্ধান করে।",
      researchInterests: [
        "Public Opinion",
        "Media Trust Indices",
        "Cognitive Reception",
        "Civic Literacy",
      ],
      researchInterestsBn: [
        "জনমত",
        "গণমাধ্যম বিশ্বাস সূচক",
        "জ্ঞানতাত্ত্বিক গ্রহণ",
        "নাগরিক সাক্ষরতা",
      ],
      education: "M.Sc. in Social Research Methods, London School of Economics",
      educationBn: "লন্ডন স্কুল অব ইকোনমিক্স, সামাজিক গবেষণা পদ্ধতিতে এমএসসি",
      recentPublications: [
        "Citizens in Uncertainty: Cognitive Patterns of Media Verification (2024)",
      ],
      email: "n.jahan@mediaresearch.org",
    },
    {
      id: "julian-richter",
      name: "Julian Richter",
      nameBn: "জুলিয়ান রিখটার",
      role: "Digital Investigations & Platform Governance Lead",
      roleBn: "ডিজিটাল তদন্ত ও প্ল্যাটফর্ম শাসন বিভাগ প্রধান",
      category: "research",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      bio: "Specializes in network analysis of digital information ecosystems, viral distribution mechanics, and coordination networks.",
      bioBn:
        "ডিজিটাল তথ্য বাস্তুতন্ত্রের নেটওয়ার্ক বিশ্লেষণ, ভাইরাল বিতরণ বিদ্যুত এবং সমন্বয় নেটওয়ার্কে বিশেষজ্ঞ।",
      fullBio:
        "Julian Richter directs open-source investigations into cross-platform coordinated campaigns, digital influence operations, and micro-targeting in public elections. His analytical models have unraveled bot networks and documented automated harassment campaigns targeting civic reporters.",
      fullBioBn:
        "জুলিয়ান রিখটার ক্রস-প্ল্যাটফর্ম সমন্বিত প্রচারণা, ডিজিটাল প্রভাব অপারেশন এবং জননির্বাচনে মাইক্রো-টার্গেটিং বিষয়ে ওপেন-সোর্স তদন্ত পরিচালনা করেন। তাঁর বিশ্লেষণাত্মক মডেল বট নেটওয়ার্ক উন্মোচন করেছে এবং নাগরিক সাংবাদিকদের লক্ষ্য করে স্বয়ংক্রিয় হয়রানি প্রচারণার নথিভুক্ত করেছে।",
      researchInterests: [
        "Digital Media",
        "Information Ecosystems",
        "Network Analysis",
        "Disinformation Mechanics",
      ],
      researchInterestsBn: [
        "ডিজিটাল মিডিয়া",
        "তথ্য বাস্তুতন্ত্র",
        "নেটওয়ার্ক বিশ্লেষণ",
        "ভুয়াল তথ্য বিদ্যুত",
      ],
      education:
        "M.A. in Digital Humanities & Data Science, King’s College London",
      educationBn: "কিংস কলেজ লন্ডন, ডিজিটাল হিউম্যানিটিজ ও ডেটা সায়েন্সে এমএ",
      recentPublications: [
        "Mapping Information Cascades: Velocity and Amplification on Short-Form Video (2024)",
      ],
      email: "j.richter@mediaresearch.org",
    },
    {
      id: "farhana-kabir",
      name: "Farhana Kabir",
      nameBn: "ফারহানা কাবির",
      role: "Longitudinal Media Monitoring Coordinator",
      roleBn: "দীর্ঘমেয়াদি গণমাধ্যম মনিটরিং সমন্বয়ক",
      category: "research",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80",
      bio: "Coordinates 24/7 broadcast and digital print recording operations, archival coding teams, and metadata indexing.",
      bioBn:
        "২৪/৭ সম্প্রচার ও ডিজিটাল প্রিন্ট রেকর্ডিং অপারেশন, সংরক্ষণাগার কোডিং দল এবং মেটাডেটা ইনডেক্সিং সমন্বয় করেন।",
      fullBio:
        "Farhana Kabir oversees the daily operations of IPA’s monitoring laboratory, which archives 18 broadcast television feeds, 32 national daily newspapers, and 120 digital portals. She ensures strict inter-coder reliability and maintains our proprietary news taxonomy schema.",
      fullBioBn:
        "ফারহানা কাবির আইপিএ মনিটরিং ল্যাবরাটরির দৈনিক অপারেশন তত্ত্বাবধান করেন, যা ১৮টি সম্প্রচার টেলিভিশন ফিড, ৩২টি জাতীয় দৈনিক পত্রিকা এবং ১২০টি ডিজিটাল পোর্টাল সংরক্ষণ করে। তিনি কঠোর ইন্টার-কোডার নির্ভুলতা নিশ্চিত করেন এবং আমাদের স্বতন্ত্র সংবাদ শ্রেণিবিন্যাস স্কিমা বজায় রাখেন।",
      researchInterests: [
        "Media Monitoring",
        "Content Analysis",
        "Broadcast Archiving",
        "Taxonomy Design",
      ],
      researchInterestsBn: [
        "গণমাধ্যম মনিটরিং",
        "বিষয়বস্তু বিশ্লেষণ",
        "সম্প্রচার সংরক্ষণ",
        "শ্রেণিবিন্যাস নকশাকরণ",
      ],
      education:
        "M.S.S. in Mass Communication and Journalism, University of Rajshahi",
      educationBn: "রাজশাহী বিশ্ববিদ্যালয়, গণযোগাযোগ ও সাংবাদিকতায় এমএসএস",
      recentPublications: [
        "The IPA Broadcast Coding Standard: An Operational Guide (2023)",
      ],
      email: "f.kabir@mediaresearch.org",
    },
  ],
  publications: [
    {
      id: "pub-1",
      title:
        "State of Newsroom Autonomy: National Editorial Survey Report (2025)",
      type: "Monograph",
      date: "November 2025",
      pagesOrSize: "142 Pages · PDF",
      beatId: "media-journalism",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-2",
      title: "Local Press Viability Index: Methodology & Findings",
      type: "Policy Brief",
      date: "August 2025",
      pagesOrSize: "36 Pages · PDF",
      beatId: "media-journalism",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-3",
      title: "South Asian Newsroom Editorial Structure Dataset (2022–2025)",
      type: "Dataset",
      date: "June 2025",
      pagesOrSize: "18.4 MB · CSV/JSON",
      beatId: "media-journalism",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-4",
      title: "Algorithmic Feed Velocity and Informational Narrowing (2025)",
      type: "Peer-Reviewed Paper",
      date: "October 2025",
      pagesOrSize: "28 Pages · PDF",
      beatId: "digital-media",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-5",
      title: "Platform Governance and Closed Messaging Auditing Handbook",
      type: "Policy Brief",
      date: "July 2025",
      pagesOrSize: "48 Pages · PDF",
      beatId: "digital-media",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-6",
      title: "Cross-Platform Viral Diffusion Telemetry Repository",
      type: "Dataset",
      date: "March 2025",
      pagesOrSize: "142 MB · SQLite / JSON",
      beatId: "digital-media",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-7",
      title: "Five-Year Longitudinal Broadcast Observatory Report (2020–2025)",
      type: "Monograph",
      date: "December 2025",
      pagesOrSize: "210 Pages · PDF",
      beatId: "media-monitoring",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-8",
      title: "Media Representation & Gender Parity in News Sourcing",
      type: "Policy Brief",
      date: "September 2025",
      pagesOrSize: "42 Pages · PDF",
      beatId: "media-monitoring",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-9",
      title: "National Broadcast Headline Corpus & Sentiment Index (2021–2025)",
      type: "Dataset",
      date: "July 2025",
      pagesOrSize: "420 MB · Parquet / CSV",
      beatId: "media-monitoring",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-10",
      title: "National Media Trust Index: 5th Annual Citizen Perception Survey",
      type: "Monograph",
      date: "October 2025",
      pagesOrSize: "168 Pages · PDF",
      beatId: "public-opinion",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-11",
      title:
        "Navigating Viral Rumors: Citizen Verification Behaviors in Election Years",
      type: "Policy Brief",
      date: "May 2025",
      pagesOrSize: "34 Pages · PDF",
      beatId: "public-opinion",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-12",
      title: "IPA Nationwide Public Opinion Microdata (Wave 1 – 5)",
      type: "Dataset",
      date: "January 2025",
      pagesOrSize: "85 MB · SPSS / Stata / CSV",
      beatId: "public-opinion",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-13",
      title:
        "Press Under Pressure: Legal Harassment of Investigative Journalists (2020–2025)",
      type: "Monograph",
      date: "January 2026",
      pagesOrSize: "194 Pages · PDF",
      beatId: "media-democracy",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-14",
      title:
        "Government Advertising Allocation as a Tool of Editorial Coercion",
      type: "Policy Brief",
      date: "August 2025",
      pagesOrSize: "52 Pages · PDF",
      beatId: "media-democracy",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-15",
      title: "National Digital Security Case Law Legal Dataset (2018–2025)",
      type: "Dataset",
      date: "April 2025",
      pagesOrSize: "24 MB · CSV / JSON",
      beatId: "media-democracy",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-16",
      title: "Artificial Intelligence in Journalism: The State of Play (2025)",
      type: "Monograph",
      date: "December 2025",
      pagesOrSize: "176 Pages · PDF",
      beatId: "technology-ai",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-17",
      title: "Guidelines for Editorial Oversight of Automated Synthesis Tools",
      type: "Policy Brief",
      date: "October 2025",
      pagesOrSize: "40 Pages · PDF",
      beatId: "technology-ai",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
    {
      id: "pub-18",
      title: "Multimodal Forensic Audio & Image Detection Benchmark Dataset",
      type: "Dataset",
      date: "August 2025",
      pagesOrSize: "2.1 GB · HuggingFace / Open Data",
      beatId: "technology-ai",
      status: "Published",
      downloadUrl: "#",
      abstract:
        "Comprehensive research document published by the Institute of Public Affairs under open-access methodology.",
    },
  ],
  monitoring: {
    broadcastChannelsLogged: 28,
    printEditionsScanned: 34,
    articlesIndexed: 850000,
    interCoderReliability: "κ = 0.91",
    activeSurveys: 3,
    serverUptime: "99.98%",
    lastIngestTimestamp: "2026-09-08 14:02 UTC",
  },
  inquiries: [
    {
      id: "inq-1",
      date: "2026-09-07",
      name: "Farhan Tanvir",
      organization: "Center for Investigative Journalism",
      email: "f.tanvir@cij-desk.org",
      topic: "Newsroom Ownership Dataset Request",
      message:
        "Requesting access to the complete South Asian Newsroom Editorial Structure Dataset (2022–2025) raw CSV for an academic comparative survey.",
      requestedDataset: "South Asian Newsroom Editorial Structure Dataset",
      status: "new",
      notes: "Verified academic researcher. Data agreement sent.",
    },
    {
      id: "inq-2",
      date: "2026-09-05",
      name: "Sarah Lindqvist",
      organization: "Reuters Institute Fellow",
      email: "s.lindqvist@reuters-network.ac.uk",
      topic: "Methodology Consultation on Broadcast Monitoring",
      message:
        "We are interested in referencing IPA's automated OCR print indexing methodology for our upcoming Nordic newsroom diversity study.",
      requestedDataset:
        "The IPA Broadcast Coding Standard: An Operational Guide",
      status: "reviewed",
      notes: "Call scheduled with Dr. Elena Rostova on Sep 12.",
    },
    {
      id: "inq-3",
      date: "2026-08-30",
      name: "Mohammad Qasim",
      organization: "Daily Star Editorial Desk",
      email: "qasim.m@thedailystar.net",
      topic: "Media Trust Barometer Citation Permissions",
      message:
        "Seeking permissions to cite the 2025 National Media Trust Barometer statistics in an upcoming weekend investigative feature.",
      requestedDataset: "National Media Trust Barometer 2025",
      status: "dispatched",
      notes: "Attribution guidelines and high-res vector charts dispatched.",
    },
  ],
  activityLogs: [
    {
      id: "act-1",
      timestamp: "2026-09-08 13:45",
      action: "Updated Newsroom Autonomy survey metrics",
      section: "Research Domains",
      user: "Admin (Dr. Tariqul)",
    },
    {
      id: "act-2",
      timestamp: "2026-09-08 11:20",
      action: "Published 2026 Media Trust Barometer abstract",
      section: "Publications",
      user: "Elena Rostova",
    },
    {
      id: "act-3",
      timestamp: "2026-09-07 16:10",
      action: "Added Farhana Kabir profile details",
      section: "Our Team",
      user: "System",
    },
    {
      id: "act-4",
      timestamp: "2026-09-06 09:30",
      action: "Synced broadcast telemetry stream count to 28 channels",
      section: "Media Monitoring",
      user: "Telemetry Bot",
    },
  ],
} as unknown as CmsState;
