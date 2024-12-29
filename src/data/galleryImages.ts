export interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
  description?: string;
}

export const galleryImages: GalleryImage[] = [
  // Campus Life
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    title: "Modern Campus Building",
    category: "Campus",
    description: "Our state-of-the-art campus facilities"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    title: "Library",
    category: "Campus",
    description: "Well-equipped library with vast collection of books"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1598812866501-87ad598839e7",
    title: "Sports Ground",
    category: "Campus",
    description: "Spacious sports ground for various activities"
  },

  // Academic Activities
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
    title: "Classroom Learning",
    category: "Academics",
    description: "Interactive classroom sessions"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    title: "Science Lab",
    category: "Academics",
    description: "Modern science laboratory"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1577896851231-70ef18881754",
    title: "Computer Lab",
    category: "Academics",
    description: "State-of-the-art computer facilities"
  },

  // Cultural Events
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    title: "Annual Day Celebration",
    category: "Events",
    description: "Cultural performances by students"
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
    title: "Dance Performance",
    category: "Events",
    description: "Students showcasing their talents"
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc",
    title: "Music Concert",
    category: "Events",
    description: "School music performances"
  },

  // Sports Activities
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e",
    title: "Sports Day",
    category: "Sports",
    description: "Annual sports meet"
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1515037893149-de7f840978e2",
    title: "Basketball Court",
    category: "Sports",
    description: "Professional basketball facilities"
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff",
    title: "Indoor Games",
    category: "Sports",
    description: "Various indoor sports facilities"
  },

  // Student Life
  {
    id: 13,
    url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45",
    title: "Student Activities",
    category: "Student Life",
    description: "Students engaged in various activities"
  },
  {
    id: 14,
    url: "https://images.unsplash.com/photo-1577896851231-70ef18881754",
    title: "Group Study",
    category: "Student Life",
    description: "Collaborative learning environment"
  },
  {
    id: 15,
    url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    title: "Library Study",
    category: "Student Life",
    description: "Students utilizing library resources"
  }
];
