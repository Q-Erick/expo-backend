const { Router } = require('express');
const router = Router();
const alumnosController = require('../controllers/alumnos.controller');
const { authMiddleware, checkRole } = require('../middlewares/auth.middleware');

// ADMIN = 1, MAESTRO = 3, ALUMNO = 2

// GET /api/v1/alumnos - ADMIN y MAESTRO
router.get('/', authMiddleware, checkRole(1, 3), alumnosController.getAll);

// GET /api/v1/alumnos/:id - ADMIN y MAESTRO
router.get('/:id', authMiddleware, checkRole(1, 3), alumnosController.getById);

// POST /api/v1/alumnos - solo ADMIN
router.post('/', authMiddleware, checkRole(1), alumnosController.create);

// PUT /api/v1/alumnos/:id - solo ADMIN
router.put('/:id', authMiddleware, checkRole(1), alumnosController.update);

// DELETE /api/v1/alumnos/:id - solo ADMIN
router.delete('/:id', authMiddleware, checkRole(1), alumnosController.remove);

module.exports = router;