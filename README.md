# Automata Theory Visualizer

An interactive educational web application for exploring **Deterministic Finite Automata (DFA)**, **Context-Free Grammars (CFG)**, and **Pushdown Automata (PDA)** through stunning visual simulations. Built with modern React, TypeScript, and Tailwind CSS.

![Tech Stack](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

---

## Features

- **Interactive DFA Simulation**  
  Step through automata state transitions with a live animated graph. Watch each node light up as the simulator processes your input character by character.

- **Two Predefined Languages**
  - **Alphabet DFA** — over alphabet `{a, b}` for the regex:  
    `(aba + bab)(a+b)*(bab)(a+b)*(a+b+ab+ba)(a+b+aa)*`
  - **Binary DFA** — over alphabet `{0, 1}` for the regex:  
    `((101+111)+(1+0+11))(1+0+01)(111+000+101)(1+0)*`

- **Context-Free Grammar (CFG) Blueprint**  
  View formal grammar productions broken into logical parts, mapped directly from the regular expression sub-patterns.

- **Pushdown Automaton (PDA) Flowchart**  
  Explore PDA state diagrams with full transition tables and branching logic visualization.

- **Transition Matrix**  
  A formal state-to-state mapping table that updates in real time during simulation.

- **Team & Credits**  
  Dedicated section showcasing the project team members.

- **User Manual / Tutorial**  
  Built-in guide to help first-time users navigate the app and understand automata concepts.

- **Futuristic Cyberpunk UI**  
  Dark-themed glassmorphism interface with animated orbs, scanlines, and neon accents.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Vite](https://vitejs.dev/) | Fast development & production build tooling |
| [React 18](https://react.dev/) | UI library with hooks & component architecture |
| [TypeScript](https://www.typescriptlang.org/) | Static type safety across the entire codebase |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling & responsive design |
| [Lucide React](https://lucide.dev/) | Beautiful, consistent iconography |

---

## Prerequisites

- **Node.js** `>= 18`
- **npm** or **yarn**

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ShigatoraShuz/Automata-Theory.git
cd Automata-Theory
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### 4. Build for production

```bash
npm run build
```

The static files will be output to the `dist/` folder.

### 5. Preview the production build

```bash
npm run preview
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Compile TypeScript and bundle for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run typecheck` | Run TypeScript compiler in no-emit mode |

---

## Project Structure

```
Automata-Theory/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── SelectionPage.tsx      # Landing / language selector
│   │   ├── DFAPage.tsx            # Main DFA layout with tabs
│   │   ├── DFAGraph.tsx           # SVG animated DFA graph
│   │   ├── SimulationPanel.tsx    # Input & step controls
│   │   ├── CFGSection.tsx         # CFG production viewer
│   │   ├── PDASection.tsx         # PDA table & graph
│   │   ├── PDAGraph.tsx           # SVG PDA diagram
│   │   ├── MembersSection.tsx     # Team credits
│   │   ├── TutorialSection.tsx    # User manual
│   │   └── DFAUIBlurGuide.tsx     # Onboarding guide modal
│   ├── data/
│   │   ├── dfaData.ts            # DFA definitions (alpha & binary)
│   │   └── grammarData.ts        # CFG & PDA definitions
│   ├── types/
│   │   └── index.ts              # Shared TypeScript interfaces
│   ├── App.tsx                   # Root component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles & Tailwind directives
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## How to Use

1. **Launch the app** and choose either **Alphabet DFA** or **Binary DFA** from the home screen.
2. **Enter an input string** in the Simulation Panel (e.g., `abababb` for Alphabet, `01111` for Binary).
3. Click **Step** to advance one character at a time, or **Simulate** to run the full string automatically.
4. Watch the **DFA Graph** highlight the active state and the **Transition Matrix** update in real time.
5. Switch tabs to explore the **CFG Blueprint**, **PDA Flowchart**, **Team**, or **Manual**.

---

## Team

Developed by students passionate about formal languages and automata theory.

---

## License

This project is for educational purposes.

