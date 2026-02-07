const express = require('express');
const requireRole = require('../middleware/requireRole');
const requireAuth = require('../middleware/requireAuth');
const applyToJob = require('../controllers/applicationController');

const router = express.Router();

router.post("/", requireAuth, requireRole("CANDIDATE"), applyToJob);

//router.get("/me", requireAuth, requireRole("CANDIDATE"));

//router.get("/job/:jobId", requireAuth, requireRole("COMPANY"));

//router.patch("/:id", requireAuth, requireRole("COMPANY"));

module.exports = router;