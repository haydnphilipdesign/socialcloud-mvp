// Talent Profile Page JavaScript

// Extended talent data
const talentsData = {
  "packgod": {
    id: "1",
    name: "Packgod",
    slug: "packgod",
    bio: "Master of Discord roasting and rapid-fire comedy content. Known for legendary roast battles and viral TikTok moments that have captivated millions across platforms.",
    image: "/assets/images/talents/packgod.webp",
    bannerImage: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1600&h=600&fit=crop&auto=format&q=80",
    platforms: [
      { platform: "YouTube", handle: "@PACKGOD", followers: 3910000, verified: true, url: "https://youtube.com/@PACKGOD" },
      { platform: "TikTok", handle: "@packgod", followers: 2500000, verified: true },
      { platform: "Instagram", handle: "@packgod", followers: 890000, verified: false }
    ],
    categories: ["Comedy", "Gaming", "Entertainment"],
    achievements: [
      "3.9M+ YouTube subscribers",
      "Viral roast compilations with 10M+ views",
      "Featured in major Discord communities",
      "Collaborated with top gaming creators"
    ],
    stats: {
      totalFollowers: 7300000,
      avgEngagement: 12.5,
      campaignsCompleted: 15
    }
  },
  "deji": {
    id: "2",
    name: "Deji",
    slug: "deji",
    bio: "Multi-platform entertainment powerhouse and professional boxer. KSI's brother with a massive following across YouTube, known for gaming content and boxing matches.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    bannerImage: "https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=1600&h=600&fit=crop&auto=format&q=80",
    platforms: [
      { platform: "YouTube", handle: "@Deji", followers: 10600000, verified: true, url: "https://youtube.com/@Deji" },
      { platform: "Instagram", handle: "@dej", followers: 4200000, verified: true },
      { platform: "Twitter", handle: "@Deji", followers: 3800000, verified: true }
    ],
    categories: ["Gaming", "Sports", "Entertainment"],
    achievements: [
      "10.6M+ YouTube subscribers",
      "Professional boxing career",
      "Multiple viral gaming videos",
      "Collaborations with major YouTubers"
    ],
    stats: {
      totalFollowers: 18600000,
      avgEngagement: 8.2,
      campaignsCompleted: 28
    }
  },
  "skeeterjean": {
    id: "3",
    name: "SkeeterJean",
    slug: "skeeterjean",
    bio: "Rising gaming content creator specializing in competitive gaming and streaming. Building a dedicated community through consistent, high-quality content.",
    image: "/assets/images/talents/skeeterjean.webp",
    bannerImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&h=600&fit=crop&auto=format&q=80",
    platforms: [
      { platform: "Twitch", handle: "skeeterjean", followers: 285000, verified: false },
      { platform: "YouTube", handle: "@SkeeterJean", followers: 420000, verified: false },
      { platform: "TikTok", handle: "@skeeterjean", followers: 180000, verified: false }
    ],
    categories: ["Gaming", "Streaming"],
    achievements: [
      "Consistent top-tier gameplay content",
      "Growing streaming community",
      "Gaming tournament appearances",
      "Brand collaboration experience"
    ],
    stats: {
      totalFollowers: 885000,
      avgEngagement: 15.3,
      campaignsCompleted: 8
    }
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const talentId = urlParams.get('id') || 'skeeterjean';
  
  const talent = talentsData[talentId];
  if (talent) {
    loadTalentProfile(talent);
    loadRelatedTalents(talent);
  } else {
    // Redirect to talents page if talent not found
    window.location.href = 'talents.html';
  }
});

