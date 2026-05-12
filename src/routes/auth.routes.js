const { Router } = require('express');
const router = Router();
const authController = require('../controllers/auth.controller');

// POST /api/v1/auth/login
router.post('/login', authController.login);

module.exports = router;