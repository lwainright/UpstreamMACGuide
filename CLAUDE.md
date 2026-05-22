# CLAUDE.md — Upstream MAC Guide
# Upstream Initiative LLC — Lee Wainwright
# Built for: son going into construction management

## Project Identity
- **App:** Upstream MAC Guide — Materials & Construction Field Intelligence
- **Owner:** Lee Wainwright / Upstream Initiative LLC
- **Repo:** github.com/lwainwright/upstream-mac-guide
- **Live:** upstreammacguide.netlify.app
- **Stack:** React 18 + Vite + Appwrite + Netlify + vite-plugin-pwa
- **BUILD STATUS: IN PROGRESS**

---

## The Upstream Initiative Ecosystem

| App | Stack | Status |
|---|---|---|
| Upstream Approach | React + Netlify + Appwrite | Live — upstreaminitiative.org |
| GrowAware | React + Vercel + Supabase | Live — grow-aware.vercel.app |
| The Cameron Approach | TBD | Planning — Cameron's input |
| Upstream Solutions | TBD | Planning |
| Upstream MAC Guide | React + Netlify + Appwrite | In Build — upstreammacguide.netlify.app |

---

## Environment Variables (Netlify)

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

Set all VITE_ vars in Netlify dashboard → Site configuration → Environment variables.
Redeploy after adding vars.

---

## Architecture

### Offline-First — Core Principle
All data saves to IndexedDB on the device FIRST.
Appwrite is the sync target, not the source of truth on device.

**Sync flow:**
1. User creates/edits → saved to IndexedDB immediately → queued for sync
2. Online → background sync drains queue → pushes to Appwrite
3. Conflict detected → flagged syncStatus: 'conflict' → NEVER auto-resolved
4. Last-synced indicator updates in AppHeader on every successful sync

### Jobsite Identity — The Golden Rule
Every object (material, note, photo, contact) MUST carry jobsiteCode at creation.
Never assign after the fact. Never null.
Keeps multi-crew orders from colliding.

**Code format:** First 4 letters of name + 3-digit number → SMTH-001

### Conflict Resolution — Human First, Always
System NEVER auto-resolves conflicts.
Flag → surface diff → wait for owner decision.
"The system's job is to show, not decide."

### Permission Hierarchy
- **Owner** — all jobsites, War Room dashboard, override controls
- **Lead** — assigned jobsite only, full edit
- **Crew** — view-only checklist and materials
- **Family** — home projects only, separate from commercial

---

## Netlify Functions
None required for MVP — all logic is client-side + Appwrite SDK.
If AI features added later, use Netlify Functions (same pattern as Upstream Approach).

### CRITICAL RULE — if Netlify Functions added later
Every function must be completely self-contained.
NO local requires — breaks zisi bundler.
NO dynamic imports — fails in Netlify functions.
Copy utilities inline. (Same rule as Upstream Approach.)

---

## Services

| File | Purpose |
|---|---|
| `src/services/appwrite.js` | Appwrite client — local instance per service |
| `src/services/sync.js` | IndexedDB + queue + jobsiteCode generator |
| `src/services/compress.js` | Photo compression before upload |

---

## Image Handling
Photos are OPTIONAL everywhere. Every photo feature has a visible Skip option.
Always compress before upload — mirrors growAware pattern exactly.

```javascript
// compressPhoto(file, maxSize=800, quality=0.75)
// Returns { base64, dataUrl, blob, originalKB, compressedKB, summary }
// Never send raw phone photos to Appwrite storage
```

---

## Color System — Never Hardcode

```
--orange:         #E85C00  — primary, MAC text, CTAs, action buttons
--orange-dark:    #C44800  — pressed states
--charcoal:       #2C2C2C  — backgrounds
--charcoal-mid:   #3a3a3a  — card surfaces
--charcoal-light: #4a4a4a  — borders, dividers
--cream:          #F5F4F0  — primary text
--muted:          #A0A0A0  — secondary text
--success:        #2D8653  — synced, code compliant
--danger:         #D63B3B  — errors, violations
--warning:        #E8A900  — conflicts, pending
```

---

## AppHeader — Critical Layout

```
height: var(--header-height) = 64px, fixed top
Left:   80px — back button (optional)
Center: flex 1 — title + sync status indicator
Right:  80px — action button (optional)
```

