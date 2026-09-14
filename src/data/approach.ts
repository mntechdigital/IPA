import { ApproachStep, CoreValue } from '../types';

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: '01',
    title: 'Research',
    subtitle: 'Defining the Inquiry',
    description: 'We formulate rigorous empirical questions targeting institutional shifts, journalistic autonomy, and media transformations.',
  },
  {
    number: '02',
    title: 'Evidence',
    subtitle: 'Systematic Collection',
    description: 'We assemble verifiable empirical material: multi-channel broadcast archives, stratified audience panels, and computational traces.',
  },
  {
    number: '03',
    title: 'Analysis',
    subtitle: 'Rigorous Synthesis',
    description: 'We deploy cross-verified quantitative coding, network topology, and qualitative ethnography to detect patterns and anomalies.',
  },
  {
    number: '04',
    title: 'Insight',
    subtitle: 'Public Knowledge',
    description: 'We translate complex findings into accessible monographs, interactive visual repositories, and policy briefings for civic stakeholders.',
  },
];

export const CORE_VALUES: CoreValue[] = [
  {
    number: '01',
    title: 'Independence',
    description: 'We protect the independence and integrity of our research.',
    detail: 'Our operational governance is strictly insulated from partisan agendas, commercial pressure, and external funders. Research questions and methodological determinations belong entirely to our investigative fellows.',
  },
  {
    number: '02',
    title: 'Evidence',
    description: 'We prioritize reliable evidence over assumptions.',
    detail: 'Every assertion is grounded in reproducible empirical data. Where datasets have limitations or uncertainty intervals, we document them candidly rather than presenting speculative conclusions.',
  },
  {
    number: '03',
    title: 'Rigour',
    description: 'We approach research with care, transparency, and methodological discipline.',
    detail: 'All studies undergo internal peer review, cross-coder reliability validation, and stringent ethical review to ensure adherence to international social science protocols.',
  },
  {
    number: '04',
    title: 'Transparency',
    description: 'We communicate our findings and methods clearly.',
    detail: 'We disclose our sample sizes, coding taxonomies, margin of error, and research instruments openly. We believe public scrutiny strengthens research validity.',
  },
  {
    number: '05',
    title: 'Public Value',
    description: 'We seek to produce research that contributes to meaningful public understanding.',
    detail: 'Our work is not meant for academic silos alone. We produce clear, open-access resources that inform citizens, empower journalists, and elevate civic discourse.',
  },
];

export const PROCESS_PIPELINE = [
  {
    step: 'QUESTION',
    label: 'Identify Critical Inquiries',
    summary: 'Framing urgent social questions about information power, newsroom stability, and digital media dynamics.',
  },
  {
    step: 'RESEARCH',
    label: 'Design Rigorous Methodology',
    summary: 'Selecting multi-method protocols spanning survey instruments, ethnographic observation, and platform telemetry.',
  },
  {
    step: 'EVIDENCE',
    label: 'Gather Primary Datasets',
    summary: 'Harvesting raw multi-channel broadcasts, newspaper archives, and stratified representative sample panels.',
  },
  {
    step: 'ANALYSIS',
    label: 'Decode Underlying Patterns',
    summary: 'Executing computational NLP, longitudinal sentiment trends, and qualitative thematic evaluations.',
  },
  {
    step: 'INSIGHT',
    label: 'Publish Civic Knowledge',
    summary: 'Delivering open-access research briefs, executive policy briefings, and interactive datasets for society.',
  },
];
