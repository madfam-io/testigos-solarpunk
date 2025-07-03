/**
 * Accessibility utilities for improving user experience
 */

export function enhanceAccessibility(): void {
  // Add skip navigation link
  const skipLink = document.getElementById('skip-to-content');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const main = document.querySelector('main');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus();
        main.removeAttribute('tabindex');
      }
    });
  }

  // Enhance focus visibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  // Add live region for dynamic content
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only';
  liveRegion.id = 'live-region';
  document.body.appendChild(liveRegion);
}

export function announceToScreenReader(message: string): void {
  const liveRegion = document.getElementById('live-region');
  if (liveRegion) {
    liveRegion.textContent = message;
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
}

export function ensureImageAlts(): void {
  const images = document.querySelectorAll('img:not([alt])');
  images.forEach((img) => {
    if (img instanceof HTMLImageElement) {
      // Add empty alt for decorative images
      if (
        img.classList.contains('decorative') ||
        img.dataset.decorative !== undefined
      ) {
        img.setAttribute('alt', '');
      } else {
        // For content images, use filename as fallback
        const filename = img.src.split('/').pop()?.split('.')[0] ?? 'image';
        img.setAttribute('alt', filename.replace(/[-_]/g, ' '));
      }
    }
  });
}

export function improveFormAccessibility(): void {
  // Ensure all form inputs have labels
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach((input) => {
    const id =
      input.id !== ''
        ? input.id
        : `input-${Math.random().toString(36).substr(2, 9)}`;
    if (input.id === '') input.id = id;

    // Check if label exists
    const label = document.querySelector(`label[for="${id}"]`);
    if (label === null && input.getAttribute('aria-label') === null) {
      // Try to find label by proximity
      const parentLabel = input.closest('label');
      if (parentLabel === null) {
        // Add aria-label based on placeholder or name
        const placeholder = input.getAttribute('placeholder');
        const name = input.getAttribute('name');
        const ariaLabel =
          placeholder !== null && placeholder !== ''
            ? placeholder
            : name !== null && name !== ''
              ? name
              : 'Input field';
        input.setAttribute('aria-label', ariaLabel);
      }
    }
  });
}
