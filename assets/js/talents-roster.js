// Talents Roster Page JavaScript

// Complete talent data
const allTalents = [
  {
    id: "1",
    name: "Packgod",
    slug: "packgod",
    bio: "Master of Discord roasting and rapid-fire comedy content.",
    image: "/assets/images/talents/packgod.webp",
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
    image: "/assets/images/talents/skeeterjean.webp",
    platforms: [
      { platform: "Twitch", followers: 285000 },
      { platform: "YouTube", followers: 420000 },
      { platform: "TikTok", followers: 180000 }
    ],
    categories: ["Gaming", "Streaming"],
    totalFollowers: 885000,
    avgEngagement: 15.3,
    featured: false
  },
  {
    id: "4",
    name: "Omma",
    slug: "omma",
    bio: "Content creator known for Discord community engagement.",
    image: "/assets/images/talents/omma.webp",
    platforms: [
      { platform: "YouTube", followers: 150000 },
      { platform: "TikTok", followers: 95000 },
      { platform: "Discord", followers: 50000 }
    ],
    categories: ["Entertainment", "Gaming"],
    totalFollowers: 295000,
    avgEngagement: 18.7,
    featured: false
  },
  {
    id: "5",
    name: "ScamLikely",
    slug: "scamlikely",
    bio: "Innovative content creator with a unique brand.",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    platforms: [
      { platform: "TikTok", followers: 220000 },
      { platform: "YouTube", followers: 180000 },
      { platform: "Instagram", followers: 75000 }
    ],
    categories: ["Entertainment", "Comedy"],
    totalFollowers: 475000,
    avgEngagement: 14.2,
    featured: false
  },
  {
    id: "6",
    name: "MisterStrang3",
    slug: "misterstrang3",
    bio: "Gaming and lifestyle content creator with community focus.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    platforms: [
      { platform: "YouTube", followers: 95000 },
      { platform: "Twitch", followers: 45000 },
      { platform: "TikTok", followers: 60000 }
    ],
    categories: ["Gaming", "Lifestyle"],
    totalFollowers: 200000,
    avgEngagement: 16.8,
    featured: false
  },
  {
    id: "7",
    name: "Farzy",
    slug: "farzy",
    bio: "Entertainment content creator with engaging personality.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    platforms: [
      { platform: "TikTok", followers: 340000 },
      { platform: "Instagram", followers: 120000 },
      { platform: "YouTube", followers: 85000 }
    ],
    categories: ["Entertainment", "Lifestyle"],
    totalFollowers: 545000,
    avgEngagement: 13.9,
    featured: false
  },
  {
    id: "8",
    name: "Dankcube",
    slug: "dankcube",
    bio: "Gaming content creator with expertise in streaming.",
    image: "/assets/images/talents/dankcube.webp",
    platforms: [
      { platform: "Twitch", followers: 75000 },
      { platform: "YouTube", followers: 110000 },
      { platform: "TikTok", followers: 55000 }
    ],
    categories: ["Gaming", "Streaming"],
    totalFollowers: 240000,
    avgEngagement: 17.2,
    featured: false
  },
  {
    id: "9",
    name: "liamfp",
    slug: "liamfp",
    bio: "Creative content creator focusing on entertainment.",
    image: "/assets/images/talents/liamfp.webp",
    platforms: [
      { platform: "YouTube", followers: 125000 },
      { platform: "TikTok", followers: 190000 },
      { platform: "Instagram", followers: 85000 }
    ],
    categories: ["Entertainment", "Lifestyle"],
    totalFollowers: 400000,
    avgEngagement: 15.6,
    featured: false
  },
  {
    id: "10",
    name: "Jonathan Wright",
    slug: "jonathan-wright",
    bio: "Professional content creator and digital strategist.",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    platforms: [
      { platform: "YouTube", followers: 200000 },
      { platform: "LinkedIn", followers: 45000 },
      { platform: "Instagram", followers: 95000 }
    ],
    categories: ["Tech", "Education", "Lifestyle"],
    totalFollowers: 340000,
    avgEngagement: 11.4,
    featured: true
  }
];

// State
let filteredTalents = [...allTalents];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  renderTalents(allTalents);
  setupFollowerRangeSlider();
});

// Render talents grid
function renderTalents(talents) {
  const grid = document.getElementById('talents-grid');
  const noResults = document.getElementById('no-results');
  const talentCount = document.getElementById('talent-count');
  
  grid.innerHTML = '';
  
  if (talents.length === 0) {
    grid.style.display = 'none';
    noResults.style.display = 'block';
    talentCount.textContent = 'No talents found';
    return;
  }
  
  grid.style.display = 'grid';
  noResults.style.display = 'none';
  talentCount.textContent = `Showing ${talents.length} talent${talents.length !== 1 ? 's' : ''}`;
  
  talents.forEach(talent => {
    const card = createTalentCard(talent);
    grid.appendChild(card);
  });
}

