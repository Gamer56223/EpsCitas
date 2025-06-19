import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";

export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/login", {email, password});
        const { token } = response.data;

        await AsyncStorage.setItem("userToken", token);

        return { success: true, token };
    } catch (error) {
        console.error(
            "Error de login",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
               ? error.response.data.message
               : "Error al conectar",
        };
    }

};