Sync indicator always visible. Shows online/offline + last synced time.

---

## File Structure

```
upstream-mac-guide/
├── index.html
├── vite.config.js
├── netlify.toml
├── package.json
├── .env.example
├── CLAUDE.md
├── public/
│   └── icons/
│       ├── icon-192.png       (exactly 192x192, solid bg, no transparency)
│       └── icon-512.png       (exactly 512x512, full-bleed, no padding)
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
    │   ├── notes/              (next)
    │   ├── contacts/           (next)
    │   ├── home-jobs/          (next — family version)
    │   └── profile/            (next)
    └── services/
        ├── appwrite.js
        ├── sync.js
        └── compress.js
```

---

## Appwrite Collections (create in Appwrite console)

### jobsites
| Attribute | Type | Size | Required |
|---|---|---|---|
| name | String | 255 | Yes |
| address | String | 500 | No |
| jobsiteCode | String | 20 | Yes |
| ownerId | String | 36 | Yes |
| createdAt | String | 30 | Yes |
| updatedAt | String | 30 | Yes |
| syncStatus | String | 20 | No |

### materials
| Attribute | Type | Size | Required |
|---|---|---|---|
| jobsiteId | String | 36 | Yes |
| jobsiteCode | String | 20 | Yes |
| name | String | 255 | Yes |
| qty | String | 20 | No |
| unit | String | 20 | No |
| checked | Boolean | — | No |
| createdAt | String | 30 | Yes |
| updatedAt | String | 30 | Yes |
| syncStatus | String | 20 | No |

### notes
| Attribute | Type | Size | Required |
|---|---|---|---|
| jobsiteId | String | 36 | Yes |
| jobsiteCode | String | 20 | Yes |
| content | String | 5000 | Yes |
| photoUrl | String | 500 | No |
| createdAt | String | 30 | Yes |
| updatedAt | String | 30 | Yes |

### contacts
| Attribute | Type | Size | Required |
|---|---|---|---|
| userId | String | 36 | Yes |
| name | String | 255 | Yes |
| company | String | 255 | No |
| phone | String | 30 | No |
| email | String | 255 | No |
| tradeTag | String | 50 | No |
| region | String | 100 | No |
| createdAt | String | 30 | Yes |

---

## Key Rules (learned from Upstream Approach + GrowAware)

- **Complete file rewrites only** — never partial edits
- **jobsiteCode on everything** — stamped at creation, never null
- **Photos always optional** — every photo feature has a visible Skip option
- **Compress before upload** — never send raw photos to Appwrite
- **Conflict = flag, not fix** — system shows, contractor decides
- **Offline first** — IndexedDB is truth on device, Appwrite is sync target
- **No auto-overrides** — owner taps to override, system never does it
- **Check for duplicate files** — breaks routing silently
- **Local Appwrite client** — never import shared client, instantiate locally per service
- **No local requires in Netlify Functions** — self-contained only (if functions added)

---

## PWA Icons
Same rules as Upstream Approach:
- icon-192.png — exactly 192x192, solid background, no transparency
- icon-512.png — exactly 512x512, solid background, full-bleed, no padding
- If Android shows screenshot or white box: check manifest path + dimensions first

---

## Netlify Setup
1. Connect GitHub repo in Netlify dashboard
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add all VITE_ environment variables
5. Redeploy after adding vars
6. Add `localhost` as allowed platform in Appwrite for local dev
7. Add `upstreammacguide.netlify.app` as allowed platform in Appwrite for production

---

## Critical Bug History
(Add bugs here as they are found — same pattern as Upstream Approach)
1. None yet — build in progress

---

## Pending — Re-enable Before Launch

### Google OAuth (disabled during development)
Google button is commented out in `src/screens/auth/LoginScreen.jsx`.

To re-enable:
1. Go to console.cloud.google.com
2. Create a project → Enable Google+ API
3. OAuth 2.0 credentials → Web application
4. Add authorized redirect URI: `https://nyc.cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/[PROJECT_ID]`
5. Copy Client ID and Client Secret
6. Appwrite console → Auth → Settings → Google → paste both keys → enable
7. Uncomment the Google button block in LoginScreen.jsx
