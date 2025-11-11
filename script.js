// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // ===== Smooth Scrolling for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Navbar Active Link Highlight =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ===== Mobile Menu Toggle =====
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('#mainNav ul');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      menuToggle.classList.toggle('open');
    });
  }

  // ===== Close menu when a link is clicked =====
  document.querySelectorAll('#mainNav ul li a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        menuToggle.classList.remove('open');
      }
    });
  });

  // ===== Animate elements when they appear on scroll =====
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animation = entry.target.getAttribute('data-animate');
        entry.target.style.animation = `${animation} 0.8s ease forwards`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
});

// ===== Navbar Background Change on Scroll =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===== Resize Fix (for switching between mobile and desktop view) =====
window.addEventListener('resize', () => {
  const navMenu = document.querySelector('#mainNav ul');
  const menuToggle = document.querySelector('.menu-toggle');
  if (window.innerWidth > 768 && navMenu.classList.contains('show')) {
    navMenu.classList.remove('show');
    menuToggle.classList.remove('open');
  }
});
