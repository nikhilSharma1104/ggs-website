// Performance monitoring and optimization utilities

// Define gtag type
declare global {
  interface Window {
    gtag: (
      command: 'event',
      action: string,
      params: {
        event_category: string;
        event_label: string;
        value: number;
        non_interaction: boolean;
      }
    ) => void;
  }
}

// Measure and report Core Web Vitals
export const reportWebVitals = (metric: {
  id: string;
  name: string;
  value: number;
}) => {
  const { id, name, value } = metric;
  
  // Log to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      non_interaction: true,
    });
  }
};

// Preload critical resources
export const preloadResources = () => {
  if (typeof window === 'undefined') return;

  const resources = [
    // Add your critical resources here
    { type: 'font', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
    // Add more critical resources as needed
  ];

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = resource.type;
    link.href = resource.href;
    if (resource.type === 'font') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
};

// Defer non-critical resources
export const deferNonCriticalResources = () => {
  if (typeof window === 'undefined') return;

  // Add script loading logic here
  const loadScript = (src: string) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
  };

  // Load non-critical scripts after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      // Add your non-critical scripts here
      // loadScript('path-to-script.js');
    }, 2000);
  });
};

// Cache management
export const setupCaching = () => {
  if (typeof window === 'undefined') return;
  
  if ('caches' in window) {
    // Cache static assets
    caches.open('static-assets-v1').then(cache => {
      return cache.addAll([
        '/static/images/',
        '/static/fonts/',
        // Add more static assets
      ]);
    });
  }
};

// Service Worker registration
export const registerServiceWorker = () => {
  if (typeof window === 'undefined') return;
  
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful');
        })
        .catch(err => {
          console.log('ServiceWorker registration failed:', err);
        });
    });
  }
};

// Initialize performance optimizations
export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;
  
  preloadResources();
  deferNonCriticalResources();
  setupCaching();
  registerServiceWorker();
};
