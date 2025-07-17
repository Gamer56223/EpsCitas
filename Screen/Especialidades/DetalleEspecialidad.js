import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent";
import { DetalleEspecialidadId } from "../../Src/Servicios/EspecialidadService";

import styles from "../../Styles/DetalleEspecialidadStyles";

export default function DetalleEspecialidad({ route, navigation }) {
    const { especialidadId } = route.params;

    const [especialidad, setEspecialidad] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDetalleEspecialidad = async () => {
            setLoading(true);
            try {
                const result = await DetalleEspecialidadId (especialidadId); // Llama al servicio
                if (result.success) {
                    setEspecialidad(result.data);
                } else {
                    Alert.alert("Error", result.message || "No se pudo cargar la especialidad.");
                    navigation.goBack(); // Regresar si hay un error
                }
            } catch (error) {
                console.error("Error al cargar detalle de especialidad:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar la especialidad.");
                navigation.goBack(); // Regresar si hay un error
            } finally {
                setLoading(false);
            }
        };
        cargarDetalleEspecialidad();
    }, [especialidadId, navigation]); // Agrega navigation como dependencia

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles de la Especialidad...</Text>
            </View>
        );
    }

    if (!especialidad) {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
                <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Especialidad</Text>
                <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                    <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para esta especialidad.</Text>
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
            <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Especialidad</Text>

            <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                <Text style={[styles.especialidadName, {color: '#2c3e50'}]}>{especialidad.Nombre}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{especialidad.id}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Descripción: </Text>{especialidad.Descripcion}</Text>
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

