# LEARNER 16 — Free Learning Universe

LEARNER 16 is a lightweight, responsive learning application for structured learning, safe practice, notes, quizzes, projects, revision, and a portable skill record.

## Current build

- Responsive app-style interface
- Learning paths loaded from JSON
- Local progress, streaks, notes, projects, quizzes and revision scheduling
- Safe fictional cybersecurity/networking/Linux labs
- Free resource library with URL validation
- Local Nova AI Mentor placeholder with no browser API keys
- Knowledge Map, Analytics, Learner DNA and Skill Passport
- Light/dark theme
- Installable PWA shell with offline caching
- Local data reset from Settings
- Automated GitHub Actions checks for JavaScript syntax, JSON and required files

## Run locally

Serve the repository root because the app loads JSON and the service worker requires an HTTP(S) origin:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`.

Do not open `index.html` directly with `file://`; browser module imports, JSON fetches and service-worker registration are intentionally designed for HTTP(S).

## Security

No API keys or secrets belong in this frontend. The AI Mentor is intentionally local until a secure server-side backend is connected. Cybersecurity labs are fictional educational exercises and do not connect to real systems. User notes are escaped before rendering as HTML.

## Offline/PWA

After the first successful load from an HTTP(S) origin, the service worker caches the app shell and learning data. User-generated notes and progress remain in browser local storage.

## Validation

GitHub Actions runs on pushes and pull requests to `main` and checks:

1. JavaScript syntax with Node.js.
2. JSON and web-manifest parsing.
3. Required application files.

## Project direction

The next major architecture step is a secure server-side AI proxy for Nova. API keys must remain server-side; never place them in browser JavaScript, JSON data, or the public repository.
