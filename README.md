<div align="center">
	<h1>GatorXchange</h1>
	<p><strong>A UF campus marketplace for student-to-student listings.</strong></p>
	<p>Built with Next.js 16 · React 18 · Tailwind CSS v4 · MongoDB · Firebase Auth · AWS S3</p>
</div>

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [Development Scripts](#development-scripts)
8. [API Summary](#api-summary)
9. [Authentication Flow](#authentication-flow)
10. [Image Uploads](#image-uploads)
11. [Deployment Notes](#deployment-notes)
12. [Roadmap](#roadmap)
13. [Further Docs](#further-docs)

## Overview
GatorXchange enables UF students to list items, browse recent posts, and manage their own listings. Google Sign-In is restricted to `@ufl.edu` addresses, ensuring a campus-only experience. Listings support image uploads to S3 and are persisted in MongoDB Atlas.

## Features
- Google Auth with UFL domain enforcement
- Create, list, filter, and delete marketplace listings
- Image uploads to AWS S3 with type/size validation
- Modern responsive UI using Radix primitives + Tailwind v4
- Environment-driven configuration for DB, Auth, Storage
- Modular architecture (models, lib utilities, API routes)

## Tech Stack
| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| UI | React 18, Radix UI, Tailwind CSS v4, Lucide Icons |
| Forms & Validation | react-hook-form, zod |
| Auth | Firebase Web SDK (Google) |
| Database | MongoDB Atlas via Mongoose 8 |
| Storage | AWS S3 (AWS SDK v3) |
| Utilities | clsx, tailwind-merge, date-fns |

## Architecture
- `app/` – Routes & API endpoints (`app/api/listings`, `app/api/upload`).
- `src/models/` – Mongoose schemas (`User`, `Listing`).
- `src/lib/` – Supporting libraries (`db.ts`, `firebase.ts`, `s3.ts`, `utils.ts`).
- `src/context/` – `AuthContext` for user/session state & domain enforcement.
- `docs/` – Extended technical documentation.
- `next.config.js` – Headers (COOP) and Next.js config.

## Getting Started
```bash
git clone <your-repo-url>
cd gator_exchange
cp .env.example .env.local   # fill in values
npm install
npm run dev
# visit http://localhost:3000
```

## Environment Variables
Copy `.env.example` → `.env.local` and fill:

| Name | Description | Scope |
|------|-------------|-------|
| `MONGODB_URI` | MongoDB SRV URI | Server |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API key | Client |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Client |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Client |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Client |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID | Client |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase web app ID | Client |
| `AWS_REGION` | AWS region (e.g. `us-east-1`) | Server |
| `AWS_ACCESS_KEY_ID` | AWS access key | Server |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | Server |
| `AWS_S3_BUCKET_NAME` | S3 bucket name | Server |

## Development Scripts
| Script | Purpose |
|--------|---------|
| `npm run dev` | Start local development server |
| `npm run build` | Production build |
| `npm start` | Run built app |
| `npm run lint` | Lint the codebase |

## API Summary
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/listings` | GET | Fetch recent listings (limit 20) |
| `/api/listings` | POST | Create a listing (requires seller fields) |
| `/api/listings/my?sellerId=<uid>` | GET | Get listings for a seller |
| `/api/listings/:id` | DELETE | Delete a listing by ID |
| `/api/upload` | POST | Upload an image (multipart form) |

## Authentication Flow
- Google Sign-In popup through Firebase Web SDK.
- Post sign-in domain check: reject non-`@ufl.edu` email (immediate sign-out + banner message).
- `AuthContext` exposes `user`, `loading`, `errorMessage`, `signInWithGoogle`, `logout`.
- Recommended future hardening: server-side Firebase ID token verification.

## Image Uploads
- Client sends `FormData(image)` to `/api/upload`.
- Validations: MIME must start with `image/`; size ≤ 5MB.
- Stored in S3 under `listings/<timestamp-random>.<ext>`.
- Returns public URL; ensure bucket policy or migrate to presigned GET if privacy needed.

## Deployment Notes
1. Set all env vars in hosting platform (e.g. Vercel Project Settings).
2. Add production domain to Firebase Authorized domains.
3. Preserve COOP header (`same-origin-allow-popups`) or switch auth to redirect.
4. Consider adding logging, monitoring (e.g. Vercel Analytics already included), and rate limiting.
5. Harden APIs: derive identity server-side, enforce ownership checks, sanitize inputs.

## Roadmap
- Server-side Firebase token verification
- Listing search & category filters
- Image resizing / thumbnail generation
- User profile & watchlist/favorites
- Rate limiting & monitoring dashboards

## Further Docs
- Extended setup & keys: `docs/SECTION_3_TECHNICAL_DETAILS.md`

---
Made for UF students. Contributions welcome!
