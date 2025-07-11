import api from "./conexion";

const formatErrorMessage = (errorResponseData) => {
    if (typeof errorResponseData === 'string') {
        return errorResponseData;
    }
    if (errorResponseData && typeof errorResponseData === 'object') {
        if (errorResponseData.errors) {
            const messages = Object.values(errorResponseData.errors).flat();
            return messages.join('\n');
        }
        if (errorResponseData.message) {
            if (typeof errorResponseData.message === 'string') {
                return errorResponseData.message;
            }
            return JSON.stringify(errorResponseData.message);
        }
        return defaultMsg;
    }
    return "Error desconocido";
};

export const listarEspecialidades = async () => {
    try {
        const response = await api.get("/listarEspecialidades");
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar especialidades:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearEspecialidad = async (especialidadData) => {
    try {
        const response = await api.post("/crearEspecialidad", especialidadData);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear especialidad:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const obtenerEspecialidadPorId = async (id) => {
    try {
        const response = await api.get(`/mostrarEspecialidad/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error(`Error al obtener especialidad ${id}:`, error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const editarEspecialidad = async (id, especialidadData) => {
    try {
        // CAMBIO CRÍTICO AQUÍ: Cambiado de /actualizarEspecialidad a /editarEspecialidad
        const response = await api.put(`/editarEspecialidad/${id}`, especialidadData);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error(`Error al editar especialidad ${id}:`, error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const eliminarEspecialidad = async (id) => {
    try {
        const response = await api.delete(`/eliminarEspecialidad/${id}`);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error(`Error al eliminar especialidad ${id}:`, error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};