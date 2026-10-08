# ☀️ Dangar Island Youth Music Festival Web App

A vibrant, modern, and interactive web application celebrating the **Dangar Island Youth Music Festival** (17.10.26) at the Dangar Island Community Hall, Hawkesbury River, NSW, Australia.

Live Deployments:
* **[https://dangaryouthmusic.web.app](https://dangaryouthmusic.web.app)**
* **[https://jazzdonkeys.web.app](https://jazzdonkeys.web.app)**

---

## 🎨 Overview & Design Concept

Built to capture the spirit of classic retro community music festival posters, this application features:

* **Concentric Radial Arches:** Mathematically aligned, non-clipping dual SVG curved banners displaying **"DANGAR ISLAND"** nested over **"YOUTH MUSIC FESTIVAL"**.
* **Hypnotic Rotating Sunburst:** GPU-accelerated slow-motion ray rotation (170s cycle) centered behind the golden sun vault.
* **Golden Sun Vault:** Prominently highlights **from 5pm** and the **17.10.26** festival date, with a live countdown clock down to the second.
* **Interactive Sound Sampler:** Click on any of the band cards to hear a zero-latency synthesized audio preview built with the **Web Audio API**:
  * 🫏 **Jazz Donkeys:** Brassy jazz swing riff & walking bassline.
  * 🐦 **Rock Pigeons:** Overdriven rock power chord riff.
  * 🦅 **The Cormorants:** Island reggae & dub groove.
  * 🐬 **The Disco Dolphins:** 80s neon synthwave arpeggio.
* **✨ Surprise Guest Rumor Mill:** Interactive toggle hinting at secret island guest performances.
* **🍖 Spit Roast & Festival Perks:** Details on Hawkesbury saltbush lamb slow-cooked over red gum ironbark coals (plus grilled halloumi and vegan options).
* **🎟️ Ticket Dialog:** Clean, accessible "Coming Soon" modal with keyboard navigation and focus trapping.

---

## 🛠️ Tech Stack

* **Frontend:** Modern Vanilla JavaScript (ES Modules), Semantic HTML5, Custom CSS3
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Audio Synthesis:** Web Audio API (native, zero external audio asset weight)
* **Animations:** CSS Transforms & SVG Path coordinate manipulation
* **Hosting:** [Firebase Hosting](https://firebase.google.com/docs/hosting) (multi-site configuration targeting `jazzdonkeys` and `dangaryouthmusic`)

---

## 🚀 Getting Started

### Prerequisites
* **Node.js:** v20+ LTS (tested on Node v24 LTS)
* **npm:** v10+
* **Firebase CLI:** `npm install -g firebase-tools`

### Installation
```bash
# Clone the repository
git clone https://github.com/peteinmanly/jazzdonkeys.git
cd jazzdonkeys

# Install dependencies
npm install
```

### Development
```bash
npm run dev
```
Serves the local development server at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
Generates production-optimized static assets in the `dist/` directory.

### Deployment to Firebase Hosting
```bash
# Deploys to both dangaryouthmusic.web.app and jazzdonkeys.web.app
firebase deploy --only hosting --project jazzdonkeys
```

---

## 📂 Project Structure

```
├── public/
│   └── assets/
│       ├── badge-cormorants.jpg
│       ├── badge-disco-dolphins.jpg
│       ├── badge-jazz-donkeys.jpg
│       ├── badge-rock-pigeons.jpg
│       └── original-poster.jpg
├── src/
│   ├── audio.js         # Web Audio API synthesizer for the 4 bands
│   ├── countdown.js     # Live countdown timer to 17.10.2026 5pm
│   ├── main.js          # Main controller script
│   ├── style.css        # Responsive layout, typography, animations
│   └── tickets.js       # Accessible modal dialog controller
├── firebase.json        # Multi-site hosting configuration
├── .firebaserc          # Default Firebase project mapping
├── index.html           # Main HTML entry point
├── package.json
└── vite.config.js       # Vite build configuration
```

---

## 📜 License & Credits

* Hosted by **Dangar Island Community Hall**
* Music by the incredible young talent of the Hawkesbury River
