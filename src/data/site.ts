// Single source of truth for the school's content. Pages read from here so
// copy changes never require touching layout code.

export const school = {
  name: 'Gurukulam Global School',
  shortName: 'GGS',
  tagline: 'Nurturing Future Leaders',
  motto: 'Nurturing Minds, Shaping Futures, Building Tomorrow’s Leaders',
  established: 2022,
  email: 'gurukulamglobalschool@gmail.com',
  phones: ['+91 7505335080', '+91 7617645050'],
  whatsapp: '+917617645050',
  hours: 'Mon – Sat · 9:00 AM – 5:00 PM',
  address: {
    line1: '136, Madhuvan Enclave',
    line2: 'Near Natraj Murti, Krishna Nagar',
    city: 'Mathura, Uttar Pradesh 281003',
  },
  coords: { lat: 27.5043, lon: 77.655 },
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.874189167418!2d77.6549611!3d27.504287899999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397371e014c8525f%3A0x9019ba62fabf9da7!2sGurukulam%20Global%20School%20-%20Best%20School%20in%20Mathura%20%7C%20Most%20Dynamic%20School%20In%20Mathura%20-%20Vridavan%20Region!5e0!3m2!1sen!2sin!4v1735657740426!5m2!1sen!2sin',
  mapLink: 'https://maps.google.com/?q=Gurukulam+Global+School+Mathura',
  virtualTourId: '6DHDX1rXrjU',
  social: {
    facebook: 'https://www.facebook.com/gurukulamglobalschool',
    instagram: 'https://www.instagram.com/gurukulamglobalschool',
    youtube: 'https://www.youtube.com/watch?v=6DHDX1rXrjU',
  },
};

export const telHref = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;

/** Indian academic sessions start in April; from October we advertise the next one. */
export const admissionSession = (now = new Date()) => {
  const y = now.getFullYear();
  const start = now.getMonth() >= 9 ? y + 1 : y;
  return `${start}–${String(start + 1).slice(-2)}`;
};

export interface NavItem {
  name: string;
  href: string;
  children?: { name: string; href: string; note: string }[];
}

export const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Academics',
    href: '/academics',
    children: [
      { name: 'Foundational Stage', href: '/academics/foundational-stage', note: 'Nursery – Class 2 · Ages 3–8' },
      { name: 'Preparatory Stage', href: '/academics/preparatory-stage', note: 'Classes 3 – 5 · Ages 8–11' },
      { name: 'Middle Stage', href: '/academics/middle-stage', note: 'Classes 6 – 8 · Ages 11–14' },
    ],
  },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Campus Life', href: '/campus-life' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

export const stats = [
  { value: 2022, suffix: '', label: 'Established', description: 'A young and dynamic institution', plain: true },
  { value: 400, suffix: '+', label: 'Students', description: 'Growing student community since 2022' },
  { value: 20, suffix: '+', label: 'Expert Teachers', description: 'Highly qualified educators dedicated to excellence' },
  { value: 95, suffix: '%', label: 'Success Rate', description: 'Exceptional academic achievement' },
];

export const pillars = [
  { title: 'Academic Excellence', text: 'Rigorous, NEP 2020–aligned learning with personal attention.' },
  { title: 'Holistic Growth', text: 'Academic, social, emotional and physical development in balance.' },
  { title: 'Global Vision', text: 'World-class education rooted in Indian values.' },
  { title: 'Creative Expression', text: 'Arts, music, theatre and innovation woven into every week.' },
];

export const highlights = [
  { title: 'Modern Education', description: 'Innovative teaching methods with traditional values' },
  { title: 'Growing Community', description: '400+ students and growing since 2022' },
  { title: 'Digital Learning', description: 'Smart classrooms and technology integration' },
  { title: 'Holistic Development', description: 'Focus on academic and personal growth' },
];

