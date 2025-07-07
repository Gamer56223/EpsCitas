import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import BotonComponent from "../../components/BottonComponent";

import { crearPaciente, editarPaciente } from "../../Src/Servicios/PacienteService";

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
    const [ideps, setIdEps] = useState(paciente?.IdEps || "");

    const [loading, setLoading] = useState(false);

    const esEdicion = !!paciente;

    const handleGuardar = async () => {
        if (!nombre || !apellido || !correo || !telefono || !direccion || !tipodocumento || !numerodocumento || !fechanacimiento || !genero || !ideps) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true);
        let result;
        try {
            if (esEdicion) {
                result = await editarPaciente(paciente.id, {
                    Nombre: nombre,
                    Apellido: apellido, 
                    Correo: correo,
                    Telefono: telefono,
                    Direccion: direccion,
                    TipoDocumento: tipodocumento,
                    NumeroDocumento: numerodocumento,
                    FechaNacimiento: fechanacimiento,
                    Genero: genero,
                    IdEps: ideps
                });
            } else {
                result = await crearPaciente({
                    Nombre: nombre,
                    Apellido: apellido, 
                    Correo: correo,
                    Telefono: telefono,
                    Direccion: direccion,
                    TipoDocumento: tipodocumento,
                    NumeroDocumento: numerodocumento,
                    FechaNacimiento: fechanacimiento,
                    Genero: genero,
                    IdEps: ideps
                });
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Paciente actualizado correctamente" : "Paciente creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el paciente");
            }
        } catch (error) {
            console.error("Error al guardar paciente:", error);
            Alert.alert("Error", error.message || "Ocurrió un error inesperado al guardar el paciente");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{esEdicion ? "Editar Paciente" : "Nuevo Paciente"}</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={apellido}
                onChangeText={setApellido}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Correo"
                value={correo}
                onChangeText={setCorreo}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Telefono"
                value={telefono}
                onChangeText={setTelefono}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Direcciónn"
                value={direccion}
                onChangeText={setDireccion}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Tipo Documento"
                value={tipodocumento}
                onChangeText={setTipoDocumento}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Número Documento"
                value={numerodocumento}
                onChangeText={setNumeroDocumento}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha Nacimiento"
                value={fechanacimiento}
                onChangeText={setFechaNacimiento}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Genero"
                value={genero}
                onChangeText={setGenero}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
            <TextInput
                style={styles.input}
                placeholder="Id Eps"
                value={ideps}
                onChangeText={setIdEps}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.textoBoton} >{esEdicion ? "Guardar cambios" : "Crear paciente"}</Text>
                )}
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f5f5f5",
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        textAlign: "center",
    },

    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        width: "80%",
    },
    inputTextArea: {
        height: 120,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 16,
        width: "80%",
        textAlignVertical: 'top',
    },

    boton: {
        backgroundColor: "#1976D2",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        width: "80%",
        marginTop: 20,
    },
    textoBoton: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    error: {
        color: "red",
        marginTop: 10,
        textAlign: "center",
    },
});