import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../components/BottonComponent";
import { CommonActions } from '@react-navigation/native';

import api from "../../Src/Servicios/conexion"; // Importa la instancia de Axios configurada
import { logoutUser } from "../../Src/Servicios/AuthService"; // Servicio para cerrar sesión

import styles from "../../Styles/PerfilStyles"; // Estilos para la pantalla de perfil

/**
 * PantallaPerfil: Componente de pantalla que muestra la información del perfil del usuario logueado.
 * Permite ver los detalles del usuario y cerrar la sesión.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation.
 * @param {function} props.updateUserToken - Función pasada desde el componente padre (ej. AppNavegacion)
 * para actualizar el token de autenticación global (ej. a `null` al cerrar sesión).
 */
export default function PantallaPerfil({ navigation, updateUserToken }) {
    // Estado para almacenar la información del usuario
    const [usuario, setUsuario] = useState(null);
    // Estado para controlar el indicador de carga
    const [loading, setLoading] = useState(true);

    // useEffect para cargar el perfil del usuario cuando el componente se monta o cuando `updateUserToken` cambia.
    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                // Intenta obtener el token del almacenamiento local
                const token = await AsyncStorage.getItem("userToken");
                if (!token) {
                    // Si no hay token, asume que el usuario no está autenticado o el token expiró/fue limpiado.
                    // Fuerza un logout a través de `updateUserToken` para redirigir a la pantalla de inicio de sesión.
                    updateUserToken(null);
                    return;
                }

                // Realiza una solicitud GET a la ruta `/me` para obtener la información del usuario actual.
                const response = await api.get("/me");
                setUsuario(response.data); // Almacena los datos del usuario en el estado
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
                if (error.response) {
                    // Si hay una respuesta del servidor (error HTTP)
                    Alert.alert(
                        "Error del servidor",
                        `Error ${error.response.status}: ${error.response.data?.message || "No se pudo cargar el perfil"}`,
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    // Si el error es 401 (No autorizado), fuerza el logout.
                                    if (error.response.status === 401) {
                                        updateUserToken(null);
                                    }
                                }
                            }
                        ]
                    );
                } else if (error.request) {
                    // Si no hay respuesta del servidor (problema de red)
                    Alert.alert(
                        "Error de conexión",
                        "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    // Si hay error de conexión, fuerza el logout para intentar de nuevo la autenticación.
                                    updateUserToken(null);
                                }
                            }
                        ]
                    );
                } else {
                    // Otros errores inesperados
                    Alert.alert(
                        "Error",
                        "Ocurrió un error inesperado al cargar el perfil.",
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    // Para cualquier otro error, fuerza el logout.
                                    updateUserToken(null);
                                }
                            }
                        ]
                    );
                }
            } finally {
                setLoading(false); // Desactiva el indicador de carga, independientemente del resultado.
            }
        };
        cargarPerfil();
    }, [updateUserToken]); // Dependencia: el efecto se re-ejecuta si `updateUserToken` cambia.

    /**
     * handleLogout: Función asíncrona para manejar el cierre de sesión del usuario.
     * Llama al servicio `logoutUser` y, si es exitoso, actualiza el token global a `null`.
     */
    const handleLogout = async () => {
        try {
            const result = await logoutUser(); // Llama al servicio de logout.
            if (result.success) {
                Alert.alert("Sesión Cerrada", "Has cerrado sesión exitosamente.");
                // Llama a la función `updateUserToken` pasada desde AppNavegacion
                // para indicar que el usuario ya no está autenticado.
                updateUserToken(null);
            } else {
                Alert.alert("Error al cerrar sesión", result.message || "No se pudo cerrar la sesión.");
            }
        } catch (error) {
            console.error("Error inesperado al cerrar sesión:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al intentar cerrar sesión.");
        }
    };

    // Muestra un indicador de carga mientras se está obteniendo la información del perfil.
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando perfil...</Text>
            </View>
        );
    }

    // Si no se pudo cargar el usuario (ej. token inválido, error de conexión),
    // muestra un mensaje de error y un botón para ir a iniciar sesión.
    if (!usuario) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Perfil de Usuario</Text>
                <View style={styles.containerPerfil}>
                    <Text style={styles.errorText}>
                        No se pudo cargar la información del perfil.
                    </Text>                    
                    <BottonComponent
                        title="Ir a Iniciar Sesión"
                        onPress={async () => {
                            // Al hacer clic, también forzamos el logout a través de AppNavegacion
                            // para asegurar que el estado de autenticación se limpie completamente.
                            updateUserToken(null);
                        }}
                        buttonStyle={styles.loginButton} // Estilo específico para el botón de ir a Login
                        textStyle={styles.buttonText}
                    />
                </View>
            </SafeAreaView>
        );
    }

    // Si el perfil se cargó exitosamente, muestra los detalles del usuario.
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>
            <View style={styles.containerPerfil}>
                <Text style={styles.profileText}>
                    <Text style={styles.detailLabel}>Nombre: </Text>
                    {usuario.user?.name || "No disponible"}
                </Text>
                <Text style={styles.profileText}>
                    <Text style={styles.detailLabel}>Email: </Text>
                    {usuario.user?.email || "No disponible"}
                </Text>
                <Text style={styles.profileText}>
                    <Text style={styles.detailLabel}>Rol: </Text>
                    {usuario.user?.role || "No disponible"}
                </Text>
                {/* Muestra el teléfono solo si está disponible */}
                {usuario.user?.telefono && (
                    <Text style={styles.profileText}>
                        <Text style={styles.detailLabel}>Teléfono: </Text>
                        {usuario.user.telefono}
                    </Text>
                )}

                <View style={styles.profileButtonContainer}>
                    <BottonComponent
                        title="Editar Perfil"
                        onPress={() => Alert.alert("Funcionalidad Pendiente", "La edición del perfil aún no está implementada.")}
                        buttonStyle={styles.editProfileButton}
                        textStyle={styles.buttonText}
                    />
                    <BottonComponent
                        title="Cerrar Sesión"
                        onPress={handleLogout}
                        buttonStyle={styles.logoutButton}
                        textStyle={styles.buttonText}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}