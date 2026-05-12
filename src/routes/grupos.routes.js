const { Router } = require('express');
const router = Router();
const gruposController = require('../controllers/grupos.controller');
const { authMiddleware, checkRole } = require('../middlewares/auth.middleware');

// ADMIN = 1, MAESTRO = 3, ALUMNO = 2

// GET /api/v1/grupos - todos los roles
router.get('/', authMiddleware, checkRole(1, 2, 3), gruposController.getAll);

// GET /api/v1/grupos/:id - todos los roles
router.get('/:id', authMiddleware, checkRole(1, 2, 3), gruposController.getById);

// POST /api/v1/grupos - solo ADMIN y MAESTRO
router.post('/', authMiddleware, checkRole(1, 3), gruposController.create);

// PUT /api/v1/grupos/:id - solo ADMIN y MAESTRO
router.put('/:id', authMiddleware, checkRole(1, 3), gruposController.update);

// DELETE /api/v1/grupos/:id - solo ADMIN
router.delete('/:id', authMiddleware, checkRole(1), gruposController.remove);

// POST /api/v1/grupos/:id/alumnos - solo ADMIN y MAESTRO
router.post('/:id/alumnos', authMiddleware, checkRole(1, 3), gruposController.addAlumno);

// DELETE /api/v1/grupos/:id/alumnos/:id_alumno - solo ADMIN y MAESTRO
router.delete('/:id/alumnos/:id_alumno', authMiddleware, checkRole(1, 3), gruposController.removeAlumno);

module.exports = router;