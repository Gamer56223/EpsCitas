import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BotonComponent from "../../components/BottonComponent";
import api from "../../Src/Navegation/Services/conexion";
import { logoutUser } from "../../Src/Navegation/Services/AuthService";


export default function PantallaPerfil({ navigation }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const token = await AsyncStorage.getItem("userToken");
                if (!token) {
                    return;
                }

                const response = await api.get("/me");
                setUsuario(response.data);
            } catch (error) {
                if (error.isAuthError || error.shouldRedirectToLogin) {
                    return;
                }

                if (error.response) {
                    Alert.alert(
                        "Error del servidor",
                        `Error ${error.response.status}: ${error.response.data?.message || "No se pudo cargar el perfil"}`,
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    await AsyncStorage.removeItem("userToken");
                                }
                            }
                        ]
                    );
                } else if (error.request) {
                    Alert.alert(
                        "Error de conexión",
                        "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    await AsyncStorage.removeItem("userToken");
                                }
                            }
                        ]
                    );
                } else {
                    Alert.alert(
                        "Error",
                        "Ocurrió un error inesperado al cargar el perfil.",
                        [
                            {
                                text: "OK",
                                onPress: async () => {
                                    await AsyncStorage.removeItem("userToken");
                                }
                            }
                        ]
                    );
                }
            } finally {
                setLoading(false);
            }
        };
        cargarPerfil();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007B8C" />
            </View>
        );
    }

    if (!usuario) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Perfil de Usuario</Text>
                <View style={styles.containerPerfil}>
                    <Text style={styles.errorText}>
                        No se pudo cargar la información del perfil.
                    </Text>
                    <BotonComponent
                        title="Ir a Iniciar Sesión"
                        onPress={async () => {
                            await AsyncStorage.removeItem("userToken");
                            navigation.replace("Login");
                        }}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil de Usuario</Text>
            <View style={styles.containerPerfil}>
                <Text style={styles.profileText}>Nombre: {usuario.user.name || "No disponible"}</Text>
                <Text style={styles.profileText}>Email: {usuario.user.email || "No disponible"}</Text>

                <BotonComponent title="Editar Perfil" onPress={() => {}} />
                <BotonComponent
                    title="Cerrar Sesión"
                    onPress={async () => {
                        await logoutUser();
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    containerPerfil: {
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileText: {
        fontSize: 18,
        marginBottom: 10,
        color: "#555",
    },
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginBottom: 20,
    },
});