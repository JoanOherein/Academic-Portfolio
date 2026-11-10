# Responsive Student Portfolio and Academic Management Website

A multi-page portfolio and academic management project for **COS 106 – Introduction to Web Technologies** at **Miva Open University**.

## Student information

- Student: Joan Oherein
- Programme: BSc Data Science
- Course: COS 106 – Introduction to Web Technologies
- Institution: Miva Open University


## Technologies

HTML5, CSS3, and vanilla JavaScript only. No frameworks are required.

## Pages

- `index.html`: portfolio introduction, interests, featured work, and profile facts
- `about.html`: biography, education timeline, experience, skills, interests, table, and video alternative
- `projects.html`: three sample portfolio projects
- `planner.html`: persistent interactive academic task manager
- `contact.html`: front-end validated contact form

## Folder structure

```text
Academic Portfolio/
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
├── assets/
│   ├── audio/
│   │   └── Joan intoduction.mp3.ogg
│   └── images/
│       ├── Profile.Jpeg
│       ├── project 1.png
│       ├── Project 2.png
│       ├── Project 3.png
│       ├── profile.svg
│       ├── planner.svg
│       ├── process.svg
│       ├── sales-dashboard.svg
│       └── profile-introduction.vtt
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Run locally

1. Open the project folder in Visual Studio Code.
2. Install the recommended preview experience or use the Live Server extension.
3. Start Live Server from `index.html`.
4. If Live Server is unavailable, open `index.html` directly in a browser. `localStorage` and most features work in this mode, although Live Server is preferred.

## Academic planner

The planner stores an array of task objects in browser `localStorage`. Tasks can be added with the Add Task button or Enter key, completed with a checkbox, deleted individually, and filtered as All, Pending, or Completed. Summary counts and progress update automatically. Invalid saved data is ignored safely. Refreshing the page preserves tasks in the same browser.

No starter tasks are silently inserted. The placeholder text in the task field is an optional example only.

## Contact validation

The JavaScript checks every field for a trimmed value, validates the email format, requires digits-only phone input, and applies a configurable minimum phone length in `MINIMUM_PHONE_LENGTH` in `js/script.js`. Errors appear beside fields and invalid controls receive accessible styling and `aria-invalid` states.

This website has no backend. Valid contact form submission only confirms that validation passed; it does not send or deliver a message. Contact email and phone fields in the interface are intentionally placeholders.

## Replace profile and project images

- Replace `assets/images/Profile.Jpeg` with the student's real photograph if desired. Keep this filename to avoid changing the HTML, or update both home and About page image paths.
- `assets/images/profile.svg` is the local fallback and replacement placeholder.
- Sales, planner, and process project artwork are in `assets/images/sales-dashboard.svg`, `assets/images/planner.svg`, and `assets/images/process.svg`.
- Update the `[Add your email address]` and `[Add your phone number]` labels in `contact.html` only when real, permitted details are available.
- Add a personally created or appropriately licensed video as `assets/images/profile-introduction.mp4`. The captions file is `assets/images/profile-introduction.vtt`.

## Add your professional audio

The professional journey recording plays from `assets/audio/Joan intoduction.mp3.ogg` in the About page audio player.

## Publish with GitHub Pages

1. Create a GitHub repository and upload this project folder.
2. Open the repository settings.
3. Select **Pages** in the sidebar.
4. Under Build and deployment, choose **Deploy from a branch**.
5. Select the main branch and the root folder, then save.
6. Wait for GitHub to publish the site, then open the URL shown in the Pages settings.
7. Confirm every page and asset works from the published address.

Keep filenames in lowercase and use forward-slash paths so the project works on GitHub Pages and local servers.

## Requirements checklist

| Requirement | Implementation |
|---|---|
| Five linked HTML pages | `index.html`, `about.html`, `projects.html`, `planner.html`, `contact.html` |
| External CSS and responsive design | `css/style.css`, media queries at tablet and mobile widths |
| Semantic HTML | Headers, navigation, main, sections, articles, aside, footer |
| HTML table | Skills table in `about.html` |
| Lists | Ordered and unordered lists in About and project pages |
| Images and alt text | Local project artwork and profile placeholders in `assets/images/` |
| Hyperlinks | Navigation, project links, internal page sections and planner demo |
| Video and fallback text | Local HTML5 video placeholder on `about.html`; captions file in `assets/images/profile-introduction.vtt` |
| Shared navigation and active states | Identical navigation structure and CSS `.active` styling across pages |
| Mobile navigation | `.nav-toggle` and JavaScript in shared script |
| Contact form validation | Empty fields, trimmed values, email format, and digits-only phone validation |
| Interactive planner | Shared JavaScript add, toggle, delete, filter, summary, progress, and render functions |
| Persistent planner data | `localStorage` key `joanAcademicTasks`, with safe loading |
| Accessibility | Skip links, visible focus states, labels, aria-live feedback, captions hook, descriptive alt text |
| Animations and reduced motion | Entrance animation and `prefers-reduced-motion` in CSS |

## Before submission

- Replace only permitted placeholders with Joan's actual photograph or media.
- Test all five pages at desktop, tablet, and mobile widths.
- Add, complete, delete, and filter planner tasks, then refresh to verify persistence.
- Test valid and invalid contact values.
- Verify GitHub Pages links and local assets after publishing.