export const campusFeatures = [
  { title: 'Modern Campus', description: 'New facilities with latest amenities' },
  { title: 'Expert Faculty', description: 'Dedicated team of 20+ experienced teachers' },
  { title: 'Quality Education', description: '95% success rate in academics' },
];

export const communityHighlights = [
  { title: 'Student Life', description: 'Vibrant and engaging campus community' },
  { title: 'Parent Partnership', description: 'Strong collaboration with parents' },
  { title: 'Leadership Development', description: 'Nurturing future leaders' },
];

export const activities = [
  { title: 'Creative Arts', description: 'Nurturing artistic talents and creative expression' },
  { title: 'Sports & Fitness', description: 'Promoting physical fitness and sportsmanship' },
  { title: 'Environmental Club', description: 'Fostering environmental awareness and sustainability' },
];

export const specializedPrograms = [
  {
    key: 'language',
    title: 'Foreign Language Program',
    description:
      'Learn global languages and cultures. Our program includes multiple foreign languages taught by expert instructors, preparing students for international opportunities.',
  },
  {
    key: 'ai',
    title: 'AI & Programming Lab',
    description:
      'State-of-the-art technology lab where students learn artificial intelligence, programming, and computational thinking through hands-on projects.',
  },
  {
    key: 'innovation',
    title: 'Innovation Hub',
    description:
      'A creative space where technology meets imagination. Students work on innovative projects, combining their programming skills with real-world applications.',
  },
] as const;

export const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Parent',
    quote:
      'The school’s holistic approach to education has transformed my child’s learning experience. The teachers are dedicated and caring.',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Parent',
    quote: 'Outstanding academic program combined with excellent extracurricular activities. My children have flourished here.',
  },
  {
    name: 'Anita Patel',
    role: 'Parent',
    quote: 'The school’s focus on values and character development sets it apart. We’re extremely happy with our decision.',
  },
];

export const vision = [
  'To be a globally recognized institution of academic excellence',
  'Nurturing future leaders with strong ethical values',
  'Creating innovative learning environments',
  'Fostering research and intellectual curiosity',
];

export const mission = [
  'Providing world-class education with Indian values',
  'Developing critical thinking and problem-solving skills',
  'Building character through experiential learning',
  'Creating responsible global citizens',
];

export const visionStatement =
  'To be a leading educational institution that empowers students with knowledge, skills, and values to excel in the global arena while staying rooted in Indian culture and traditions.';
export const missionStatement =
  'To provide quality education through innovative teaching methods, foster creativity, critical thinking, and character development in a nurturing environment.';

export const coreValues = [
  { title: 'Excellence', description: 'Pursuing the highest standards in academic and personal development', details: ['Rigorous academic programs', 'Continuous improvement', 'Quality assessment'] },
  { title: 'Integrity', description: 'Building character through ethical practices and moral values', details: ['Honest communication', 'Ethical behavior', 'Moral leadership'] },
  { title: 'Growth', description: 'Fostering continuous learning and personal development', details: ['Skill development', 'Personal growth', 'Lifelong learning'] },
  { title: 'Global Mindset', description: 'Embracing diversity and international perspectives', details: ['Cultural awareness', 'Global citizenship', 'International exposure'] },
  { title: 'Innovation', description: 'Encouraging creative thinking and problem-solving', details: ['Creative solutions', 'Modern technology', 'Research mindset'] },
  { title: 'Compassion', description: 'Nurturing empathy and care for others', details: ['Community service', 'Emotional intelligence', 'Social responsibility'] },
];

export const timeline = [
  { year: '2022', title: 'Foundation', description: 'Establishment of Gurukulam Global School with a vision for excellence in education', achievements: ['Started with first batch of students', 'Modern campus facilities', 'Innovative teaching methodology'] },
  { year: '2023', title: 'Growth', description: 'Rapid expansion and enhancement of facilities', achievements: ['Growing student community', 'Enhanced infrastructure', 'Enriched curriculum'] },
  { year: '2024', title: 'Innovation', description: 'Integration of modern learning methods and technology', achievements: ['Smart classrooms', 'Digital learning integration', '400+ student strength'] },
];

