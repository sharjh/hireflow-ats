const express = require('express');
const requireRole = require('../middleware/requireRole');
const requireAuth = require('../middleware/requireAuth');
const { createJob, getJobs, getJobById, updateJob } = require('../controllers/jobController');

const router = express.Router();

router.post("/", requireAuth, requireRole("COMPANY"), createJob);

router.get("/", getJobs);

router.get("/:id", getJobById);

router.patch("/:id", requireAuth, requireRole("COMPANY"), updateJob);

module.exports = router;