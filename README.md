# HireFlow

## Overview
HireFlow is a mini applicant tracking system (ATS) that connects candidates and companies in a single hiring workflow.
The platform supports two role-based user types: `COMPANY` and `CANDIDATE`.
Candidates can discover open roles, apply quickly, and track application progress from their dashboard.
Companies can create their profile, publish job postings, and review candidate applications in one place.
From authentication to final status updates, the project demonstrates a complete end-to-end hiring flow.

## Key Features

### For Candidates
- Browse and filter open job listings by keywords, location, and job type.
- Apply to jobs with resume and cover letter details in a streamlined flow.
- Track submitted applications and status updates from a personal dashboard.

### For Companies
- Create and manage a company profile.
- Post and update job openings with role details and hiring status.
- View applicants per job and update application outcomes efficiently.

### Platform/Security
- Role-based access control for `COMPANY` and `CANDIDATE` workflows.
- JWT-based authentication with secure HTTP-only cookie handling.
- Request validation and security middleware for safer API operations.
- Basic abuse protection through authentication route rate limiting.

## Tech Stack
- Frontend: React, React Router, Axios, Vite, Tailwind CSS
- Backend: Node.js, Express, PostgreSQL, JWT, Zod
- Security/Middleware: Helmet, CORS, cookie-based auth, rate limiting

## Project Structure
```text
.
|-- client/              # React application (UI, routing, auth context)
|-- server/              # Express backend (routes, controllers, middleware)
`-- server/schema.sql    # PostgreSQL schema for core ATS entities
```

## Setup & Run

### 1) Clone
```bash
git clone <your-repository-url>
cd react2
```

### 2) Install Dependencies
```bash
cd server
npm install
cd ../client
npm install
```

### 3) Database Setup
- Create a PostgreSQL database.
- Edit `server/db.js` and update the PostgreSQL connection settings (`host`, `port`, `user`, `password`, and `database`) to match your local setup.
- Execute `server/schema.sql` to create tables and indexes.

### 4) Run Backend
```bash
cd server
node index.js
```

### 5) Run Frontend
```bash
cd client
npm run dev
```

### 6) Open App
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Available Scripts
- Client:
  - `npm run dev`
  - `npm run build`
  - `npm run lint`
  - `npm run preview`
- Server:
  - No `start`/`dev` script is currently defined in `server/package.json`.
  - Run the backend with `node index.js`.

## License
This project is licensed under the MIT License. See `LICENSE` for details.
