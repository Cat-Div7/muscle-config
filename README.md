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

## CLI Flow
```
Welcome screen
│
├── Where to create the project?
│     new folder / current directory
│
├── Project name?          ← only if "new folder"
│
├── Choose your React setup:
│     React + TypeScript / React + JavaScript
│
├── Choose your styling solution:
│     Tailwind CSS v4 / MUI / None
│
│
├── [if Tailwind]
│     ├── Configuration mode?
│     │     Beginner / Advanced
│     │
│     ├── [Beginner]
│     │     ├── Enable dark mode? (class strategy, auto toggle)
│     │     └── Primary color preset
│     │
│     └── [Advanced]
│           ├── Enable dark mode?
│           │     └── Strategy: class / media
│           │           └── [class] Add ThemeToggle component?
│           ├── Primary color preset
│           └── Font: Inter / Poppins / Cairo / Skip
│
├── [if MUI]
│     ├── Default theme mode: Light / Dark / System
│     ├── Add dark mode toggle component? Yes / No
│     ├── Primary color preset: Blue / Purple / Green / Custom HEX
│     └── Add MUI Icons package? Yes / No
│
└── [if None]
      └── nothing extra
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

## Safe by Design

If anything fails mid-installation, `muscle-config` automatically rolls back and cleans up. No half-scaffolded projects left behind.

---

## Roadmap

- [x] React + TypeScript/JavaScript
- [ ] Tailwind, MUI, Normal CSS
- [ ] Feature-based and Layered architecture
- [ ] Next.js support
- [ ] Zustand + React Query setup
- [ ] ESLint + Prettier pre-configured
- [ ] Git init + initial commit
- [ ] Custom template support
- [ ] Vue / Svelte support (future)

---

## Project Structure (This Repo)

```
muscle-config/
├── src/
│   ├── commands/
│   │   └── create.command.ts     # Main create command orchestration
│   ├── config/
│   │   └── projectConfig.ts      # Project configuration types & defaults
│   ├── generators/
│   │   └── react.generator.ts    # React scaffolding logic per option
│   ├── prompts/
│   │   ├── framework.prompt.ts   # Framework selection prompt
│   │   ├── directory.prompt.ts   # Output directory prompt
│   │   └── projectName.prompt.ts # Project name prompt
│   ├── templates/                # Static template files
│   │   ├── react/
│   │   ├── nextjs/
│   │   └── shared/
│   ├── utils/
│   │   ├── welcome.ts            # CLI welcome screen
│   │   ├── logger.ts             # Colored console output
│   │   ├── spinner.ts            # Loading spinner helper
│   │   ├── files.ts              # File/folder helpers
│   │   └── install.ts            # Dependency installer
│   └── index.ts                  # Entry point
├── package.json
├── tsconfig.json
└── README.md
```
