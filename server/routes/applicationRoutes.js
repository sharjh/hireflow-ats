const express = require('express');
const requireRole = require('../middleware/requireRole');
const requireAuth = require('../middleware/requireAuth');
const { applyToJob, getMyApplications, getJobApplications, updateApplication } = require('../controllers/applicationController');

const router = express.Router();

router.post("/", requireAuth, requireRole("CANDIDATE"), applyToJob);

router.get("/me", requireAuth, requireRole("CANDIDATE"), getMyApplications);

router.get("/job/:jobId", requireAuth, requireRole("COMPANY"), getJobApplications);

router.patch("/:id", requireAuth, requireRole("COMPANY"), updateApplication);

module.exports = router;