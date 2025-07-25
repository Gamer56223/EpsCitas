import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { crearMedicos } from "../../Src/Servicios/MedicoService";
import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService";

import styles from "../../Styles/AgregarMedicoStyles";

export default function AgregarMedico({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [tipodocumento, setTipoDocumento] = useState("");
    const [numerodocumento, setNumeroDocumento] = useState("");
    const [activo, setActivo] = useState("true");
    const [idespecialidad, setIdEspecialidad] = useState("");

    const [loading, setLoading] = useState(false);
    const [loadingEspecialidades, setLoadingEspecialidades] = useState(true);
    const [especialidades, setEspecialidades] = useState([]);

    useEffect(() => {
        const cargarEspecialidades = async () => {
            setLoadingEspecialidades(true);
            try {
                const result = await listarEspecialidades();
                if (result.success) {
                    setEspecialidades(result.data);
                    if (result.data.length > 0) {
                        setIdEspecialidad(result.data[0].id.toString());
                    } else {
                        setIdEspecialidad("");
                    }
                } else {
                    Alert.alert(
                        "Error",
                        result.message || "No se pudieron cargar las especialidades."
                    );
                }
            } catch (error) {
                console.error("Error al cargar especialidades:", error);
                Alert.alert("Error", "Ocurrió un error al cargar las especialidades.");
            } finally {
                setLoadingEspecialidades(false);
            }
        };
        cargarEspecialidades();
    }, []);

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

    const handleGuardar = async () => {
        if (!nombre || !apellido || !correo || !telefono || !tipodocumento || !numerodocumento || activo === "" || idespecialidad === "") {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos y seleccione una especialidad.");
            return;
        }

        const especialidadIdNum = parseInt(idespecialidad);
        if (isNaN(especialidadIdNum) || especialidadIdNum <= 0) {
            Alert.alert("Error de Especialidad", "Por favor, seleccione una especialidad válida de la lista.");
            return;
        }

        setLoading(true);
        try {
            const medicoData = {
                Nombre: nombre,
                Apellido: apellido,
                Correo: correo,
                Telefono: telefono,
                TipoDocumento: tipodocumento,
                NumeroDocumento: numerodocumento,
                Activo: activo === "true" ? "Activo" : "Inactivo",
                idEspecialidad: especialidadIdNum,
            };

            const result = await crearMedicos(medicoData);

            if (result.success) {
                Alert.alert("Éxito", "Médico creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear el médico"));
            }
        } catch (error) {
            console.error("Error al crear médico:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear el médico."));
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
                        <Text style={styles.title}>Nuevo Médico</Text>

                        {loadingEspecialidades ? (
                            <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
                        ) : (
                            <>
                                <Text style={styles.pickerLabelActual}>Seleccione Especialidad:</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={idespecialidad}
                                        onValueChange={(itemValue) => setIdEspecialidad(itemValue)}
                                        style={styles.picker}
                                        itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                                    >
                                        <Picker.Item label="-- Seleccione una especialidad --" value="" />
                                        {especialidades.map((e) => (
                                            <Picker.Item key={e.id.toString()} label={e.Nombre} value={e.id.toString()} />
                                        ))}
                                    </Picker>
                                </View>
                            </>
                        )}

                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor="#888"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Apellido"
                            placeholderTextColor="#888"
                            value={apellido}
                            onChangeText={setApellido}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Correo"
                            placeholderTextColor="#888"
                            value={correo}
                            onChangeText={setCorreo}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Teléfono"
                            placeholderTextColor="#888"
                            value={telefono}
                            onChangeText={setTelefono}
                            keyboardType="phone-pad"
                        />

                        <Text style={styles.pickerLabelActual}>Tipo Documento:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={tipodocumento}
                                onValueChange={(itemValue) => setTipoDocumento(itemValue)}
                                style={styles.picker}
                                itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                            >
                                <Picker.Item label="-- Seleccione Tipo Documento --" value="" />
                                <Picker.Item label="Cédula de Ciudadanía" value="CC" />
                                <Picker.Item label="Tarjeta de Identidad" value="TI" />
                                <Picker.Item label="Cédula de Extranjería" value="CE" />
                                <Picker.Item label="Pasaporte" value="PAS" />
                            </Picker>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Número Documento"
                            placeholderTextColor="#888"
                            value={numerodocumento}
                            onChangeText={setNumeroDocumento}
                            keyboardType="numeric"
                        />

                        <Text style={styles.pickerLabelActual}>Estado Activo:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={activo}
                                onValueChange={(itemValue) => setActivo(itemValue)}
                                style={styles.picker}
                                itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                            >
                                <Picker.Item label="-- Seleccione Estado --" value="" />
                                <Picker.Item label="Activo" value="true" />
                                <Picker.Item label="Inactivo" value="false" />
                            </Picker>
                        </View>

                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingEspecialidades}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.botonContent}>
                                    <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>Crear Médico</Text>
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

