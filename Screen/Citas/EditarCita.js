import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { crearCita, editarCita } from "../../Src/Servicios/CitaService";
import { DetalleCitaId } from "../../Src/Servicios/CitaService";

import * as Notifications from 'expo-notifications';

import styles from "../../Styles/EditarCitaStyles";

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
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Nueva Cita Registrada",
                        body:`El cambio de ${hora} ha sido registrado correctamente`,
                    },
                    trigger: { seconds: 2}, //se muestra dos segundos después
                })
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

