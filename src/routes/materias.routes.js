const { Router } = require('express');
const router = Router();
const materiasController = require('../controllers/materias.controller');
const { authMiddleware, checkRole } = require('../middlewares/auth.middleware');

// ADMIN = 1, MAESTRO = 3, ALUMNO = 2

// GET /api/v1/materias - todos los roles
router.get('/', authMiddleware, checkRole(1, 2, 3), materiasController.getAll);

// GET /api/v1/materias/:id - todos los roles
router.get('/:id', authMiddleware, checkRole(1, 2, 3), materiasController.getById);

// POST /api/v1/materias - solo ADMIN y MAESTRO
router.post('/', authMiddleware, checkRole(1, 3), materiasController.create);

// PUT /api/v1/materias/:id - solo ADMIN y MAESTRO
router.put('/:id', authMiddleware, checkRole(1, 3), materiasController.update);

// DELETE /api/v1/materias/:id - solo ADMIN
router.delete('/:id', authMiddleware, checkRole(1), materiasController.remove);

module.exports = router;