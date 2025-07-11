import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';

import { crearMedicos, editarMedicos } from "../../Src/Servicios/MedicoService";
import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService";

import styles from "../../Styles/EditarMedicoStyles";

export default function EditarMedico() {
    const navigation = useNavigation();
    const route = useRoute();
    const medico = route.params?.medico;

    const [activo, setActivo] = useState(
        medico?.Activo === "Activo" ? "true" : "false"
    );

    const [idespecialidad, setIdEspecialidad] = useState(
        medico?.idEspecialidad?.toString() || ""
    );
    const [nombre, setNombre] = useState(medico?.Nombre || "");
    const [apellido, setApellido] = useState(medico?.Apellido || "");
    const [correo, setCorreo] = useState(medico?.Correo || "");
    const [telefono, setTelefono] = useState(medico?.Telefono || "");
    const [tipodocumento, setTipoDocumento] = useState(
        medico?.TipoDocumento || ""
    );
    const [numerodocumento, setNumeroDocumento] = useState(
        medico?.NumeroDocumento || ""
    );

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
                    if (!medico && result.data.length > 0) {
                        setIdEspecialidad(result.data[0].id.toString());
                    } else if (medico && !medico.idEspecialidad && result.data.length > 0) {
                        setIdEspecialidad(result.data[0].id.toString());
                    }
                } else {
                    Alert.alert(
                        "Error al cargar especialidades",
                        result.message || "No se pudieron cargar las especialidades."
                    );
                }
            } catch (error) {
                console.error("Error al cargar especialidades:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar las especialidades.");
            } finally {
                setLoadingEspecialidades(false);
            }
        };
        cargarEspecialidades();
    }, [medico]);

    const esEdicion = !!medico;

    const handleGuardar = async () => {
        if (!idespecialidad || !nombre || !apellido || !correo || !telefono || !tipodocumento || !numerodocumento || activo === "") {
            Alert.alert("Error", "Por favor, completa todos los campos.");
            return;
        }

        setLoading(true);
        try {
            let result;
            const medicoData = {
                idEspecialidad: parseInt(idespecialidad),
                Nombre: nombre,
                Apellido: apellido,
                Correo: correo,
                Telefono: telefono,
                TipoDocumento: tipodocumento,
                NumeroDocumento: numerodocumento,
                Activo: activo === "true" ? "Activo" : "Inactivo",
            };

            if (esEdicion) {
                result = await editarMedicos(medico.id, medicoData);
            } else {
                result = await crearMedicos(medicoData);
            }

            if (result.success) {
                Alert.alert(
                    "Éxito",
                    esEdicion
                        ? "Médico actualizado correctamente."
                        : "Médico creado correctamente."
                );
                navigation.goBack();
            } else {
                let mensaje = result.message;
                if (typeof mensaje === "object") {
                    mensaje = Object.values(mensaje).flat().join("\n");
                }
                Alert.alert("Error", mensaje || "No se pudo guardar el médico.");
            }
        } catch (error) {
            console.error("Error al guardar médico:", error);
            Alert.alert(
                "Error",
                "Ocurrió un error inesperado al guardar el médico."
            );
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
                        <Text style={styles.title}>
                            {esEdicion ? "Editar Médico" : "Crear Médico"}
                        </Text>

                        {loadingEspecialidades ? (
                            <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
                        ) : (
                            <>
                                <Text style={styles.pickerLabelActual}>Especialidad:</Text>
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
                            value={nombre}
                            onChangeText={setNombre}
                            placeholderTextColor="#888"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Apellido"
                            value={apellido}
                            onChangeText={setApellido}
                            placeholderTextColor="#888"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Correo Electrónico"
                            value={correo}
                            onChangeText={setCorreo}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#888"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Teléfono"
                            value={telefono}
                            onChangeText={setTelefono}
                            keyboardType="phone-pad"
                            placeholderTextColor="#888"
                        />

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

                        <TextInput
                            style={styles.input}
                            placeholder="Número de Documento"
                            value={numerodocumento}
                            onChangeText={setNumeroDocumento}
                            keyboardType="numeric"
                            placeholderTextColor="#888"
                        />

                        <Text style={styles.pickerLabelActual}>Estado:</Text>
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

                        <TouchableOpacity
                            style={styles.boton}
                            onPress={handleGuardar}
                            disabled={loading || loadingEspecialidades}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.botonContent}>
                                    <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>
                                        {esEdicion ? "Guardar Cambios" : "Crear Médico"}
                                    </Text>
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

