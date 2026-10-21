// Real school photography, curated from the school's Instagram / Facebook pages
// and stored in /public/images/campus/. Any slot left undefined falls back to
// the illustrated artwork, so photos can be added one at a time.
//
// To add a photo: put the file in public/images/campus/ (JPG/WebP, ~1800px on
// the long edge) and reference it below.

export interface Photo {
  src: string;
  alt: string;
  /** Gallery filter group, e.g. 'Campus', 'Events', 'Sports' */
  category?: string;
  /** Focal point for object-position, e.g. '50% 30%' */
  focus?: string;
  source?: 'Instagram' | 'Facebook' | 'Drive';
}

type FacilityKey = 'sports' | 'academic' | 'arts' | 'life';

export const photos: {
  /** Full-bleed home hero, ideally the school building at golden hour */
  hero?: Photo;
  /** Portrait-friendly shot of the building for the arched frame on the home page */
  building?: Photo;
  /** Backdrop for inner-page banners */
  banner?: Photo;
  facilities: Partial<Record<FacilityKey, Photo>>;
  /** Shown in the gallery ahead of any Google Drive images */
  gallery: Photo[];
} = {
  facilities: {},
  gallery: [],
};

export const hasRealGallery = photos.gallery.length > 0;