export type StageKey = 'foundational' | 'preparatory' | 'middle';

export interface Stage {
  key: StageKey;
  slug: string;
  title: string;
  classes: string;
  ages: string;
  summary: string;
  tagline: string;
  intro: { heading: string; paragraphs: string[] };
  approach: { heading: string; points: string[] };
  groups: { heading: string; columns: { title: string; items: string[] }[] }[];
}

export const stages: Stage[] = [
  {
    key: 'foundational',
    slug: '/academics/foundational-stage',
    title: 'Foundational Stage',
    classes: 'Nursery – Class 2',
    ages: 'Ages 3–8',
    summary: 'Building strong foundations through play-based learning and foundational literacy.',
    tagline: 'Building strong foundations for lifelong learning',
    intro: {
      heading: 'Overview',
      paragraphs: [
        'The Foundational Stage at Gurukulam Global School is designed for children aged 3-8 years (Nursery to Class 2). This stage focuses on developing foundational literacy and numeracy, cognitive development, and social-emotional growth.',
        'Our curriculum follows the National Education Policy 2020 guidelines, emphasizing play-based learning and multilingual education.',
      ],
    },
    approach: {
      heading: 'Key Features',
      points: ['Play-based learning approach', 'Activity-based curriculum', 'Focus on language development', 'Development of motor skills', 'Social-emotional learning'],
    },
    groups: [
      {
        heading: 'Curriculum Highlights',
        columns: [
          { title: 'Language & Literacy', items: ['Phonics and letter recognition', 'Basic reading and writing skills', 'Storytelling and comprehension'] },
          { title: 'Numeracy', items: ['Number recognition and counting', 'Basic mathematical concepts', 'Spatial awareness'] },
          { title: 'Life Skills', items: ['Personal hygiene and self-care', 'Social interaction', 'Environmental awareness'] },
        ],
      },
    ],
  },
  {
    key: 'preparatory',
    slug: '/academics/preparatory-stage',
    title: 'Preparatory Stage',
    classes: 'Classes 3 – 5',
    ages: 'Ages 8–11',
    summary: 'Transitioning to more formal education while maintaining experiential learning.',
    tagline: 'Preparing students for advanced learning through structured education',
    intro: {
      heading: 'Academic Focus',
      paragraphs: [
        'The Preparatory Stage (Classes 3-5) builds upon the foundational stage, introducing more structured learning while maintaining an engaging and interactive approach.',
        'Students develop critical thinking skills, subject expertise, and confidence through our comprehensive curriculum.',
      ],
    },
    approach: {
      heading: 'Learning Approach',
      points: ['Interactive learning methods', 'Project-based activities', 'Experiential learning', 'Regular assessments'],
    },
    groups: [
      {
        heading: 'Core Subjects',
        columns: [
          { title: 'Languages', items: ['English', 'Hindi', 'Regional Language'] },
          { title: 'Mathematics', items: ['Number System', 'Basic Algebra', 'Geometry'] },
          { title: 'Science', items: ['Basic Sciences', 'Environmental Studies', 'Practical Activities'] },
          { title: 'Social Studies', items: ['History', 'Geography', 'Civics'] },
        ],
      },
      {
        heading: 'Co-Curricular Activities',
        columns: [
          { title: 'Sports', items: ['Physical Education', 'Team Sports', 'Yoga'] },
          { title: 'Arts', items: ['Visual Arts', 'Performing Arts', 'Music'] },
          { title: 'Life Skills', items: ['Leadership Activities', 'Group Projects', 'Community Service'] },
        ],
      },
    ],
  },
  {
    key: 'middle',
    slug: '/academics/middle-stage',
    title: 'Middle Stage',
    classes: 'Classes 6 – 8',
    ages: 'Ages 11–14',
    summary: 'Developing critical thinking and subject expertise through integrated learning.',
    tagline: 'Developing critical thinking and advanced learning capabilities',
    intro: {
      heading: 'Stage Overview',
      paragraphs: [
        'The Middle Stage (Classes 6-8) focuses on developing advanced academic skills, critical thinking, and subject specialization. Students are encouraged to explore their interests while building a strong foundation in core subjects.',
        'Our curriculum integrates technology, practical learning, and real-world applications to prepare students for higher education.',
      ],
    },
    approach: {
      heading: 'Educational Approach',
      points: ['Subject specialization', 'Research-based learning', 'Technology integration', 'Practical applications'],
    },
    groups: [
      {
        heading: 'Academic Programs',
        columns: [
          { title: 'Core Subjects', items: ['Advanced Mathematics', 'Sciences (Physics, Chemistry, Biology)', 'Languages (English, Hindi, Third Language)', 'Social Sciences'] },
          { title: 'Special Programs', items: ['Computer Science & Coding', 'Foreign Language Classes', 'Environmental Studies', 'Financial Literacy'] },
          { title: 'Skill Development', items: ['Critical Thinking', 'Research Skills', 'Digital Literacy', 'Communication Skills'] },
        ],
      },
      {
        heading: 'Extra-Curricular Activities',
        columns: [
          { title: 'Sports', items: ['Team Sports', 'Individual Sports', 'Fitness Training'] },
          { title: 'Arts & Culture', items: ['Visual Arts', 'Performing Arts', 'Cultural Activities'] },
          { title: 'Clubs', items: ['Science Club', 'Coding Club', 'Literary Club'] },
          { title: 'Leadership', items: ['Student Council', 'Community Service', 'Mentorship Programs'] },
        ],
      },
      {
        heading: 'Assessment & Growth',
        columns: [
          { title: 'Continuous Evaluation', items: ['Regular Assessments', 'Project Evaluation', 'Performance Analysis'] },
          { title: 'Personal Growth', items: ['Career Guidance', 'Personality Development', 'Life Skills Training'] },
          { title: 'Parent Partnership', items: ['Regular PTMs', 'Progress Reports', 'Counseling Sessions'] },
        ],
      },
    ],
  },
];

