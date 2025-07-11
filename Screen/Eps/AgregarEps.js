import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { crearEps } from "../../Src/Servicios/EpsService";
import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService";

export default function AgregarEps({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [nit, setNit] = useState("");
    const [idEspecialidad, setIdEspecialidad] = useState("");
    const [especialidades, setEspecialidades] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingEspecialidades, setLoadingEspecialidades] = useState(true);

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
                    if (result.data.length > 0) {
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
    }, []);

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
        try {
            const result = await crearEps({
                Nombre: nombre,
                direccion: direccion,
                Telefono: telefono,
                Nit: nit,
                idEspecialidad: parseInt(idEspecialidad)
            });

            if (result.success) {
                Alert.alert("Éxito", "Eps creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear la eps"));
            }
        } catch (error) {
            console.error("Error al crear eps:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear la eps."));
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
                        <Text style={styles.title}>Nueva EPS</Text>

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
                                    <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>Crear EPS</Text>
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
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EBF5FB",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
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
    pickerContainer: {
        borderColor: "#E0E0E0",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 18,
        width: "100%",
        backgroundColor: "#F8F8F8",
        justifyContent: 'center',
        height: 55,
    },
    pickerLabelActual: { // Nuevo estilo para el label del picker
        alignSelf: 'flex-start', // Alinea a la izquierda dentro del contenedor
        marginLeft: 5, // Pequeño margen para separación visual
        marginBottom: 5, // Espacio entre el label y el picker
        fontSize: 16,
        color: '#555',
        fontWeight: '600',
    },
    picker: {
        height: '100%',
        width: "100%",
        color: '#333333',
    },
    pickerItem: {
        fontSize: 16,
        color: '#495057',
    },
    noEspecialidadesText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        paddingVertical: 10,
    },
    boton: {
        backgroundColor: "#28A745",
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        marginTop: 20,
        shadowColor: "#28A745",
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