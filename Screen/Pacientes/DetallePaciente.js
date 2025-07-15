import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent";
import { obtenerPacientePorId } from "../../Src/Servicios/PacienteService"; // <--- Asegúrate de crear esta función

import styles from "../../Styles/DetallePacienteStyles";

export default function DetallePaciente({ route, navigation }) { // Renombrado a DetallePaciente (PascalCase)
    const { pacienteId } = route.params;

    const [paciente, setPaciente] = useState(null); // Renombrado de especialidad a paciente
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const result = await obtenerPacientePorId(pacienteId); // Llama a tu servicio real
                if (result.success) {
                    setPaciente(result.data);
                } else {
                    Alert.alert("Error", result.message || "No se pudo cargar el paciente.");
                    setPaciente(null); // Asegura que el estado sea null en caso de error
                }
            } catch (error) {
                console.error("Error al obtener paciente por ID:", error);
                Alert.alert("Error", "Ocurrió un error al cargar los detalles del paciente.");
                setPaciente(null); // Asegura que el estado sea null en caso de error
            } finally {
                setLoading(false);
            }
        };

        if (pacienteId) { // Asegura que hay un ID para buscar
            fetchPaciente();
        } else {
            setLoading(false);
            Alert.alert("Error", "ID de paciente no proporcionado.");
        }
    }, [pacienteId]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Paciente...</Text>
            </View>
        );
    }

    if (!paciente) {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
                <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle del Paciente</Text>
                <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                    <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para este paciente.</Text>
                    <BotonComponent
                        title="Volver al Listado"
                        onPress={() => navigation.goBack()}
                        buttonStyle={styles.backButton}
                        textStyle={styles.buttonText}
                    />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
            <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle del Paciente</Text>

            <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                <Text style={[styles.pacienteName, {color: '#2c3e50'}]}>{paciente.Nombre} {paciente.Apellido}</Text> {/* Concatenar Nombre y Apellido */}
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{paciente.id}</Text> {/* Asegúrate de que el ID exista */}
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Correo: </Text>{paciente.Correo}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Teléfono: </Text>{paciente.Telefono}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Dirección: </Text>{paciente.Direccion}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Tipo Documento: </Text>{paciente.TipoDocumento}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Número Documento: </Text>{paciente.NumeroDocumento}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Fecha Nacimiento: </Text>{paciente.FechaNacimiento}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Género: </Text>{paciente.Genero}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID EPS: </Text>{paciente.IdEps}</Text>

                {/* Si 'Area' no es parte de tu modelo de paciente, puedes eliminar esta línea */}
                {/* {paciente.Area && (
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Área: </Text>{paciente.Area}</Text>
                )} */}
            </View>

            <BotonComponent
                title="Volver al Listado"
                onPress={() => navigation.goBack()}
                buttonStyle={styles.backButton}
                textStyle={styles.buttonText}
            />
        </SafeAreaView>
    );
}

