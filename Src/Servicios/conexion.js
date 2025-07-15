import axios from "axios"; // Importa la biblioteca Axios para realizar peticiones HTTP
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage para almacenar datos de forma persistente (ej. token de usuario)

/**
 * Configuración de la instancia de Axios para interactuar con la API.
 * Este archivo establece la URL base, los encabezados por defecto y los interceptores
 * para manejar la autenticación (añadir el token JWT) y la gestión de errores (token expirado).
 */

// URL base de tu API. Asegúrate de que esta IP sea accesible desde tu dispositivo/emulador.
// 'http://192.168.0.14:8000/api' es una IP local, podría necesitar ajustarse.
const API_BASE_URL = "http://192.168.0.14:8000/api";

// Crea una instancia de Axios con configuraciones predeterminadas.
const api = axios.create({
    baseURL: API_BASE_URL, // Establece la URL base para todas las peticiones de esta instancia.
    headers: {
        'Accept': 'application/json', // Indica que el cliente espera una respuesta JSON.
        'Content-Type': 'application/json', // Indica que el cuerpo de la petición se envía como JSON.
    },
});

// Define las rutas de la API que no requieren autenticación (rutas públicas).
// Las peticiones a estas rutas no incluirán el token de autorización.
const RutasPublicas = ['/login', '/registrar'];

/**
 * Interceptor de peticiones de Axios.
 * Se ejecuta antes de que cada petición sea enviada.
 * Su propósito principal es añadir el token de autenticación (JWT) a los encabezados
 * de las peticiones que van a rutas protegidas.
 */
api.interceptors.request.use(
    async (config) => {
        // Verifica si la URL de la petición actual es una ruta pública.
        const isRutaPublica = RutasPublicas.some(route => config.url.includes(route));

        // Si la ruta NO es pública, intenta añadir el token de autorización.
        if (!isRutaPublica) {
            const userToken = await AsyncStorage.getItem('userToken'); // Obtiene el token de AsyncStorage.
            if (userToken){
                // Si hay un token, lo añade al encabezado 'Authorization' como un token Bearer.
                config.headers.Authorization = `Bearer ${userToken}`;
            }
        }
        return config; // Retorna la configuración de la petición modificada.
    },
    (error) => {
        // Si hay un error en la configuración de la petición, lo rechaza.
        return Promise.reject(error);
    }
);

/**
 * Interceptor de respuestas de Axios.
 * Se ejecuta después de que cada respuesta es recibida.
 * Su propósito principal es manejar errores de autenticación (ej. token expirado 401).
 */
api.interceptors.response.use(
    (response) => response, // Si la respuesta es exitosa, la retorna sin modificaciones.
    async (error) => {
        const originalRequest = error.config; // Obtiene la configuración de la petición original.
        // Verifica si la URL de la petición original era una ruta pública.
        const isRutaPublica = RutasPublicas.some(route => originalRequest.url.includes(route));

        // Si la respuesta es un error 401 (No autorizado), y la petición no es pública,
        // y no se ha reintentado ya (`_retry` es una bandera para evitar bucles infinitos de reintentos).
        if (error.response && error.response.status === 401 && !originalRequest._retry && !isRutaPublica) {
            originalRequest._retry = true; // Marca la petición como reintentada.

            console.log("Token expirado o no autorizado. Redirigiendo al login.");
            await AsyncStorage.removeItem('userToken'); // Elimina el token inválido de AsyncStorage.
            // En una aplicación real, aquí se podría disparar una acción global para redirigir al usuario al login.
        }
        return Promise.reject(error); // Rechaza la promesa del error para que sea manejado por el código que hizo la petición.
    }
);

export default api; // Exporta la instancia de Axios configurada para ser utilizada en otros servicios.