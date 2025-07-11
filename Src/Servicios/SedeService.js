import api from "./conexion";

// Función auxiliar para formatear mensajes de error
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
        return JSON.stringify(errorResponseData);
    }
    return "Error desconocido";
};


export const listarSedes = async () => {
    try {
        const response = await api.get("/listarSedes");
        console.log("Respuesta listarSedes:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar sedes:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

// *** NUEVA FUNCIÓN: obtenerSedePorId ***
export const obtenerSedePorId = async (id) => {
    try {
        const response = await api.get(`/mostrarSede/${id}`); // Asumiendo que tu ruta es /mostrarSede/{id}
        console.log(`Respuesta obtenerSedePorId (${id}):`, response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error(`Error al obtener sede por ID ${id}:`, error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};


export const eliminarSede = async (id) => {
    console.log("Intentando eliminar sede con ID:", id);
    try {
        const response = await api.delete(`/eliminarSede/${id}`);
        console.log("Respuesta eliminarSede:", response.data);
        return { success: true, message: response.data.message || "Sede eliminada correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Sede:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearSede = async (data) => {
    try {
        const response = await api.post("/crearSede", data);
        console.log("Respuesta crearSede:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear sede:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarSede = async (id, data) => {
    try {
        const response = await api.put(`/editarSede/${id}`, data);
        console.log("Respuesta editarSede:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar la sede:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};