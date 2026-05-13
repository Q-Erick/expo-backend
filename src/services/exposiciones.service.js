const supabase = require('../config/supabase');

// ── Listar exposiciones paginadas ─────────────────────────────
const getAll = async (page, size, filters = {}) => {
    const from = page * size;
    const to   = from + size - 1;

    let query = supabase
        .from('exposiciones')
        .select(
            `id_exposicion, titulo, descripcion, estado, id_equipo, id_rubrica,
             fecha_inicio, fecha_fin, fecha_creacion,
             equipos(nombre_equipo, grupos(nombre_grupo)),
             rubricas(nombre)`,
            { count: 'exact' }
        )
        .range(from, to)
        .order('id_exposicion', { ascending: false });

    if (filters.estado) {
        query = query.eq('estado', filters.estado);
    }
    if (filters.id_equipo) {
        query = query.eq('id_equipo', filters.id_equipo);
    }
    if (filters.titulo) {
        query = query.ilike('titulo', `%${filters.titulo}%`);
    }

    const { data, error, count } = await query;

    if (error) {
        const err = new Error('Error al obtener exposiciones');
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

// ── Obtener exposición por ID ─────────────────────────────────
const getById = async (id) => {
    const { data, error } = await supabase
        .from('exposiciones')
        .select(
            `id_exposicion, titulo, descripcion, estado, id_equipo, id_rubrica,
             fecha_inicio, fecha_fin, fecha_creacion,
             equipos(nombre_equipo, id_grupo, grupos(nombre_grupo)),
             rubricas(nombre, descripcion)`
        )
        .eq('id_exposicion', id)
        .single();

    if (error || !data) {
        const err = new Error('Exposición no encontrada');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    // Contar evaluaciones
    const { count } = await supabase
        .from('evaluaciones')
        .select('*', { count: 'exact', head: true })
        .eq('id_exposicion', id);

    return { ...data, total_evaluaciones: count || 0 };
};

// ── Crear exposición ──────────────────────────────────────────
const create = async (data) => {
    const { titulo, descripcion, id_equipo, id_rubrica, fecha_inicio, fecha_fin } = data;

    // Validar que fecha_fin >= fecha_inicio
    if (fecha_fin < fecha_inicio) {
        const err = new Error('fecha_fin debe ser mayor o igual a fecha_inicio');
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    // Validar que la rúbrica esté publicada
    const { data: rubrica } = await supabase
        .from('rubricas')
        .select('publicada')
        .eq('id_rubrica', id_rubrica)
        .single();

    if (!rubrica) {
        const err = new Error('Rúbrica no encontrada');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    if (!rubrica.publicada) {
        const err = new Error('La rúbrica debe estar publicada para asignarse a una exposición');
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    const { data: exposicion, error } = await supabase
        .from('exposiciones')
        .insert({ titulo, descripcion: descripcion || null, id_equipo, id_rubrica, fecha_inicio, fecha_fin })
        .select()
        .single();

    if (error) {
        const err = new Error('Error al crear exposición');
        err.status = 500;
        err.error  = 'Internal Server Error';
        throw err;
    }

    return exposicion;
};

// ── Actualizar exposición ─────────────────────────────────────
const update = async (id, data) => {
    // No se puede editar una exposición CERRADA
    const { data: actual } = await supabase
        .from('exposiciones')
        .select('estado')
        .eq('id_exposicion', id)
        .single();

    if (!actual) {
        const err = new Error('Exposición no encontrada');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    if (actual.estado === 'CERRADA') {
        const err = new Error('No se puede editar una exposición cerrada');
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    const { titulo, descripcion, id_equipo, id_rubrica, fecha_inicio, fecha_fin } = data;

    if (fecha_fin < fecha_inicio) {
        const err = new Error('fecha_fin debe ser mayor o igual a fecha_inicio');
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    const { data: exposicion, error } = await supabase
        .from('exposiciones')
        .update({ titulo, descripcion: descripcion || null, id_equipo, id_rubrica, fecha_inicio, fecha_fin })
        .eq('id_exposicion', id)
        .select()
        .single();

    if (error || !exposicion) {
        const err = new Error('Error al actualizar exposición');
        err.status = 500;
        err.error  = 'Internal Server Error';
        throw err;
    }

    return exposicion;
};

// ── Eliminar exposición ───────────────────────────────────────
const remove = async (id) => {
    const { data, error } = await supabase
        .from('exposiciones')
        .delete()
        .eq('id_exposicion', id)
        .select()
        .single();

    if (error || !data) {
        const err = new Error('Exposición no encontrada');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }
};

// ── Cambiar estado ────────────────────────────────────────────
const changeEstado = async (id, estado) => {
    const estadosValidos = ['ABIERTA', 'CERRADA'];
    if (!estadosValidos.includes(estado)) {
        const err = new Error('Estado inválido. Debe ser ABIERTA o CERRADA');
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    const { data, error } = await supabase
        .from('exposiciones')
        .update({ estado })
        .eq('id_exposicion', id)
        .select()
        .single();

    if (error || !data) {
        const err = new Error('Exposición no encontrada');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    return data;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    changeEstado,
};