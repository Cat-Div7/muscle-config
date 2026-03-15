# muscle-config

> Frontend scaffolding done right, every time.

`muscle-config` is a CLI tool that scaffolds production-ready frontend projects with a clean, opinionated folder structure — picking your framework, language, styling, routing, state management, and architecture in one guided setup.

---

## Quick Start (Not Available for now yet)

```bash
npx muscle-config
```

No installation required.

---

## What It Does

Instead of spending hours setting up a new project from scratch, `muscle-config` walks you through a series of prompts and generates a complete, ready-to-code frontend project with:

- The right folder structure for your chosen architecture
- All necessary dependencies installed
- Config files pre-configured (TypeScript, ESLint, path aliases, etc.)
- Component library setup (MUI, Tailwind, Normal CSS)
- Routing, state management, and service layers scaffolded out of the box

---

## Safe by Design

If anything fails mid-installation, `muscle-config` automatically rolls back and cleans up. No half-scaffolded projects left behind.

---

## How It Works

`muscle-config` asks you a series of questions and generates a complete, ready-to-code frontend project in seconds.
```
1. Where to create    → new folder or current directory
2. Project name       → only if new folder
3. Framework          → React + TypeScript or JavaScript
4. Styling            → Tailwind CSS v4 / MUI / Plain CSS / None
5. Styling config     → options specific to chosen styling solution
6. Architecture       → Feature-based / Layered / Skip
7. Prettier           → formatting config, merges with Tailwind plugin if present
8. Git                → optional git init + initial commit
9. Done               → project is ready
```

Each choice builds on the previous one. When done, you get a fully scaffolded project with the right folder structure, dependencies installed, and config files ready — no manual setup needed.

---

