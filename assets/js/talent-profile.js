// Talent Profile Page JavaScript

// State variable for talents data
let talentsData = {};

// Load talents data
function loadTalentsData(callback) {
    // Create script element to load talents data
    const script = document.createElement('script');
    script.src = '/assets/js/talents-data.js';
    document.head.appendChild(script);

    script.onload = function() {
        // Convert array to object keyed by slug
        if (window.officialTalents) {
            window.officialTalents.forEach(talent => {
                talentsData[talent.slug] = {
                    ...talent,
                    bannerImage: getBannerImage(talent.slug),
                    achievements: getAchievements(talent),
                    stats: {
                        totalFollowers: talent.totalFollowers,
                        avgEngagement: talent.avgEngagement,
                        campaignsCompleted: Math.floor(Math.random() * 20) + 5 // Placeholder
                    }
                };
            });
        }

        if (callback) callback();
    };
}

// Get banner image for talent - using category-appropriate imagery
function getBannerImage(slug) {
    const banners = {
        // Packgod - Comedy/Gaming/Roasting theme
        "packgod": "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=1600&h=600&fit=crop&auto=format&q=80", // Podcast/streaming setup
        
        // SkeeterJean - Lifestyle & Comedy
        "skeeterjean": "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=1600&h=600&fit=crop&auto=format&q=80", // Urban lifestyle/comedy venue
        
        // Omma - Lifestyle & Gaming
        "omma": "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1600&h=600&fit=crop&auto=format&q=80", // Gaming setup with lifestyle elements
        
        // ScamLikely - Entertainment & Comedy
        "scamlikely": "https://images.unsplash.com/photo-1586899028174-e7098604235b?w=1600&h=600&fit=crop&auto=format&q=80", // Neon comedy/entertainment theme
        
        // MisterStrang3 - Gaming & Lifestyle
        "misterstrang3": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1600&h=600&fit=crop&auto=format&q=80", // Premium gaming setup
        
        // Farzy - Entertainment & Lifestyle
        "farzy": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&h=600&fit=crop&auto=format&q=80", // Concert/entertainment venue
        
        // Dankcube - Lifestyle & Comedy
        "dankcube": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=600&fit=crop&auto=format&q=80", // Festival/party atmosphere
        
        // liamfp - Entertainment & Lifestyle
        "liamfp": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&h=600&fit=crop&auto=format&q=80", // Live performance/entertainment
        
        // Deji - Gaming, Sports & Entertainment (Boxing)
        "deji": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1600&h=600&fit=crop&auto=format&q=80", // Boxing ring/sports arena
        
        // Jonathan Wright - Tech & Education
        "jonathan-wright": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=600&fit=crop&auto=format&q=80" // Tech/digital education theme
    };

    return banners[slug] || "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1600&h=600&fit=crop&auto=format&q=80";
}

