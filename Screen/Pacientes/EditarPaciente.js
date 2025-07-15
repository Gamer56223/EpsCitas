import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ScrollView,
    Platform, // Para manejar diferencias de plataforma en estilos
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from '@expo/vector-icons/Ionicons';

import { crearPaciente, editarPaciente } from "../../Src/Servicios/PacienteService";
import { listarEps } from "../../Src/Servicios/EpsService";

import styles from "../../Styles/EditarPacienteStyles";

export default function EditarPaciente({ navigation }) {
    const route = useRoute();
    const paciente = route.params?.paciente;

    const [nombre, setNombre] = useState(paciente?.Nombre || "");
    const [apellido, setApellido] = useState(paciente?.Apellido || "");
    const [correo, setCorreo] = useState(paciente?.Correo || "");
    const [telefono, setTelefono] = useState(paciente?.Telefono || "");
    const [direccion, setDireccion] = useState(paciente?.Direccion || "");
    const [tipodocumento, setTipoDocumento] = useState(paciente?.TipoDocumento || "");
    const [numerodocumento, setNumeroDocumento] = useState(paciente?.NumeroDocumento || "");
    const [fechanacimiento, setFechaNacimiento] = useState(paciente?.FechaNacimiento || "");
    const [genero, setGenero] = useState(paciente?.Genero || "");
    const [idEps, setIdEps] = useState(paciente?.idEps?.toString() || paciente?.IdEps?.toString() || "");

    const [loading, setLoading] = useState(false);
    const [epsList, setEpsList] = useState([]);
    const [loadingEps, setLoadingEps] = useState(true);

    const esEdicion = !!paciente;

    useEffect(() => {
        const fetchEps = async () => {
            setLoadingEps(true);
            try {
                const result = await listarEps();
                if (result.success) {
                    setEpsList(result.data);
                    if (esEdicion && paciente?.idEps) {
                        setIdEps(paciente.idEps.toString());
                    } else if (!esEdicion && result.data.length > 0) {
                        setIdEps(result.data[0].id.toString());
                    } else {
                        setIdEps("");
                    }
                } else {
                    Alert.alert("Error", result.message || "No se pudieron cargar las EPS.");
                }
            } catch (error) {
                console.error("Error al cargar EPS:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar las EPS.");
            } finally {
                setLoadingEps(false);
            }
        };

        fetchEps();
    }, [esEdicion, paciente]);

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
        if (!nombre || !apellido || !correo || !telefono || !direccion || !tipodocumento || !numerodocumento || !fechanacimiento || !genero || !idEps) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }
        if (epsList.length === 0) {
            Alert.alert("Error", "No hay EPS disponibles para asignar. Por favor, agregue una EPS primero.");
            return;
        }

        setLoading(true);
        let result;
        const pacienteData = {
            Nombre: nombre,
            Apellido: apellido,
            Correo: correo,
            Telefono: telefono,
            Direccion: direccion,
            TipoDocumento: tipodocumento,
            NumeroDocumento: numerodocumento,
            FechaNacimiento: fechanacimiento,
            Genero: genero,
            idEps: parseInt(idEps)
        };

        try {
            if (esEdicion) {
                result = await editarPaciente(paciente.id, pacienteData);
            } else {
                result = await crearPaciente(pacienteData);
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Paciente actualizado correctamente" : "Paciente creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar el paciente"));
            }
        } catch (error) {
            console.error("Error al guardar paciente:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar el paciente"));
        } finally {
            setLoading(false);
        }
    };

    if (loadingEps) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando EPS disponibles...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView} // Aplicar estilo aquí
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>{esEdicion ? "Editar Paciente" : "Nuevo Paciente"}</Text>

                        <TextInput style={styles.input} placeholder="Nombre" placeholderTextColor="#888" value={nombre} onChangeText={setNombre} />
                        <TextInput style={styles.input} placeholder="Apellido" placeholderTextColor="#888" value={apellido} onChangeText={setApellido} />
                        <TextInput style={styles.input} placeholder="Correo" placeholderTextColor="#888" value={correo} onChangeText={setCorreo} keyboardType="email-address" autoCapitalize="none" />
                        <TextInput style={styles.input} placeholder="Teléfono" placeholderTextColor="#888" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
                        <TextInput style={styles.inputTextArea} placeholder="Dirección" placeholderTextColor="#888" value={direccion} onChangeText={setDireccion} multiline numberOfLines={4} textAlignVertical="top" />

                        <Text style={styles.pickerLabelActual}>Tipo de Documento:</Text>
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

                        <TextInput style={styles.input} placeholder="Número de Documento" placeholderTextColor="#888" value={numerodocumento} onChangeText={setNumeroDocumento} keyboardType="numeric" />
                        <TextInput style={styles.input} placeholder="Fecha Nacimiento (YYYY-MM-DD)" placeholderTextColor="#888" value={fechanacimiento} onChangeText={setFechaNacimiento} />

                        <Text style={styles.pickerLabelActual}>Género:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={genero}
                                onValueChange={(itemValue) => setGenero(itemValue)}
                                style={styles.picker}
                                itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                            >
                                <Picker.Item label="-- Seleccione Género --" value="" />
                                <Picker.Item label="Masculino" value="M" />
                                <Picker.Item label="Femenino" value="F" />
                                <Picker.Item label="Otro" value="O" />
                            </Picker>
                        </View>

                        <Text style={styles.pickerLabelActual}>EPS:</Text>
                        <View style={styles.pickerContainer}>
                            {epsList.length > 0 ? (
                                <Picker
                                    selectedValue={idEps}
                                    onValueChange={(itemValue) => setIdEps(itemValue)}
                                    style={styles.picker}
                                    itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                                >
                                    <Picker.Item label="-- Seleccione una EPS --" value="" />
                                    {epsList.map((eps) => (
                                        <Picker.Item key={eps.id.toString()} label={eps.Nombre || `EPS ID: ${eps.id}`} value={eps.id.toString()} />
                                    ))}
                                </Picker>
                            ) : (
                                <Text style={styles.noDataText}>No hay EPS disponibles.</Text>
                            )}
                        </View>

                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.botonContent}>
                                    <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Paciente"}</Text>
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

