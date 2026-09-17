-- CreateTable
CREATE TABLE "CmsMeta" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CmsMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomePageData" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "HomePageData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutPageData" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "AboutPageData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactPageData" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "ContactPageData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchPageData" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "ResearchPageData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonitoringTelemetry" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "MonitoringTelemetry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchBeat" (
    "id" TEXT NOT NULL,
    "slug" TEXT,
    "beatNumber" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "outputsCount" TEXT NOT NULL,
    "timeframe" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "leadFellows" JSONB NOT NULL,
    "metrics" JSONB NOT NULL,
    "overview" JSONB NOT NULL,
    "keyQuestions" JSONB NOT NULL,
    "methodologyDetails" JSONB NOT NULL,
    "caseStudies" JSONB NOT NULL,
    "publications" JSONB NOT NULL,
    "summary" TEXT,
    "methodology" TEXT,
    "primaryMethodologies" JSONB NOT NULL,
    "imageTitle" TEXT,
    "imageSubtitle" TEXT,
    "researchNarrative" TEXT,
    "viewCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nameBn" TEXT,
    "taglineBn" TEXT,
    "descriptionBn" TEXT,
    "summaryBn" TEXT,
    "methodologyBn" TEXT,
    "researchNarrativeBn" TEXT,
    "statusBn" TEXT,
    "timeframeBn" TEXT,
    "outputsCountBn" TEXT,
    "imageTitleBn" TEXT,
    "imageSubtitleBn" TEXT,
    "leadFellowsBn" JSONB,
    "metricsBn" JSONB,
    "overviewBn" JSONB,
    "keyQuestionsBn" JSONB,
    "methodologyDetailsBn" JSONB,
    "caseStudiesBn" JSONB,
    "publicationsBn" JSONB,
    "sampleInquiries" JSONB,
    "sampleInquiriesBn" JSONB,
    "primaryMethodologiesBn" JSONB,
    "imageBn" TEXT,

    CONSTRAINT "ResearchBeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameBn" TEXT,
    "role" TEXT NOT NULL,
    "roleBn" TEXT,
    "category" TEXT NOT NULL,
    "teamType" TEXT,
    "image" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "bioBn" TEXT,
    "fullBio" TEXT,
    "fullBioBn" TEXT,
    "researchInterests" JSONB NOT NULL,
    "researchInterestsBn" JSONB,
    "focusAreas" JSONB NOT NULL,
    "focusAreasBn" JSONB,
    "education" TEXT,
    "educationBn" TEXT,
    "recentPublications" JSONB NOT NULL,
    "email" TEXT NOT NULL,
    "twitter" TEXT,
    "linkedin" TEXT,
    "scholar" TEXT,
    "order" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "pagesOrSize" TEXT NOT NULL,
    "beatId" TEXT,
    "downloadUrl" TEXT,
    "abstract" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "requestedDataset" TEXT,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "methods" JSONB NOT NULL,
    "sampleInquiries" JSONB NOT NULL,
    "image" TEXT NOT NULL,
    "outputsCount" TEXT NOT NULL,
    "timeframe" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "nameBn" TEXT,
    "taglineBn" TEXT,
    "descriptionBn" TEXT,
    "methodsBn" JSONB,
    "sampleInquiriesBn" JSONB,
    "imageBn" TEXT,
    "outputsCountBn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkProcessPillar" (
    "id" TEXT NOT NULL,
    "step" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "highlights" JSONB NOT NULL,
    "titleBn" TEXT,
    "subtitleBn" TEXT,
    "descriptionBn" TEXT,
    "highlightsBn" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkProcessPillar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResearchBeat_slug_key" ON "ResearchBeat"("slug");
