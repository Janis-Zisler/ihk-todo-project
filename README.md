# IHK Todo Project

A Vue 3 + Vite todo application with Supabase authentication and task persistence.

## Features

- Email/password sign up and sign in using Supabase Auth
- Protected dashboard route for authenticated users
- Create, update, complete, and delete todo tasks
- Task filtering by All, Ongoing, and Completed
- Persistent user session via Pinia + localStorage
- Responsive UI built with Vuetify 4

## Built With

- Vue 3
- Vite
- Pinia
- Vue Router
- Vuetify 4
- Supabase
- ESLint

## Project Structure

- `src/main.js` - app entry, router and Pinia registration
- `src/router/index.js` - app routes: `/auth` and `/`
- `src/pages/Auth.vue` - authentication page with sign in / sign up tabs
- `src/pages/Dashboard.vue` - task dashboard with filter and add task UI
- `src/store/user.js` - user store and Supabase auth actions
- `src/store/task.js` - task store with Supabase todo CRUD
- `src/utils/supabase.ts` - Supabase client initialization

## Environment Setup

This project requires Supabase environment variables.

Create a `.env` or `.env.local` file in the project root with:

```env
VITE_SUPABASE_URL=https://your-supabase-project-url.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-public-anon-key
```

## Supabase Requirements

1. Create a Supabase project.
2. Enable Email / Password authentication.
3. Create a `todos` table with columns:
   - `id` (integer, primary key, auto increment)
   - `user_id` (text)
   - `task` (text)
   - `is_complete` (boolean)
4. Configure row-level security or policies so authenticated users can read/write their own tasks if needed.

## Installation

```sh
npm install
```

## Development

```sh
npm run dev
```

Open the URL shown in the terminal to view the app.

## Build

```sh
npm run build
```

## Preview Production Build

```sh
npm run preview
```

## Linting

```sh
npm run lint
npm run lint:fix
```

## Notes

- The app automatically checks the current Supabase user on load in `App.vue`.
- Tasks are fetched from Supabase on dashboard mount.
- The task store uses `filteredTasks()` to show filtered results.
- The sign-up flow displays a confirmation dialog when registration succeeds.

## License

This project does not include a license by default.

