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

export const listarPacientes = async () => {
    try {
        const response = await api.get("/listarPacientes");
        console.log("Respuesta listarPacientes:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al listar pacientes:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const DetallePacienteId = async (id) => {
    try {
        const response = await api.get(`/listarPacientes/${id}`); // Cambiado a /listarPacientes/{id} para consistencia con Sedes
        console.log("Respuesta Detalle Paciente:", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al detalle pacientes:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
}

export const eliminarPaciente = async (id) => {
    console.log("Intentando eliminar paciente con ID:", id);
    try {
        const response = await api.delete(`/eliminarPaciente/${id}`);
        console.log("Respuesta eliminarPaciente:", response.data);
        return { success: true, message: response.data.message || "Paciente eliminado correctamente" };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al eliminar Paciente:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const crearPaciente = async (data) => {
    const payload = { ...data, idEps: Number(data.idEps) };
    console.log("Datos enviados a crearPaciente (PacienteService):", payload);
    try {
        const response = await api.post("/crearPaciente", payload);
        console.log("Respuesta crearPaciente (PacienteService):", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al crear paciente (PacienteService):", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};

export const editarPaciente = async (id, data) => {
    const payload = { ...data, idEps: Number(data.idEps) };
    console.log(`Datos enviados a editarPaciente (ID: ${id}) (PacienteService):`, payload);
    try {
        const response = await api.put(`/editarPaciente/${id}`, payload);
        console.log("Respuesta editarPaciente (PacienteService):", response.data);
        return { success: true, data: response.data };
    } catch (error) {
        const errorMessage = error.response ? formatErrorMessage(error.response.data) : "Error de conexión";
        console.error("Error al editar el paciente (PacienteService):", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: errorMessage
        };
    }
};