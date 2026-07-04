document.addEventListener('DOMContentLoaded', () => {
  // --- Museum Artifact Master Data Matrix ---
  const galleryCatalog = [
    { src: 'assets/artwork/grandparents.jpeg', title: "Grandparents' Anniversary", medium: "Graphite on Paper — 2019" },
    { src: 'assets/artwork/che.jpeg', title: "Che", medium: "Graphite on Paper — 2018" },
    { src: 'assets/artwork/eye.jpeg', title: "Eye Study", medium: "Graphite & Charcoal on Paper — 2019" },
    { src: 'assets/artwork/mementomori.jpeg', title: "Memento Mori", medium: "Ink and Pencil — 2020" },
    { src: 'assets/artwork/alfysketch.jpeg', title: "Alfy Sketch", medium: "Graphite on Paper — 2017" },
    { src: 'assets/artwork/john.jpeg', title: "John", medium: "Graphite on Paper — 2018" },
    { src: 'assets/artwork/badboys.jpeg', title: "Bad Boys", medium: "Colored Pencil and Ink — 2019" },
    { src: 'assets/friends/elizabeth.jpg', title: "Cherished Companion", medium: "Exhibition Archive — Friends" },
    { src: 'assets/friends/group1.jpeg', title: "Shared Dynamics", medium: "Exhibition Archive — Friends" },
    { src: 'assets/friends/group2.jpeg', title: "Travel Memoirs", medium: "Exhibition Archive — Friends" },
    { src: 'assets/family/family-portrait.jpeg', title: "The Family Anchor", medium: "Exhibition Archive — Family" },
    { src: 'assets/family/home1.jpeg', title: "Roots and Growth", medium: "Exhibition Archive — Family" }
  ];

  let activeIndex = 0;

  // --- Lightbox DOM Targets ---
  const lightbox = document.getElementById('museum-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxMedium = document.getElementById('lightbox-medium');
  const lightboxCounter = document.getElementById('lightbox-counter');
  
  const btnClose = document.getElementById('lightbox-close');
  const btnPrev = document.getElementById('lightbox-prev');
  const btnNext = document.getElementById('lightbox-next');

  if (!lightbox) return;

  // --- Lightbox Core Logic ---
  function openLightbox(index) {
    activeIndex = parseInt(index, 10);
    lightbox.classList.remove('hidden');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Transition In Sequence
    setTimeout(() => {
      lightbox.classList.remove('opacity-0');
      lightbox.classList.add('opacity-100');
      renderExhibitionPiece();
    }, 50);
  }

  function closeLightbox() {
    lightbox.classList.remove('opacity-100');
    lightbox.classList.add('opacity-0');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      lightbox.classList.add('hidden');
      if (lightboxImg) lightboxImg.src = '';
    }, 300);
  }

  function renderExhibitionPiece() {
    const item = galleryCatalog[activeIndex];
    if (!item) return;

    // Smoothly fade contents down before changing sources
    lightboxImg.classList.add('opacity-0');
    lightboxTitle.classList.add('opacity-0');
    lightboxMedium.classList.add('opacity-0');

    setTimeout(() => {
      lightboxImg.src = item.src;
      lightboxTitle.textContent = item.title;
      lightboxMedium.textContent = item.medium;
      lightboxCounter.textContent = `${activeIndex + 1} / ${galleryCatalog.length}`;

      lightboxImg.onload = () => {
        lightboxImg.classList.remove('opacity-0');
        lightboxImg.classList.add('opacity-100');
      };
      lightboxTitle.classList.remove('opacity-0');
      lightboxTitle.classList.add('opacity-100');
      lightboxMedium.classList.remove('opacity-0');
      lightboxMedium.classList.add('opacity-100');
    }, 200);
  }

  function navigateNext() {
    activeIndex = (activeIndex + 1) % galleryCatalog.length;
    renderExhibitionPiece();
  }

  function navigatePrev() {
    activeIndex = (activeIndex - 1 + galleryCatalog.length) % galleryCatalog.length;
    renderExhibitionPiece();
  }

  // --- Event Attachments ---
  document.querySelectorAll('.shadow-link-element').forEach(element => {
    element.addEventListener('click', () => {
      const index = element.getAttribute('data-index');
      if (index !== null) openLightbox(index);
    });
  });

  if (btnClose) btnClose.addEventListener('click', closeLightbox);
  if (btnNext) btnNext.addEventListener('click', navigateNext);
  if (btnPrev) btnPrev.addEventListener('click', navigatePrev);

  // Keyboard navigation map
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateNext();
    if (e.key === 'ArrowLeft') navigatePrev();
  });
});