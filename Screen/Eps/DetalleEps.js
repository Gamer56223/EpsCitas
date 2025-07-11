import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent";
import { listarEps } from "../../Src/Servicios/EpsService";

import styles from "../../Styles/DetalleEpsStyles";

export default function DetalleEps({ route, navigation }) {

    const { epsId } = route.params;

    const [eps, setEps] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEpsDetails = async () => {
            setLoading(true);
            try {
                const result = await listarEps();
                if (result.success) {
                    const foundEps = result.data.find(e => e.id === epsId);
                    setEps(foundEps);
                } else {
                    Alert.alert("Error", result.message || "No se pudo cargar el detalle de la Eps.");
                }
            } catch (error) {
                console.error("Error al obtener detalles de la EPS:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar el detalle de la Eps.");
            } finally {
                setLoading(false);
            }
        };

        fetchEpsDetails();
    }, [epsId]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles de la Eps...</Text>
            </View>
        );
    }

    if (!eps) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: '#f0f4f8' }]}>
                <Text style={[styles.title, { color: '#2c3e50' }]}>Detalle de la Eps</Text>
                <View style={[styles.detailCard, { backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)' }]}>
                    <Text style={[styles.errorText, { color: 'red' }]}>No se encontraron detalles para esta eps.</Text>
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
        <SafeAreaView style={[styles.container, { backgroundColor: '#f0f4f8' }]}>
            <Text style={[styles.title, { color: '#2c3e50' }]}>Detalle de la Eps</Text>

            <View style={[styles.detailCard, { backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)' }]}>
                <Text style={[styles.epsName, { color: '#2c3e50' }]}>{eps.Nombre}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>ID: </Text>{eps.id}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Nombre: </Text>{eps.Nombre}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Dirección: </Text>{eps.Direccion}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Telefono: </Text>{eps.Telefono}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Nit: </Text>{eps.Nit}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Id Especialidad: </Text>{eps.IdEspecialidad}</Text>
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

