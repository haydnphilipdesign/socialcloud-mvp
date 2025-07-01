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
        <span style="font-size: var(--text-xl);">${platformIcon}</span>
        <div>
          <p style="font-weight: 600;">${platform.platform}</p>
          <p style="font-size: var(--text-sm); color: var(--color-text-muted);">${handle}</p>
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
    // Filter content implementation
    // In production, this would filter the content gallery
}