import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { crearCita, editarCita } from "../../Src/Servicios/CitaService";

export default function EditarCita({ navigation }) {
    const route = useRoute();
    const cita = route.params?.cita;

    const [nombre, setNombre] = useState(cita?.Nombre || "");
    const [fecha, setFecha] = useState(cita?.Fecha || "");
    const [estado, setEstado] = useState(cita?.Estado || "");
    const [hora, setHora] = useState(cita?.Hora || "");
    const [tipo, setTipo] = useState(cita?.Tipo || "");

    const [loading, setLoading] = useState(false);

    const esEdicion = !!cita;

    const handleGuardar = async () => {
        if (!nombre || !fecha || !estado || !hora || !tipo) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarCita(cita.id, {
                    Nombre: nombre,
                    Fecha: fecha,
                    Estado: estado,
                    Hora: hora,
                    Tipo: tipo
                });
            } else {
                // Aunque esta es la pantalla de Editar, el código original tenía un else para crear.
                // Lo mantengo por si hay alguna lógica de reutilización.
                result = await crearCita({
                    Nombre: nombre,
                    Fecha: fecha,
                    Estado: estado,
                    Hora: hora,
                    Tipo: tipo
                });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Cita actualizada correctamente" : "Cita creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar la cita");
            }
        } catch (error) {
            console.error("Error al guardar cita:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar la cita.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>{esEdicion ? "Editar Cita" : "Nueva Cita"}</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor="#888"
                            value={nombre}
                            onChangeText={setNombre}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Fecha (YYYY-MM-DD)"
                            placeholderTextColor="#888"
                            value={fecha}
                            onChangeText={setFecha}
                            keyboardType="default" // Cambiado a default para permitir '-'
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Estado"
                            placeholderTextColor="#888"
                            value={estado}
                            onChangeText={setEstado}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Hora (HH:MM)"
                            placeholderTextColor="#888"
                            value={hora}
                            onChangeText={setHora}
                            keyboardType="default" // Cambiado a default para permitir ':'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Tipo"
                            placeholderTextColor="#888"
                            value={tipo}
                            onChangeText={setTipo}
                        />

                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.botonContent}>
                                    <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Cita"}</Text>
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
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: "#EBF5FB",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        paddingBottom: 200, // Aumentar este padding para dar espacio al teclado y la barra de navegación
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
    boton: {
        backgroundColor: "#1976D2",
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