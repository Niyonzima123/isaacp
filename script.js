// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Active nav link highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage ||
       (currentPage === 'index.html' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Responsive mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('#mainNav ul');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      menuToggle.classList.toggle('open');
    });
  }

  // Close mobile menu after clicking a link
  document.querySelectorAll('#mainNav ul li a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        menuToggle.classList.remove('open');
      }
    });
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// Animate elements on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const animate = entry.target.getAttribute('data-animate');
      if (animate) entry.target.style.animation = `${animate} 0.8s forwards`;
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// Handle resize events (optional)
window.addEventListener('resize', () => {
  const navMenu = document.querySelector('#mainNav ul');
  if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('show')) {
    navMenu.classList.remove('show');
  }
});
