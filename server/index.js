require('dotenv').config();
const express = require('express');
const pool = require('./db');

// Importing Routes
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

//DB Connection check
(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Database connected successfully");
  }
  catch(err){
    console.error("Database connection failed");
    console.error(err.message);
    process.exit(1);
  }
})();


//API Routes
app.use('/auth', authRoutes);
app.use('/companies', companyRoutes);
app.use('/jobs', jobRoutes);


app.listen(port, () => {
  console.log(`Example app listening on https://localhost:${port}`);
});


//Uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught exception", err);
  process.exit(1);
});

//Graceful shutdown
process.on("SIGTERM", async() => {
  console.log("SIGTERM received, shutting down gracefully...");
  await pool.end();
  process.exit(0);
});
process.on("SIGINT", async() => {
  console.log("SIGINT received, shutting down gracefully...");
  await pool.end();
  process.exit(0);
});