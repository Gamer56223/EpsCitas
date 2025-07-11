import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { crearEps, editarEps } from "../../Src/Servicios/EpsService";
import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService";
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from "../../Styles/EditarEpsStyles";

export default function EditarEps({ navigation }) {
    const route = useRoute();
    const eps = route.params?.eps;

    const [nombre, setNombre] = useState(eps?.Nombre || "");
    const [direccion, setDireccion] = useState(eps?.direccion || "");
    const [telefono, setTelefono] = useState(eps?.Telefono || "");
    const [nit, setNit] = useState(eps?.Nit || "");
    const [idEspecialidad, setIdEspecialidad] = useState(eps?.idEspecialidad?.toString() || "");

    const [especialidades, setEspecialidades] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingEspecialidades, setLoadingEspecialidades] = useState(true);

    const esEdicion = !!eps;

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

    useEffect(() => {
        const fetchEspecialidades = async () => {
            setLoadingEspecialidades(true);
            try {
                const result = await listarEspecialidades();
                if (result.success) {
                    setEspecialidades(result.data);
                    if (esEdicion && eps?.idEspecialidad) {
                        setIdEspecialidad(eps.idEspecialidad.toString());
                    } else if (result.data.length > 0) {
                        setIdEspecialidad(result.data[0].id.toString());
                    } else {
                        setIdEspecialidad("");
                    }
                } else {
                    Alert.alert("Error", result.message || "No se pudieron cargar las especialidades.");
                }
            } catch (error) {
                console.error("Error al cargar especialidades:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar las especialidades.");
            } finally {
                setLoadingEspecialidades(false);
            }
        };

        fetchEspecialidades();
    }, [esEdicion, eps]);

    const handleGuardar = async () => {
        if (!nombre || !direccion || !telefono || !nit || !idEspecialidad) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }
        if (especialidades.length === 0) {
            Alert.alert("Error", "No hay especialidades disponibles para asignar. Por favor, agregue especialidades primero.");
            return;
        }

        setLoading(true);
        let result;
        try {
            const dataToSave = {
                Nombre: nombre,
                direccion: direccion,
                Telefono: telefono,
                Nit: nit,
                idEspecialidad: parseInt(idEspecialidad)
            };

            if (esEdicion) {
                result = await editarEps(eps.id, dataToSave);
            } else {
                result = await crearEps(dataToSave);
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Eps actualizada correctamente" : "Eps creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la eps"));
            }
        } catch (error) {
            console.error("Error al guardar eps:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar la eps."));
        } finally {
            setLoading(false);
        }
    };

    if (loadingEspecialidades) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando especialidades...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>{esEdicion ? "Editar EPS" : "Nueva EPS"}</Text>

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
                        <TextInput
                            style={styles.input}
                            placeholder="Nit"
                            placeholderTextColor="#888"
                            value={nit}
                            onChangeText={setNit}
                            keyboardType="numeric"
                        />

                        {/* Mover el label fuera del pickerContainer */}
                        <Text style={styles.pickerLabelActual}>Seleccionar Especialidad:</Text>
                        <View style={styles.pickerContainer}>
                            {especialidades.length > 0 ? (
                                <Picker
                                    selectedValue={idEspecialidad}
                                    onValueChange={(itemValue) => setIdEspecialidad(itemValue)}
                                    style={styles.picker}
                                    itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                                >
                                    <Picker.Item label="-- Seleccione una especialidad --" value="" />
                                    {especialidades.map((esp) => (
                                        <Picker.Item
                                            key={esp.id.toString()}
                                            label={esp.Nombre || esp.nombre || `Especialidad ID: ${esp.id}`}
                                            value={esp.id.toString()}
                                        />
                                    ))}
                                </Picker>
                            ) : (
                                <Text style={styles.noEspecialidadesText}>No hay especialidades disponibles.</Text>
                            )}
                        </View>

                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.botonContent}>
                                    <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear EPS"}</Text>
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


