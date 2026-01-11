# ⚡ Web Asset Generator Expert

Generate professional web assets from logos or text slogans, including favicons, app icons (PWA), and social media meta images (Open Graph).

## 🚀 Quick Start (In Antigravity)

```bash
# 1. Check dependencies
python .agent/skills/web-asset-generator/scripts/check_dependencies.py

# 2. Generate Favicons from logo
python .agent/skills/web-asset-generator/scripts/generate_favicons.py --source path/to/logo.png

# 3. Generate Social Media (OG) images from text
python .agent/skills/web-asset-generator/scripts/generate_og_images.py --text "My Awesome App" --tagline "Built with precision"
```

## 🛠️ Production Scripts (Bone)

The expert utilizes specialized drawing and processing scripts:

- `generate_favicons.py`: Resizes and generates a full set of web icons and manifest.
- `generate_og_images.py`: Creates high-quality social sharing images with text overlays.
- `emoji_utils.py`: Support for rich emoji rendering in assets.
- `check_dependencies.py`: System verification (Pillow, Pilmoji).

## 🏛️ Best Practices

- **Interactive Requirements**: When a user asks for assets, use the `AskUserQuestion` flow to clarify layout preferences (e.g., Logo above text vs side-by-side).
- **Environment Closure**: Ensure `Pillow` is installed in the local Python environment.
- **Perfect Execution**: All generated assets should be accompanied by the corresponding HTML `<meta>` tags for the user to copy.

---
*The Agent: Perfecting web aesthetics with precision.*
