// Per-page search metadata. Read by the <SEO> component at runtime and by
// scripts/postbuild-seo.js, which writes a real HTML file per route (so deep
// links return 200 with the right title on GitHub Pages) and the sitemap.

export const SITE_URL = 'https://www.gurukulamglobalschool.in';
export const OG_IMAGE = `${SITE_URL}/images/og-image.png`;

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  priority: number;
  changefreq: 'weekly' | 'monthly' | 'yearly';
}

export const routes: RouteMeta[] = [
  {
    path: '/',
    title: 'Gurukulam Global School, Mathura | Best School in Krishna Nagar – Admissions Open',
    description:
      'Gurukulam Global School, Krishna Nagar, Mathura: NEP 2020-aligned education from Playgroup to Grade 8 with smart classrooms, an AI & Programming Lab, foreign languages and strong Indian values. Admissions open.',
    priority: 1.0,
    changefreq: 'weekly',
  },
  {
    path: '/about',
    title: 'About Us – Vision, Values & Journey | Gurukulam Global School Mathura',
    description: 'Where tradition meets innovation: the vision, mission, six core values and journey of Gurukulam Global School, Mathura, since 2022.',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/academics',
    title: 'Academics – Nursery to Class 8 (NEP 2020) | Gurukulam Global School Mathura',
    description: 'Foundational, Preparatory and Middle stages at Gurukulam Global School, Mathura: play-based to subject-based learning, personalised and holistic, aligned with NEP 2020.',
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/academics/foundational-stage',
    title: 'Foundational Stage (Nursery – Class 2) | Gurukulam Global School Mathura',
    description: 'Play-based, activity-led learning for ages 3–8: foundational literacy, numeracy, language and social-emotional development at Gurukulam Global School, Mathura.',
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/academics/preparatory-stage',
    title: 'Preparatory Stage (Classes 3 – 5) | Gurukulam Global School Mathura',
    description: 'Interactive, project-based learning for ages 8–11 in English, Hindi, Mathematics, Science and Social Studies, plus sports, arts and life skills.',
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/academics/middle-stage',
    title: 'Middle Stage (Classes 6 – 8) | Gurukulam Global School Mathura',
    description: 'Subject specialisation, coding, foreign languages, research skills and leadership for ages 11–14 at Gurukulam Global School, Mathura.',
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/admissions',
    title: 'Admissions Open – Apply Online | Gurukulam Global School Mathura',
    description: 'Apply online to Gurukulam Global School, Mathura. Playgroup to Grade 8. Five-step admission process, documents required and quick enquiry form.',
    priority: 0.9,
    changefreq: 'weekly',
  },
  {
    path: '/campus-life',
    title: 'Campus Life & Facilities | Gurukulam Global School Mathura',
    description: 'Sports, science and computer labs, library, music, dance, art, yoga and student spaces. Take the virtual campus tour of Gurukulam Global School, Mathura.',
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/events',
    title: 'School Events & Calendar | Gurukulam Global School Mathura',
    description: 'Annual Sports Day, Science Exhibition, Cultural Festival, Parent-Teacher Meets and more at Gurukulam Global School, Mathura.',
    priority: 0.6,
    changefreq: 'weekly',
  },
  {
    path: '/gallery',
    title: 'Photo Gallery | Gurukulam Global School Mathura',
    description: 'Moments and memories from campus life, events and activities at Gurukulam Global School, Mathura.',
    priority: 0.6,
    changefreq: 'weekly',
  },
  {
    path: '/contact',
    title: 'Contact & Directions | Gurukulam Global School, Krishna Nagar, Mathura',
    description: '136, Madhuvan Enclave, Near Natraj Murti, Krishna Nagar, Mathura 281003. Call +91 7505335080 / +91 7617645050 or email gurukulamglobalschool@gmail.com.',
    priority: 0.8,
    changefreq: 'yearly',
  },
  {
    path: '/careers',
    title: 'Careers – Teaching Jobs in Mathura | Gurukulam Global School',
    description: 'Teaching, administrative and support staff positions at Gurukulam Global School, Mathura. Grow with a young, innovative school.',
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    path: '/prospectus',
    title: 'School Prospectus | Gurukulam Global School Mathura',
    description: 'Request the Gurukulam Global School prospectus: vision, academic stages, programs, facilities and the admission process.',
    priority: 0.5,
    changefreq: 'yearly',
  },
];

export const routeMeta = (path: string) => routes.find((r) => r.path === path.replace(/\/+$/, '') || (path === '/' && r.path === '/'));
