// Ruta: Screen/Citas/DetalleCita.js

import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, SafeAreaView, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent"; // Asegúrate de que la ruta sea correcta
import { DetalleCitaId } from "../../Src/Servicios/CitaService";

import styles from "../../Styles/DetalleCitaStyles"; // Asegúrate de que la ruta sea correcta


export default function DetalleCita({ route, navigation }) {
    // Obtiene el ID de la cita de los parámetros de la ruta
    const { citaId } = route.params;

    const [cita, setCita] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCitaDetails = async () => {
            setLoading(true);
            try {
                const result = await DetalleCitaId  (citaId);
                if (result.success) {
                    setCita(result.data);
                } else {
                    Alert.alert("Error", result.message || "No se pudieron cargar los detalles de la cita.");
                }
            } catch (error) {
                console.error("Error al obtener detalles de la cita:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar la cita.");
            } finally {
                setLoading(false);
            }
        };

        fetchCitaDetails();
    }, [citaId]); // Dependencia del efecto: se ejecuta cuando citaId cambia

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles de la Cita...</Text>
            </View>
        );
    }

    if (!cita) {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
                <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de la Cita</Text>
                <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                    <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para esta cita.</Text>
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
            <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Cita</Text>

            <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                <Text style={[styles.citaName, {color: '#2c3e50'}]}>{cita.Nombre}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{cita.id}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Nombre: </Text>{cita.Nombre}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Fecha: </Text>{cita.Fecha}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Estado: </Text>{cita.Estado}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Hora: </Text>{cita.Hora}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Tipo: </Text>{cita.Tipo}</Text>

                {/* Si tienes otros campos como Area, asegúrate de que existan en el backend y el frontend */}
                {/* {cita.Area && (
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Área: </Text>{cita.Area}</Text>
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