export const academicFeatures = [
  { title: 'Personalized Learning', description: 'Tailored education plans that adapt to each student’s unique learning style and pace' },
  { title: 'Holistic Development', description: 'Focus on academic, social, emotional, and physical growth of every student' },
];

export const admissionSteps = [
  { title: 'Submit Application', description: 'Fill out the online application form with all required information' },
  { title: 'Document Verification', description: 'Submit required documents for verification' },
  { title: 'Entrance Assessment', description: 'Complete the grade-appropriate entrance assessment' },
  { title: 'Personal Interview', description: 'Attend an interview with our academic team' },
  { title: 'Admission Confirmation', description: 'Receive admission decision and complete the enrollment process' },
];

export const requiredDocuments = [
  { name: 'Birth Certificate', description: 'Original birth certificate for age verification' },
  { name: 'Previous Academic Records', description: 'Last 2 years’ report cards and transfer certificate' },
  { name: 'Medical Records', description: 'Immunization records and general health certificate' },
  { name: 'Passport Photos', description: 'Recent passport-size photographs' },
  { name: 'Address Proof', description: 'Current residential address proof' },
];

export const gradeOptions = [
  {
    group: 'Pre-Primary',
    options: [
      { value: 'playgroup', label: 'Playgroup (2-3 years)' },
      { value: 'nursery', label: 'Nursery (3-4 years)' },
      { value: 'lkg', label: 'Lower Kindergarten (4-5 years)' },
      { value: 'ukg', label: 'Upper Kindergarten (5-6 years)' },
    ],
  },
  {
    group: 'Primary',
    options: [1, 2, 3, 4, 5].map((n) => ({ value: `grade${n}`, label: `Grade ${n}` })),
  },
  {
    group: 'Middle',
    options: [6, 7, 8].map((n) => ({ value: `grade${n}`, label: `Grade ${n}` })),
  },
];

