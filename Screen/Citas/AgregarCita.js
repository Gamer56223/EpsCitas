import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { crearCita } from "../../Src/Servicios/CitaService";

import styles from "../../Styles/AgregarCitaStyles";

export default function AgregarCita({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [estado, setEstado] = useState("");
    const [hora, setHora] = useState("");
    const [tipo, setTipo] = useState("");

    const [loading, setLoading] = useState(false);

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
        if (!nombre || !fecha || !estado || !hora || !tipo) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        try {
            const result = await crearCita({
                Nombre: nombre,
                Fecha: fecha,
                Hora: hora,
                Estado: estado,
                Tipo: tipo
            });

            if (result.success) {
                Alert.alert("Éxito", "Cita creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear la cita"));
            }
        } catch (error) {
            console.error("Error al crear cita:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear la cita."));
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
                        <Text style={styles.title}>Nueva Cita</Text>

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
                                    <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>Crear Cita</Text>
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

