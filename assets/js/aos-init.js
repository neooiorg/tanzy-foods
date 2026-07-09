document.addEventListener("DOMContentLoaded", function() {
  // Add AOS attributes dynamically to avoid touching every HTML file manually
  const fadeUpElements = document.querySelectorAll('.product-card, .faq-item, .contact-card, .post-card, .shop-cta__content, .shop-cta__visual, .contact__panel, .hero__copy, .hero__button, .hero__trust, .about-hero__lead, .about-hero__actions, .about-story__text, .about-quote blockquote, .about-quote__by, .about-values__intro, .about-cta__text');
  fadeUpElements.forEach(el => {
    if (!el.hasAttribute('data-aos')) el.setAttribute('data-aos', 'fade-up');
  });

  const zoomInElements = document.querySelectorAll('.hero__visual img, .hero-pack--primary, .hero-pack--secondary, .products-ideas__image, .product-idea-card, .why__image img, .reviews__carousel, .about-story__media, .about-cta__media');
  zoomInElements.forEach(el => {
    if (!el.hasAttribute('data-aos')) el.setAttribute('data-aos', 'zoom-in');
  });

  const fadeRightElements = document.querySelectorAll('.hero__title-main, .hero__title-accent, .section-heading, .why__title, .about-hero__title');
  fadeRightElements.forEach(el => {
    if (!el.hasAttribute('data-aos')) el.setAttribute('data-aos', 'fade-right');
  });

  // Staggered elements
  const serviceItems = document.querySelectorAll('.service-strip__item, .usage-card, .why__item, .about-value, .about-flow__step');
  serviceItems.forEach((el, index) => {
    if (!el.hasAttribute('data-aos')) el.setAttribute('data-aos', 'fade-up');
    if (!el.hasAttribute('data-aos-delay')) el.setAttribute('data-aos-delay', ((index % 6) * 100).toString()); // Modulo 6 to reset delay for different rows
  });
  
  const heroHighlights = document.querySelectorAll('.hero__highlight');
  heroHighlights.forEach((el, index) => {
    if (!el.hasAttribute('data-aos')) el.setAttribute('data-aos', 'fade-up');
    if (!el.hasAttribute('data-aos-delay')) el.setAttribute('data-aos-delay', (index * 100).toString());
  });

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true, // whether animation should happen only once - while scrolling down
      offset: 50 // offset (in px) from the original trigger point
    });
  }
});
