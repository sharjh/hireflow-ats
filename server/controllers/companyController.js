const pool = require('../db');

const createCompany = async (req, res) => {
    const { name, description } = req.body;
    const ownerId = req.user.id;

    const result = await pool.query("INSERT INTO companies (name, description, owner_id) VALUES ($1, $2, $3) RETURNING id, name, description",
        [name, description, ownerId]);

    return res.status(201).json(result.rows[0]);
};

const getMyCompany = async (req, res) => {
    const id = req.user.id;
    try {
        const result = await pool.query("SELECT id, name, description FROM companies WHERE owner_id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Company not found' });
        }
        return res.status(200).json({ data: result.rows[0], });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const updateCompany = async (req, res) => {
    const id = req.user.id;
    const { name, description } = req.body;

    try {
        const result = await pool.query(`UPDATE companies
                                            SET
                                                name = COALESCE($1, name),
                                                description = COALESCE($2, description)
                                            WHERE owner_id = $3
                                            RETURNING id, name, description`, [name, description, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Company not found' });
        }

        return res.status(200).json({ data: result.rows[0], });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error:"Internal server error" });
    }
};  

const getCompanyById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query("SELECT id, name, description FROM companies WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Company not found' });
        }
        return res.status(200).json({ data: result.rows[0], });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createCompany, getMyCompany, updateCompany, getCompanyById };