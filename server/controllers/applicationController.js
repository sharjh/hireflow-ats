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

module.exports = applyToJob;