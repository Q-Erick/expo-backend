const supabase = require('../config/supabase');

// ── Listar rúbricas paginadas ──────────────────────────────────
const getAll = async (page, size) => {
    const from = page * size;
    const to   = from + size - 1;

    const { data, error, count } = await supabase
        .from('rubricas')
        .select('id_rubrica, nombre, descripcion, publicada, fecha_creacion', { count: 'exact' })
        .range(from, to)
        .order('id_rubrica', { ascending: true });

    if (error) {
        console.error('Supabase Error:', error);
        const err = new Error('Error al obtener rubricas: ' + error.message);
        err.status = 500;
        err.error  = 'Internal Server Error';
        throw err;
    }

    return {
        content:       data,
        page,
        size,
        totalElements: count,
        totalPages:    Math.ceil(count / size),
    };
};

// ── Obtener rúbrica por ID ─────────────────────────────────────
const getById = async (id) => {
    const { data, error } = await supabase
        .from('rubricas')
        .select('id_rubrica, nombre, descripcion, publicada, fecha_creacion')
        .eq('id_rubrica', id)
        .single();

    if (error || !data) {
        console.error('Supabase Error:', error);
        const err = new Error('Rúbrica no encontrada');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    return data;
};

// ── Crear rúbrica ──────────────────────────────────────────────
const create = async (data) => {
    const { nombre, descripcion, publicada = false } = data;

    if (!nombre) {
        const err = new Error('Nombre es requerido');
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    const { data: rubrica, error } = await supabase
        .from('rubricas')
        .insert({
            nombre,
            descripcion,
            publicada,
            fecha_creacion: new Date().toISOString()
        })
        .select('id_rubrica, nombre, descripcion, publicada, fecha_creacion')
        .single();

    if (error) {
        console.error('Supabase Error:', error);
        const err = new Error('Error al crear rúbrica: ' + error.message);
        err.status = 500;
        err.error  = 'Internal Server Error';
        throw err;
    }

    return rubrica;
};

// ── Actualizar rúbrica ──────────────────────────────────────────
const update = async (id, data) => {
    const { nombre, descripcion, publicada } = data;

    if (!nombre) {
        const err = new Error('Nombre es requerido');
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    const { data: rubrica, error } = await supabase
        .from('rubricas')
        .update({
            nombre,
            descripcion,
            publicada
        })
        .eq('id_rubrica', id)
        .select('id_rubrica, nombre, descripcion, publicada, fecha_creacion')
        .single();

    if (error) {
        console.error('Supabase Error:', error);
        const err = new Error('Error al actualizar rúbrica: ' + error.message);
        err.status = 500;
        err.error  = 'Internal Server Error';
        throw err;
    }

    if (!rubrica) {
        const err = new Error('Rúbrica no encontrada');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    return rubrica;
};

// ── Eliminar rúbrica ────────────────────────────────────────────
const remove = async (id) => {
    const { data: rubrica, error } = await supabase
        .from('rubricas')
        .delete()
        .eq('id_rubrica', id)
        .select('id_rubrica, nombre, descripcion, publicada, fecha_creacion')
        .single();

    if (error) {
        console.error('Supabase Error:', error);
        const err = new Error('Error al eliminar rúbrica: ' + error.message);
        err.status = 500;
        err.error  = 'Internal Server Error';
        throw err;
    }

    if (!rubrica) {
        const err = new Error('Rúbrica no encontrada');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    return rubrica;
};

// ── Publicar rúbrica ────────────────────────────────────────────
const publish = async (id) => {
    const { data: rubrica, error } = await supabase
        .from('rubricas')
        .update({
            publicada: true
        })
        .eq('id_rubrica', id)
        .select('id_rubrica, nombre, descripcion, publicada, fecha_creacion')
        .single();

    if (error) {
        console.error('Supabase Error:', error);
        const err = new Error('Error al publicar rúbrica: ' + error.message);
        err.status = 500;
        err.error  = 'Internal Server Error';
        throw err;
    }

    if (!rubrica) {
        const err = new Error('Rúbrica no encontrada');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    return rubrica;
};

// ── Listar criterios de una rúbrica ─────────────────────────────
const getCriterios = async (id_rubrica) => {
    // Verificar que la rúbrica existe
    const { data: rubrica, error: rubricaError } = await supabase
        .from('rubricas')
        .select('id_rubrica')
        .eq('id_rubrica', id_rubrica)
        .single();

    if (rubricaError || !rubrica) {
        const err = new Error('Rúbrica no encontrada');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    const { data, error } = await supabase
        .from('criterios')
        .select('id_criterio, descripcion, ponderacion, escala_min, escala_max')
        .eq('id_rubrica', id_rubrica)
        .order('id_criterio', { ascending: true });

    if (error) {
        console.error('Supabase Error:', error);
        const err = new Error('Error al obtener criterios: ' + error.message);
        err.status = 500;
        err.error  = 'Internal Server Error';
        throw err;
    }

    return data;
};

// ── Agregar criterio a rúbrica ──────────────────────────────────
const addCriterio = async (id_rubrica, data) => {
    const { descripcion, ponderacion, escala_min = 0.00, escala_max = 10.00 } = data;

    // Validaciones
    if (!descripcion || ponderacion === undefined) {
        const err = new Error('Descripción y ponderación son requeridos');
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    if (escala_min >= escala_max) {
        const err = new Error('La escala mínima debe ser menor a la escala máxima');
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    // Verificar que la rúbrica existe
    const { data: rubrica, error: rubricaError } = await supabase
        .from('rubricas')
        .select('id_rubrica')
        .eq('id_rubrica', id_rubrica)
        .single();

    if (rubricaError || !rubrica) {
        const err = new Error('Rúbrica no encontrada');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    const { data: criterio, error } = await supabase
        .from('criterios')
        .insert({
            id_rubrica,
            descripcion,
            ponderacion,
            escala_min,
            escala_max
        })
        .select('id_criterio, descripcion, ponderacion, escala_min, escala_max')
        .single();

    if (error) {
        console.error('Supabase Error:', error);
        const err = new Error('Error al agregar criterio: ' + error.message);
        err.status = 500;
        err.error  = 'Internal Server Error';
        throw err;
    }

    return criterio;
};

// ── Actualizar criterio ─────────────────────────────────────────
const updateCriterio = async (id_rubrica, id_criterio, data) => {
    const { descripcion, ponderacion, escala_min, escala_max } = data;

    // Validaciones
    if (!descripcion || ponderacion === undefined) {
        const err = new Error('Descripción y ponderación son requeridos');
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    if (escala_min >= escala_max) {
        const err = new Error('La escala mínima debe ser menor a la escala máxima');
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    const { data: criterio, error } = await supabase
        .from('criterios')
        .update({
            descripcion,
            ponderacion,
            escala_min,
            escala_max
        })
        .eq('id_criterio', id_criterio)
        .eq('id_rubrica', id_rubrica)
        .select('id_criterio, descripcion, ponderacion, escala_min, escala_max')
        .single();

    if (error) {
        console.error('Supabase Error:', error);
        const err = new Error('Error al actualizar criterio: ' + error.message);
        err.status = 500;
        err.error  = 'Internal Server Error';
        throw err;
    }

    if (!criterio) {
        const err = new Error('Criterio no encontrado');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    return criterio;
};

// ── Eliminar criterio ───────────────────────────────────────────
const removeCriterio = async (id_rubrica, id_criterio) => {
    const { data: criterio, error } = await supabase
        .from('criterios')
        .delete()
        .eq('id_criterio', id_criterio)
        .eq('id_rubrica', id_rubrica)
        .select('id_criterio, descripcion, ponderacion, escala_min, escala_max')
        .single();

    if (error) {
        console.error('Supabase Error:', error);
        const err = new Error('Error al eliminar criterio: ' + error.message);
        err.status = 500;
        err.error  = 'Internal Server Error';
        throw err;
    }

    if (!criterio) {
        const err = new Error('Criterio no encontrado');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    return criterio;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    publish,
    getCriterios,
    addCriterio,
    updateCriterio,
    removeCriterio,
};