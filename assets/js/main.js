// SocialCloud Management - Main JavaScript

// State variable for talents
let talents = [];

// Load talents data
function loadTalentsData(callback) {
    // Create script element to load talents data
    const script = document.createElement('script');
    script.src = '/assets/js/talents-data.js';
    document.head.appendChild(script);

    script.onload = function() {
        // Use official talents
        talents = window.officialTalents || [];
        if (callback) callback();
    };
}

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;

            // Performance metrics tracked for optimization

            // Track largest contentful paint
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    // LCP tracking for performance optimization
                });
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    trackPerformance();
    loadTalentsData(function() {
        // Initialize all components after talents data is loaded
        initializeHero();
        renderFeaturedTalents();
        renderStatistics();
        initAnimations();
        initHeaderScroll();
        initSmoothScroll();
    });
});

// Initialize hero section - removed particles for professional clean look
function initializeHero() {
    // Clean, professional hero without distracting animations
    // Hero section initialized with professional clean design
}

// Render featured talents on homepage
function renderFeaturedTalents() {
    const talentGrid = document.getElementById('talent-grid');
    if (!talentGrid) return;

    // Show all 10 talents from the official list
    const featuredTalents = talents.slice(0, 10);

    talentGrid.innerHTML = '';

    featuredTalents.forEach(talent => {
        const card = createTalentCard(talent);
        talentGrid.appendChild(card);
    });
}

// Create talent card
function createTalentCard(talent) {
    const card = document.createElement('div');
    card.className = 'card card-glow';

    const formatFollowers = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
        return num.toString();
    };

    // Create optimized image with WebP support
    const createOptimizedImage = (imageSrc, altText) => {
        const webpSrc = imageSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        return `
      <picture>
        <source srcset="${webpSrc}" type="image/webp">
        <img src="${imageSrc}" alt="${altText}" loading="lazy"
             style="width: 100%; height: 400px; object-fit: cover; border-radius: var(--radius-lg);"
             onerror="this.src='/assets/images/talents/placeholder-default.svg'; this.onerror=null;">
      </picture>
    `;
    };

    card.innerHTML = `
    <div style="position: relative; overflow: hidden; border-radius: var(--radius-lg); height: 400px;">
      ${createOptimizedImage(talent.image, `Headshot of ${talent.name}, ${talent.categories.join(' and ')} creator`)}
      <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.9)); padding: var(--spacing-5); color: white; min-height: 80px; display: flex; flex-direction: column; justify-content: flex-end;">
        <h3 style="margin: 0 0 var(--spacing-2) 0; font-size: var(--text-xl); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; line-height: 1.2;">${talent.name}</h3>
        <p style="margin: 0; font-size: var(--text-sm); opacity: 0.9; line-height: 1.3; height: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${talent.categories.join(' • ')}</p>
      </div>
    </div>
  `;

  return card;
}

// Render platform statistics
function renderStatistics() {
  const statsGrid = document.getElementById('stats-grid');
  if (!statsGrid) return;

  // Calculate total stats from official talents
  const totalFollowers = talents.reduce((sum, talent) => sum + talent.totalFollowers, 0);
  const avgEngagement = (talents.reduce((sum, talent) => sum + talent.avgEngagement, 0) / talents.length).toFixed(1);

  const stats = [
    { value: `${(totalFollowers / 1000000).toFixed(1)}M+`, label: 'Total Reach' },
    { value: talents.length, label: 'Managed Talents' },
    { value: `${avgEngagement}%`, label: 'Avg. Engagement' },
    { value: '95%', label: 'Client Satisfaction' }
  ];

  statsGrid.innerHTML = '';

  stats.forEach(stat => {
    const statCard = document.createElement('div');
    statCard.className = 'text-center';
    statCard.innerHTML = `
      <h3 class="gradient-text mb-2" style="font-size: var(--text-4xl);">${stat.value}</h3>
      <p style="color: var(--color-text-secondary);">${stat.label}</p>
    `;
    statsGrid.appendChild(statCard);
  });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Header scroll effect and active section highlighting
function initHeaderScroll() {
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Header background effect
    if (currentScroll > 50) {
      header.style.background = 'rgba(10, 10, 10, 0.95)';
      header.style.backdropFilter = 'blur(20px)';
      header.style.boxShadow = 'var(--shadow-lg)';
    } else {
      header.style.background = 'rgba(26, 26, 26, 0.8)';
      header.style.backdropFilter = 'blur(10px)';
      header.style.boxShadow = 'none';
    }

    // Active section highlighting
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    lastScroll = currentScroll;
  });
}

// Initialize animations on scroll
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeIn');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  document.querySelectorAll('.card, .section > .container > *').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// Utility function for number formatting
function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuBtn = document.querySelector('.mobile-menu-btn');

  if (mobileMenu) {
    mobileMenu.classList.toggle('active');

    // Update button icon
    if (mobileMenu.classList.contains('active')) {
      menuBtn.innerHTML = '✕';
    } else {
      menuBtn.innerHTML = '☰';
    }
  }
}

// Close mobile menu when clicking nav links
document.addEventListener('DOMContentLoaded', function() {
  const mobileNavLinks = document.querySelectorAll('.mobile-menu .nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      const mobileMenu = document.getElementById('mobile-menu');
      const menuBtn = document.querySelector('.mobile-menu-btn');
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        menuBtn.innerHTML = '☰';
      }
    });
  });
});

// Make toggleMobileMenu globally available
window.toggleMobileMenu = toggleMobileMenu;