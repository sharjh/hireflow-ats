const express = require('express');
const requireRole = require('../middleware/requireRole');
const requireAuth = require('../middleware/requireAuth');
const { createJob, getJobs, getJobById, updateJob, getMyJobs, updateJobStatus } = require('../controllers/jobController');
const validate = require("../middleware/validate");
const { createJobSchema } = require("../validators/jobSchemas");

const router = express.Router();

router.post("/", requireAuth, requireRole("COMPANY"), validate(createJobSchema), createJob);

router.get("/", getJobs);

router.get("/me", requireAuth, requireRole("COMPANY"), getMyJobs);

router.get("/:id", getJobById);

router.patch("/:id", requireAuth, requireRole("COMPANY"), updateJob);

router.patch('/:id/status', requireAuth, requireRole('COMPANY'), updateJobStatus);

module.exports = router;