const supabase = require('../config/supabase');

const getAll = async (page, size) => {
    const from = page * size;
    const to = from + size - 1;

    const { data, error, count } = await supabase
        .from('grupos')
        .select('*, materias:materia_grupo(materia:materias(*))', { count: 'exact' })
        .eq('activo', true)
        .range(from, to);

    if (error) {
        const err = new Error('Error al obtener grupos');
        err.status = 500;
        err.error = 'Internal Server Error';
        throw err;
    }

    // Formatear materias
    const content = data.map((grupo) => ({
        ...grupo,
        materias: grupo.materias.map((m) => m.materia),
    }));

    return {
        content,
        page,
        size,
        totalElements: count,
        totalPages: Math.ceil(count / size),
    };
};

const getById = async (id) => {
    const { data, error } = await supabase
        .from('grupos')
        .select('*, materias:materia_grupo(materia:materias(*))')
        .eq('id_grupo', id)
        .eq('activo', true)
        .single();

    if (error || !data) {
        const err = new Error('Grupo no encontrado');
        err.status = 404;
        err.error = 'Not Found';
        throw err;
    }

    return {
        ...data,
        materias: data.materias.map((m) => m.materia),
    };
};

const create = async (data) => {
    const { nombre_grupo, ids_materias } = data;

    const { data: grupo, error } = await supabase
        .from('grupos')
        .insert({ nombre_grupo })
        .select()
        .single();

    if (error) {
        const err = new Error('Error al crear grupo');
        err.status = 500;
        err.error = 'Internal Server Error';
        throw err;
    }

    // Asignar materias si vienen
    if (ids_materias && ids_materias.length > 0) {
        const relaciones = ids_materias.map((id_materia) => ({
        id_materia,
        id_grupo: grupo.id_grupo,
        }));

        const { error: errorMaterias } = await supabase
        .from('materia_grupo')
        .insert(relaciones);

        if (errorMaterias) {
        const err = new Error('Error al asignar materias al grupo');
        err.status = 500;
        err.error = 'Internal Server Error';
        throw err;
        }
    }

    return grupo;
};

const update = async (id, data) => {
    const { nombre_grupo, ids_materias } = data;

    const { data: grupo, error } = await supabase
        .from('grupos')
        .update({ nombre_grupo })
        .eq('id_grupo', id)
        .eq('activo', true)
        .select()
        .single();

    if (error || !grupo) {
        const err = new Error('Grupo no encontrado');
        err.status = 404;
        err.error = 'Not Found';
        throw err;
    }

    // Actualizar materias si vienen
    if (ids_materias) {
        await supabase
        .from('materia_grupo')
        .delete()
        .eq('id_grupo', id);

        if (ids_materias.length > 0) {
        const relaciones = ids_materias.map((id_materia) => ({
            id_materia,
            id_grupo: id,
        }));

        await supabase.from('materia_grupo').insert(relaciones);
        }
    }

    return grupo;
};

const remove = async (id) => {
    const { data, error } = await supabase
        .from('grupos')
        .update({ activo: false })
        .eq('id_grupo', id)
        .eq('activo', true)
        .select()
        .single();

    if (error || !data) {
        const err = new Error('Grupo no encontrado');
        err.status = 404;
        err.error = 'Not Found';
        throw err;
    }
};

const addAlumno = async (id_grupo, id_alumno) => {
    const { data: grupo } = await supabase
        .from('grupos')
        .select('id_grupo')
        .eq('id_grupo', id_grupo)
        .eq('activo', true)
        .single();

    if (!grupo) {
        const err = new Error('Grupo no encontrado');
        err.status = 404;
        err.error = 'Not Found';
        throw err;
    }

    const { data: alumno } = await supabase
        .from('usuarios')
        .select('id_usuario')
        .eq('id_usuario', id_alumno)
        .eq('activo', true)
        .single();

    if (!alumno) {
        const err = new Error('Alumno no encontrado');
        err.status = 404;
        err.error = 'Not Found';
        throw err;
    }

    const { error } = await supabase
        .from('grupo_alumno')
        .insert({ id_grupo, id_alumno });

    if (error) {
        if (error.code === '23505') {
        const err = new Error('El alumno ya pertenece a este grupo');
        err.status = 409;
        err.error = 'Conflict';
        throw err;
        }
        const err = new Error('Error al agregar alumno al grupo');
        err.status = 500;
        err.error = 'Internal Server Error';
        throw err;
    }
};

const removeAlumno = async (id_grupo, id_alumno) => {
    const { data, error } = await supabase
        .from('grupo_alumno')
        .delete()
        .eq('id_grupo', id_grupo)
        .eq('id_alumno', id_alumno)
        .select()
        .single();

    if (error || !data) {
        const err = new Error('Alumno no encontrado en el grupo');
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
    addAlumno,
    removeAlumno,
};