const express = require("express");
const requireRole = require('../middleware/requireRole');
const requireAuth = require('../middleware/requireAuth');
const { createCompany, getMyCompany, updateCompany, getCompanyById } = require('../controllers/companyController');

const router = express.Router();

router.post("/", requireAuth, requireRole("COMPANY"), createCompany);

router.get("/me", requireAuth, requireRole("COMPANY"), getMyCompany);

router.patch("/me", requireAuth, requireRole("COMPANY"), updateCompany);

router.get("/:id", getCompanyById);

module.exports = router;