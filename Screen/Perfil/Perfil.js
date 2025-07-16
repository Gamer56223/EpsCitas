import React, { useState } from "react";
import { View, Text, ActivityIndicator, Alert, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../components/BottonComponent";
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect
import api from "../../Src/Servicios/conexion";
import { logoutUser } from "../../Src/Servicios/AuthService";
import styles from "../../Styles/PerfilStyles";

export default function PantallaPerfil({ navigation, updateUserToken }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    // useFocusEffect se ejecuta cada vez que la pantalla vuelve a estar en foco.
    // Esto asegura que los datos se recarguen después de editar el perfil.
    useFocusEffect(
        React.useCallback(() => {
            const cargarPerfil = async () => {
                if (!loading) setLoading(true); // Mostrar carga solo si no está cargando ya
                try {
                    const token = await AsyncStorage.getItem("userToken");
                    if (!token) {
                        updateUserToken(null);
                        return;
                    }
                    const response = await api.get("/me");
                    // La respuesta de la API envuelve al usuario en un objeto 'user'
                    setUsuario(response.data.user);
                } catch (error) {
                    console.error("Error al cargar el perfil:", error);
                    Alert.alert("Error", "No se pudo cargar la información del perfil.");
                    updateUserToken(null); // Si falla, cerramos sesión
                } finally {
                    setLoading(false);
                }
            };
            cargarPerfil();
        }, []) 
    );

    const handleLogout = async () => {
        try {
            const result = await logoutUser();
            if (result.success) {
                Alert.alert("Sesión Cerrada", "Has cerrado sesión exitosamente.");
                updateUserToken(null);
            } else {
                Alert.alert("Error", result.message || "No se pudo cerrar la sesión.");
            }
        } catch (error) {
            console.error("Error inesperado al cerrar sesión:", error);
            Alert.alert("Error", "Ocurrió un error inesperado.");
        }
    };

    // --- FUNCIÓN CORREGIDA ---
    // Esta función ahora solo navega a la pantalla de edición
    const handleNavigateToEdit = () => {
        if (usuario) {
            // Pasamos el objeto de usuario a la pantalla de edición
            navigation.navigate('EditarPerfil', { usuario: usuario });
        } else {
            Alert.alert("Error", "No se pueden editar los datos porque no se han cargado.");
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando perfil...</Text>
            </View>
        );
    }

    if (!usuario) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>
                    No se pudo cargar la información del perfil.
                </Text>
                <BottonComponent
                    title="Ir a Iniciar Sesión"
                    onPress={() => updateUserToken(null)}
                    buttonStyle={styles.loginButton}
                    textStyle={styles.buttonText}
                />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>
            <View style={styles.containerPerfil}>
                <Text style={styles.profileText}>
                    <Text style={styles.detailLabel}>Nombre: </Text>
                    {usuario.name || "No disponible"}
                </Text>
                <Text style={styles.profileText}>
                    <Text style={styles.detailLabel}>Email: </Text>
                    {usuario.email || "No disponible"}
                </Text>
                <Text style={styles.profileText}>
                    <Text style={styles.detailLabel}>Rol: </Text>
                    {usuario.role || "No disponible"}
                </Text>
                {usuario.telefono && (
                    <Text style={styles.profileText}>
                        <Text style={styles.detailLabel}>Teléfono: </Text>
                        {usuario.telefono}
                    </Text>
                )}

                <View style={styles.profileButtonContainer}>
                    <BottonComponent
                        title="Editar Perfil"
                        onPress={handleNavigateToEdit}
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