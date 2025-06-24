# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal website/portfolio for Trevor Noon built with vanilla HTML, CSS, and JavaScript. It features a Bento-style grid layout inspired by Bento.me platform and is designed for deployment on GitHub Pages with a custom domain (trevornoon.com).

## Development Commands

Since this is a static website with no build tools or package managers, development is straightforward:

- **Preview**: Open `index.html` directly in a web browser
- **Image Processing**: Node.js scripts are available in the `/js` directory for generating company logos and processing images. These require Node.js with the `canvas` package installed.

## Architecture

### Core Files
- `index.html` - Single-page application with all content
- `styles.css` - Complete styling with CSS custom properties for theming
- No JavaScript frameworks - uses vanilla DOM manipulation

### Content Structure
The page uses a sidebar navigation with smooth scrolling to these main sections:
- **Welcome**: Introduction and business link
- **Experience**: Professional history with interactive modals
- **Links**: External links (calendar, resume, LinkedIn, YouTube)
- **Interests**: Personal content (movies, music, photos)

### Modal System
Interactive experience items use a data-driven modal system:
- Experience data stored as `data-experience` attributes in HTML
- JavaScript handles modal open/close with keyboard support
- Modals contain detailed job descriptions and achievements

### Image Organization
```
images/
├── experience/     # Company logos (generated via Node.js scripts)
├── interests/      # Personal photos
├── links/          # Link button icons
└── headshot.png    # Profile photo
```

### Node.js Utilities
Scripts in `/js` directory for content generation:
- `add-company-logos.js` - Generates company logos using HTML5 Canvas
- Image processing utilities for creating consistent branding
- These are development utilities, not part of the website runtime

## Styling Architecture

### CSS Custom Properties
The design system uses CSS variables for consistent theming:
- Color palette defined at root level
- Typography scale using Inter font
- Consistent spacing and border radius values

### Layout System
- **CSS Grid**: Main content area uses a responsive bento-style grid
- **Flexbox**: Sidebar navigation and individual component layouts
- **Mobile-first**: Responsive design with desktop enhancements

## Content Management

### Adding Experience Items
1. Add company logo to `images/experience/`
2. Create grid item in HTML with `data-experience` attribute containing JSON
3. Include modal content with job title, dates, and description
4. Style may need updates for new grid items

### Updating Links
External links are managed in the Links section with corresponding icons in `images/links/`

## Deployment

This site is configured for GitHub Pages deployment:
- `CNAME` file contains custom domain `trevornoon.com`
- All files are static and ready for immediate hosting
- No build process required

## Development Notes

- The site prioritizes performance with minimal JavaScript and optimized images
- All external links open in new tabs for better UX
- Keyboard accessibility is implemented (ESC key closes modals)
- No user input processing keeps the attack surface minimal