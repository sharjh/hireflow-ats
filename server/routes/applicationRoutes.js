const express = require('express');
const requireRole = require('../middleware/requireRole');
const requireAuth = require('../middleware/requireAuth');
const { applyToJob, getMyApplications, getJobApplications, updateApplication } = require('../controllers/applicationController');
const validate = require("../middleware/validate");
const { applySchema, updateApplicationSchema } = require("../validators/applicationSchemas");

const router = express.Router();

router.post("/", requireAuth, requireRole("CANDIDATE"), validate(applySchema), applyToJob);

router.get("/me", requireAuth, requireRole("CANDIDATE"), getMyApplications);

router.get("/job/:jobId", requireAuth, requireRole("COMPANY"), getJobApplications);

router.patch("/:id", requireAuth, requireRole("COMPANY"), validate(updateApplicationSchema), updateApplication);

module.exports = router;