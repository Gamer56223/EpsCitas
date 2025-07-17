import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView, Alert } from "react-native"; // Añadido ScrollView y Alert
import BotonComponent from "../../components/BottonComponent";
import { DetalleSedeId } from "../../Src/Servicios/SedeService";

import styles from "../../Styles/DetalleSedeStyles";

export default function DetalleSede({ route, navigation }) {
    const { sedeId } = route.params;

    const [sede, setSede] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSede = async () => {
            try {
                const result = await DetalleSedeId (sedeId); // Llama a tu servicio real
                if (result.success) {
                    setSede(result.data);
                } else {
                    Alert.alert("Error", result.message || "No se pudo cargar la sede.");
                    setSede(null); // Asegura que el estado sea null en caso de error
                }
            } catch (error) {
                console.error("Error al obtener sede por ID:", error);
                Alert.alert("Error", "Ocurrió un error al cargar los detalles de la sede.");
                setSede(null); // Asegura que el estado sea null en caso de error
            } finally {
                setLoading(false);
            }
        };

        if (sedeId) { // Asegura que hay un ID para buscar
            fetchSede();
        } else {
            setLoading(false);
            Alert.alert("Error", "ID de sede no proporcionado.");
        }
    }, [sedeId]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles de la Sede...</Text>
            </View>
        );
    }

    if (!sede) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: '#f0f4f8' }]}>
                <Text style={[styles.title, { color: '#2c3e50' }]}>Detalle de la Sede</Text>
                <View style={[styles.detailCard, { backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)' }]}>
                    <Text style={[styles.errorText, { color: 'red' }]}>No se encontraron detalles para esta sede.</Text>
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
            <Text style={[styles.title, { color: '#2c3e50' }]}>Detalle de la Sede</Text>

            <ScrollView contentContainerStyle={styles.detailScrollCard}>
                <View style={[styles.detailCardContent, { backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)' }]}>
                    <Text style={[styles.sedeName, { color: '#2c3e50' }]}>{sede.Nombre}</Text>
                    <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>ID: </Text>{sede.id}</Text>
                    {/* *** CORRECCIÓN: Mostrar Direccion y Telefono correctamente *** */}
                    <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Dirección: </Text>{sede.Direccion}</Text>
                    <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Teléfono: </Text>{sede.Telefono}</Text>

                    {/* Eliminar sede.Area si no es un campo válido en tu modelo de Sede */}
                    {/* {sede.Area && (
                        <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Área: </Text>{sede.Area}</Text>
                    )} */}
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

