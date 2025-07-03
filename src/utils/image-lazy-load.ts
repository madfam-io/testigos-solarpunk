/**
 * Lazy loading utilities for optimizing image performance
 */

export function setupLazyLoading(): void {
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    const images = document.querySelectorAll('img[data-lazy]');
    images.forEach((img) => {
      if (img instanceof HTMLImageElement) {
        img.loading = 'lazy';
        // Move data-src to src for native lazy loading
        const dataSrc = img.getAttribute('data-src');
        if (dataSrc !== null && dataSrc !== '') {
          img.src = dataSrc;
          img.removeAttribute('data-src');
        }
      }
    });
  } else {
    // Fallback to Intersection Observer
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.getAttribute('data-src');
            if (src !== null && src !== '') {
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.add('loaded');
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.01,
      }
    );

    const images = document.querySelectorAll('img[data-lazy]');
    images.forEach((img) => imageObserver.observe(img));
  }
}

export function addImageErrorHandling(): void {
  document.addEventListener(
    'error',
    (e) => {
      const { target } = e;
      if (
        target instanceof HTMLImageElement &&
        target.dataset.fallback !== undefined &&
        target.dataset.fallback !== ''
      ) {
        target.src = target.dataset.fallback;
        target.removeAttribute('data-fallback');
      }
    },
    true
  );
}
