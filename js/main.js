document.addEventListener('DOMContentLoaded', () => {
  const text1 = document.getElementById('intro-text-1');
  const text2 = document.getElementById('intro-text-2');
  const text3 = document.getElementById('intro-text-3');
  const overlay = document.getElementById('intro-overlay');
  const mainContent = document.getElementById('main-content');
  const heroLeft = document.getElementById('hero-left');
  const heroRight = document.getElementById('hero-right');
  const scrollIndicator = document.getElementById('scroll-indicator');
  const bioImg = document.getElementById('bio-portrait-img');
  const fallback = document.getElementById('bio-portrait-fallback');

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const lockBodyScroll = () => {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflowY = 'hidden';
  };

  const restoreBodyScroll = () => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflowY = 'auto';
  };

  // --- Safe Image Fallback Engine ---
  if (bioImg) {
    if (bioImg.complete && bioImg.naturalWidth === 0) {
      handleImageError();
    } else if (bioImg.complete && bioImg.naturalWidth > 0) {
      handleImageLoad();
    } else {
      bioImg.addEventListener('error', handleImageError);
      bioImg.addEventListener('load', handleImageLoad);
    }
  }

  function handleImageError() {
    if (bioImg) bioImg.style.display = 'none';
    if (fallback) fallback.classList.remove('hidden');
  }

  function handleImageLoad() {
    if (fallback) fallback.classList.add('hidden');
  }

  // --- Cinematic Introduction Sequencing ---
  async function runIntro() {
    lockBodyScroll();

    try {
      await wait(800);
      text1.classList.remove('opacity-0');
      text1.classList.add('opacity-100');

      await wait(2500);
      text1.classList.remove('opacity-100');
      text1.classList.add('opacity-0');

      await wait(1500);
      text1.classList.add('hidden');
      text2.classList.remove('hidden');
      await wait(50);
      text2.classList.remove('opacity-0');
      text2.classList.add('opacity-100');

      await wait(2500);
      text2.classList.remove('opacity-100');
      text2.classList.add('opacity-0');

      await wait(1500);
      text2.classList.add('hidden');
      text3.classList.remove('hidden');
      await wait(50);
      text3.classList.remove('opacity-0');
      text3.classList.add('opacity-100');

      await wait(2500);
      text3.classList.remove('opacity-100');
      text3.classList.add('opacity-0');

      await wait(1500);
      overlay.classList.add('opacity-0');
      restoreBodyScroll();

      mainContent.classList.remove('opacity-0');
      mainContent.classList.add('opacity-100');

      await wait(500);
      if (heroLeft) {
        heroLeft.classList.remove('opacity-0', 'translate-y-8');
        heroLeft.classList.add('opacity-100', 'translate-y-0');
      }

      const heroImageContainer = document.getElementById('hero-image-container');
      const heroImg = document.getElementById('hero-img');
      if (heroImageContainer && heroImg) {
        heroImageContainer.classList.remove('opacity-0');
        heroImageContainer.classList.add('opacity-100');
        heroImg.classList.add('animate-cinematic-zoom');
      }

      if (heroRight) {
        heroRight.classList.remove('opacity-0', 'translate-y-8');
        heroRight.classList.add('opacity-100', 'translate-y-0');
      }

      if (scrollIndicator) {
        scrollIndicator.classList.remove('opacity-0');
        scrollIndicator.classList.add('opacity-100');
      }

      await wait(1000);
      overlay.remove();

      initScrollAnimations();
    } catch (error) {
      console.error('Intro sequence failed:', error);
      restoreBodyScroll();
    }
  }

  // --- Smooth Scroll Reveal Intersections ---
  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-12', 'translate-y-8');
          entry.target.classList.add('opacity-100', 'translate-y-0');

          if (entry.target.id === 'bio-portrait-container' && bioImg) {
            bioImg.classList.remove('scale-100');
            bioImg.classList.add('scale-[1.03]');
          }

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-el').forEach((el) => observer.observe(el));
  }

  runIntro();
});