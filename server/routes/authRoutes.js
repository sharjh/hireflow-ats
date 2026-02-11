const express = require("express");
const { register, login, logout, me } = require("../controllers/authController");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validators/authSchemas");
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.post("/logout", logout);

router.get('/me', requireAuth, me);
module.exports = router;