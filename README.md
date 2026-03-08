# muscle-config

> Frontend scaffolding done right, every time.

`muscle-config` is a CLI tool that scaffolds production-ready frontend projects with a clean, opinionated folder structure — picking your framework, language, styling, routing, state management, and architecture in one guided setup.

---

## Usage (Not Available for now)

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

## CLI Flow
```
Welcome screen
│
├── Q: Where would you like to create the project?
│         ❯ Create in a new folder
│           Use current directory
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
│                 ❯ Indigo / Emerald / Neutral / Custom HEX / Skip
│
└── [ Advanced ]
      │
      ├── Q: Enable Dark Mode?
      │         ❯ Yes
      │           No
      │
      │     └── Q: Dark Mode strategy:
      │                 ❯ Manual toggle (class)  (recommended)
      │                   System preference (media)
      │
      │               └── Q: Add ThemeToggle component?  ← only if "class"
      │                           ❯ Yes
      │                             No
      │
      ├── Q: Choose a primary color:
      │         ❯ Indigo / Emerald / Neutral / Custom HEX / Skip
      │
      └── Q: Choose default font:
                ❯ Inter   — clean, modern, readable
                  Poppins — rounded, great for dashboards
                  Cairo   — elegant, great for bilingual apps
                  Skip


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
│
└── Q: Override App.jsx with a MUI demo template?  ← only if toggle = Yes
          ❯ Yes
            No


── If None ────────────────────────────────────────────────────

└── → No extra steps, plain Vite CSS stays as-is
```

---

## Local Development & How To Use

Clone the repo and install dependencies:
```bash
# HTTP
git clone https://github.com/Cat-Div7/muscle-config.git
# SSH
git clone git@github.com:Cat-Div7/muscle-config.git

# Install Dependencies
cd muscle-config
npm install
```

Build and Run the project:
```bash
npm run build
npm run start
```

Link globally to use the `muscle-config` command anywhere on your machine:
```bash
npm link
```

Now you can run:
```bash
muscle-config
```

To unlink when you're done:
```bash
npm unlink -g muscle-config
```
---


## 🛠 Supported Options

| Category          | Options                              |
|-------------------|--------------------------------------|
| Framework         | React, Next.js                       |
| Language          | TypeScript, JavaScript               |
| Styling           | Tailwind CSS, MUI, Normal CSS        |
| Routing           | React Router DOM                     |
| State Management  | Context API, Zustand                 |
| Architecture      | Feature-based, Layered               |
| Extra Directories | hooks/, services/, ui/, layouts/, types/, utils/ |

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
│   ├── layouts/
│   ├── ui/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── main.tsx
├── public/
├── tsconfig.json
├── .eslintrc.json
├── tailwind.config.ts
└── package.json
```

---

## Roadmap

- [x] React + TypeScript/JavaScript
- [x] Tailwind CSS v4
- [x] MUI (Material UI)
- [ ] Normal CSS utilities
- [ ] Feature-based and Layered architecture
- [ ] Next.js support
- [ ] Zustand + React Query setup
- [ ] ESLint + Prettier pre-configured
- [ ] Git init + initial commit
- [ ] Path aliases (@context, @themes, @root)
- [ ] Rollback on failure
- [ ] Custom template support
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
│   │   └── mui.feature.ts                # MUI setup orchestration
│   ├── generators/
│   │   ├── react.generator.ts            # React + Vite scaffolding
│   │   ├── css.generator.ts              # Tailwind index.css generator
│   │   ├── tailwind.config.generator.ts  # tailwind.config.ts/js generator
│   │   ├── toggle.generator.ts           # Tailwind ThemeToggle generator
│   │   └── mui.generator.ts              # MUI files generator (theme, context, providers)
│   ├── prompts/
│   │   ├── directory.prompt.ts           # Output directory prompt
│   │   ├── projectName.prompt.ts         # Project name prompt
│   │   ├── framework.prompt.ts           # Framework selection prompt
│   │   ├── styling.prompt.ts             # Styling solution prompt
│   │   ├── tailwind.prompt.ts            # Tailwind configuration prompts
│   │   └── mui.prompt.ts                 # MUI configuration prompts
│   ├── templates/                        # Static template files
│   │   ├── react/
│   │   │   ├── tailwind-v4/
│   │   │   │   ├── vite.config.ts        # Vite config with Tailwind plugin (TS)
│   │   │   │   ├── vite.config.js        # Vite config with Tailwind plugin (JS)
│   │   │   │   └── index.css             # Base Tailwind CSS template
│   │   │   └── mui/
│   │   │       ├── App.tsx               # MUI demo template (TS)
│   │   │       └── App.jsx               # MUI demo template (JS)
│   │   ├── nextjs/                       # (coming soon)
│   │   └── shared/                       # Shared static templates
│   ├── utils/
│   │   ├── welcome.ts                    # CLI welcome screen
│   │   ├── logger.ts                     # Colored console output
│   │   ├── spinner.ts                    # Loading spinner helper
│   │   ├── files.ts                      # File/folder helpers
│   │   └── install.ts                    # Dependency installer
│   └── index.ts                          # Entry point
├── package.json
├── tsconfig.json
└── README.md
```
