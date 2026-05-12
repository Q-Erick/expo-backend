const { Router } = require('express');
const router = Router();
const evaluacionesController = require('../controllers/evaluaciones.controller');
const { authMiddleware, checkRole } = require('../middlewares/auth.middleware');

// ADMIN = 1, MAESTRO = 3, ALUMNO = 2

// POST /api/v1/evaluaciones - solo ALUMNO
router.post('/', authMiddleware, checkRole(1, 2), evaluacionesController.create);

// GET /api/v1/evaluaciones/:id - todos los roles
router.get('/:id', authMiddleware, checkRole(1, 2, 3), evaluacionesController.getById);

module.exports = router;