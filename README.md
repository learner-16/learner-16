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
- Automated GitHub Actions validation and GitHub Pages deployment workflow

## Start on a computer

Download the repository as ZIP from GitHub, extract it, open a terminal in the extracted folder, and run:

```sh
python3 -m http.server 8000
```

Then open:

```
http://localhost:8000
```

Do not open `index.html` directly with `file://`; the app uses ES modules, JSON fetches, and a service worker that require HTTP(S).

## Publish and install from GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. After the Pages workflow completes, open the Pages URL shown by GitHub.
5. In a supported browser, use the browser menu and choose **Install LEARNER 16** or **Add to Home screen**.

The expected project Pages address is:

`https://learner-16.github.io/learner-16/`

GitHub may take a short period after the first deployment to publish the site.

## Security

No API keys or secrets belong in this frontend. The AI Mentor is intentionally local until a secure server-side backend is connected. Cybersecurity labs are fictional educational exercises and do not connect to real systems. User notes are escaped before rendering as HTML.

## Offline/PWA

After the first successful load from an HTTP(S) origin, the service worker caches the app shell and learning data. User-generated notes and progress remain in browser local storage. The service-worker cache is versioned so later releases can replace older cached files.

## Validation

GitHub Actions checks JavaScript syntax, JSON/manifest parsing, and required application files on pushes and pull requests to `main`.

## Project direction

The next major architecture step is a secure server-side AI proxy for Nova. API keys must remain server-side; never place them in browser JavaScript, JSON data, or the public repository.
