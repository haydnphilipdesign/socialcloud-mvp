// Talents Roster Page JavaScript

// State variables
let allTalents = [];
let filteredTalents = [];

// Load talents data
function loadTalentsData() {
  // Create script element to load talents data
  const script = document.createElement('script');
  script.src = '/assets/js/talents-data.js';
  document.head.appendChild(script);
  
  script.onload = function() {
    // Use official talents from talents-data.js
    allTalents = window.officialTalents || [];
    filteredTalents = [...allTalents];
    
    // Render initial view
    renderTalents(allTalents);
    setupFollowerRangeSlider();
  };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  loadTalentsData();
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
      <img src="${talent.image}" alt="${talent.name}" style="width: 100%; height: 250px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: var(--spacing-4);" onerror="this.src='/assets/images/talents/placeholder.svg'; this.onerror=null;">
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
  
  // Get follower range from radio buttons
  const followerRange = document.querySelector('input[name="followers"]:checked')?.value || 'all';
  
  // Add loading state
  const grid = document.querySelector('#talents-grid');
  if (grid) {
    grid.classList.add('loading');
  }
  
  setTimeout(() => {
    filteredTalents = allTalents.filter(talent => {
      // Platform filter - if no platforms selected, show all
      if (selectedPlatforms.length > 0) {
        const hasPlatform = talent.platforms.some(p => selectedPlatforms.includes(p.platform));
        if (!hasPlatform) return false;
      }
      
      // Category filter - if no categories selected, show all
      if (selectedCategories.length > 0) {
        const hasCategory = talent.categories.some(c => selectedCategories.includes(c));
        if (!hasCategory) return false;
      }
      
      // Follower range filter
      if (followerRange !== 'all') {
        const followers = talent.totalFollowers;
        switch(followerRange) {
          case '100k':
            if (followers < 100000 || followers >= 500000) return false;
            break;
          case '500k':
            if (followers < 500000 || followers >= 1000000) return false;
            break;
          case '1m':
            if (followers < 1000000 || followers >= 5000000) return false;
            break;
          case '5m':
            if (followers < 5000000) return false;
            break;
        }
      }
      
      return true;
    });
    
    // Apply search if there's a search term
    const searchTerm = document.getElementById('talent-search')?.value;
    if (searchTerm) {
      searchTalents();
    } else {
      renderTalents(filteredTalents);
    }
    
    // Remove loading state
    if (grid) {
      grid.classList.remove('loading');
    }
  }, 300);
}

// Clear all filters
function clearFilters() {
  // Clear checkboxes
  document.querySelectorAll('.filter-checkbox input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });
  
  // Reset follower range radio to "all"
  const allRadio = document.querySelector('input[name="followers"][value="all"]');
  if (allRadio) {
    allRadio.checked = true;
  }
  
  // Clear search
  const searchInput = document.getElementById('talent-search');
  if (searchInput) {
    searchInput.value = '';
  }
  
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

// Add mouse tracking to talent cards
function setupCardMouseTracking() {
  document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.card-glow');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Only update if mouse is over the card
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    });
  });
}

// Initialize mouse tracking when DOM loads
document.addEventListener('DOMContentLoaded', function() {
  setupCardMouseTracking();
});