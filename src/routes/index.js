const { Router } = require('express');
const router = Router();

const authRoutes = require('./auth.routes');
const alumnosRoutes = require('./alumnos.routes');
const materiasRoutes = require('./materias.routes');
const gruposRoutes = require('./grupos.routes');
const equiposRoutes = require('./equipos.routes');
const rubricasRoutes = require('./rubricas.routes');
const exposicionesRoutes = require('./exposiciones.routes');
const evaluacionesRoutes = require('./evaluaciones.routes');

router.use('/auth', authRoutes);
router.use('/alumnos', alumnosRoutes);
router.use('/materias', materiasRoutes);
router.use('/grupos', gruposRoutes);
router.use('/equipos', equiposRoutes);
router.use('/rubricas', rubricasRoutes);
router.use('/exposiciones', exposicionesRoutes);
router.use('/evaluaciones', evaluacionesRoutes);

module.exports = router;