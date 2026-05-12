const equiposService = require('../services/equipos.service');

// TODO: Implementar - GET /api/v1/equipos
const getAll = async (req, res, next) => {
    try {
        // TODO: obtener page y size de req.query y llamar equiposService.getAll
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - GET /api/v1/equipos/:id
const getById = async (req, res, next) => {
    try {
        // TODO: obtener id de req.params y llamar equiposService.getById
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - POST /api/v1/equipos
const create = async (req, res, next) => {
    try {
        // TODO: obtener nombre_equipo e id_grupo de req.body y llamar equiposService.create
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - PUT /api/v1/equipos/:id
const update = async (req, res, next) => {
    try {
        // TODO: obtener id de req.params y body de req.body y llamar equiposService.update
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - DELETE /api/v1/equipos/:id
const remove = async (req, res, next) => {
    try {
        // TODO: obtener id de req.params y llamar equiposService.remove
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - POST /api/v1/equipos/:id/alumnos
const addAlumno = async (req, res, next) => {
    try {
        // TODO: obtener id de req.params e id_alumno de req.body y llamar equiposService.addAlumno
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - DELETE /api/v1/equipos/:id/alumnos/:id_alumno
const removeAlumno = async (req, res, next) => {
    try {
        // TODO: obtener id e id_alumno de req.params y llamar equiposService.removeAlumno
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - PATCH /api/v1/equipos/:id/jefe
const assignJefe = async (req, res, next) => {
    try {
        // TODO: obtener id de req.params e id_jefe de req.body y llamar equiposService.assignJefe
    } catch (err) {
        next(err);
    }
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