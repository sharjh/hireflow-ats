const pool = require('../db');

const createJob = async (req, res) => {
    const { title, description, location, employment_type} = req.body;
    const ownerId = req.user.id;

    if (!title || !description || !employment_type || !location) {
        return res.status(400).json({
            error: 'Title, description, location, and employment type are required',
        });
    }

    try {
        const companyResult = await pool.query("SELECT id FROM companies WHERE owner_id = $1", [ownerId]);
        if (companyResult.rows.length === 0) {
            return res.status(404).json({ error: 'Company not found' });
        }
        const companyId = companyResult.rows[0].id;

        //Insert job
        const result = await pool.query(`INSERT INTO jobs (company_id, title, description, location, employment_type, status)
                                        VALUES ($1, $2, $3, $4, $5, 'OPEN')
                                        RETURNING id, title, description, employment_type, location, status`,
                                        [companyId, title, description, location, employment_type]);
        
        return res.status(201).json({ data: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getJobs = async (req, res) => {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const offset = (page - 1) * limit;

    try {
        const result = await pool.query(`SELECT * FROM jobs WHERE status=$1
                                        ORDER BY created_at DESC
                                        LIMIT $2 OFFSET $3`, ['OPEN', limit, offset]);

        return res.status(200).json({ page, limit, count: result.rows.length, data: result.rows, });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getJobById = async (req, res) => {
    const jobId = req.params.id;

    try {
        const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [jobId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }

        return res.status(200).json({ data: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const updateJob = async (req, res) => {
    const jobId = req.params.id;
    const ownerId = req.user.id;

    const { title, description, location, employment_type, status } = req.body;

    try {
        //Check if job belongs to this company
        const jobCheck = await pool.query(`SELECT jobs.id FROM jobs
                                        JOIN companies ON jobs.company_id = companies.id
                                        WHERE jobs.id = $1 AND companies.owner_id = $2`, [jobId, ownerId]);

        if (jobCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found or unauthorized' });
        }

        const result = await pool.query(`UPDATE jobs
                                        SET
                                            title = COALESCE($1, title),
                                            description = COALESCE($2, description),
                                            employment_type = COALESCE($3, employment_type),
                                            location = COALESCE($4, location),
                                            status = COALESCE($5, status)
                                        WHERE id = $6
                                        RETURNING id, title, description, employment_type, location, status`,
                                        [title, description, employment_type, location, status, jobId]);

        return res.status(200).json({ data: result.rows[0] });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createJob, getJobs, getJobById, updateJob };