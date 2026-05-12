const supabase = require('../config/supabase');

// TODO: Implementar - Registrar evaluación completa
const create = async (data) => {
  // TODO: insertar en tabla evaluaciones { id_exposicion, id_alumno_evaluador }
  // TODO: lanzar error 409 si ya existe una evaluación del mismo alumno para la misma exposición
  // TODO: insertar en tabla detalle_evaluacion { id_evaluacion, id_criterio, calificacion } por cada detalle
  // TODO: validar que calificacion esté entre 0 y 10
  // TODO: validar que la exposición esté en estado ABIERTA
};

// TODO: Implementar - Obtener evaluación por ID
const getById = async (id) => {
  // TODO: consultar tabla evaluaciones por id
  // TODO: incluir detalles de tabla detalle_evaluacion
  // TODO: lanzar error 404 si no existe
};

module.exports = {
    create,
    getById,
};