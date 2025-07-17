import api from "./conexion"; // Importa la instancia de Axios configurada para las peticiones HTTP

/**
 * Servicio para la gestión de Consultorios.
 * Este archivo contiene funciones para interactuar con la API relacionadas con la creación,
 * lectura, actualización y eliminación (CRUD) de consultorios.
 */

/**
 * formatErrorMessage: Función auxiliar para formatear los mensajes de error recibidos de la API.
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
        // Si hay un campo 'errors' (común en errores de validación de Laravel)
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
        return "Error desconocido del servidor.";
    }
    // Si los datos no son una cadena ni un objeto, retorna un mensaje genérico.
    return "Error desconocido.";
};

/**
 * listarConsultorios: Obtiene una lista de todos los consultorios.
 *
 * @returns {object} Un objeto con `success: true` y `data` (la lista de consultorios),
 * o `success: false` y un `message` de error.
 */
export const listarConsultorios = async () => {
    try {
        const response = await api.get("/listarConsultorios"); // Realiza una petición GET al endpoint.
        console.log("Respuesta listarConsultorios:", response.data); // Log de la respuesta para depuración.
        return { success: true, data: response.data }; // Retorna éxito y los datos.
    } catch (error) {
        // Formatea el mensaje de error y lo loguea.
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión con el servidor.";
        console.error("Error al listar consultorios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const DetalleConsultorioId = async (id) => {
    try {
        const response = await api.get(`/listarConsultorios/${id}`);
        console.log("Respues detalleConsultorios:", response.data);
        return { success: true, data: response.data};
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión con el servidor.";
        console.error("Error al mostrar detalle consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

/**
 * obtenerConsultorioPorId: Obtiene los detalles de un consultorio específico por su ID.
 *
 * @param {number} id - El ID del consultorio a obtener.
 * @returns {object} Un objeto con `success: true` y `data` (el consultorio),
 * o `success: false` y un `message` de error.
 */


/**
 * eliminarConsultorio: Elimina un consultorio por su ID.
 *
 * @param {number} id - El ID del consultorio a eliminar.
 * @returns {object} Un objeto con `success: true` y un `message` de éxito,
 * o `success: false` y un `message` de error.
 */
export const eliminarConsultorio = async (id) => {
    console.log("Intentando eliminar consultorio con ID:", id); // Log para seguimiento.
    try {
        const response = await api.delete(`/eliminarConsultorio/${id}`); // Realiza una petición DELETE.
        console.log("Respuesta eliminarConsultorio:", response.data);
        return { success: true, message: response.data.message || "Consultorio eliminado correctamente." }; // Mensaje de éxito predeterminado.
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión con el servidor.";
        console.error("Error al eliminar Consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

/**
 * crearConsultorio: Crea un nuevo consultorio.
 *
 * @param {object} data - Los datos del nuevo consultorio.
 * @returns {object} Un objeto con `success: true` y `data` (el consultorio creado),
 * o `success: false` y un `message` de error.
 */
export const crearConsultorio = async (data) => {
    try {
        const response = await api.post("/crearConsultorio", data); // Realiza una petición POST con los datos.
        console.log("Respuesta crearConsultorio:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión con el servidor.";
        console.error("Error al crear consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

/**
 * editarConsultorio: Actualiza un consultorio existente por su ID.
 *
 * @param {number} id - El ID del consultorio a editar.
 * @param {object} data - Los nuevos datos del consultorio.
 * @returns {object} Un objeto con `success: true` y `data` (el consultorio actualizado),
 * o `success: false` y un `message` de error.
 */
export const editarConsultorio = async (id, data) => {
    try {
        const response = await api.put(`/editarConsultorio/${id}`, data); // Realiza una petición PUT con el ID y los datos.
        console.log("Respuesta editarConsultorio:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión con el servidor.";
        console.error("Error al editar el consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};