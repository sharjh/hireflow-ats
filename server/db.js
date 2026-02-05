const { Pool } = require('pg');

const pool = new Pool ({
    host:'localhost',
    port: 5432,
    user: 'postgres',
    password: '3007',
    database:'mini_ats_test'
});

module.exports = pool;