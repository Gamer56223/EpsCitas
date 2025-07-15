import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage para almacenar el token de usuario
import api from "./conexion"; // Importa la instancia de Axios configurada, probablemente con la URL base de tu API

/**
 * Servicio de Autenticación para la aplicación.
 * Provee funciones para iniciar sesión, cerrar sesión y registrar usuarios,
 * manejando la interacción con la API y el almacenamiento del token JWT.
 */

/**
 * loginUser: Intenta autenticar un usuario con email y contraseña.
 * Si la autenticación es exitosa, guarda el token JWT recibido en AsyncStorage.
 *
 * @param {string} email - El email del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {object} Un objeto con `success: true` y el `token` si la operación fue exitosa,
 * o `success: false` y un `message` de error.
 */
export const loginUser = async (email, password) => {
    try {
        // Realiza una petición POST a la ruta '/login' con las credenciales del usuario.
        const response = await api.post("/login", { email, password });
        const { token } = response.data; // Extrae el token de la respuesta de la API.

        // Almacena el token de usuario en AsyncStorage para persistencia de la sesión.
        await AsyncStorage.setItem("userToken", token);

        return { success: true, token }; // Retorna éxito y el token.
    } catch (error) {
        // Captura y registra cualquier error durante el proceso de login.
        console.error(
            "Error de login:",
            error.response ? error.response.data : error.message // Muestra el mensaje de error de la API o el mensaje general del error.
        );
        return {
            success: false,
            // Proporciona un mensaje de error más específico si viene de la respuesta de la API.
            message: error.response
                ? error.response.data.message
                : "Error al conectar con el servidor para iniciar sesión.",
        };
    }
};

/**
 * logoutUser: Intenta cerrar la sesión del usuario.
 * Envía una petición POST al endpoint de logout y elimina el token de AsyncStorage.
 *
 * @returns {object} Un objeto con `success: true` si la operación fue exitosa,
 * o `success: false` y un `message` de error.
 */
export const logoutUser = async () => {
    try {
        // Envía una petición POST al endpoint '/logout'.
        // Asume que tu backend tiene un endpoint de logout que invalida la sesión o token.
        await api.post("/logout");
        // Elimina el token de usuario de AsyncStorage, lo que efectivamente cierra la sesión en el cliente.
        await AsyncStorage.removeItem("userToken");
        return { success: true }; // Retorna éxito.
    } catch (error) {
        // Captura y registra cualquier error durante el proceso de logout.
        console.error(
            "Error al cerrar sesión:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error al cerrar sesión.",
        };
    }
};

/**
 * registerUser: Renombrado de 'Register' a 'registerUser' para seguir convenciones de nombres.
 * Intenta registrar un nuevo usuario con los detalles proporcionados.
 * Si el registro es exitoso, guarda el token JWT recibido en AsyncStorage (asumiendo que el registro también loguea al usuario).
 *
 * @param {string} name - El nombre del usuario.
 * @param {string} email - El email del usuario.
 * @param {string} password - La contraseña del usuario.
 * @param {string} role - El rol del usuario (e.g., "Paciente", "Médico", "Admin").
 * @returns {object} Un objeto con `success: true` y el `token` si la operación fue exitosa,
 * o `success: false` y un `message` de error.
 */
export const registerUser = async (name, email, password, role) => {
    try {
        // Realiza una petición POST a la ruta '/registrar' con los datos del nuevo usuario.
        // Asegúrate de que el backend espere todos estos campos (name, email, password, role).
        const response = await api.post("/registrar", { name, email, password, role });
        const { token } = response.data; // Extrae el token de la respuesta.

        // Almacena el token de usuario, ya que el registro generalmente también autentica al usuario.
        await AsyncStorage.setItem("userToken", token);

        return { success: true, token }; // Retorna éxito y el token.
    } catch (error) {
        // Captura y registra cualquier error durante el proceso de registro.
        console.error(
            "Error de registro:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error al registrar el usuario.",
        };
    }
};