const exposicionesService = require('../services/exposiciones.service');

// TODO: Implementar - GET /api/v1/exposiciones
const getAll = async (req, res, next) => {
    try {
        // TODO: obtener page y size de req.query y llamar exposicionesService.getAll
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - GET /api/v1/exposiciones/:id
const getById = async (req, res, next) => {
    try {
        // TODO: obtener id de req.params y llamar exposicionesService.getById
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - POST /api/v1/exposiciones
const create = async (req, res, next) => {
    try {
        // TODO: obtener titulo, id_equipo, id_rubrica, fecha_inicio, fecha_fin de req.body y llamar exposicionesService.create
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - PUT /api/v1/exposiciones/:id
const update = async (req, res, next) => {
    try {
        // TODO: obtener id de req.params y body de req.body y llamar exposicionesService.update
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - DELETE /api/v1/exposiciones/:id
const remove = async (req, res, next) => {
    try {
        // TODO: obtener id de req.params y llamar exposicionesService.remove
    } catch (err) {
        next(err);
    }
};

// TODO: Implementar - PATCH /api/v1/exposiciones/:id/estado
const changeEstado = async (req, res, next) => {
    try {
        // TODO: obtener id de req.params y estado de req.body y llamar exposicionesService.changeEstado
        // TODO: validar que estado sea ABIERTA o CERRADA
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
    changeEstado,
};