// Load talent profile data
function loadTalentProfile(talent) {
  // Update page title
  document.title = `${talent.name} | SocialCloud Management`;
  
  // Hero banner
  const heroBanner = document.getElementById('hero-banner');
  heroBanner.style.background = `url('${talent.bannerImage}') center/cover`;
  
  // Profile info
  document.getElementById('talent-avatar').src = talent.image;
  document.getElementById('talent-avatar').alt = talent.name;
  document.getElementById('talent-name').textContent = talent.name;
  document.getElementById('talent-bio').textContent = talent.bio;
  
  // Categories
  const categoriesContainer = document.getElementById('talent-categories');
  talent.categories.forEach(cat => {
    const tag = document.createElement('span');
    tag.style.cssText = 'background: var(--color-bg-accent); padding: var(--spacing-1) var(--spacing-3); border-radius: var(--radius-full); font-size: var(--text-sm);';
    tag.textContent = cat;
    categoriesContainer.appendChild(tag);
  });
  
  // Platforms
  const platformList = document.getElementById('platform-list');
  talent.platforms.forEach(platform => {
    const platformItem = document.createElement('div');
    platformItem.className = 'flex justify-between items-center glass-effect';
    platformItem.style.cssText = 'padding: var(--spacing-3); border-radius: var(--radius-md);';
    
    const platformIcon = getPlatformIcon(platform.platform);
    platformItem.innerHTML = `
      <div class="flex items-center gap-3">
        <span style="font-size: var(--text-xl);">${platformIcon}</span>
        <div>
          <p style="font-weight: 600;">${platform.platform}</p>
          <p style="font-size: var(--text-sm); color: var(--color-text-muted);">${platform.handle}</p>
        </div>
      </div>
      <div style="text-align: right;">
        <p style="font-weight: 700; color: var(--color-brand-primary);">${formatFollowers(platform.followers)}</p>
        <p style="font-size: var(--text-sm); color: var(--color-text-muted);">followers</p>
      </div>
    `;
    
    platformList.appendChild(platformItem);
  });
  
  // Stats
  document.getElementById('total-followers').textContent = formatFollowers(talent.stats.totalFollowers);
  document.getElementById('engagement-rate').textContent = talent.stats.avgEngagement + '%';
  document.getElementById('campaigns-count').textContent = talent.stats.campaignsCompleted;
  
  // Achievements
  const achievementsList = document.getElementById('achievements-list');
  talent.achievements.forEach(achievement => {
    const li = document.createElement('li');
    li.style.cssText = 'margin-bottom: var(--spacing-3); padding-left: var(--spacing-6); position: relative;';
    li.innerHTML = `<span style="position: absolute; left: 0; color: var(--color-brand-primary);">✓</span> ${achievement}`;
    achievementsList.appendChild(li);
  });
  
  // CTA buttons
  document.getElementById('talent-name-cta').textContent = talent.name;
  document.getElementById('modal-talent-name').textContent = talent.name;
}

// Load related talents
function loadRelatedTalents(currentTalent) {
  const relatedContainer = document.getElementById('related-talents');
  const allTalents = Object.values(talentsData);
  
  // Filter out current talent and get similar ones
  const relatedTalents = allTalents
    .filter(t => t.id !== currentTalent.id)
    .filter(t => t.categories.some(cat => currentTalent.categories.includes(cat)))
    .slice(0, 3);
  
  relatedTalents.forEach(talent => {
    const card = createRelatedTalentCard(talent);
    relatedContainer.appendChild(card);
  });
}

// Create related talent card
function createRelatedTalentCard(talent) {
  const card = document.createElement('div');
  card.className = 'card card-glow';
  card.style.cursor = 'pointer';
  
  card.innerHTML = `
    <img src="${talent.image}" alt="${talent.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: var(--spacing-4);">
    <h4 class="mb-2">${talent.name}</h4>
    <p style="font-size: var(--text-sm); margin-bottom: var(--spacing-4); color: var(--color-text-secondary);">${formatFollowers(talent.stats.totalFollowers)} followers</p>
    <a href="talent-profile.html?id=${talent.slug}" class="btn btn-secondary" style="width: 100%;">View Profile</a>
  `;
  
  return card;
}

// Utility functions
function formatFollowers(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
  return num.toString();
}

function getPlatformIcon(platform) {
  const icons = {
    'YouTube': '📺',
    'TikTok': '🎵',
    'Instagram': '📷',
    'Twitter': '🐦',
    'Twitch': '🎮',
    'Discord': '💬',
    'LinkedIn': '💼'
  };
  return icons[platform] || '🌐';
}

// Modal functions
function showContactForm() {
  const modal = document.getElementById('contact-modal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeContactForm() {
  const modal = document.getElementById('contact-modal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Download media kit (placeholder)
function downloadMediaKit() {
  alert('Media kit download will be available soon!');
  // In production, this would trigger a PDF download
}

// Filter content (placeholder)
function filterContent(type) {
  console.log('Filtering content by:', type);
  // In production, this would filter the content gallery
}