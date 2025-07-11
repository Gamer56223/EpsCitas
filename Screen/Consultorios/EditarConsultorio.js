import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
import { editarConsultorio } from "../../Src/Servicios/ConsultorioService";
import { listarSedes } from "../../Src/Servicios/SedeService";
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from "../../Styles/EditarConsultorioStyles";

export default function EditarConsultorio({ navigation }) {
    const route = useRoute();
    const consultorioInicial = route.params?.consultorio;

    const [nombre, setNombre] = useState(consultorioInicial?.Nombre || "");
    const [numero, setNumero] = useState(consultorioInicial?.Numero?.toString() || "");
    const [idsede, setIdSede] = useState(consultorioInicial?.idSede?.toString() || "");
    const [sedes, setSedes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingSedes, setLoadingSedes] = useState(true);

    const esEdicion = !!consultorioInicial;

    const getAlertMessage = (msg, defaultMsg) => {
        if (typeof msg === 'string') {
            return msg;
        }
        if (msg && typeof msg === 'object') {
            if (msg.errors) {
                const messages = Object.values(msg.errors).flat();
                return messages.join('\n');
            }
            if (msg.message) {
                if (typeof msg.message === 'string') {
                    return msg.message;
                }
                return JSON.stringify(msg.message);
            }
            return JSON.stringify(msg);
        }
        return defaultMsg;
    };

    useEffect(() => {
        const cargarSedes = async () => {
            setLoadingSedes(true);
            try {
                const result = await listarSedes();
                if (result.success) {
                    setSedes(result.data);
                    if (esEdicion && consultorioInicial?.idSede) {
                        setIdSede(consultorioInicial.idSede.toString());
                    } else if (result.data.length > 0) {
                        setIdSede(result.data[0].id.toString());
                    } else {
                        setIdSede("");
                    }
                } else {
                    Alert.alert(
                        "Error al cargar sedes",
                        result.message || "No se pudieron cargar las sedes."
                    );
                }
            } catch (error) {
                console.error("Error al cargar sedes:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar las sedes.");
            } finally {
                setLoadingSedes(false);
            }
        };
        cargarSedes();
    }, [esEdicion, consultorioInicial]);

    const handleGuardar = async () => {
        if (!nombre || !numero || idsede === "") {
            Alert.alert("Campos requeridos", "Por favor, ingrese el nombre, el número y seleccione una sede.");
            return;
        }

        const numeroNumerico = parseInt(numero);
        if (isNaN(numeroNumerico)) {
            Alert.alert("Formato de Número", "Por favor, ingrese un número válido para el consultorio.");
            return;
        }

        const sedeIdNumerico = parseInt(idsede);
        if (isNaN(sedeIdNumerico) || sedeIdNumerico <= 0) {
            Alert.alert("Selección de Sede", "Por favor, seleccione una sede válida de la lista.");
            return;
        }

        setLoading(true);
        let result;
        try {
            result = await editarConsultorio(consultorioInicial.id, {
                Nombre: nombre,
                Numero: numeroNumerico,
                idSede: sedeIdNumerico,
            });

            if (result.success) {
                Alert.alert("Éxito", "Consultorio actualizado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar el consultorio"));
            }
        } catch (error) {
            console.error("Error al guardar consultorio:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar el consultorio."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            // Ajusta este offset si tu header es personalizado y no es parte del KeyboardAvoidingView
            // keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} 
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>{esEdicion ? "Editar Consultorio" : "Nuevo Consultorio"}</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nombre del Consultorio"
                            placeholderTextColor="#888"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Número del Consultorio"
                            placeholderTextColor="#888"
                            value={numero}
                            onChangeText={setNumero}
                            keyboardType="numeric"
                        />

                        {loadingSedes ? (
                            <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
                        ) : (
                            <>
                                {/* Mover el label fuera del pickerContainer */}
                                <Text style={styles.pickerLabelActual}>Seleccione Sede:</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={idsede}
                                        onValueChange={(itemValue) => setIdSede(itemValue)}
                                        style={styles.picker}
                                        itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                                    >
                                        <Picker.Item label="-- Seleccione una Sede --" value="" />
                                        {sedes.map((sede) => (
                                            <Picker.Item key={sede.id.toString()} label={sede.Nombre} value={sede.id.toString()} />
                                        ))}
                                    </Picker>
                                </View>
                            </>
                        )}

                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingSedes}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.botonContent}>
                                    <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Consultorio"}</Text>
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

