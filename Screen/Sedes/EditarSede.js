import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { crearSede, editarSede } from "../../Src/Servicios/SedeService";

export default function EditarSede({ navigation }) {
    const route = useRoute();
    const sede = route.params?.sede;

    const [nombre, setNombre] = useState(sede?.Nombre || "");
    const [direccion, setDireccion] = useState(sede?.Direccion || "");
    const [telefono, setTelefono] = useState(sede?.Telefono || "");

    const [loading, setLoading] = useState(false);

    const esEdicion = !!sede;

    const getAlertMessage = (msg, defaultMsg) => {
        if (typeof msg === 'string') {
            return msg;
        }
        if (msg && typeof msg === 'object') {
            if (msg.errors) {
                const messages = Object.values(msg.errors).flat();
                return messages.join('\n');
            }
            if (msg.message && typeof msg.message === 'string') {
                return msg.message;
            }
            return JSON.stringify(msg);
        }
        return defaultMsg;
    };


    const handleGuardar = async () => {
        if (!nombre || !direccion || !telefono) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarSede(sede.id, {
                    Nombre: nombre,
                    Direccion: direccion,
                    Telefono: telefono
                });
            } else {
                result = await crearSede({
                    Nombre: nombre,
                    Direccion: direccion,
                    Telefono: telefono
                });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Sede actualizada correctamente" : "Sede creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la sede"));
            }
        } catch (error) {
            console.error("Error al guardar sede:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar la sede."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView} // Aplicar estilo aquí
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>{esEdicion ? "Editar Sede" : "Nueva Sede"}</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor="#888"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <TextInput
                            style={styles.inputTextArea}
                            placeholder="Dirección"
                            placeholderTextColor="#888"
                            value={direccion}
                            onChangeText={setDireccion}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Teléfono"
                            placeholderTextColor="#888"
                            value={telefono}
                            onChangeText={setTelefono}
                            keyboardType="phone-pad"
                        />

                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.botonContent}>
                                    <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Sede"}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-circle-outline" size={24} color="#555" />
                            <Text style={styles.backButtonText}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingView: { // Nuevo estilo para KeyboardAvoidingView
        flex: 1,
        backgroundColor: "#EBF5FB", // Fondo para toda la vista
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        paddingBottom: 200, // Aumentar este padding para dar espacio al teclado y la barra de navegación
        backgroundColor: "#EBF5FB", // Fondo suave
    },
    container: {
        width: '90%',
        maxWidth: 500,
        padding: 25,
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#2C3E50",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        height: 55,
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        paddingHorizontal: 18,
        marginBottom: 18,
        fontSize: 16,
        color: "#333333",
        width: "100%",
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    inputTextArea: {
        height: 120,
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        paddingHorizontal: 18,
        paddingVertical: 15,
        marginBottom: 18,
        fontSize: 16,
        color: "#333333",
        width: "100%",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        textAlignVertical: 'top',
    },
    boton: {
        backgroundColor: "#1976D2", // Azul para guardar/editar
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        marginTop: 20,
        shadowColor: "#1976D2",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    botonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botonIcon: {
        marginRight: 10,
    },
    textoBoton: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    backButton: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#E9ECEF',
    },
    backButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#555',
        fontWeight: '500',
    },
    error: {
        color: "#E74C3C",
        marginTop: 10,
        textAlign: "center",
        fontSize: 15,
        fontWeight: '500',
    },
});