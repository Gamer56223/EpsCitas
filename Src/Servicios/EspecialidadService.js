import api from "./conexion"; // Importa la instancia de Axios configurada

/**
 * Servicio para la gestión de Especialidades Médicas.
 * Este archivo contiene funciones para interactuar con la API en las operaciones CRUD
 * (Crear, Leer, Actualizar, Eliminar) de las especialidades médicas.
 */

/**
 * formatErrorMessage: Función auxiliar para formatear mensajes de error de la API.
 * Intenta extraer un mensaje legible de diferentes estructuras de respuesta de error.
 *
 * @param {any} errorResponseData - Los datos de la respuesta de error del servidor.
 * @returns {string} Un mensaje de error formateado.
 */
const formatErrorMessage = (errorResponseData) => {
    // Si los datos de error son una cadena, la retorna directamente.
    if (typeof errorResponseData === 'string') {
        return errorResponseData;
    }
    // Si los datos de error son un objeto, intenta extraer el mensaje.
    if (errorResponseData && typeof errorResponseData === 'object') {
        // Si hay un campo 'errors' (común en errores de validación, ej. Laravel)
        if (errorResponseData.errors) {
            // Concatena todos los mensajes de error de los campos.
            const messages = Object.values(errorResponseData.errors).flat();
            return messages.join('\n');
        }
        // Si hay un campo 'message'
        if (errorResponseData.message) {
            // Si el mensaje es una cadena, la retorna.
            if (typeof errorResponseData.message === 'string') {
                return errorResponseData.message;
            }
            // Si el mensaje es otro tipo (ej. objeto), lo convierte a JSON.
            return JSON.stringify(errorResponseData.message);
        }
        // Si no se encuentra un formato conocido, retorna un mensaje genérico.
        // Se corrigió el uso de `defaultMsg` que no estaba definido.
        return "Error desconocido del servidor.";
    }
    // Si los datos no son una cadena ni un objeto, retorna un mensaje genérico.
    return "Error desconocido.";
};

/**
 * listarEspecialidades: Obtiene una lista de todas las especialidades médicas.
 *
 * @returns {Promise<object>} Un objeto con `success: true` y `data` (la lista de especialidades),
 * o `success: false` y un `message` de error.
 */
export const listarEspecialidades = async () => {
    try {
        const response = await api.get("/listarEspecialidades"); // Realiza una petición GET al endpoint.
        return { success: true, data: response.data }; // Retorna éxito y los datos.
    } catch (error) {
        // Formatea el mensaje de error y lo loguea.
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión con el servidor.";
        console.error("Error al listar especialidades:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

/**
 * crearEspecialidad: Crea una nueva especialidad médica.
 *
 * @param {object} especialidadData - Los datos de la nueva especialidad (ej. { nombre: "Pediatría" }).
 * @returns {Promise<object>} Un objeto con `success: true` y `data` (la especialidad creada),
 * o `success: false` y un `message` de error.
 */
export const crearEspecialidad = async (especialidadData) => {
    try {
        const response = await api.post("/crearEspecialidad", especialidadData); // Realiza una petición POST.
        return { success: true, data: response.data }; // Retorna éxito y los datos.
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión con el servidor.";
        console.error("Error al crear especialidad:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

/**
 * obtenerEspecialidadPorId: Obtiene los detalles de una especialidad específica por su ID.
 *
 * @param {number} id - El ID de la especialidad a obtener.
 * @returns {Promise<object>} Un objeto con `success: true` y `data` (la especialidad),
 * o `success: false` y un `message` de error.
 */
export const obtenerEspecialidadPorId = async (id) => {
    try {
        const response = await api.get(`/mostrarEspecialidad/${id}`); // Realiza una petición GET con el ID.
        return { success: true, data: response.data }; // Retorna éxito y los datos.
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión con el servidor.";
        console.error(`Error al obtener especialidad ${id}:`, error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

/**
 * editarEspecialidad: Actualiza una especialidad médica existente por su ID.
 *
 * @param {number} id - El ID de la especialidad a editar.
 * @param {object} especialidadData - Los nuevos datos de la especialidad.
 * @returns {Promise<object>} Un objeto con `success: true` y `data` (la especialidad actualizada),
 * o `success: false` y un `message` de error.
 */
export const editarEspecialidad = async (id, especialidadData) => {
    try {
        // Se cambió el endpoint de /actualizarEspecialidad a /editarEspecialidad para consistencia.
        const response = await api.put(`/editarEspecialidad/${id}`, especialidadData); // Realiza una petición PUT.
        return { success: true, data: response.data }; // Retorna éxito y los datos.
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión con el servidor.";
        console.error(`Error al editar especialidad ${id}:`, error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

/**
 * eliminarEspecialidad: Elimina una especialidad médica por su ID.
 *
 * @param {number} id - El ID de la especialidad a eliminar.
 * @returns {Promise<object>} Un objeto con `success: true` y `data` (la respuesta del servidor),
 * o `success: false` y un `message` de error.
 */
export const eliminarEspecialidad = async (id) => {
    try {
        const response = await api.delete(`/eliminarEspecialidad/${id}`); // Realiza una petición DELETE.
        return { success: true, data: response.data }; // Retorna éxito y los datos.
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión con el servidor.";
        console.error(`Error al eliminar especialidad ${id}:`, error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};