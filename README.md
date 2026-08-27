# Kindervale Portal

A modern school management frontend built with **Next.js**, **React**, and **TypeScript**. The portal provides a clean dashboard experience for managing students, teachers, parents, attendance, homework, fees, exams, reports, calendar events, and school settings.

---

## Key Features

- **Role-Based Portal Experience:** Protected dashboard shell with authentication state, token storage, and automatic login redirects.
- **School Dashboard:** Overview screens for daily school activity, attendance, reports, and operational metrics.
- **Student & Teacher Management:** Dedicated interfaces for students, teachers, parents, and related school records.
- **Academic Workflows:** Attendance, homework, exams, reports, calendar, and fee management pages.
- **API Integration:** Axios client with JWT authorization headers, refresh-token handling, typed API responses, and React Query support.
- **Responsive UI:** Next.js App Router structure with reusable layout, table, form, state, and UI components.

---

## Project Architecture

```text
kindervale_portal/
|-- app/
|   |-- api/auth/login/route.ts       # Login API route handler
|   |-- attendance/                   # Attendance page
|   |-- calendar/                     # Calendar page
|   |-- dashboard/                    # Dashboard pages and views
|   |-- exams/                        # Exam management page
|   |-- fees/                         # Fee management page
|   |-- homework/                     # Homework page
|   |-- login/                        # Login page
|   |-- parents/                      # Parent management page
|   |-- reports/                      # Reports page
|   |-- settings/                     # Settings page
|   |-- students/                     # Student management page
|   |-- teachers/                     # Teacher management page
|   |-- globals.css                   # Global styles
|   |-- layout.tsx                    # Root layout
|   `-- page.tsx                      # Landing/home entry
|-- components/
|   |-- auth/                         # Authentication UI
|   |-- dashboard/                    # Dashboard widgets and views
|   |-- forms/                        # Form components
|   |-- landing/                      # Landing page sections
|   |-- layout/                       # Sidebar and protected shell
|   |-- state/                        # Loading and empty states
|   |-- students/                     # Student-specific UI
|   |-- tables/                       # Data table components
|   `-- ui/                           # Shared buttons, cards, badges, modals
|-- context/                          # Auth and sidebar React context
|-- data/                             # Local portal data
|-- public/                           # Web manifest and public assets
|-- services/                         # API services and React Query hooks
|-- types/                            # Shared TypeScript types
|-- utils/                            # Formatting and helper utilities
|-- package.json                      # Scripts and dependencies
`-- tailwind.config.ts                # Tailwind configuration
```

---

## Tech Stack

- **Framework:** Next.js 16
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data Fetching:** TanStack React Query
- **HTTP Client:** Axios
- **Forms & Validation:** React Hook Form, Zod
- **Charts:** Recharts
- **Icons:** Lucide React and React Icons
- **PDF Export:** jsPDF

---

## Quickstart Guide

### 1. Prerequisites

- Node.js 24+
- npm or pnpm
- Running Kindervale backend API

### 2. Installation

Clone the repository and enter the frontend folder:

```bash
git clone https://github.com/alishbahafeez241/kindervale_portal.git
cd kindervale_portal
```

Install dependencies:

```bash
npm install
```

Or with pnpm:

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the frontend root directory:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Site URL used for sitemap generation
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

If `NEXT_PUBLIC_API_URL` is not provided, the application defaults to:

```text
http://localhost:5000/api
```

### 4. Running the Frontend

Start the development server:

```bash
npm run dev
```

The portal will be available at:

```text
http://localhost:3000
```

Build and run production output:

```bash
npm run build
npm run start
```

---

## Available Scripts

- `npm run dev` - Start the Next.js development server.
- `npm run build` - Create a production build.
- `npm run start` - Run the production server.
- `npm run lint` - Run ESLint checks.
- `npm run format` - Format the project with Prettier.

---

## Backend Connection

The frontend communicates with the Kindervale backend through `services/api.ts`.

- Access tokens and refresh tokens are stored in browser local storage.
- Authenticated requests automatically include the `Authorization` header.
- Expired access tokens are refreshed through `/auth/refresh`.
- Users are redirected to `/login` when authentication cannot be refreshed.

---

## Security & Privacy Note

- Do not commit `.env.local` or real production API URLs containing sensitive details.
- Use HTTPS API endpoints in production.
- Keep authentication tokens short-lived and rely on backend refresh-token rules.
- Confirm production CORS origins are configured in the backend before deployment.

---

## License

This project is private and does not currently include an open-source license.
