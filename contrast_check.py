# Color definitions from CSS
colors = {
    "bg-primary": "#0a0a0a",
    "bg-secondary": "#1a1a1a", 
    "bg-accent": "#2a2a2a",
    "bg-card": "rgba(26, 26, 26, 0.8)",  # #1a1a1a with 0.8 opacity
    "text-primary": "#ffffff",
    "text-secondary": "#a3a3a3",
    "text-muted": "#737373",
    "brand-accent": "#c9a961"
}

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def luminance(r, g, b):
    # Convert to sRGB
    def channel(c):
        c = c / 255.0
        if c <= 0.03928:
            return c / 12.92
        else:
            return pow((c + 0.055) / 1.055, 2.4)
    
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)

def contrast_ratio(color1, color2):
    rgb1 = hex_to_rgb(color1)
    rgb2 = hex_to_rgb(color2)
    
    lum1 = luminance(*rgb1)
    lum2 = luminance(*rgb2)
    
    lighter = max(lum1, lum2)
    darker = min(lum1, lum2)
    
    return (lighter + 0.05) / (darker + 0.05)

# Check contrast ratios
print("CONTRAST RATIO ANALYSIS")
print("=" * 50)
print("\nWCAG 2.1 Guidelines:")
print("- Normal text: minimum 4.5:1")
print("- Large text: minimum 3:1")
print("- AAA compliance: 7:1 for normal, 4.5:1 for large")
print("\n" + "=" * 50 + "\n")

# Text on backgrounds
backgrounds = {
    "Primary Background (#0a0a0a)": colors["bg-primary"],
    "Secondary Background (#1a1a1a)": colors["bg-secondary"],
    "Accent Background (#2a2a2a)": colors["bg-accent"],
    "Card Background (#1a1a1a)": "#1a1a1a"  # Treating as opaque for simplicity
}

text_colors = {
    "Text Secondary (#a3a3a3)": colors["text-secondary"],
    "Text Muted (#737373)": colors["text-muted"],
    "Brand Accent (#c9a961)": colors["brand-accent"],
    "White (#ffffff)": colors["text-primary"]
}

for bg_name, bg_color in backgrounds.items():
    print(f"\n{bg_name}:")
    for text_name, text_color in text_colors.items():
        ratio = contrast_ratio(text_color, bg_color)
        status = "❌ FAIL" if ratio < 4.5 else "⚠️  AA PASS" if ratio < 7 else "✅ AAA PASS"
        print(f"  {text_name}: {ratio:.2f}:1 {status}")

