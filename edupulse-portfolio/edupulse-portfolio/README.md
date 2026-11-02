# Advanced Python Programming Portfolio — EduPulse

A static, dependency-free portfolio website (HTML, CSS, JavaScript). No build step.

## Run it
Open `index.html` in any modern browser. (Fonts load from Google Fonts when online; the site falls back to system fonts offline.)

## Folder structure
```
edupulse-portfolio/
├── index.html
├── css/style.css
├── js/script.js
└── assets/
    ├── storyboard/storyboard.jpg        Activity 1
    ├── activities/python-tutorial.jpg   Activity 2
    ├── activities/iot-notebook.jpg      Activity 3
    ├── activities/class-quiz.jpg        Activity 4
    ├── activities/padlet.png            Activity 9
    ├── project/architecture.png         (add your architecture diagram)
    └── documents/edupulse-writeup.pdf   (add your project write-up PDF)
```

## Files you still need to add
| File | Where it appears |
|---|---|
| `assets/documents/edupulse-writeup.pdf` | Documentation section: PDF preview and "Open PDF" button |
| `assets/project/architecture.png` | Documentation section: architecture diagram preview |

Until these exist, the page shows a clear note with the expected file name instead of a broken image. Copy the files in with exactly these names, or change the paths in `index.html`.

## Editing content
- **Text**: edit `index.html`; each activity is one `<article>` block, numbered 01–09 in the comments.
- **Links**: search `index.html` for `href="https://` and replace the URL. The presentation and demo links are in the Activities cards.
- **Images**: replace the file in `assets/` keeping the same name, or update the `src` and `alt` text.
- **Colours**: the palette is defined at the top of `css/style.css` under `:root`.

## Notes
- StudyCompass is shown only as the external partner recommendation service.
- Interactions: responsive menu, smooth scroll, active-section highlighting, image lightbox (click image or button, Esc to close), expandable project details, back-to-top.
