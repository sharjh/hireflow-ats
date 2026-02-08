const pool = require('../db');

const applyToJob = async (req, res) => {
    const candidateId = req.user.id;
    const { jobId, resume_url, cover_letter } = req.body;
    if (!jobId || !resume_url) {
        return res.status(400).json({ error: 'Job ID is required' });
    }

    try {
        const jobResult = await pool.query('SELECT id FROM jobs WHERE id = $1 AND status = $2', [jobId, 'OPEN']);
        if (jobResult.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found or not open' });
        }

        //apply to job
        const result = await pool.query(`INSERT INTO applications (job_id, candidate_id, cover_letter, resume_url, status)
                                        VALUES ($1, $2, $3, $4, 'APPLIED')
                                        RETURNING id, job_id, candidate_id, status, cover_letter, resume_url`,
                                        [jobId, candidateId, cover_letter || null, resume_url]);

        return res.status(201).json({ data: result.rows[0], });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ error: 'You have already applied to this job', });
        }
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getMyApplications = async (req, res) => {
    const candidateId = req.user.id;

    try {
        const result = await pool.query(`SELECT
                                            a.id,
                                            a.status,
                                            a.created_at,
                                            j.id AS job_id,
                                            j.title,
                                            j.location,
                                            c.name AS company_name
                                        FROM applications a
                                        JOIN jobs j ON a.job_id = j.id
                                        JOIN companies c ON j.company_id = c.id
                                        WHERE a.candidate_id = $1
                                        ORDER BY a.created_at DESC;`, [candidateId]);
        return res.status(200).json({
            count: result.rows.length,
            data: result.rows,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getJobApplications = async (req, res) => {
    const { jobId } = req.params;
    const ownerId = req.user.id;
    
    try {
        const result = await pool.query(`SELECT
                                            a.id,
                                            a.status,
                                            a.created_at,
                                            a.cover_letter,
                                            a.resume_url,
                                            u.id AS candidate_id,
                                            u.email AS candidate_email
                                        FROM applications a
                                        JOIN jobs j ON a.job_id = j.id
                                        JOIN companies c ON j.company_id = c.id
                                        JOIN users u ON a.candidate_id = u.id
                                        WHERE j.id = $1
                                            AND c.owner_id = $2
                                        ORDER BY a.created_at DESC`,[jobId, ownerId]);
        return res.status(200).json({
            count: result.rows.length,
            data: result.rows,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const updateApplication = async (req, res) => {
    const applicationId = req.params.id;
    const ownerId = req.user.id;
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }
    try {
        const check = await pool.query(`SELECT a.id
                                        FROM applications a
                                        JOIN jobs j ON a.job_id = j.id
                                        JOIN companies c ON j.company_id = c.id
                                        WHERE a.id = $1 AND c.owner_id = $2`, [applicationId, ownerId]);
        if (check.rows.length === 0) {
            return res.status(404).json({ error: 'Application not found or unauthorized', });
        }
        const result = await pool.query(`UPDATE applications SET status = $1 WHERE id = $2 RETURNING id, status`, [status, applicationId]);
        return res.status(200).json({ data: result.rows[0], });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { applyToJob, getMyApplications, getJobApplications, updateApplication };