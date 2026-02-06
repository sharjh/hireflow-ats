const express = require('express');
const requireRole = require('../middleware/requireRole');
const requireAuth = require('../middleware/requireAuth');
const createJob = require('../controllers/jobController');

const router = express.Router();

router.post("/", requireAuth, requireRole("COMPANY"), createJob);

//router.get("/");

//router.get("/:id");

//router.patch("/:id", requireAuth, requireRole("COMPANY"));

module.exports = router;