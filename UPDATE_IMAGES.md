# How to Update Talent Images

To replace the placeholder images with real headshots from SocialCloud's website:

## Step 1: Get the Real Image URLs

1. Visit https://socialcloudtalents.com
2. For each talent, right-click on their headshot
3. Select "Copy image address" or "Copy image URL"

## Step 2: Update the Files

You need to update image URLs in these files:
- `/assets/js/main.js` (lines 10, 26, 42)
- `/assets/js/talent-profile.js` (lines 8, 32, 56)
- `/assets/js/talents-roster.js` (lines 8, 24, 40, 56, 72, 88, 104, 120, 136, 152)

## Step 3: Find and Replace

Replace these placeholder URLs with the actual ones:

### Current Placeholders:
```javascript
// Packgod
"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face&auto=format&q=80"

// Deji
"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80"

// SkeeterJean
"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face&auto=format&q=80"

// Omma
"https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face&auto=format&q=80"

// ScamLikely
"https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=400&fit=crop&crop=face&auto=format&q=80"

// MisterStrang3
"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face&auto=format&q=80"

// Farzy
"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face&auto=format&q=80"

// Dankcube
"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80"

// liamfp
"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face&auto=format&q=80"

// Jonathan Wright
"https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
```

## Step 4: Commit and Push

After updating all image URLs:

```bash
git add -A
git commit -m "Update talent images with real headshots"
git push origin main
```

The changes will automatically deploy to Vercel.

## Alternative: Local Images

If you can download the images, you can also:
1. Save them in `/assets/images/talents/`
2. Update URLs to relative paths like `/assets/images/talents/packgod.jpg`
3. This ensures images load faster and remain available even if source URLs change