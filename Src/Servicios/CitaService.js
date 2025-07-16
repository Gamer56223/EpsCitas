// Ruta: Src/Servicios/CitaService.js

import api from "./conexion"; // Asegúrate de que la ruta sea correcta

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


export const listarCitas = async () => {
    try {
        const response = await api.get("/listarCitas");
        console.log("Respuesta listarCitas:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar citas:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}


export const eliminarCita = async (id) => {
    console.log("Intentando eliminar cita con ID:", id);
    try {
        const response = await api.delete(`/eliminarCita/${id}`);
        console.log("Respuesta eliminarCita:", response.data);
        return { success: true, message: response.data.message || "Cita eliminada correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Cita:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearCita = async (data) => {
    try {
        const response = await api.post("/crearCita", data);
        console.log("Respuesta crearCita:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear cita:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarCita = async (id, data) => {
    try {
        const response = await api.put(`/editarCita/${id}`, data);
        console.log("Respuesta editarCita:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar la cita:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};