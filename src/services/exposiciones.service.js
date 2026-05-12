const supabase = require('../config/supabase');

// TODO: Implementar - Listar exposiciones paginadas
const getAll = async (page, size) => {
  // TODO: consultar tabla exposiciones con paginación
  // TODO: retornar { content, page, size, totalElements, totalPages }
};

// TODO: Implementar - Obtener exposición por ID
const getById = async (id) => {
  // TODO: consultar tabla exposiciones por id
  // TODO: lanzar error 404 si no existe
};

// TODO: Implementar - Crear exposición
const create = async (data) => {
  // TODO: insertar en tabla exposiciones { titulo, id_equipo, id_rubrica, fecha_inicio, fecha_fin }
  // TODO: validar que fecha_fin sea mayor o igual a fecha_inicio
};

// TODO: Implementar - Actualizar exposición
const update = async (id, data) => {
  // TODO: actualizar tabla exposiciones por id
  // TODO: lanzar error 404 si no existe
};

// TODO: Implementar - Eliminar exposición
const remove = async (id) => {
  // TODO: eliminar de tabla exposiciones por id
  // TODO: lanzar error 404 si no existe
};

// TODO: Implementar - Cambiar estado de exposición
const changeEstado = async (id, estado) => {
  // TODO: actualizar campo estado en tabla exposiciones por id
  // TODO: validar que estado sea ABIERTA o CERRADA
  // TODO: lanzar error 404 si no existe
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    changeEstado,
};