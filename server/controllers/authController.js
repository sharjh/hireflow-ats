const bcrypt = require('bcrypt');
const pool = require('../db');
const generateToken = require('../utils/generateToken')

const register = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: 'Request body is required' });
    }
    const { email, password, role } = req.body;

    //Check if user already exists
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userExists.rows.length > 0) {
        return res.status(400).json({ error: "User already exists with this email" });
    }

    //Password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    //Insert user into DB
    try {
        const result = await pool.query("INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role" , [email, hashedPassword, role]);
        const user = result.rows[0];

        //Generate JWT token
        const token = generateToken(user.id, user.role, res);

        return res.status(201).json({ status: "Success", message: "User registered successfully", data: {
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            token,
        }, });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Internal server error" });
    }

};

const login = async (req, res) => {
    const { email, password } = req.body;

    //Check if user exists
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if(result.rows.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
    };
    const user = result.rows[0];
    
    //Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if(!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
    };

    //Generate JWT token
    const token = generateToken(user.id, user.role, res);

    return res.status(201).json({ status: "Success", data: {
            user: {
                id: user.id,
                email: email,
            },
            token,
    }, });
};

const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        status: "Success",
        message: "Logged out successfully",

    });
};

module.exports = { register, login, logout };