## CLI Flow (For More Details)
```
Welcome screen
│
├── Q: Where would you like to create the project?
│         ❯ Create in a new folder
│           Use current directory
│
│     └── [ if current directory is not empty ]
│               ⚠ Files detected: file1, file2 ...
│
│               Q: Creating a project here will overwrite existing files.
│                  What would you like to do?
│                       ❯ Cancel (recommended)
│                         Continue anyway (deletes existing files)
│
├── Q: Project name?                    ← only if "new folder"
│         ❯ my-app
│
├── Q: Choose your React setup:
│         ❯ React + TypeScript
│           React + JavaScript
│
└── Q: Choose your styling solution:
          ❯ Tailwind CSS v4
            MUI (Material UI)
            None (plain CSS)
            Skip


── If Tailwind ────────────────────────────────────────────────

├── Q: Tailwind configuration mode?
│         ❯ Beginner  (recommended)
│           Advanced  (full control)
│
├── [ Beginner ]
│     │
│     ├── Q: Enable Dark Mode?
│     │         ❯ Yes  →  class strategy + ThemeToggle auto included
│     │           No
│     │
│     └── Q: Choose a primary color:
│               ❯ Indigo / Emerald / Neutral / Custom HEX / Skip
│
├── [ Advanced ]
│     │
│     ├── Q: Enable Dark Mode?
│     │         ❯ Yes
│     │           No
│     │
│     │     └── Q: Dark Mode strategy:
│     │                 ❯ Manual toggle (class)  (recommended)
│     │                   System preference (media)
│     │
│     │               └── Q: Add ThemeToggle component?  ← only if "class"
│     │                           ❯ Yes
│     │                             No
│     │
│     ├── Q: Choose a primary color:
│     │         ❯ Indigo / Emerald / Neutral / Custom HEX / Skip
│     │
│     └── Q: Choose default font:
│               ❯ Inter   — clean, modern, readable
│                 Poppins — rounded, great for dashboards
│                 Cairo   — elegant, great for bilingual apps
│                 Skip
│
└── Q: Add Prettier plugin for Tailwind class sorting? (recommended)
          ❯ Yes                                    ← fires for both Beginner and Advanced
            No


── If MUI ─────────────────────────────────────────────────────

├── Q: Default theme mode:
│         ❯ Light
│           Dark
│           System preference
│
├── Q: Add dark mode toggle component? (recommended — required for demo)
│         ❯ Yes
│           No
│
├── Q: Choose a primary color:
│         ❯ Blue / Purple / Green / Custom HEX
│
├── Q: Add MUI Icons package? (@mui/icons-material)
│         ❯ Yes
│           No
├── Q: Choose a default font:
│         ❯ Inter   — clean, modern, readable
│           Poppins — rounded, great for dashboards
│           Cairo   — elegant, great for bilingual apps
│           Skip
│
└── Q: Override App.jsx with a MUI demo template?  ← only if toggle = Yes
          ❯ Yes
            No

── If CSS ─────────────────────────────────────────────────────

├── Q: CSS configuration mode?
│         ❯ Beginner  (recommended)
│           Advanced  (full control)
│           Skip  (use Vite default)
│
├── [ Beginner ]
│     │
│     ├── Q: Add a CSS reset?
│     │         ❯ Yes / No
│     │
│     ├── Q: Choose a primary color:
│     │         ❯ Indigo / Emerald / Neutral / Custom HEX / Skip
│     │
│     └── Q: Enable dark mode?
│               ❯ Yes  →  media strategy (automatic)
│                 No
│
└── [ Advanced ]
      │
      ├── Q: Add a CSS reset?
      │         ❯ Yes / No
      │
      ├── Q: Choose a primary color:
      │         ❯ Indigo / Emerald / Neutral / Custom HEX / Skip
      │
      ├── Q: Enable dark mode?
      │         ❯ Yes
      │           No
      │
      │     └── Q: Dark mode strategy:
      │                 ❯ Manual toggle (class)  (recommended)
      │                   System preference (media)
      │
      │               └── Q: Add ThemeToggle component?  ← only if "class"
      │                           ❯ Yes
      │                             No
      │
      ├── Q: Choose a default font:
      │         ❯ Inter / Poppins / Cairo / Skip
      │
      ├── Q: Generate separate CSS files? (variables, reset, typography)
      │         ❯ Yes  →  creates src/styles/ folder
      │           No   →  everything in one index.css
      └── Q: Override App.jsx with a CSS demo template?  ← only if toggle = Yes
                ❯ Yes
                  No

── If None ────────────────────────────────────────────────────
│
└── → No extra steps, plain Vite CSS stays as-is


── Architecture ───────────────────────────────────────────────

├── Q: Choose architecture style:
│         ❯ Layered        (recommended for small/mid apps) - more popular
│           Feature-based  (recommended for large apps)
│           Skip
│
├── [ Feature-based ]
│     │
│     ├── Q: Select features to generate:
│     │         ❯ ◉ auth  ○ dashboard  ○ profile
│     │           ○ settings  ○ home  ○ products
│     │           ○ cart  ○ checkout
│     │
│     ├── Q: Select folders inside each feature:
│     │         ❯ ◉ components  ◉ hooks  ◉ services
│     │           ○ utils  ○ types  ○ validators  ○ api
│     │
│     ├── Q: Select shared folders in src/:
│     │         ❯ ◉ components  ◉ hooks  ◉ layouts  ◉ pages
│     │           ○ services  ○ utils  ○ types  ○ assets
│     │           ○ api  ○ validators  ○ templates
│     │           ○ themes  ○ lib
│     │
│     └── Q: Select folders to add an index file to:
│               ❯ ○ components  ○ hooks  ○ services ...
│
└── [ Layered ]
      │
      ├── Q: Select folders in src/:
      │         ❯ ◉ components  ◉ hooks  ◉ pages  ◉ layouts
      │           ○ services  ○ utils  ○ types  ○ assets
      │           ○ api  ○ validators  ○ templates
      │
      └── Q: Select folders to add an index file to:
                ❯ ○ components  ○ hooks  ○ pages ...

── Prettier ───────────────────────────────────────────────────
│
├── Q: Add Prettier?
│         ❯ Yes
│           No
│
├── Q: Use single quotes?
│         ❯ Yes / No
│
├── Q: Use semicolons?
│         ❯ Yes / No
│
└── Q: Tab width:
          ❯ 2 spaces  (recommended)
            4 spaces

  [ if Tailwind + prettierTailwind was selected ]
  → .prettierrc already exists with plugin config
  → formatting prefs are merged in, plugin is preserved

── Git ────────────────────────────────────────────────────────
│
├── Q: Initialize a Git repository?
│         ❯ Yes
│           No
│
└── [ if Yes ]
      │
      ├── Q: Create an initial commit?
      │         ❯ Yes
      │           No
      │
      └── [ if Yes ]
                → commit message: "chore: initial commit"

```

---

 ## 🛠 Supported Options

| Category          | Available Now                                      | Coming Soon                        |
|-------------------|----------------------------------------------------|------------------------------------|
| Framework         | React + TypeScript, React + JavaScript             | Next.js, Vue, Svelte               |
| Styling           | Tailwind CSS v4, MUI, Plain CSS, None              | —                                  |
| Architecture      | Feature-based, Layered, Skip                       | —                                  |
| Formatter         | Prettier (with Tailwind plugin merge)              | ESLint config                      |
| Version Control   | Git init, Initial commit                           | —                                  |
| Path Aliases      | —                                                  | @components, @hooks, @pages, etc.. |
| Optional Libraries| —                                                  | axios, lucide-react, framer-motion, etc.. |
| State Management  | —                                                  | Zustand, Context API boilerplate   |
| Routing           | —                                                  | React Router DOM                   |
| Templates         | —                                                  | Custom template support            |

