import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, SafeAreaView, Alert, ScrollView } from "react-native";
import BotonComponent from "../../components/BottonComponent";
import { DetallePacienteId } from "../../Src/Servicios/PacienteService";

import styles from "../../Styles/DetallePacienteStyles";

export default function DetallePaciente({ route, navigation }) {
    const { pacienteId } = route.params;

    const [paciente, setPaciente] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const result = await DetallePacienteId(pacienteId);
                if (result.success) {
                    setPaciente(result.data);
                } else {
                    Alert.alert("Error", result.message || "No se pudo cargar el paciente.");
                    setPaciente(null);
                }
            } catch (error) {
                console.error("Error al obtener paciente por ID:", error);
                Alert.alert("Error", "Ocurrió un error al cargar los detalles del paciente.");
                setPaciente(null);
            } finally {
                setLoading(false);
            }
        };

        if (pacienteId) {
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

            <ScrollView contentContainerStyle={styles.detailScrollCard}>
                <View style={[styles.detailCardContent, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                    <Text style={[styles.pacienteName, {color: '#2c3e50'}]}>{paciente.Nombre} {paciente.Apellido}</Text>
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{paciente.id}</Text>
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Correo: </Text>{paciente.Correo}</Text>
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Teléfono: </Text>{paciente.Telefono}</Text>
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Dirección: </Text>{paciente.Direccion}</Text>
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Tipo Documento: </Text>{paciente.TipoDocumento}</Text>
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Número Documento: </Text>{paciente.NumeroDocumento}</Text>
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Fecha Nacimiento: </Text>{paciente.FechaNacimiento}</Text>
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Género: </Text>{paciente.Genero}</Text>
                    {/* Asegúrate de que paciente.eps y paciente.eps.Nombre existan, de lo contrario, muestra IdEps */}
                    {paciente.eps && paciente.eps.Nombre ? (
                        <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>EPS: </Text>{paciente.eps.Nombre}</Text>
                    ) : (
                        <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID EPS: </Text>{paciente.idEps}</Text>
                    )}
                </View>
            </ScrollView>

            <BotonComponent
                title="Volver al Listado"
                onPress={() => navigation.goBack()}
                buttonStyle={styles.backButton}
                textStyle={styles.buttonText}
            />
        </SafeAreaView>
    );
}