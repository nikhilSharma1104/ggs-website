// Everything the AI guide knows, derived from site.ts so it never drifts from
// the website. Used two ways: as grounding text for the LLM, and by a small
// offline answerer that works with no API key at all.

import {
  admissionSession,
  admissionSteps,
  careerReasons,
  coreValues,
  events,
  facilities,
  gradeOptions,
  missionStatement,
  requiredDocuments,
  school,
  specializedPrograms,
  stages,
  stats,
  testimonials,
  visionStatement,
} from './site';

interface Entry {
  topic: string;
  keywords: string[];
  answer: string;
}

const month = (m: number) => new Date(2000, m - 1, 1).toLocaleString('en-IN', { month: 'long' });
const contactLine = `call ${school.phones.join(' or ')}, email ${school.email}, or WhatsApp ${school.whatsapp}`;

export const knowledgeEntries = (): Entry[] => [
  {
    topic: 'About the school',
    keywords: ['about', 'school', 'who', 'what', 'gurukulam', 'tell', 'introduce', 'overview', 'established', 'founded', 'started', 'since', 'old', 'history'],
    answer: `${school.name} is a school in Krishna Nagar, Mathura, established in ${school.established}. Its tagline is "${school.tagline}" and it blends Indian values with modern, NEP 2020-aligned education. Today it has ${stats[1].value}+ students and ${stats[2].value}+ expert teachers, with a ${stats[3].value}% success rate.`,
  },
  {
    topic: 'Location and directions',
    keywords: ['where', 'location', 'address', 'located', 'directions', 'reach', 'map', 'mathura', 'krishna', 'nagar', 'vrindavan'],
    answer: `The school is at ${school.address.line1}, ${school.address.line2}, ${school.address.city}. You can find it on Google Maps by searching "Gurukulam Global School Mathura".`,
  },
  {
    topic: 'Contact and timings',
    keywords: ['contact', 'phone', 'call', 'number', 'email', 'mail', 'whatsapp', 'timing', 'timings', 'hours', 'open', 'visit', 'office', 'time'],
    answer: `You can ${contactLine}. The office and campus visits are open ${school.hours}.`,
  },
  {
    topic: 'Admissions',
    keywords: ['admission', 'admissions', 'apply', 'application', 'join', 'enroll', 'enrol', 'enrollment', 'process', 'procedure', 'how', 'seat', 'register', 'registration', 'session'],
    answer: `Admissions are open for session ${admissionSession()}. The process has five steps: ${admissionSteps.map((s, i) => `${i + 1}. ${s.title}`).join(', ')}. You can apply online from the Admissions page or the "Apply" button on this site.`,
  },
  {
    topic: 'Documents required',
    keywords: ['document', 'documents', 'required', 'need', 'papers', 'certificate', 'birth', 'tc', 'transfer', 'photo', 'proof', 'medical'],
    answer: `Documents needed for admission: ${requiredDocuments.map((d) => `${d.name} (${d.description.toLowerCase()})`).join('; ')}.`,
  },
  {
    topic: 'Classes offered',
    keywords: ['class', 'classes', 'grade', 'grades', 'standard', 'age', 'nursery', 'playgroup', 'lkg', 'ukg', 'kindergarten', 'offered', 'which', 'till', 'upto', 'up'],
    answer: `The school offers ${gradeOptions.map((g) => `${g.group}: ${g.options.map((o) => o.label).join(', ')}`).join('. ')}. These map to three NEP 2020 stages: ${stages.map((s) => `${s.title} (${s.classes}, ${s.ages})`).join('; ')}.`,
  },
  ...stages.map((s) => ({
    topic: s.title,
    keywords: [s.key, ...s.title.toLowerCase().split(' '), ...s.classes.toLowerCase().split(/\W+/)].filter(Boolean),
    answer: `${s.title} (${s.classes}, ${s.ages}): ${s.intro.paragraphs.join(' ')} Approach: ${s.approach.points.join(', ')}. ${s.groups
      .map((g) => `${g.heading}: ${g.columns.map((c) => `${c.title} (${c.items.join(', ')})`).join('; ')}`)
      .join('. ')}.`,
  })),
  {
    topic: 'Curriculum and board',
    keywords: ['curriculum', 'syllabus', 'nep', 'board', 'cbse', 'icse', 'teaching', 'method', 'methodology', 'pedagogy', 'subjects', 'study'],
    answer: `The curriculum follows the National Education Policy 2020 across Foundational, Preparatory and Middle stages, with play-based, experiential and project-based learning, personalized learning and holistic development. For board affiliation details, please ${contactLine}.`,
  },
  {
    topic: 'Special programs',
    keywords: ['program', 'programs', 'programme', 'special', 'ai', 'artificial', 'intelligence', 'coding', 'programming', 'computer', 'robotics', 'language', 'languages', 'foreign', 'french', 'german', 'innovation', 'technology', 'lab'],
    answer: `Specialized programs: ${specializedPrograms.map((p) => `${p.title}: ${p.description}`).join(' ')}`,
  },
  {
    topic: 'Facilities',
    keywords: ['facility', 'facilities', 'campus', 'infrastructure', 'sports', 'swimming', 'pool', 'library', 'lab', 'labs', 'playground', 'ground', 'music', 'dance', 'art', 'yoga', 'cafeteria', 'canteen', 'smart'],
    answer: `Campus facilities: ${facilities.map((f) => `${f.title}: ${f.items.join(', ')}`).join('. ')}.`,
  },
  {
    topic: 'Values, vision and mission',
    keywords: ['value', 'values', 'vision', 'mission', 'philosophy', 'ethos', 'culture', 'believe', 'goal', 'aim'],
    answer: `Vision: ${visionStatement} Mission: ${missionStatement} Core values: ${coreValues.map((v) => v.title).join(', ')}.`,
  },
  {
    topic: 'Events',
    keywords: ['event', 'events', 'annual', 'function', 'sports', 'day', 'festival', 'exhibition', 'ptm', 'parent', 'meeting', 'calendar', 'celebration', 'holiday'],
    answer: `Annual events include ${events.map((e) => `${e.title} (around ${month(e.month)})`).join(', ')}. The Events page has the full calendar.`,
  },
  {
    topic: 'Fees',
    keywords: ['fee', 'fees', 'cost', 'charges', 'price', 'expensive', 'tuition', 'payment', 'scholarship', 'concession'],
    answer: `Fee details are shared directly by the admissions office. Please ${contactLine} and they will give you the current fee structure for your child's class.`,
  },
  {
    topic: 'Transport',
    keywords: ['transport', 'bus', 'van', 'pickup', 'drop', 'conveyance', 'route'],
    answer: `For school transport routes and availability, please ${contactLine}.`,
  },
  {
    topic: 'Careers',
    keywords: ['job', 'jobs', 'career', 'careers', 'vacancy', 'vacancies', 'teacher', 'teaching', 'hiring', 'recruit', 'work', 'apply'],
    answer: `The school hires teachers, administrative and support staff. Why join: ${careerReasons.map((r) => r.title).join(', ')}. Apply with your resume on the Careers page.`,
  },
  {
    topic: 'Parent reviews',
    keywords: ['review', 'reviews', 'parents', 'feedback', 'testimonial', 'good', 'best', 'opinion', 'experience'],
    answer: `Parents say: ${testimonials.map((t) => `"${t.quote}" (${t.name})`).join(' ')}`,
  },
];

