# Sistema de Exposiciones Escolares - Backend

API REST para la gestión de materias, grupos, alumnos, equipos, exposiciones y evaluaciones con rúbrica dinámica.

---

## Tecnologías

- Node.js
- Express
- Supabase (PostgreSQL)
- JWT para autenticación
- bcryptjs para encriptación de contraseñas

---

## Requisitos previos

- Node.js v18 o superior
- NPM
- Cuenta en Supabase con el proyecto configurado
- WSL (si se trabaja en Windows)

---

## Instalación y configuración

### 1. Clonar el repositorio

\`\`\`bash
git clone https://github.com/TU_USUARIO/expo-backend.git
cd expo-backend
\`\`\`

### 2. Instalar dependencias

\`\`\`bash
npm install
\`\`\`

### 3. Configurar variables de entorno

Copia el archivo de ejemplo y llena los valores:

\`\`\`bash
cp .env.example .env
\`\`\`

Edita el `.env` con tus credenciales:

\`\`\`
PORT=8080
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_anon_key_de_supabase
JWT_SECRET=una_clave_secreta_larga
\`\`\`

### 4. Ejecutar el servidor

Desarrollo:
\`\`\`bash
npm run dev
\`\`\`

Producción:
\`\`\`bash
npm start
\`\`\`

El servidor corre en `http://localhost:8080/api/v1`

---

## Estrategia de ramas

