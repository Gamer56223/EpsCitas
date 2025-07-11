import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent";
import { obtenerConsultorioPorId } from "../../Src/Servicios/ConsultorioService"; // Asumimos esta nueva función
import { listarSedes } from "../../Src/Servicios/SedeService"; // Para obtener el nombre de la sede

import styles from "../../Styles/DetalleConsultorioStyles";

export default function DetalleConsultorio({ route, navigation }) {
    const { consultorioId } = route.params;

    const [consultorio, setConsultorio] = useState(null);
    const [sedeNombre, setSedeNombre] = useState("Cargando..."); // Para mostrar el nombre de la sede
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDetallesConsultorio = async () => {
            setLoading(true);
            try {
                // 1. Cargar el consultorio por su ID
                const consultorioResult = await obtenerConsultorioPorId(consultorioId);
                if (consultorioResult.success) {
                    setConsultorio(consultorioResult.data);

                    // 2. Si el consultorio se cargó, cargar el nombre de la sede
                    if (consultorioResult.data && consultorioResult.data.IdSede) {
                        const sedesResult = await listarSedes(); // Necesitamos las sedes para buscar el nombre
                        if (sedesResult.success) {
                            const foundSede = sedesResult.data.find(s => s.id === consultorioResult.data.IdSede);
                            setSedeNombre(foundSede ? foundSede.Nombre : "Desconocida");
                        } else {
                            setSedeNombre("Error al cargar sede");
                        }
                    } else {
                        setSedeNombre("N/A"); // Si no tiene IdSede
                    }
                } else {
                    Alert.alert("Error", consultorioResult.message || "No se pudo cargar el consultorio.");
                    setConsultorio(null); // Asegurarse de que no haya consultorio cargado en caso de error
                }
            } catch (error) {
                console.error("Error al cargar detalles del consultorio:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar el consultorio.");
                setConsultorio(null);
            } finally {
                setLoading(false);
            }
        };

        cargarDetallesConsultorio();
    }, [consultorioId]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Consultorio...</Text>
            </View>
        );
    }

    if (!consultorio) {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
                <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle del Consultorio</Text>
                <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                    <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para este consultorio.</Text>
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
            <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle del Consultorio</Text>

            <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                <Text style={[styles.consultorioName, {color: '#2c3e50'}]}>{consultorio.Nombre}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{consultorio.id}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Número: </Text>{consultorio.Numero}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Sede: </Text>{sedeNombre}</Text>

                {consultorio.Area && (
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Área: </Text>{consultorio.Area}</Text>
                )}
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

