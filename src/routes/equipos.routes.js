const { Router } = require('express');
const router = Router();
const equiposController = require('../controllers/equipos.controller');
const { authMiddleware, checkRole } = require('../middlewares/auth.middleware');

// ADMIN = 1, MAESTRO = 3, ALUMNO = 2

// GET /api/v1/equipos - todos los roles
router.get('/', authMiddleware, checkRole(1, 2, 3), equiposController.getAll);

// GET /api/v1/equipos/:id - todos los roles
router.get('/:id', authMiddleware, checkRole(1, 2, 3), equiposController.getById);

// POST /api/v1/equipos - ADMIN y MAESTRO
router.post('/', authMiddleware, checkRole(1, 3), equiposController.create);

// PUT /api/v1/equipos/:id - ADMIN y MAESTRO
router.put('/:id', authMiddleware, checkRole(1, 3), equiposController.update);

// DELETE /api/v1/equipos/:id - solo ADMIN
router.delete('/:id', authMiddleware, checkRole(1), equiposController.remove);

// POST /api/v1/equipos/:id/alumnos - todos los roles
router.post('/:id/alumnos', authMiddleware, checkRole(1, 2, 3), equiposController.addAlumno);

// DELETE /api/v1/equipos/:id/alumnos/:id_alumno - ADMIN y MAESTRO
router.delete('/:id/alumnos/:id_alumno', authMiddleware, checkRole(1, 3), equiposController.removeAlumno);

// PATCH /api/v1/equipos/:id/jefe - ADMIN y MAESTRO
router.patch('/:id/jefe', authMiddleware, checkRole(1, 3), equiposController.assignJefe);

module.exports = router;