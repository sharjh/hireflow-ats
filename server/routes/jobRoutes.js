const express = require('express');
const requireRole = require('../middleware/requireRole');
const requireAuth = require('../middleware/requireAuth');
const { createJob, getJobs, getJobById, updateJob } = require('../controllers/jobController');
const validate = require("../middleware/validate");
const { createJobSchema } = require("../validators/jobSchemas");

const router = express.Router();

router.post("/", requireAuth, requireRole("COMPANY"), validate(createJobSchema), createJob);

router.get("/", getJobs);

router.get("/:id", getJobById);

router.patch("/:id", requireAuth, requireRole("COMPANY"), updateJob);

module.exports = router;