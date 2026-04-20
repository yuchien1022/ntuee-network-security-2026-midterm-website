# Personal Midterm Course Website

## 1. Project Title
Personal Midterm Course Website

## 2. Project Overview
This repository contains a personal website built for the "Practicum of Attack and Defense of Network Security" course. The site presents profile information and course-related pages, and also includes authenticated features such as profile management and a message board.

Deployed website: https://yuchien-midterm-website.onrender.com/

## 3. System Architecture
The project follows a client-server architecture with two main parts:

- **Frontend**: A React single-page application (SPA) that renders pages, handles navigation, manages authentication state in the browser, and calls backend APIs.
- **Backend**: An Express API server that handles authentication, session management, user and message endpoints, avatar upload, CSRF protection, and database access through Prisma.

## 4. Frontend Structure
The frontend is built with **React + Vite** and uses **React Router** for page routing.

- The router is defined in `frontend/src/main.jsx` and uses a root layout with pages such as Home, About, AI Work, Messages, Login, Register, and Profile.
- `RootLayout` provides shared navigation/footer and conditionally shows auth-related navigation state.
- Authentication state is managed by `AuthContext`, which initializes CSRF and fetches the current user session (`/auth/me`) on app load.
- API communication is centralized in `frontend/src/services/`:
  - `axiosClient.js` defines a shared Axios client, adds CSRF headers for state-changing requests, and retries once on CSRF token mismatch.
  - `auth.js`, `user.js`, and `message.js` provide API-specific service methods.
- UI is organized into page components under `frontend/src/pages/` and reusable components (for example `FadeIn` and `ProtectedRoute`) under `frontend/src/components/`.

## 5. Backend Structure
The backend is built with **Node.js + Express** and exposes versioned endpoints under `/api/v1`.

- API route registration is centralized in `backend/src/routes/index.js`, including auth, users, messages, upload, and CSRF token endpoints.
- Authentication logic (`register`, `login`, `logout`, `me`) is implemented in `backend/src/routes/api/v1/auth/handlers.js` with password hashing via `bcryptjs`.
- Session-based authentication is implemented with `express-session` and a PostgreSQL-backed session store (`connect-pg-simple`) in `backend/src/index.js`.
- Protected routes use `requireAuth` middleware to enforce authenticated access.
- Message board logic (create/read/update/delete) is implemented in `backend/src/routes/api/v1/messages/handlers.js`.
- Avatar upload is handled through `multer` plus MIME verification using file signatures, then persisted to disk and linked to user records.
- CSRF protection is enabled through a dedicated CSRF token endpoint and request validation workflow.

## 6. Database
The project uses **PostgreSQL**, with schema management through **Prisma**.

Based on `backend/prisma/schema.prisma`, the main data includes:
- **User** records (username, email, role, password hash, avatar URL, timestamps)
- **Message** records linked to users (message content and timestamps)
- **Session** records for server-side login sessions

## 7. Deployment
The application is deployed on **Render**. The live site is served at:
https://yuchien-midterm-website.onrender.com/

In production mode, the backend also serves the built frontend assets and handles non-API routes by returning the SPA entry page.

## 8. Notes
This README focuses on system architecture and project logic. It intentionally does not include local setup, installation, or run instructions.
