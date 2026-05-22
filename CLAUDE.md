# CLAUDE.md — Upstream MAC Guide
# Upstream Initiative LLC — Lee Wainwright
# Built for: son going into construction management

## Project Identity
- **App:** Upstream MAC Guide — Materials & Construction Field Intelligence
- **Owner:** Lee Wainwright / Upstream Initiative LLC
- **Repo:** github.com/lwainwright/upstream-mac-guide
- **Stack:** React 18 + Vite + Appwrite + Cloudflare Pages + vite-plugin-pwa
- **BUILD STATUS: IN PROGRESS**

---

## The Upstream Initiative Ecosystem

| App | Stack | Status |
|---|---|---|
| Upstream Approach | React + Netlify + Appwrite | Live |
| GrowAware | React + Vercel + Supabase | Live |
| The Cameron Approach | TBD | Planning |
| Upstream Solutions | TBD | Planning |
| Upstream MAC Guide | React + Cloudflare + Appwrite | In Build |

---

## Environment Variables (Cloudflare Pages)

| Key | Purpose |
|---|---|
| `VITE_APPWRITE_ENDPOINT` | Appwrite endpoint — client-side |
| `VITE_APPWRITE_PROJECT_ID` | Appwrite project ID — client-side |
| `VITE_APPWRITE_DB_ID` | Appwrite database ID — client-side |
| `VITE_APPWRITE_COL_JOBSITES` | Jobsites collection ID |
| `VITE_APPWRITE_COL_MATERIALS` | Materials collection ID |
| `VITE_APPWRITE_COL_NOTES` | Notes collection ID |
| `VITE_APPWRITE_COL_CONTACTS` | Contacts collection ID |
| `VITE_APPWRITE_BUCKET_PHOTOS` | Photo storage bucket ID |

---

## Architecture

### Offline-First — Core Principle
All data saves to IndexedDB on the device FIRST. Appwrite is the sync target, not the source of truth on the device.

**Sync flow:**
1. User creates/edits item → saved to IndexedDB immediately → queued for sync
2. When online → background sync drains queue → pushes to Appwrite
3. Conflict detected → flagged as syncStatus: 'conflict' → never auto-resolved
4. Last-synced indicator updates in AppHeader on every successful sync

### Jobsite Identity — The Golden Rule
Every object (material, note, photo, contact) MUST carry jobsiteCode at creation.
Never assign after the fact. Never null. This is what keeps multi-crew orders from colliding.

**Code format:** First 4 letters of jobsite name + 3-digit number → SMTH-001

### Permission Hierarchy
- **Owner** — sees all jobsites, all crews, War Room dashboard, override controls
- **Lead** — sees assigned jobsite only, full edit rights
- **Crew** — view-only on checklist and materials
- **Family** — home projects only, separate from commercial sites

### Conflict Resolution — Human First, Always
The system NEVER auto-resolves conflicts.
Flag → surface diff → wait for owner decision.
"The system's job is to show, not decide."

---

## Services

| File | Purpose |
|---|---|
| `src/services/appwrite.js` | Appwrite client — local instance, not shared |
| `src/services/sync.js` | IndexedDB + queue + jobsiteCode generator |
| `src/services/compress.js` | Photo compression — always compress before upload |

---

## Image Handling
Photos are OPTIONAL everywhere. Every photo feature has a Skip option.
Always compress before upload — matches growAware pattern.

```javascript
// compressPhoto(file, maxSize=800, quality=0.75)
// Returns { base64, dataUrl, blob, originalKB, compressedKB, summary }
// Never send raw phone photos to storage
```

---

## Color System — Never Hardcode

```
--orange:        #E85C00  — primary, MAC text, CTAs, action buttons
--orange-dark:   #C44800  — pressed states
--charcoal:      #2C2C2C  — backgrounds
--charcoal-mid:  #3a3a3a  — card surfaces
--charcoal-light:#4a4a4a  — borders, dividers
--cream:         #F5F4F0  — primary text
--muted:         #A0A0A0  — secondary text
--success:       #2D8653  — synced, code compliant
--danger:        #D63B3B  — errors, violations
--warning:       #E8A900  — conflicts, pending
```

---

## AppHeader — Critical Layout

```
height: var(--header-height) = 64px, fixed top
Left: 80px — back button (optional)
Center: flex 1 — title + sync status indicator
Right: 80px — action button (optional)
```

Sync indicator always visible in header. Shows online/offline + last synced time.

---

## File Structure

```
upstream-mac-guide/
├── index.html
├── vite.config.js
├── package.json
├── .env.example
├── CLAUDE.md
├── public/
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   ├── AuthContext.jsx
    │   └── SyncContext.jsx
    ├── components/
    │   ├── AppHeader.jsx
    │   └── BottomNav.jsx
    ├── screens/
    │   ├── splash/SplashScreen.jsx
    │   ├── auth/LoginScreen.jsx
    │   ├── auth/VerifyScreen.jsx
    │   ├── home/HomeScreen.jsx
    │   ├── jobsite/JobsitesScreen.jsx
    │   ├── jobsite/NewJobsiteScreen.jsx
    │   ├── materials/MaterialsScreen.jsx
    │   ├── notes/       (next)
    │   ├── contacts/    (next)
    │   ├── home-jobs/   (next — family version)
    │   └── profile/     (next)
    └── services/
        ├── appwrite.js
        ├── sync.js
        └── compress.js
```

---

## Appwrite Collections (create in console)

```
jobsites   — id, name, address, jobsiteCode, ownerId, createdAt, updatedAt
materials  — id, jobsiteId, jobsiteCode, name, qty, unit, checked, createdAt, updatedAt
notes      — id, jobsiteId, jobsiteCode, content, photoUrl, createdAt
contacts   — id, userId, name, company, phone, email, tradeTag, region
```

---

## Key Rules (learned from Upstream Approach + GrowAware)

- **Complete file rewrites only** — never partial edits
- **jobsiteCode on everything** — stamped at creation, never null, never assigned after
- **Photos always optional** — every photo feature has a visible Skip option
- **Compress before upload** — never send raw photos to Appwrite storage
- **Conflict = flag, not fix** — system shows, contractor decides
- **Offline first** — IndexedDB is source of truth on device, Appwrite is sync target
- **No auto-overrides** — owner taps to override, system never does it automatically
- **Check for duplicate files** — duplicate screens in wrong locations break routing silently
- **Local Appwrite client** — never import shared client, instantiate locally in each service

---

## PWA Icons
Same rules as Upstream Approach:
- icon-192.png — exactly 192x192, solid background, no transparency
- icon-512.png — exactly 512x512, solid background, full-bleed, no padding
- If Android shows screenshot: check manifest path + icon dimensions first

---

## Build Notes
- Cloudflare Pages: connect GitHub repo, set build command `npm run build`, output dir `dist`
- Set all VITE_ env vars in Cloudflare Pages dashboard before first deploy
- No Cloudflare Functions needed for MVP — all logic is client-side + Appwrite
