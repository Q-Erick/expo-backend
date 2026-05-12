const supabase = require('../config/supabase');

// TODO: Implementar - Listar equipos paginados
const getAll = async (page, size) => {
  // TODO: consultar tabla equipos con paginación
  // TODO: retornar { content, page, size, totalElements, totalPages }
};

// TODO: Implementar - Obtener equipo por ID
const getById = async (id) => {
  // TODO: consultar tabla equipos por id
  // TODO: lanzar error 404 si no existe
};

// TODO: Implementar - Crear equipo
const create = async (data) => {
  // TODO: insertar en tabla equipos { nombre_equipo, id_grupo }
  // TODO: lanzar error 409 si ya existe el nombre en el mismo grupo
};

// TODO: Implementar - Actualizar equipo
const update = async (id, data) => {
  // TODO: actualizar tabla equipos por id
  // TODO: lanzar error 404 si no existe
};

// TODO: Implementar - Eliminar equipo
const remove = async (id) => {
  // TODO: eliminar de tabla equipos por id
  // TODO: lanzar error 404 si no existe
};

// TODO: Implementar - Agregar alumno a equipo
const addAlumno = async (id_equipo, id_alumno) => {
  // TODO: insertar en tabla equipo_alumno { id_equipo, id_alumno }
  // TODO: lanzar error 409 si ya existe
};

// TODO: Implementar - Quitar alumno de equipo
const removeAlumno = async (id_equipo, id_alumno) => {
  // TODO: eliminar de tabla equipo_alumno por id_equipo e id_alumno
  // TODO: lanzar error 404 si no existe
};

// TODO: Implementar - Asignar jefe de equipo
const assignJefe = async (id_equipo, id_jefe) => {
  // TODO: actualizar tabla equipos, campo id_jefe por id_equipo
  // TODO: lanzar error 404 si no existe el equipo
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    addAlumno,
    removeAlumno,
    assignJefe,
};