// Create talent card
function createTalentCard(talent) {
  const card = document.createElement('div');
  card.className = 'card card-glow animate-fadeIn';
  card.style.cursor = 'pointer';
  
  const formatFollowers = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };
  
  // Get primary platform (one with most followers)
  const primaryPlatform = talent.platforms.reduce((prev, current) => 
    (prev.followers > current.followers) ? prev : current
  );
  
  card.innerHTML = `
    <div style="position: relative;">
      <img src="${talent.image}" alt="${talent.name}" style="width: 100%; height: 250px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: var(--spacing-4);">
      ${talent.featured ? '<div style="position: absolute; top: var(--spacing-3); left: var(--spacing-3); background: var(--color-brand-primary); color: white; padding: var(--spacing-1) var(--spacing-3); border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: 600;">Featured</div>' : ''}
      <div style="position: absolute; top: var(--spacing-3); right: var(--spacing-3); background: var(--color-bg-primary); padding: var(--spacing-2) var(--spacing-3); border-radius: var(--radius-full); font-size: var(--text-sm); font-weight: 600;">
        ${talent.avgEngagement}%
      </div>
    </div>
    <h3 class="mb-2">${talent.name}</h3>
    <p style="font-size: var(--text-sm); margin-bottom: var(--spacing-3); color: var(--color-text-secondary);">${talent.bio}</p>
    <div class="flex gap-2 mb-4" style="flex-wrap: wrap;">
      ${talent.categories.map(cat => `<span style="background: var(--color-bg-accent); padding: var(--spacing-1) var(--spacing-2); border-radius: var(--radius-full); font-size: var(--text-xs);">${cat}</span>`).join('')}
    </div>
    <div style="border-top: 1px solid var(--color-bg-accent); padding-top: var(--spacing-3); margin-bottom: var(--spacing-4);">
      <div class="flex justify-between items-center">
        <div>
          <p style="font-size: var(--text-xs); color: var(--color-text-muted);">Total Reach</p>
          <p style="font-size: var(--text-xl); font-weight: 700; color: var(--color-brand-primary);">${formatFollowers(talent.totalFollowers)}</p>
        </div>
        <div style="text-align: right;">
          <p style="font-size: var(--text-xs); color: var(--color-text-muted);">Primary Platform</p>
          <p style="font-size: var(--text-sm); font-weight: 600;">${primaryPlatform.platform}</p>
        </div>
      </div>
    </div>
    <a href="talent-profile.html?id=${talent.slug}" class="btn btn-gradient" style="width: 100%;">View Profile</a>
  `;
  
  return card;
}

// Search functionality
function searchTalents() {
  const searchTerm = document.getElementById('talent-search').value.toLowerCase();
  
  if (!searchTerm) {
    applyFilters();
    return;
  }
  
  const searchResults = filteredTalents.filter(talent => 
    talent.name.toLowerCase().includes(searchTerm) ||
    talent.bio.toLowerCase().includes(searchTerm) ||
    talent.categories.some(cat => cat.toLowerCase().includes(searchTerm))
  );
  
  renderTalents(searchResults);
}

// Apply filters
function applyFilters() {
  const platformCheckboxes = document.querySelectorAll('.filter-checkbox input[type="checkbox"]:checked');
  const selectedPlatforms = Array.from(platformCheckboxes)
    .filter(cb => ['YouTube', 'TikTok', 'Instagram', 'Twitch'].includes(cb.value))
    .map(cb => cb.value);
  
  const selectedCategories = Array.from(platformCheckboxes)
    .filter(cb => ['Gaming', 'Entertainment', 'Lifestyle', 'Comedy', 'Sports', 'Tech', 'Education', 'Streaming'].includes(cb.value))
    .map(cb => cb.value);
  
  const minFollowers = parseInt(document.getElementById('follower-range').value);
  
  filteredTalents = allTalents.filter(talent => {
    // Platform filter
    if (selectedPlatforms.length > 0) {
      const hasPlatform = talent.platforms.some(p => selectedPlatforms.includes(p.platform));
      if (!hasPlatform) return false;
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      const hasCategory = talent.categories.some(c => selectedCategories.includes(c));
      if (!hasCategory) return false;
    }
    
    // Follower range filter
    if (talent.totalFollowers < minFollowers) return false;
    
    return true;
  });
  
  // Apply search if there's a search term
  const searchTerm = document.getElementById('talent-search').value;
  if (searchTerm) {
    searchTalents();
  } else {
    renderTalents(filteredTalents);
  }
}

// Clear all filters
function clearFilters() {
  // Clear checkboxes
  document.querySelectorAll('.filter-checkbox input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });
  
  // Reset follower range
  document.getElementById('follower-range').value = 0;
  document.getElementById('follower-value').textContent = 'All';
  
  // Clear search
  document.getElementById('talent-search').value = '';
  
  // Reset filtered talents and render
  filteredTalents = [...allTalents];
  renderTalents(allTalents);
}

// Setup follower range slider
function setupFollowerRangeSlider() {
  const slider = document.getElementById('follower-range');
  const valueDisplay = document.getElementById('follower-value');
  
  slider.addEventListener('input', function() {
    const value = parseInt(this.value);
    if (value === 0) {
      valueDisplay.textContent = 'All';
    } else if (value >= 1000000) {
      valueDisplay.textContent = (value / 1000000).toFixed(1) + 'M+';
    } else if (value >= 1000) {
      valueDisplay.textContent = (value / 1000).toFixed(0) + 'K+';
    } else {
      valueDisplay.textContent = value + '+';
    }
  });
}