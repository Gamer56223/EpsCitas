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
        return "Error desconocido";
    }
    return "Error desconocido";
};

export const listarConsultorios = async () => {
    try {
        const response = await api.get("/listarConsultorios");
        console.log("Respuesta listarConsultorios:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar consultorios:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const obtenerConsultorioPorId = async (id) => {
    try {
        const response = await api.get(`/listarConsultorios/${id}`); // Ruta corregida: usar 'listarConsultorios/{id}' en lugar de 'obtenerConsultorio/{id}' para consistencia con tu api.php
        console.log("Respuesta obtenerConsultorioPorId:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al obtener consultorio por ID:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const eliminarConsultorio = async (id) => {
    console.log("Intentando eliminar consultorio con ID:", id);
    try {
        const response = await api.delete(`/eliminarConsultorio/${id}`);
        console.log("Respuesta eliminarConsultorio:", response.data);
        return { success: true, message: response.data.message || "Consultorio eliminada correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearConsultorio = async (data) => {
    try {
        const response = await api.post("/crearConsultorio", data);
        console.log("Respuesta crearConsultorio:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarConsultorio = async (id, data) => {
    try {
        const response = await api.put(`/editarConsultorio/${id}`, data);
        console.log("Respuesta editarConsultorio:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar el consultorio:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};