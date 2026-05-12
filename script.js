const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const cursorGlow = document.querySelector('.cursor-glow');
const preloader = document.querySelector('.preloader');

window.addEventListener('load', () => {
  preloader?.classList.add('is-hidden');
});

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.classList.toggle('is-open');
  mobileMenu?.classList.toggle('is-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('mousemove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.transform = `translate3d(${event.clientX - 80}px, ${event.clientY - 80}px, 0)`;
});

const initGsap = () => {
  if (!window.gsap) return;

  const { gsap } = window;
  gsap.registerPlugin(window.ScrollTrigger);

  gsap.from('.reveal-text', {
    y: 34,
    opacity: 0,
    filter: 'blur(12px)',
    duration: 1.25,
    stagger: 0.14,
    ease: 'power4.out',
    delay: 0.35,
  });

  gsap.to('.hero-image', {
    xPercent: 2.6,
    yPercent: 1.8,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.utils.toArray('.section-reveal').forEach((section) => {
    gsap.from(section.children, {
      y: 42,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1.05,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
      },
    });
  });

  gsap.utils.toArray('.product-card, .feature-card').forEach((card) => {
    gsap.from(card, {
      y: 36,
      opacity: 0,
      duration: 0.95,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
      },
    });
  });

  document.querySelectorAll('.magnetic').forEach((item) => {
    item.addEventListener('mousemove', (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(item, { x: x * 0.18, y: y * 0.18, duration: 0.35, ease: 'power3.out' });
    });

    item.addEventListener('mouseleave', () => {
      gsap.to(item, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.35)' });
    });
  });

  document.querySelector('.hero')?.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 16;
    const y = (event.clientY / window.innerHeight - 0.5) * 12;
    gsap.to('.ambient-one', { x, y, duration: 1.2, ease: 'power3.out' });
    gsap.to('.ambient-two', { x: -x * 0.7, y: -y * 0.7, duration: 1.2, ease: 'power3.out' });
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGsap);
} else {
  initGsap();
}