\`\`\`
main        → código estable y listo para producción
develop     → base de integración
feature/    → nuevas funcionalidades
fix/        → corrección de errores
docs/       → cambios en documentación
refactor/   → mejoras de código sin cambiar funcionalidad
\`\`\`

Nunca hacer push directo a `main` ni a `develop`. Todo entra por Pull Request.

---

## Convención de commits

Se usa el estándar de Commits Convencionales en español e imperativo:

\`\`\`
feat: añade CRUD de materias
fix: corrige validación de username duplicado
chore: configura conexión a Supabase
docs: actualiza README con endpoints
refactor: reorganiza servicio de autenticación
\`\`\`

---

## Roles del sistema

| ID | Rol |
|----|-----|
| 1 | ADMIN |
| 2 | ALUMNO |
| 3 | MAESTRO |

---

## Autenticación

Todos los endpoints excepto `/auth/login` requieren un token JWT en el header:

\`\`\`
Authorization: Bearer <token>
\`\`\`

El token se obtiene haciendo login en `POST /api/v1/auth/login`.

---

## Endpoints

### Auth

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| POST | `/auth/login` | Iniciar sesión | Público |

Body:
\`\`\`json
{
  "username": "admin",
  "password": "password"
}
\`\`\`

Respuesta:
\`\`\`json
{
  "token": "eyJhbGci..."
}
\`\`\`

---

### Alumnos

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| GET | `/alumnos?page=0&size=10` | Listar alumnos paginados | ADMIN, MAESTRO |
| GET | `/alumnos/:id` | Obtener alumno por ID | ADMIN, MAESTRO |
| POST | `/alumnos` | Crear alumno | ADMIN |
| PUT | `/alumnos/:id` | Actualizar alumno | ADMIN |
| DELETE | `/alumnos/:id` | Eliminar alumno (soft delete) | ADMIN |

Body POST/PUT:
\`\`\`json
{
  "username": "alumno1",
  "email": "alumno1@expo.com",
  "nombre": "Alumno Uno",
  "password": "password",
  "id_rol": 2
}
\`\`\`

---

### Materias

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| GET | `/materias?page=0&size=10&nombre=` | Listar materias paginadas | Todos |
| GET | `/materias/:id` | Obtener materia por ID | Todos |
| POST | `/materias` | Crear materia | ADMIN, MAESTRO |
| PUT | `/materias/:id` | Actualizar materia | ADMIN, MAESTRO |
| DELETE | `/materias/:id` | Eliminar materia (soft delete) | ADMIN |

Body POST/PUT:
\`\`\`json
{
  "clave_materia": "PROG-01",
  "nombre_materia": "Programación Web"
}
\`\`\`

---

### Grupos

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| GET | `/grupos?page=0&size=10` | Listar grupos paginados | Todos |
| GET | `/grupos/:id` | Obtener grupo por ID | Todos |
| POST | `/grupos` | Crear grupo | ADMIN, MAESTRO |
| PUT | `/grupos/:id` | Actualizar grupo | ADMIN, MAESTRO |
| DELETE | `/grupos/:id` | Eliminar grupo (soft delete) | ADMIN |
| POST | `/grupos/:id/alumnos` | Agregar alumno a grupo | ADMIN, MAESTRO |
| DELETE | `/grupos/:id/alumnos/:id_alumno` | Quitar alumno de grupo | ADMIN, MAESTRO |

Body POST /grupos:
\`\`\`json
{
  "nombre_grupo": "Grupo A",
  "ids_materias": [1, 2]
}
\`\`\`

Body POST /grupos/:id/alumnos:
\`\`\`json
{
  "id_alumno": 2
}
\`\`\`

---

### Equipos (pendiente de implementar)

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| GET | `/equipos?page=0&size=10` | Listar equipos paginados | Todos |
| GET | `/equipos/:id` | Obtener equipo por ID | Todos |
| POST | `/equipos` | Crear equipo | ADMIN, MAESTRO |
| PUT | `/equipos/:id` | Actualizar equipo | ADMIN, MAESTRO |
| DELETE | `/equipos/:id` | Eliminar equipo | ADMIN |
| POST | `/equipos/:id/alumnos` | Unirse a equipo | Todos |
| DELETE | `/equipos/:id/alumnos/:id_alumno` | Salir de equipo | ADMIN, MAESTRO |
| PATCH | `/equipos/:id/jefe` | Asignar jefe de equipo | ADMIN, MAESTRO |

---

### Rubricas (pendiente de implementar)

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| GET | `/rubricas?page=0&size=10` | Listar rúbricas paginadas | Todos |
| GET | `/rubricas/:id` | Obtener rúbrica por ID | Todos |
| POST | `/rubricas` | Crear rúbrica | ADMIN, MAESTRO |
| PUT | `/rubricas/:id` | Actualizar rúbrica | ADMIN, MAESTRO |
| DELETE | `/rubricas/:id` | Eliminar rúbrica | ADMIN |
| GET | `/rubricas/:id/criterios` | Listar criterios | Todos |
| POST | `/rubricas/:id/criterios` | Agregar criterio | ADMIN, MAESTRO |
| PUT | `/rubricas/:id/criterios/:id_criterio` | Actualizar criterio | ADMIN, MAESTRO |
| DELETE | `/rubricas/:id/criterios/:id_criterio` | Eliminar criterio | ADMIN |

---

### Exposiciones (pendiente de implementar)

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| GET | `/exposiciones?page=0&size=10` | Listar exposiciones paginadas | Todos |
| GET | `/exposiciones/:id` | Obtener exposición por ID | Todos |
| POST | `/exposiciones` | Crear exposición | ADMIN, MAESTRO |
| PUT | `/exposiciones/:id` | Actualizar exposición | ADMIN, MAESTRO |
| DELETE | `/exposiciones/:id` | Eliminar exposición | ADMIN |
| PATCH | `/exposiciones/:id/estado` | Cambiar estado | ADMIN, MAESTRO |

---

### Evaluaciones (pendiente de implementar)

| Método | Endpoint | Descripción | Roles |
|--------|----------|-------------|-------|
| POST | `/evaluaciones` | Registrar evaluación | ALUMNO |
| GET | `/evaluaciones/:id` | Obtener evaluación por ID | Todos |

---

## Formato de errores

Todos los errores siguen este formato:

\`\`\`json
{
  "timestamp": "2026-05-12T03:00:00.000Z",
  "status": 404,
  "error": "Not Found",
  "message": "Materia no encontrada",
  "path": "/api/v1/materias/99"
}
\`\`\`

| Status | Significado |
|--------|-------------|
| 400 | Datos inválidos o faltantes |
| 401 | Token no proporcionado o inválido |
| 403 | Sin permisos para esta acción |
| 404 | Recurso no encontrado |
| 409 | Conflicto, el recurso ya existe |
| 500 | Error interno del servidor |

---

## Estructura del proyecto

\`\`\`
expo-backend/
├── src/
│   ├── config/         → configuración de Supabase
│   ├── controllers/    → manejo de request y response
│   ├── middlewares/    → autenticación JWT y manejo de errores
│   ├── routes/         → definición de endpoints
│   ├── services/       → lógica de negocio y consultas a Supabase
│   ├── app.js          → configuración de Express
│   └── server.js       → inicio del servidor
├── .env.example        → plantilla de variables de entorno
├── .gitignore
└── package.json
\`\`\`