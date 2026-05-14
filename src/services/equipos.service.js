const supabase = require('../config/supabase');

// ── Listar equipos paginados ──────────────────────────────────
const getAll = async (page, size) => {
    const from = page * size;
    const to   = from + size - 1;

    const { data, error, count } = await supabase
        .from('equipos')
        .select(
            `id_equipo, nombre_equipo, id_grupo, id_jefe, activo, fecha_creacion`,
            { count: 'exact' }
        )
        .eq('activo', true)
        .range(from, to)
        .order('id_equipo', { ascending: true });

    if (error) {
        console.error('Supabase Error:', error);
        const err = new Error('Error al obtener equipos: ' + error.message);
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

// ── Obtener equipo por ID (con miembros) ──────────────────────
const getById = async (id) => {
    const { data, error } = await supabase
        .from('equipos')
        .select(
            `id_equipo, nombre_equipo, id_grupo, id_jefe, activo, fecha_creacion`
        )
        .eq('id_equipo', id)
        .single();

    if (error || !data) {
        console.error('Supabase Error:', error);
        const err = new Error('Equipo no encontrado');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    return data;
};

// ── Crear equipo ──────────────────────────────────────────────
const create = async (data) => {
    const { nombre_equipo, id_grupo } = data;

    const { data: equipo, error } = await supabase
        .from('equipos')
        .insert({ nombre_equipo, id_grupo })
        .select()
        .single();

    if (error) {
        if (error.code === '23505') {
            const err = new Error('Ya existe un equipo con ese nombre en el grupo');
            err.status = 409;
            err.error  = 'Conflict';
            throw err;
        }
        const err = new Error('Error al crear equipo');
        err.status = 500;
        err.error  = 'Internal Server Error';
        throw err;
    }

    return equipo;
};

// ── Actualizar equipo ─────────────────────────────────────────
const update = async (id, data) => {
    const { nombre_equipo, id_grupo } = data;

    const { data: equipo, error } = await supabase
        .from('equipos')
        .update({ nombre_equipo, id_grupo })
        .eq('id_equipo', id)
        .select()
        .single();

    if (error || !equipo) {
        if (error?.code === '23505') {
            const err = new Error('Ya existe un equipo con ese nombre en el grupo');
            err.status = 409;
            err.error  = 'Conflict';
            throw err;
        }
        const err = new Error('Equipo no encontrado');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    return equipo;
};

// ── Eliminar equipo (soft-delete) ─────────────────────────────
const remove = async (id) => {
    const { data, error } = await supabase
        .from('equipos')
        .update({ activo: false })
        .eq('id_equipo', id)
        .select()
        .single();

    if (error || !data) {
        const err = new Error('Equipo no encontrado');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }
};

// ── Agregar alumno a equipo ───────────────────────────────────
const addAlumno = async (id_equipo, id_alumno) => {
    // Verificar que el equipo existe y está activo
    const { data: equipo, error: eqError } = await supabase
        .from('equipos')
        .select('id_equipo, id_grupo, activo')
        .eq('id_equipo', id_equipo)
        .single();

    if (eqError || !equipo) {
        const err = new Error('Equipo no encontrado');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    if (!equipo.activo) {
        const err = new Error('El equipo está inactivo');
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    // Verificar que el alumno no esté ya en otro equipo activo del mismo grupo
    const { data: otroEquipo } = await supabase
        .from('equipo_alumno')
        .select('id_equipo, equipos!inner(id_grupo, activo)')
        .eq('id_alumno', id_alumno)
        .eq('equipos.id_grupo', equipo.id_grupo)
        .eq('equipos.activo', true)
        .neq('id_equipo', id_equipo);

    if (otroEquipo && otroEquipo.length > 0) {
        const err = new Error('El alumno ya pertenece a otro equipo activo en este grupo');
        err.status = 409;
        err.error  = 'Conflict';
        throw err;
    }

    const { data: membresia, error } = await supabase
        .from('equipo_alumno')
        .insert({ id_equipo, id_alumno })
        .select()
        .single();

    if (error) {
        if (error.code === '23505') {
            const err = new Error('El alumno ya es miembro de este equipo');
            err.status = 409;
            err.error  = 'Conflict';
            throw err;
        }
        const err = new Error('Error al agregar alumno al equipo');
        err.status = 500;
        err.error  = 'Internal Server Error';
        throw err;
    }

    return membresia;
};

// ── Quitar alumno de equipo ───────────────────────────────────
const removeAlumno = async (id_equipo, id_alumno) => {
    const { data, error } = await supabase
        .from('equipo_alumno')
        .delete()
        .eq('id_equipo', id_equipo)
        .eq('id_alumno', id_alumno)
        .select()
        .single();

    if (error || !data) {
        const err = new Error('El alumno no pertenece a este equipo');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }
};

// ── Asignar jefe de equipo ────────────────────────────────────
const assignJefe = async (id_equipo, id_jefe) => {
    // El jefe debe ser miembro del equipo
    const { data: miembro } = await supabase
        .from('equipo_alumno')
        .select('id_alumno')
        .eq('id_equipo', id_equipo)
        .eq('id_alumno', id_jefe)
        .single();

    if (!miembro) {
        const err = new Error('El usuario no es miembro del equipo');
        err.status = 400;
        err.error  = 'Bad Request';
        throw err;
    }

    const { data: equipo, error } = await supabase
        .from('equipos')
        .update({ id_jefe })
        .eq('id_equipo', id_equipo)
        .select()
        .single();

    if (error || !equipo) {
        const err = new Error('Equipo no encontrado');
        err.status = 404;
        err.error  = 'Not Found';
        throw err;
    }

    return equipo;
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
