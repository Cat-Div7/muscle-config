# muscle-config

> Frontend scaffolding done right, every time.

`muscle-config` is a CLI tool that scaffolds production-ready frontend projects with a clean, opinionated folder structure — picking your framework, language, styling, routing, state management, and architecture in one guided setup.

---

## Usage

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
- Component library setup (MUI, Tailwind, CSS Modules)
- Routing, state management, and service layers scaffolded out of the box

---

## 🛠 Supported Options

| Category          | Options                              |
|-------------------|--------------------------------------|
| Framework         | React, Next.js                       |
| Language          | TypeScript, JavaScript               |
| Styling           | Tailwind CSS, MUI, CSS Modules       |
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
- [x] Tailwind, MUI, CSS Modules
- [x] Feature-based and Layered architecture
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
│   ├── index.js          # Entry point
│   ├── prompts/          # CLI prompt definitions
│   ├── generators/       # Scaffolding logic per option
│   ├── templates/        # Static template files
│   └── utils/
│       ├── welcome.js    # CLI welcome screen
│       ├── files.js      # File/folder helpers
│       └── install.js    # Dependency installer
├── package.json
└── README.md
```

---

## Contributing

Contributions are welcome. Open an issue first to discuss what you'd like to change.

**Steps:**

1. Fork the repository
2. Create a new branch: `git checkout -b feat/your-feature-name`
3. Make your changes
4. Commit using the format below
5. Push to your branch: `git push origin feat/your-feature-name`
6. Open a Pull Request

**Commit format:**
```
type(scope): short description

feat(generator): add Next.js scaffolding support
fix(install): handle rollback on failed npm install
docs(readme): update roadmap section
```

Types: `feat` · `fix` · `docs` · `refactor` · `chore`
```

And the commit name for adding this to the README:
```

<!-- --- -->
