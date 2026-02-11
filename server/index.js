require('dotenv').config();
const express = require('express');
const pool = require('./db');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Importing Routes
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();
const port = 3000;

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // per IP
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

//Middlewares
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.sendStatus(200);
});


//API Routes
app.use('/auth', authLimiter, authRoutes);
app.use('/companies', companyRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);


app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
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