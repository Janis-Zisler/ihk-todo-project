# Ironhack Todo Project

A Vue 3 todo application with Supabase authentication, built as a final project for the Ironhack bootcamp. Deployed on GitHub Pages.

🔗 **Live Demo:** [janis-zisler.github.io/ihk-todo-project](https://janis-zisler.github.io/ihk-todo-project/)

## Features

- Email/password sign up and sign in via Supabase Auth
- Persistent session and theme preference across reloads (Pinia + `pinia-plugin-persistedstate`)
- Create, update, complete, and delete tasks (full CRUD against Supabase)
- Task filtering by **All**, **Ongoing**, and **Completed**
- Light/dark theme toggle
- Responsive UI built with Vuetify
- Automatic deployment to GitHub Pages via GitHub Actions

## Tech Stack

| Layer       | Technology                          |
|-------------|--------------------------------------|
| Framework   | Vue 3 (`<script setup>`)             |
| Build Tool  | Vite                                 |
| UI Library  | Vuetify                              |
| State       | Pinia + Pinia Persist                |
| Routing     | Vue Router                           |
| Backend     | Supabase (Auth + Postgres)           |
| Linting     | ESLint (flat config)                 |
| Deployment  | GitHub Pages via GitHub Actions      |

## Project Structure

```
src/
├── components/
│   ├── AppHeader.vue      # Top app bar
│   ├── NavDrawer.vue      # Navigation drawer
│   ├── NewTask.vue        # Task creation form
│   ├── ShowErrorMsg.vue   # Error message display
│   ├── SignIn.vue         # Sign in form
│   ├── SignUp.vue         # Sign up form
│   └── TaskItem.vue       # Single task row (toggle/edit/delete)
├── pages/
│   ├── Auth.vue           # Auth page (sign in / sign up)
│   └── Dashboard.vue      # Task dashboard
├── plugins/
│   └── vuetify.js         # Vuetify setup
├── router/
│   └── index.js           # Route definitions
├── store/
│   ├── error.js           # Centralized error state
│   ├── task.js            # Task store (CRUD + filtering getters)
│   └── user.js            # User/session store (auth actions, persisted)
├── utils/
│   └── supabase.ts        # Supabase client init
└── static/
    └── main.css
```

## Routes

| Path     | Component       | Description          |
|----------|------------------|-----------------------|
| `/`      | `Dashboard.vue`  | Task dashboard        |
| `/auth`  | `Auth.vue`       | Sign in / Sign up     |

## Getting Started

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- A Supabase project

### Installation

```sh
git clone https://github.com/Janis-Zisler/ihk-todo-project.git
cd ihk-todo-project
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your own Supabase credentials:

```sh
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-supabase-project-url.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

> ⚠️ `.env` is gitignored — never commit real credentials.

### Supabase Setup

1. Create a Supabase project.
2. Enable **Email/Password** authentication.
3. Create a `todos` table:

   | Column        | Type      | Notes                  |
   |---------------|-----------|--------------------------|
   | `id`          | `int8`    | primary key, identity   |
   | `user_id`     | `uuid`    | references `auth.users` |
   | `task`        | `text`    |                          |
   | `is_complete` | `boolean` | default `false`         |

4. Enable **Row Level Security (RLS)** on `todos` and add policies so users can only read/write their own rows (e.g. `user_id = auth.uid()`).

### Development

```sh
npm run dev
```

### Build & Preview

```sh
npm run build
npm run preview
```

### Linting

```sh
npm run lint
npm run lint:fix
```

## Deployment

Deployment to GitHub Pages happens automatically via `.github/workflows/deploy.yml` on every push to `main`. The workflow builds the project and publishes the `dist/` folder using `actions/deploy-pages`.

Supabase credentials for the build are pulled from **GitHub Actions repository secrets**:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

The Vite `base` path is set to `/ihk-todo-project/` in `vite.config.js` to match the GitHub Pages subpath.

## State Management Notes

- **`store/user.js`**: holds `user`, `theme`, and form validation `rules`. Persisted via `pinia-plugin-persistedstate` (`pick: ['user', 'theme']`) so session and theme survive page reloads.
- **`store/task.js`**: holds the `tasks` array and exposes getters (`indexOfId`, `orderedTasks`) plus actions for Supabase CRUD and client-side filtering.
- **`store/error.js`**: centralized store for surfacing Supabase/auth errors in the UI.

## Legal Notice

This project is publicly deployed and processes personal data (email addresses) via Supabase Auth. As required for public deployments under German law, an **Impressum (§ 5 TMG)** and **Datenschutzerklärung (DSGVO Art. 13)** are planned/included — see the corresponding routes in the app.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
