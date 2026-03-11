/* ===================================
   DINUKA PHOTOGRAPHER – Script
   =================================== */

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close nav when link clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger?.classList.remove('active');
  });
});

// ---- SCROLL ANIMATIONS ----
const observerOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll('.pkg-card, .extra-card, .section-header').forEach(el => {
  observer.observe(el);
});

// ---- STAGGER CARDS IN SAME GRID ----
const gridObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.pkg-card, .extra-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, i * 100);
      });
      gridObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('.packages-grid, .extras-grid').forEach(grid => {
  gridObserver.observe(grid);
});

// ---- NAVBAR SCROLL STYLE ----
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 80) {
    navbar.style.background = 'rgba(7,6,4,0.96)';
    navbar.style.backdropFilter = 'blur(20px)';
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
  } else {
    navbar.style.background = '';
    navbar.style.backdropFilter = 'blur(4px)';
    navbar.style.boxShadow = '';
  }
  lastScroll = currentScroll;
}, { passive: true });

// ---- CONTACT FORM ----
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.form-btn');
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';

  setTimeout(() => {
    formSuccess.style.display = 'block';
    form.reset();
    btn.textContent = 'Send Inquiry ✉️';
    btn.style.opacity = '1';
    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);
  }, 1200);
});

// ---- SMOOTH ACTIVE SECTION HIGHLIGHT ----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--gold)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