/** Plain-text knowledge base handed to the LLM as its only source of truth. */
export const knowledgeText = () => knowledgeEntries().map((e) => `## ${e.topic}\n${e.answer}`).join('\n\n');

const STOP = new Set(['the', 'a', 'an', 'is', 'are', 'do', 'does', 'you', 'your', 'i', 'my', 'me', 'of', 'for', 'to', 'in', 'and', 'or', 'can', 'what', 'how', 'please', 'tell', 'about', 'there', 'school', 'at', 'it', 'have', 'has']);

const tokens = (q: string) =>
  q
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w));

/** Keyword-overlap answerer used when the LLM isn't reachable. */
export const localAnswer = (question: string): string => {
  const words = tokens(question);
  if (!words.length) return knowledgeEntries()[0].answer;
  let best: { score: number; entry?: Entry } = { score: 0 };
  for (const entry of knowledgeEntries()) {
    const hits = words.reduce((acc, w) => acc + (entry.keywords.some((k) => k === w || (w.length > 3 && k.startsWith(w))) ? 1 : 0), 0);
    // on equal hits, prefer the narrower topic (e.g. "bus facility" -> Transport, not Facilities)
    const score = hits ? hits + 1 / entry.keywords.length : 0;
    if (score > best.score) best = { score, entry };
  }
  if (best.entry) return best.entry.answer;
  return `I don't have that detail yet. The school office will be happy to help: ${contactLine}.`;
};

export const suggestedQuestions = [
  'How do I apply for admission?',
  'Which classes do you offer?',
  'What documents are needed?',
  'Tell me about the AI & Programming Lab',
  'What are the school timings?',
  'Where is the school located?',
];
