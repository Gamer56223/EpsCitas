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


export const listarEps = async () => {
    try {
        const response = await api.get("/listarEps");
        console.log("Respuesta listarEps:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar EPS:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const eliminarEps = async (id) => {
    console.log("Intentando eliminar EPS con ID:", id);
    try {
        const response = await api.delete(`/eliminarEps/${id}`);
        console.log("Respuesta eliminarEps:", response.data);
        return { success: true, message: response.data.message || "EPS eliminada correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar EPS:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearEps = async (data) => {
    try {
        const response = await api.post("/crearEps", data);
        console.log("Respuesta crearEps:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear EPS:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarEps = async (id, data) => {
    try {
        const response = await api.put(`/editarEps/${id}`, data);
        console.log("Respuesta editarEps:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar la EPS:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};