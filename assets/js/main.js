// SocialCloud Management - Main JavaScript

// Talent data (from the existing project)
const talents = [
  {
    id: "1",
    name: "Packgod",
    slug: "packgod",
    bio: "Master of Discord roasting and rapid-fire comedy content.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    platforms: [
      { platform: "YouTube", followers: 3910000 },
      { platform: "TikTok", followers: 2500000 },
      { platform: "Instagram", followers: 890000 }
    ],
    categories: ["Comedy", "Gaming", "Entertainment"],
    totalFollowers: 7300000,
    avgEngagement: 12.5,
    featured: true
  },
  {
    id: "2",
    name: "Deji",
    slug: "deji",
    bio: "Multi-platform entertainment powerhouse and professional boxer.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    platforms: [
      { platform: "YouTube", followers: 10600000 },
      { platform: "Instagram", followers: 4200000 },
      { platform: "Twitter", followers: 3800000 }
    ],
    categories: ["Gaming", "Sports", "Entertainment"],
    totalFollowers: 18600000,
    avgEngagement: 8.2,
    featured: true
  },
  {
    id: "3",
    name: "SkeeterJean",
    slug: "skeeterjean",
    bio: "Rising gaming content creator specializing in competitive gaming.",
    image: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    platforms: [
      { platform: "Twitch", followers: 285000 },
      { platform: "YouTube", followers: 420000 },
      { platform: "TikTok", followers: 180000 }
    ],
    categories: ["Gaming", "Streaming"],
    totalFollowers: 885000,
    avgEngagement: 15.3,
    featured: true
  }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initParticles();
  renderTalentGrid();
  initSmoothScroll();
  initHeaderScroll();
  initAnimations();
});

// Initialize particle background
function initParticles() {
  const particlesContainer = document.getElementById('particles-container');
  if (!particlesContainer) return;
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Render talent grid
function renderTalentGrid() {
  const talentGrid = document.getElementById('talent-grid');
  if (!talentGrid) return;
  
  const featuredTalents = talents.filter(t => t.featured).slice(0, 3);
  
  featuredTalents.forEach(talent => {
    const card = createTalentCard(talent);
    talentGrid.appendChild(card);
  });
}

// Create talent card
function createTalentCard(talent) {
  const card = document.createElement('div');
  card.className = 'card card-glow';
  card.style.cursor = 'pointer';
  card.style.position = 'relative';
  card.style.overflow = 'hidden';
  
  // Format followers count
  const formatFollowers = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };
  
  card.innerHTML = `
    <div style="position: relative;">
      <img src="${talent.image}" alt="${talent.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: var(--spacing-4);">
      <div style="position: absolute; top: var(--spacing-4); right: var(--spacing-4); background: var(--color-bg-primary); padding: var(--spacing-2) var(--spacing-3); border-radius: var(--radius-full); font-size: var(--text-sm); font-weight: 600;">
        ${talent.avgEngagement}% Engagement
      </div>
    </div>
    <h3 class="mb-2">${talent.name}</h3>
    <p style="font-size: var(--text-sm); margin-bottom: var(--spacing-4);">${talent.bio}</p>
    <div class="flex gap-2 mb-4">
      ${talent.categories.map(cat => `<span style="background: var(--color-bg-accent); padding: var(--spacing-1) var(--spacing-3); border-radius: var(--radius-full); font-size: var(--text-xs);">${cat}</span>`).join('')}
    </div>
    <div style="border-top: 1px solid var(--color-bg-accent); padding-top: var(--spacing-4);">
      <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--spacing-2);">Total Reach</p>
      <p style="font-size: var(--text-2xl); font-weight: 700; color: var(--color-brand-primary);">${formatFollowers(talent.totalFollowers)}</p>
    </div>
    <a href="talent-profile.html?id=${talent.slug}" class="btn btn-gradient" style="width: 100%; margin-top: var(--spacing-4);">View Profile</a>
  `;
  
  // Add hover effect
  card.addEventListener('mouseenter', function() {
    const img = card.querySelector('img');
    img.style.transform = 'scale(1.05)';
    img.style.transition = 'transform 0.3s ease';
  });
  
  card.addEventListener('mouseleave', function() {
    const img = card.querySelector('img');
    img.style.transform = 'scale(1)';
  });
  
  return card;
}

// Smooth scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.style.background = 'rgba(10, 10, 10, 0.95)';
      header.style.backdropFilter = 'blur(20px)';
      header.style.boxShadow = 'var(--shadow-lg)';
    } else {
      header.style.background = 'rgba(26, 26, 26, 0.8)';
      header.style.backdropFilter = 'blur(10px)';
      header.style.boxShadow = 'none';
    }
    
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