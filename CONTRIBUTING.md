## Contributing

Contributions are welcome. please open an issue to discuss what you'd like to change or add — this avoids duplicate work and keeps things aligned.

**Steps:**

1. Fork the repository
2. Create a new branch: `git checkout -b feat/your-feature-name`
3. Make your changes
4. Commit using the format below
5. Push to your branch: `git push origin feat/your-feature-name`
6. Open a Pull Request



---

**Commit Format:**

```
type(scope): short description
```

**Examples:**

```
feat(generator): add Next.js scaffolding support
fix(install): handle rollback on failed npm install
docs(readme): update roadmap section
refactor(prompts): simplify framework selection logic
```

**Types**: `feat` · `fix` · `docs` · `refactor` · `chore` · `etc..`

---

## How To Use

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
