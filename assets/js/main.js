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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
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

// Initialize hero section with animated particles
function initializeHero() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Create particles
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
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
  
  card.innerHTML = `
    <img src="${talent.image}" alt="Headshot of ${talent.name}, ${talent.categories.join(' and ')} creator" loading="lazy" style="width: 100%; height: 250px; object-fit: cover; border-radius: var(--radius-lg);">
    <div class="card__body">
      <h3 class="mb-2">${talent.name}</h3>
      <p style="font-size: var(--text-sm); margin-bottom: var(--spacing-3); color: var(--color-text-secondary);">${talent.bio}</p>
      <div class="flex gap-2 mb-4" style="flex-wrap: wrap;">
        ${talent.categories.map(cat => `<span style="background: var(--color-bg-accent); padding: var(--spacing-1) var(--spacing-2); border-radius: var(--radius-full); font-size: var(--text-xs);">${cat}</span>`).join('')}
      </div>
      <div class="flex justify-between items-center">
        <span style="font-size: var(--text-sm); color: var(--color-text-muted);">${formatFollowers(talent.totalFollowers)} followers</span>
        <span style="font-size: var(--text-sm); color: var(--color-brand-primary);">${talent.avgEngagement}% engagement</span>
      </div>
    </div>
    <div class="card__footer">
      <a href="talent-profile.html?id=${talent.slug}" class="btn btn-secondary">View Profile</a>
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

// Mobile menu toggle (for future implementation)
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('active');
  }
}