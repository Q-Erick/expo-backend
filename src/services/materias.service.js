const supabase = require('../config/supabase');

const getAll = async (page, size, nombre) => {
    const from = page * size;
    const to = from + size - 1;

    let query = supabase
        .from('materias')
        .select('*', { count: 'exact' })
        .eq('activo', true)
        .range(from, to);

    if (nombre) {
        query = query.ilike('nombre_materia', `%${nombre}%`);
    }

    const { data, error, count } = await query;

    if (error) {
        const err = new Error('Error al obtener materias');
        err.status = 500;
        err.error = 'Internal Server Error';
        throw err;
    }

    return {
        content: data,
        page,
        size,
        totalElements: count,
        totalPages: Math.ceil(count / size),
    };
};

const getById = async (id) => {
    const { data, error } = await supabase
        .from('materias')
        .select('*')
        .eq('id_materia', id)
        .eq('activo', true)
        .single();

    if (error || !data) {
        const err = new Error('Materia no encontrada');
        err.status = 404;
        err.error = 'Not Found';
        throw err;
    }

    return data;
};

const create = async (data) => {
    const { clave_materia, nombre_materia } = data;

    const { data: materia, error } = await supabase
        .from('materias')
        .insert({ clave_materia, nombre_materia })
        .select()
        .single();

    if (error) {
        if (error.code === '23505') {
        const err = new Error('La clave de materia ya existe');
        err.status = 409;
        err.error = 'Conflict';
        throw err;
        }
        const err = new Error('Error al crear materia');
        err.status = 500;
        err.error = 'Internal Server Error';
        throw err;
    }

    return materia;
};

const update = async (id, data) => {
    const { clave_materia, nombre_materia } = data;

    const { data: materia, error } = await supabase
        .from('materias')
        .update({ clave_materia, nombre_materia })
        .eq('id_materia', id)
        .eq('activo', true)
        .select()
        .single();

    if (error || !materia) {
        if (error?.code === '23505') {
        const err = new Error('La clave de materia ya existe');
        err.status = 409;
        err.error = 'Conflict';
        throw err;
        }
        const err = new Error('Materia no encontrada');
        err.status = 404;
        err.error = 'Not Found';
        throw err;
    }

    return materia;
};

const remove = async (id) => {
    const { data, error } = await supabase
        .from('materias')
        .update({ activo: false })
        .eq('id_materia', id)
        .eq('activo', true)
        .select()
        .single();

    if (error || !data) {
        const err = new Error('Materia no encontrada');
        err.status = 404;
        err.error = 'Not Found';
        throw err;
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};