---

## 🗂 Example Output Structure
```
my-app/
├── src/
│   ├── features/
│   │   └── auth/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── services/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── types/
│   ├── utils/
│   ├── index.css
│   ├── App.tsx
│   └── main.tsx
├── public/
├── tsconfig.json
├── .eslintrc.json
├── tailwind.config.ts
├── .prettierrc
├── .prettierignore
└── package.json
```

---

## Roadmap

- [x] React + TypeScript/JavaScript
- [x] Tailwind CSS v4
- [x] MUI (Material UI)
- [x] Normal CSS utilities
- [x] Rollback on failure
- [x] Feature-based and Layered architecture
- [x] Prettier pre-configured
- [x] Git init + initial commit
- [ ] Path aliases (@context, @themes, @root)
- [ ] Optional libraries (axios, lucide-react, framer-motion, react-query, etc..)
- [ ] Zustand + React Query setup
- [ ] Custom template support
- [ ] Next.js support
- [ ] Vue / Svelte support (future)

---

## Project Structure (This Repo)
```
muscle-config/
├── src/
│   ├── commands/
│   │   └── create.command.ts             # Main create command orchestration
│   ├── config/
│   │   └── projectConfig.ts              # Project configuration types & defaults
│   ├── features/
│   │   ├── feature.interface.ts          # Feature contract interface
│   │   ├── tailwind.feature.ts           # Tailwind v4 setup orchestration
│   │   ├── mui.feature.ts                # MUI setup orchestration
│   │   ├── css.feature.ts                # Plain CSS setup orchestration
│   │   ├── architecture.feature.ts       # Architecture folder generation
│   │   ├── prettier.feature.ts           # Prettier setup + .prettierrc merge
│   │   └── git.feature.ts                # Git init + initial commit
│   ├── generators/
│   │   ├── react.generator.ts            # React + Vite scaffolding
│   │   ├── css.generator.ts              # Tailwind index.css generator
│   │   ├── css-plain.generator.ts        # Plain CSS generator (reset, variables, typography)
│   │   ├── tailwind.config.generator.ts  # tailwind.config.ts/js generator
│   │   ├── toggle.generator.ts           # Tailwind ThemeToggle generator
│   │   ├── mui.generator.ts              # MUI files generator (theme, context, providers)
│   │   └── architecture.generator.ts     # Folder structure generator
│   ├── prompts/
│   │   ├── directory.prompt.ts           # Output directory prompt
│   │   ├── projectName.prompt.ts         # Project name prompt
│   │   ├── framework.prompt.ts           # Framework selection prompt
│   │   ├── styling.prompt.ts             # Styling solution prompt
│   │   ├── tailwind.prompt.ts            # Tailwind configuration prompts
│   │   ├── mui.prompt.ts                 # MUI configuration prompts
│   │   ├── css.prompt.ts                 # Plain CSS configuration prompts
│   │   ├── architecture.prompt.ts        # Architecture configuration prompts
│   │   ├── prettier.prompt.ts            # Prettier configuration prompts
│   │   └── git.prompt.ts                 # Git configuration prompts
│   ├── templates/
│   │   ├── react/
│   │   │   ├── tailwind-v4/
│   │   │   │   ├── vite.config.ts        # Vite config with Tailwind plugin (TS)
│   │   │   │   ├── vite.config.js        # Vite config with Tailwind plugin (JS)
│   │   │   │   └── index.css             # Base Tailwind CSS template
│   │   │   ├── mui/
│   │   │   │   ├── App.tsx               # MUI demo template (TS)
│   │   │   │   └── App.jsx               # MUI demo template (JS)
│   │   │   └── css/
│   │   │       ├── App.tsx               # CSS demo template (TS)
│   │   │       └── App.jsx               # CSS demo template (JS)
│   │   ├── nextjs/                       # (coming soon)
│   │   └── shared/                       # Shared static templates (coming soon)
│   ├── utils/
│   │   ├── welcome.ts                    # CLI welcome screen
│   │   ├── logger.ts                     # Colored console output
│   │   ├── spinner.ts                    # Loading spinner helper
│   │   ├── directory.ts                  # Directory check and cleanup helpers
│   │   ├── rollback.ts                   # Project and feature rollback utilities
│   │   ├── files.ts                      # File/folder helpers (Not Available for now)
│   │   └── install.ts                    # Dependency installer
│   └── index.ts                          # Entry point
├── package.json
├── tsconfig.json
└── README.md
```