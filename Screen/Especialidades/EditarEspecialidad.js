import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { crearEspecialidad, editarEspecialidad } from "../../Src/Servicios/EspecialidadService";

import styles from "../../Styles/EditarEspecialidadStyles";

export default function EditarEspecialidad({ navigation }) {
    const route = useRoute();
    const especialidad = route.params?.especialidad;

    const [nombre, setNombre] = useState(especialidad?.Nombre || "");
    const [descripcion, setDescripcion] = useState(especialidad?.Descripcion || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!especialidad;

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
        if (!nombre || !descripcion) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarEspecialidad(especialidad.id, {
                    Nombre: nombre,
                    Descripcion: descripcion,
                });
            } else {
                result = await crearEspecialidad({
                    Nombre: nombre,
                    Descripcion: descripcion,
                });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Especialidad actualizada correctamente" : "Especialidad creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la especialidad"));
            }
        } catch (error) {
            console.error("Error al guardar especialidad:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar la especialidad."));
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
                        <Text style={styles.title}>{esEdicion ? "Editar Especialidad" : "Nueva Especialidad"}</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor="#888"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <TextInput
                            style={styles.inputTextArea}
                            placeholder="Descripción"
                            placeholderTextColor="#888"
                            value={descripcion}
                            onChangeText={setDescripcion}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />

                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.botonContent}>
                                    <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Especialidad"}</Text>
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

