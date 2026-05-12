const { Router } = require('express');
const router = Router();
const exposicionesController = require('../controllers/exposiciones.controller');
const { authMiddleware, checkRole } = require('../middlewares/auth.middleware');

// ADMIN = 1, MAESTRO = 3, ALUMNO = 2

// GET /api/v1/exposiciones - todos los roles
router.get('/', authMiddleware, checkRole(1, 2, 3), exposicionesController.getAll);

// GET /api/v1/exposiciones/:id - todos los roles
router.get('/:id', authMiddleware, checkRole(1, 2, 3), exposicionesController.getById);

// POST /api/v1/exposiciones - ADMIN y MAESTRO
router.post('/', authMiddleware, checkRole(1, 3), exposicionesController.create);

// PUT /api/v1/exposiciones/:id - ADMIN y MAESTRO
router.put('/:id', authMiddleware, checkRole(1, 3), exposicionesController.update);

// DELETE /api/v1/exposiciones/:id - solo ADMIN
router.delete('/:id', authMiddleware, checkRole(1), exposicionesController.remove);

// PATCH /api/v1/exposiciones/:id/estado - ADMIN y MAESTRO
router.patch('/:id/estado', authMiddleware, checkRole(1, 3), exposicionesController.changeEstado);

module.exports = router;