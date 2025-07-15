import { NavigationContainer } from "@react-navigation/native";
import AuthNavegacion from "./AuthNavegacion"; // Navegador para pantallas de autenticación (login, registro)
import NavegacionPrincipal from "./NavegacionPrincipal"; // Navegador principal de la aplicación (después del login)
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para almacenamiento local seguro
import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, View, StyleSheet, AppState, Text } from "react-native";

/**
 * AppNavegacion: Componente raíz de navegación de la aplicación.
 * Gestiona el estado de autenticación del usuario (token) y decide qué flujo de navegación mostrar:
 * autenticación (login/registro) o la aplicación principal.
 * También maneja la recarga del token cuando la aplicación vuelve a estar activa.
 */
export default function AppNavegacion() {
    // isLoading: Estado que indica si la aplicación está cargando el token inicial.
    const [isLoading, setIsLoading] = useState(true);
    // userToken: Almacena el token de autenticación del usuario. Si es null, el usuario no está logueado.
    const [userToken, setUserToken] = useState(null);
    // appState: Ref para seguir el estado actual de la aplicación (activa, inactiva, etc.).
    const appState = useRef(AppState.currentState);

    /**
     * loadToken: Función asíncrona para cargar el token de autenticación desde AsyncStorage.
     * Actualiza el estado `userToken` y desactiva el `isLoading` una vez completado.
     */
    const loadToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken"); // Intenta obtener el token
            setUserToken(token); // Actualiza el estado del token
        } catch (e) {
            console.error("Error al cargar el token desde AsyncStorage:", e);
            setUserToken(null); // Asegura que el token sea null si hay un error en la carga
        } finally {
            setIsLoading(false); // La carga inicial ha terminado
        }
    };

    /**
     * updateUserToken: Función clave que se pasa a los componentes hijos (como LoginScreen, PantallaPerfil)
     * para permitirles actualizar el token de autenticación en este componente raíz.
     * Esto es vital para cambiar entre los flujos de autenticación y la aplicación principal.
     * @param {string | null} newToken - El nuevo token de autenticación o `null` para cerrar sesión.
     */
    const updateUserToken = async (newToken) => {
        if (newToken === null) {
            // Si el nuevo token es null, significa cierre de sesión, así que se elimina del almacenamiento.
            await AsyncStorage.removeItem("userToken");
        } else {
            // Si hay un nuevo token, se guarda en AsyncStorage.
            await AsyncStorage.setItem("userToken", newToken);
        }
        setUserToken(newToken); // Esto causará una re-renderización de `AppNavegacion`,
                                // cambiando entre `NavegacionPrincipal` y `AuthNavegacion`.
    };

    // useEffect para ejecutar `loadToken` una vez al montar el componente.
    useEffect(() => {
        loadToken();
    }, []); // El array vacío asegura que se ejecute solo una vez al montar.

    // useEffect para manejar los cambios en el estado de la aplicación (App_State).
    // Esto permite recargar el token si la aplicación vuelve a estar activa.
    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            // Si la app estaba inactiva/en segundo plano y ahora está activa
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                console.log('App ha vuelto a estar activa, verificando token...');
                loadToken(); // Recarga el token para verificar si la sesión sigue siendo válida.
            }
            appState.current = nextAppState; // Actualiza el estado de referencia de la app.
        };

        // Suscribe al evento 'change' del AppState.
        const subscription = AppState.addEventListener('change', handleAppStateChange);

        // Función de limpieza: desuscribe el listener cuando el componente se desmonte.
        return () => subscription?.remove();
    }, []); // Dependencia vacía, se configura una vez.


    // Muestra un indicador de carga mientras se está verificando el token inicial.
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando aplicación...</Text>
            </View>
        );
    }

    // Renderiza el contenedor de navegación.
    return (
        <NavigationContainer>
            {/* Si `userToken` existe, muestra la `NavegacionPrincipal` (app logueada).
                De lo contrario, muestra `AuthNavegacion` (login/registro).
                Ambos reciben `updateUserToken` para poder cambiar el estado de autenticación. */}
            {userToken ?
                <NavegacionPrincipal updateUserToken={updateUserToken} />
                :
                <AuthNavegacion updateUserToken={updateUserToken} />
            }
        </NavigationContainer>
    );
}

// Estilos para el indicador de carga.
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#EBF5FB', // Fondo claro y suave
    },
    loadingText: {
        marginTop: 15,
        fontSize: 18,
        color: '#555',
        fontWeight: '600',
    },
});