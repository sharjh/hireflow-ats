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

module.exports = createJob;