export const facilities = [
  { key: 'sports', title: 'Sports Facilities', description: 'State-of-the-art sports facilities to nurture physical development and team spirit', items: ['Olympic-size Swimming Pool', 'Indoor Sports Complex', 'Football Ground', 'Basketball Courts', 'Cricket Field'] },
  { key: 'academic', title: 'Academic Facilities', description: 'Modern learning spaces equipped with the latest technology', items: ['Modern Classrooms', 'Science Laboratories', 'Computer Labs', 'Library & Resource Center', 'Smart Learning Spaces'] },
  { key: 'arts', title: 'Extra-Curricular', description: 'Diverse spaces for artistic and creative expression', items: ['Music Room', 'Dance Studio', 'Art & Craft Center', 'Theater Space', 'Yoga Center'] },
  { key: 'life', title: 'Student Life', description: 'Comfortable and engaging spaces for student activities', items: ['Student Lounge', 'Cafeteria', 'Meditation Garden', 'Activity Rooms', 'Outdoor Learning Spaces'] },
] as const;

export type EventCategory = 'Sports' | 'Academic' | 'Cultural' | 'Social';

export interface SchoolEvent {
  title: string;
  /** Month (1-12) and day of the annual fixture; the year is resolved to the next occurrence. */
  month: number;
  day: number;
  endDay?: number;
  description: string;
  category: EventCategory;
}

// Annual fixtures from the school calendar. Update month/day when the office
// publishes the new session's dates.
export const events: SchoolEvent[] = [
  { title: 'Annual Sports Day', month: 1, day: 15, description: 'A day filled with athletic competitions, team sports, and celebration of physical fitness.', category: 'Sports' },
  { title: 'Science Exhibition', month: 2, day: 5, description: 'Students showcase their innovative science projects and experiments.', category: 'Academic' },
  { title: 'Cultural Festival', month: 3, day: 10, description: 'A vibrant celebration of art, music, dance, and cultural performances.', category: 'Cultural' },
  { title: 'Parent-Teacher Meet', month: 4, day: 2, description: 'Interactive session between parents and teachers to discuss student progress.', category: 'Academic' },
  { title: 'Environment Day', month: 6, day: 5, description: 'Activities and workshops focused on environmental awareness and conservation.', category: 'Social' },
  { title: 'Literary Week', month: 7, day: 15, endDay: 20, description: 'A week dedicated to literature, featuring book fairs, poetry competitions, and storytelling sessions.', category: 'Academic' },
];

export const eventCategories: ('All' | EventCategory)[] = ['All', 'Sports', 'Academic', 'Cultural', 'Social'];

export const nextOccurrence = (e: SchoolEvent, now = new Date()) => {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastDay = new Date(now.getFullYear(), e.month - 1, e.endDay ?? e.day);
  const year = lastDay < today ? now.getFullYear() + 1 : now.getFullYear();
  return new Date(year, e.month - 1, e.day);
};

export const upcomingEvents = (now = new Date()) =>
  events
    .map((e) => ({ ...e, date: nextOccurrence(e, now) }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

export const notices = () => [
  `Admissions open for session ${admissionSession()} · Playgroup to Grade 8`,
  'Foreign Language Program and AI & Programming Lab now part of the Middle Stage',
  'Campus visits every Monday – Saturday, 9:00 AM – 5:00 PM',
  'Take the virtual campus tour from the home page',
  'Teaching positions open — apply through the Careers page',
];

export const careerReasons = [
  { title: 'Professional Growth', description: 'Regular training programs and workshops for continuous professional development. Stay ahead with modern teaching methodologies.' },
  { title: 'Work Culture', description: 'Join a collaborative environment that fosters innovation, creativity, and personal growth. Be part of a supportive community.' },
  { title: 'Benefits', description: 'Enjoy competitive compensation, and opportunities for career advancement in a growing institution.' },
];
