import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2, FiRefreshCw } from 'react-icons/fi';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import { useEscape, useScrollLock } from '../components/ui';
import { getImagesFromFolder } from '../services/googleDrive';
import { galleryImages } from '../data/galleryImages';
import { photos } from '../data/photos';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  description?: string;
  fullSizeUrl: string;
}

// The school's own photos (from Instagram / Facebook) come first.
const schoolImages: GalleryImage[] = photos.gallery.map((p, i) => ({
  id: `school-${i}`,
  url: p.src,
  fullSizeUrl: p.src,
  title: p.alt,
  category: p.category ?? 'Campus',
}));

// Generic placeholders, used only while the school has no photos of its own loaded.
const stockImages: GalleryImage[] = galleryImages.map((img) => ({
  id: String(img.id),
  url: `${img.url}?auto=format&fit=crop&w=800&q=70`,
  fullSizeUrl: `${img.url}?auto=format&fit=crop&w=1800&q=80`,
  title: img.title,
  category: img.category,
  description: img.description,
}));

const driveConfigured = Boolean(process.env.REACT_APP_GOOGLE_DRIVE_GALLERY_FOLDER_ID && process.env.REACT_APP_GOOGLE_API_KEY);

// Vary tile heights for a natural masonry rhythm.
const aspects = ['aspect-[4/5]', 'aspect-square', 'aspect-[4/3]', 'aspect-[3/4]', 'aspect-[5/4]'];

const Gallery: React.FC = () => {
  const [driveImages, setDriveImages] = useState<GalleryImage[]>([]);
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadDrive = useCallback(async (force = false) => {
    if (!driveConfigured) return;
    try {
      const drive = await getImagesFromFolder(process.env.REACT_APP_GOOGLE_DRIVE_GALLERY_FOLDER_ID as string, force);
      const mapped = drive
        .filter((img) => img.mimeType.startsWith('image/'))
        .map((img) => ({
          id: img.id,
          url: img.thumbnailLink,
          title: img.name.split('_').slice(1).join(' ').replace(/\.[^/.]+$/, '') || img.name,
          category: img.category || 'Campus',
          fullSizeUrl: img.webViewLink,
        }));
      setDriveImages(mapped);
    } catch (err) {
      console.error('Error fetching Drive gallery:', err);
    }
  }, []);

  useEffect(() => {
    loadDrive();
  }, [loadDrive]);

  const images = useMemo(() => {
    const real = [...schoolImages, ...driveImages];
    return real.length ? real : stockImages;
  }, [driveImages]);

  const categories = useMemo(() => ['All', ...Array.from(new Set(images.map((i) => i.category)))], [images]);
  const filtered = useMemo(() => (category === 'All' ? images : images.filter((i) => i.category === category)), [images, category]);

  const step = useCallback(
    (dir: 1 | -1) => setSelected((s) => (s === null ? s : (s + dir + filtered.length) % filtered.length)),
    [filtered.length]
  );

  useScrollLock(selected !== null);
  useEscape(selected !== null, () => setSelected(null));
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, step]);

  const current = selected !== null ? filtered[selected] : null;

  return (
    <>
      <SEO title="Gallery" description="Moments and memories from life at Gurukulam Global School, Mathura." />
      <PageHero
        eyebrow="Our Gallery"
        title={
          <>
            Moments &amp; <em className="gold-text">memories</em>
          </>
        }
        lede="Capturing moments and memories from our vibrant school life."
        crumbs={[{ name: 'Gallery' }]}
      />

      <section className="grain min-h-[60vh] bg-ivory py-16 sm:py-24">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="no-scrollbar -mx-5 flex max-w-full gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
              {categories.map((c) => {
                const count = c === 'All' ? images.length : images.filter((i) => i.category === c).length;
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`relative flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                      category === c ? 'text-ivory' : 'bg-white text-ink-700 ring-1 ring-ink-900/10 hover:ring-gold-500'
                    }`}
                  >
                    {category === c && <motion.span layoutId="gallery-filter" className="absolute inset-0 rounded-full bg-ink-900" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                    <span className="relative">{c}</span>
                    <span className={`relative text-xs ${category === c ? 'text-gold-300' : 'text-ink-400'}`}>{count}</span>
                  </button>
                );
              })}
            </div>
            {driveConfigured && (
              <button
                onClick={async () => {
                  setRefreshing(true);
                  await loadDrive(true);
                  setRefreshing(false);
                }}
                disabled={refreshing}
                className="btn-outline flex-none"
              >
                <FiRefreshCw className={refreshing ? 'animate-spin' : ''} /> {refreshing ? 'Refreshing…' : 'Refresh Gallery'}
              </button>
            )}
          </div>

          <motion.div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
            <AnimatePresence initial={false}>
              {filtered.map((img, i) => (
                <motion.button
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
                  onClick={() => setSelected(i)}
                  className={`group relative mb-5 block w-full overflow-hidden rounded-2xl bg-ink-100 ${aspects[i % aspects.length]}`}
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-[1.2s] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent opacity-80 transition group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-left">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-300">{img.category}</span>
                      <h3 className="mt-1 font-display text-xl text-ivory">{img.title}</h3>
                    </div>
                    <span className="grid h-9 w-9 flex-none translate-y-2 place-items-center rounded-full bg-ivory/90 text-ink-900 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                      <FiMaximize2 size={14} />
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[150] flex flex-col bg-ink-950/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <div className="flex items-center justify-between p-5 text-ivory/70">
              <span className="text-sm tabular-nums">
                {(selected ?? 0) + 1} / {filtered.length}
              </span>
              <button className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-gold-300 hover:text-ink-950" aria-label="Close">
                <FiX size={20} />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-20" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.fullSizeUrl}
                  alt={current.title}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) step(1);
                    if (info.offset.x > 60) step(-1);
                  }}
                  onError={(e) => {
                    const t = e.currentTarget;
                    if (t.src !== current.url) t.src = current.url;
                  }}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-[72vh] max-w-full cursor-grab rounded-xl object-contain shadow-lift active:cursor-grabbing"
                />
              </AnimatePresence>
              <button onClick={() => step(-1)} className="absolute left-4 hidden h-12 w-12 place-items-center rounded-full bg-white/10 text-ivory transition hover:bg-gold-300 hover:text-ink-950 sm:grid" aria-label="Previous image">
                <FiChevronLeft size={22} />
              </button>
              <button onClick={() => step(1)} className="absolute right-4 hidden h-12 w-12 place-items-center rounded-full bg-white/10 text-ivory transition hover:bg-gold-300 hover:text-ink-950 sm:grid" aria-label="Next image">
                <FiChevronRight size={22} />
              </button>
            </div>
            <div className="pb-8 text-center" onClick={(e) => e.stopPropagation()}>
              <h2 className="font-display text-2xl text-ivory">{current.title}</h2>
              {current.description && <p className="mt-1 text-sm text-ivory/60">{current.description}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
