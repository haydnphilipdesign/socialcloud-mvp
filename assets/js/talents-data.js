// SocialCloud Management - Official Talent Roster
// As requested by Adrian Morina

const officialTalents = [
  {
    id: "1",
    name: "SkeeterJean",
    slug: "skeeterjean",
    bio: "Rising gaming content creator specializing in competitive gaming and streaming.",
    image: "/assets/images/talents/skeeterjean.webp",
    platforms: [
      { platform: "Twitch", followers: 285000 },
      { platform: "YouTube", followers: 420000 },
      { platform: "TikTok", followers: 180000 }
    ],
    categories: ["Gaming", "Streaming"],
    totalFollowers: 885000,
    avgEngagement: 15.3,
    featured: true
  },
  {
    id: "2",
    name: "Omma",
    slug: "omma",
    bio: "Content creator known for Discord community engagement and collaborative content.",
    image: "/assets/images/talents/omma.webp",
    platforms: [
      { platform: "YouTube", followers: 150000 },
      { platform: "TikTok", followers: 95000 },
      { platform: "Discord", followers: 50000 }
    ],
    categories: ["Entertainment", "Gaming"],
    totalFollowers: 295000,
    avgEngagement: 18.7,
    featured: true
  },
  {
    id: "3",
    name: "Packgod",
    slug: "packgod",
    bio: "Master of Discord roasting and rapid-fire comedy content. Known for legendary roast battles.",
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
    id: "4",
    name: "ScamLikely",
    slug: "scamlikely",
    bio: "Innovative content creator with a unique brand and growing following.",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    platforms: [
      { platform: "TikTok", followers: 220000 },
      { platform: "YouTube", followers: 180000 },
      { platform: "Instagram", followers: 75000 }
    ],
    categories: ["Entertainment", "Comedy"],
    totalFollowers: 475000,
    avgEngagement: 14.2,
    featured: true
  },
  {
    id: "5",
    name: "MisterStrang3",
    slug: "misterstrang3",
    bio: "Gaming and lifestyle content creator with a focus on community building.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    platforms: [
      { platform: "YouTube", followers: 95000 },
      { platform: "Twitch", followers: 45000 },
      { platform: "TikTok", followers: 60000 }
    ],
    categories: ["Gaming", "Lifestyle"],
    totalFollowers: 200000,
    avgEngagement: 16.8,
    featured: true
  },
  {
    id: "6",
    name: "Farzy",
    slug: "farzy",
    bio: "Entertainment content creator known for engaging personality and creative content.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
    platforms: [
      { platform: "TikTok", followers: 340000 },
      { platform: "Instagram", followers: 120000 },
      { platform: "YouTube", followers: 85000 }
    ],
    categories: ["Entertainment", "Lifestyle"],
    totalFollowers: 545000,
    avgEngagement: 13.9,
    featured: true
  },
  {
    id: "7",
    name: "Dankcube",
    slug: "dankcube",
    bio: "Gaming content creator with expertise in streaming and community engagement.",
    image: "/assets/images/talents/dankcube.webp",
    platforms: [
      { platform: "Twitch", followers: 75000 },
      { platform: "YouTube", followers: 110000 },
      { platform: "TikTok", followers: 55000 }
    ],
    categories: ["Gaming", "Streaming"],
    totalFollowers: 240000,
    avgEngagement: 17.2,
    featured: true
  },
  {
    id: "8",
    name: "liamfp",
    slug: "liamfp",
    bio: "Creative content creator with a focus on entertainment and lifestyle content.",
    image: "/assets/images/talents/liamfp.webp",
    platforms: [
      { platform: "YouTube", followers: 125000 },
      { platform: "TikTok", followers: 190000 },
      { platform: "Instagram", followers: 85000 }
    ],
    categories: ["Entertainment", "Lifestyle"],
    totalFollowers: 400000,
    avgEngagement: 15.6,
    featured: true
  },
  {
    id: "9",
    name: "deji",
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

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = officialTalents;
}