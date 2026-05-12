const supabase = require('../config/supabase');

// TODO: Implementar - Listar rúbricas paginadas
const getAll = async (page, size) => {
  // TODO: consultar tabla rubricas con paginación
  // TODO: retornar { content, page, size, totalElements, totalPages }
};

// TODO: Implementar - Obtener rúbrica por ID
const getById = async (id) => {
  // TODO: consultar tabla rubricas por id
  // TODO: lanzar error 404 si no existe
};

// TODO: Implementar - Crear rúbrica
const create = async (data) => {
  // TODO: insertar en tabla rubricas { nombre, descripcion }
};

// TODO: Implementar - Actualizar rúbrica
const update = async (id, data) => {
  // TODO: actualizar tabla rubricas por id
  // TODO: lanzar error 404 si no existe
};

// TODO: Implementar - Eliminar rúbrica
const remove = async (id) => {
  // TODO: eliminar de tabla rubricas por id
  // TODO: lanzar error 404 si no existe
};

// TODO: Implementar - Listar criterios de una rúbrica
const getCriterios = async (id_rubrica) => {
  // TODO: consultar tabla criterios por id_rubrica
  // TODO: lanzar error 404 si la rúbrica no existe
};

// TODO: Implementar - Agregar criterio a rúbrica
const addCriterio = async (id_rubrica, data) => {
  // TODO: insertar en tabla criterios { id_rubrica, descripcion, ponderacion, escala_min, escala_max }
  // TODO: validar que ponderacion sea mayor a 0
  // TODO: validar que escala_min sea menor a escala_max
};

// TODO: Implementar - Actualizar criterio
const updateCriterio = async (id_rubrica, id_criterio, data) => {
  // TODO: actualizar tabla criterios por id_criterio e id_rubrica
  // TODO: lanzar error 404 si no existe
};

// TODO: Implementar - Eliminar criterio
const removeCriterio = async (id_rubrica, id_criterio) => {
  // TODO: eliminar de tabla criterios por id_criterio e id_rubrica
  // TODO: lanzar error 404 si no existe
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getCriterios,
    addCriterio,
    updateCriterio,
    removeCriterio,
};