// Generate achievements based on talent data
function getAchievements(talent) {
    const achievements = [];

    // Add follower milestone
    if (talent.totalFollowers >= 10000000) {
        achievements.push(`${(talent.totalFollowers / 1000000).toFixed(1)}M+ total followers across platforms`);
    } else if (talent.totalFollowers >= 1000000) {
        achievements.push(`${(talent.totalFollowers / 1000000).toFixed(1)}M+ total followers across platforms`);
    } else {
        achievements.push(`${(talent.totalFollowers / 1000).toFixed(0)}K+ total followers across platforms`);
    }

    // Add platform-specific achievements
    talent.platforms.forEach(platform => {
        if (platform.followers >= 1000000) {
            achievements.push(`${(platform.followers / 1000000).toFixed(1)}M+ ${platform.platform} followers`);
        }
    });

    // Add engagement achievement
    if (talent.avgEngagement >= 15) {
        achievements.push(`${talent.avgEngagement}% average engagement rate`);
    }

    // Add category achievements
    if (talent.categories.includes("Gaming")) {
        achievements.push("Leading gaming content creator");
    }
    if (talent.categories.includes("Comedy")) {
        achievements.push("Viral comedy content specialist");
    }
    if (talent.featured) {
        achievements.push("Featured SocialCloud talent");
    }

    return achievements.slice(0, 4); // Return top 4 achievements
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadTalentsData(function() {
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
});

// Load talent profile data
function loadTalentProfile(talent) {
    // Update page title
    document.title = `${talent.name} | SocialCloud Management`;

    // Hero banner with premium dark boutique styling
    const heroBanner = document.getElementById('hero-banner');
    if (heroBanner) {
        // Clear existing content
        heroBanner.innerHTML = '';
        
        // Create layered background for depth
        heroBanner.style.cssText = `
            position: absolute;
            inset: 0;
            overflow: hidden;
        `;
        
        // Background image layer
        const bgLayer = document.createElement('div');
        bgLayer.style.cssText = `
            position: absolute;
            inset: 0;
            background-image: url('${talent.bannerImage}');
            background-size: cover;
            background-position: center;
            filter: brightness(0.4) contrast(1.2) saturate(0.8);
            transform: scale(1.1);
        `;
        
        // Gradient overlay for premium feel
        const gradientLayer = document.createElement('div');
        gradientLayer.style.cssText = `
            position: absolute;
            inset: 0;
            background: linear-gradient(
                180deg,
                rgba(0,0,0,0.3) 0%,
                rgba(0,0,0,0.5) 50%,
                rgba(26,26,26,0.9) 100%
            );
        `;
        
        // Subtle pattern overlay
        const patternLayer = document.createElement('div');
        patternLayer.style.cssText = `
            position: absolute;
            inset: 0;
            background-image: 
                repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 100px,
                    rgba(99, 102, 241, 0.03) 100px,
                    rgba(99, 102, 241, 0.03) 200px
                );
            mix-blend-mode: overlay;
        `;
        
        heroBanner.appendChild(bgLayer);
        heroBanner.appendChild(gradientLayer);
        heroBanner.appendChild(patternLayer);
    }

    // Profile info
    const avatarImg = document.getElementById('talent-avatar');
    avatarImg.src = talent.image;
    avatarImg.alt = talent.name;
    avatarImg.onerror = function() {
        this.src = '/assets/images/talents/placeholder.svg';
        this.onerror = null;
    };
    document.getElementById('talent-name').textContent = talent.name;
    document.getElementById('talent-bio').textContent = talent.bio;

    // Categories
    const categoriesContainer = document.getElementById('talent-categories');
    categoriesContainer.innerHTML = '';
    talent.categories.forEach(cat => {
        const tag = document.createElement('span');
        tag.style.cssText = 'background: var(--color-bg-accent); padding: var(--spacing-1) var(--spacing-3); border-radius: var(--radius-full); font-size: var(--text-sm);';
        tag.textContent = cat;
        categoriesContainer.appendChild(tag);
    });

    // Platforms
    const platformList = document.getElementById('platform-list');
    platformList.innerHTML = '';
    talent.platforms.forEach(platform => {
        const platformItem = document.createElement('div');
        platformItem.className = 'flex justify-between items-center glass-effect';
        platformItem.style.cssText = 'padding: var(--spacing-3); border-radius: var(--radius-md);';

        const platformIcon = getPlatformIcon(platform.platform);
        const handle = platform.handle || `@${talent.slug}`;

        platformItem.innerHTML = `
      <div class="flex items-center gap-3">
        <span style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; color: var(--color-brand-primary);">${platformIcon}</span>
        <div>
          <p style="font-weight: 600; color: #ffffff;">${platform.platform}</p>
          <p style="font-size: var(--text-sm); color: rgba(255, 255, 255, 0.7);">${handle}</p>
        </div>
      </div>
      <div style="text-align: right;">
        <p style="font-weight: 700; color: var(--color-brand-primary);">${formatFollowers(platform.followers)}</p>
        <p style="font-size: var(--text-sm); color: rgba(255, 255, 255, 0.7);">followers</p>
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
    achievementsList.innerHTML = '';
    talent.achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.style.cssText = 'margin-bottom: var(--spacing-3); padding-left: var(--spacing-6); position: relative;';
        li.innerHTML = `<span style="position: absolute; left: 0; color: var(--color-brand-primary);">✓</span> ${achievement}`;
        achievementsList.appendChild(li);
    });

    // CTA buttons
    document.getElementById('talent-name-cta').textContent = ` ${talent.name}`;
        document.getElementById('modal-talent-name').textContent = ` ${talent.name}`;
}

// Load related talents
function loadRelatedTalents(currentTalent) {
    const relatedContainer = document.getElementById('related-talents');
    relatedContainer.innerHTML = '';
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
    <img src="${talent.image}" alt="Headshot of ${talent.name}, ${talent.categories.join(' and ')} creator" loading="lazy" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: var(--spacing-4);" onerror="this.src='/assets/images/talents/placeholder.svg'; this.onerror=null;">
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
        'YouTube': `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>`,
        'TikTok': `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>`,
        'Instagram': `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
        </svg>`,
        'Twitter': `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>`,
        'Twitch': `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
        </svg>`,
        'Discord': `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>`,
        'LinkedIn': `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>`
    };
    return icons[platform] || `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/>
    </svg>`;
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
    // Filter content implementation
    // In production, this would filter the content gallery
}