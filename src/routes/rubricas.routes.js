const { Router } = require('express');
const router = Router();
const rubricasController = require('../controllers/rubricas.controller');
const { authMiddleware, checkRole } = require('../middlewares/auth.middleware');

// ADMIN = 1, MAESTRO = 3, ALUMNO = 2

// GET /api/v1/rubricas - todos los roles
router.get('/', authMiddleware, checkRole(1, 2, 3), rubricasController.getAll);

// GET /api/v1/rubricas/:id - todos los roles
router.get('/:id', authMiddleware, checkRole(1, 2, 3), rubricasController.getById);

// POST /api/v1/rubricas - ADMIN y MAESTRO
router.post('/', authMiddleware, checkRole(1, 3), rubricasController.create);

// PUT /api/v1/rubricas/:id - ADMIN y MAESTRO
router.put('/:id', authMiddleware, checkRole(1, 3), rubricasController.update);

// DELETE /api/v1/rubricas/:id - solo ADMIN
router.delete('/:id', authMiddleware, checkRole(1), rubricasController.remove);

// GET /api/v1/rubricas/:id/criterios - todos los roles
router.get('/:id/criterios', authMiddleware, checkRole(1, 2, 3), rubricasController.getCriterios);

// POST /api/v1/rubricas/:id/criterios - ADMIN y MAESTRO
router.post('/:id/criterios', authMiddleware, checkRole(1, 3), rubricasController.addCriterio);

// PUT /api/v1/rubricas/:id/criterios/:id_criterio - ADMIN y MAESTRO
router.put('/:id/criterios/:id_criterio', authMiddleware, checkRole(1, 3), rubricasController.updateCriterio);

// DELETE /api/v1/rubricas/:id/criterios/:id_criterio - solo ADMIN
router.delete('/:id/criterios/:id_criterio', authMiddleware, checkRole(1), rubricasController.removeCriterio);

module.exports = router;