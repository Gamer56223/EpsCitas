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
        return JSON.stringify(errorResponseData);
    }
    return "Error desconocido";
};

export const listarMedicos = async () => {
    try {
        const response = await api.get("/listarMedicos");
        console.log("Respuesta listarMedicos:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar medicos:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const DetalleMedicoId = async () => {
    try {
        const response = await api.get(`/listarMedicos/${id}`);
        console.log("Respuesta detalleMedico:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al mostrar Detalle Medico:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const eliminarMedico = async (id) => {
    console.log("Intentando eliminar medico con ID:", id);
    try {
        const response = await api.delete(`/eliminarMedico/${id}`);
        console.log("Respuesta eliminarMedico:", response.data);
        return { success: true, message: response.data.message || "Medico eliminado correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Medico:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearMedicos = async (data) => {
    try {
        const response = await api.post("/crearMedico", data);
        console.log("Respuesta crearMedicos:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear medico:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarMedicos = async (id, data) => {
    try {
        const response = await api.put(`/editarMedico/${id}`, data);
        console.log("Respuesta editarMedicos:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar el medico:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};