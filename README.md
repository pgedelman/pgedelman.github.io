# Paul Edelman - Portfolio Website

Welcome to the repository for my personal portfolio website. This project showcases my skills, projects, and professional experience as a Software Engineer and Data Scientist.

**Live Site:** [paul-edelman.com](https://paul-edelman.com)

## 🚀 About The Project

This website serves as a central hub for my professional identity. It is designed to be clean, responsive, and interactive, providing visitors with an overview of my technical capabilities and career journey.

### Key Features
*   **Edge-anchored layout:** Each section has its own color and panels that attach to the side of the screen (About blue, Projects gold, Experience red, Contact red).
*   **Color meaning:** Blue marks personal items, gold marks things I've built, and red marks work and hiring.
*   **Skill filtering:** Hover or tap a skill to dim projects that don't use it; hover a project to light up its skills (shown in a floating strip if the bar is off screen).
*   **Expandable experience timeline:** Every role shows its key bullets, with longer ones expanding on demand.
*   **Command palette:** Press `Ctrl K` / `⌘ K` to jump to any section, project, or the resume.
*   **In-page PDF viewer:** Resume and research abstract open in a modal with download and open-in-new-tab options.
*   **Responsive:** Tuned for desktop down to 360px-wide phones; respects reduced-motion settings.

## 🛠️ Built With

*   **Framework:** [React](https://reactjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** CSS3 (Custom responsive layouts)
*   **Deployment:** GitHub Pages

## 💻 Getting Started

To run this project locally, follow these steps:

### Prerequisites
*   Node.js and npm installed.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/pgedelman/pgedelman.github.io.git
    cd pgedelman.github.io
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm start
    ```
    The app will run in development mode at `http://localhost:3000`.

## 🚢 Deployment

The site is served by GitHub Pages from the `gh-pages` branch. To publish:

```bash
npm run deploy   # builds, then pushes build/ to gh-pages
```

`public/CNAME` keeps the `paul-edelman.com` custom domain in every deploy.

## 📂 Project Structure

*   `src/data/content.ts`: All site text: profile, stats, projects, experience, skills.
*   `src/App.tsx`: Page sections (hero, projects, experience, contact).
*   `src/components`: Command palette, PDF modal, social links.
*   `src/hooks.ts`: Scroll, in-view, and count-up hooks.
*   `src/styles/site.css`: All styling, including the color tokens.

## 📫 Contact

Paul Edelman - LinkedIn

Project Link: https://github.com/pgedelman/pgedelman.github.io
