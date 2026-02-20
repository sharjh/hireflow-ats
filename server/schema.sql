-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('COMPANY', 'CANDIDATE')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- COMPANIES
-- =========================
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    location TEXT,
    website TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- JOBS
-- =========================
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT,
    employment_type TEXT CHECK (
        employment_type IN ('FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT')
    ),
    status TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLOSED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- APPLICATIONS
-- =========================
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
    candidate_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    cover_letter TEXT,
    resume_url TEXT,
    status TEXT DEFAULT 'APPLIED' CHECK (
        status IN ('APPLIED', 'REVIEWING', 'ACCEPTED', 'REJECTED')
    ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Prevent duplicate applications
    UNIQUE (job_id, candidate_id)
);

-- =========================
-- INDEXES (performance)
-- =========================
CREATE INDEX idx_jobs_company_id ON jobs(company_id);
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_candidate_id ON applications(candidate_id);
