import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from "react-native";
import BotonComponent from "../../components/BottonComponent"; 

export default function DetalleConsultorio({ route, navigation }) {
   
    const { consultorioId } = route.params;

    const [consultorio, setConsultorio] = useState(null);
    const [loading, setLoading] = useState(true);

    
    const consultoriosEjemplo = [
        { id: '1', Nombre: 'Consultorio B2', Numero: '202', Descripcion: 'Consultorio para especialidades generales.', Piso: '2'},
        { id: '2', Nombre: 'Consultorio B3', Numero: '203', Descripcion: 'Consultorio con equipo de rayos X.', Piso: '2'},
        { id: '3', Nombre: 'Consultorio C1', Numero: '506', Descripcion: 'Consultorio de pediatría con área de juegos.', Piso: '5'},
    ];

    useEffect(() => {
        // Simular una carga de datos basada en el consultorioId
        const foundConsultorio = consultoriosEjemplo.find(c => c.id === consultorioId);
        setConsultorio(foundConsultorio);
        setLoading(false);
    }, [consultorioId]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del consultorio...</Text>
            </View>
        );
    }

    if (!consultorio) {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
                <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Consultorio</Text>
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
            <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Consultorio</Text>

            <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                <Text style={[styles.consultorioName, {color: '#2c3e50'}]}>{consultorio.Nombre}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{consultorio.id}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Número: </Text>{consultorio.Numero}</Text>
                {consultorio.Descripcion && (
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Descripción: </Text>{consultorio.Descripcion}</Text>
                )}
                {consultorio.Piso && (
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Piso: </Text>{consultorio.Piso}</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: 'center',
    },
    detailCard: {
        width: "100%",
        maxWidth: 400,
        padding: 25,
        borderRadius: 15,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        alignItems: "flex-start",
        marginBottom: 20,
    },
    consultorioName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: 'center',
        width: '100%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    detailText: {
        fontSize: 18,
        marginBottom: 8,
        width: '100%',
    },
    detailLabel: {
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
        width: '100%',
    },
    backButton: {
        backgroundColor: "#007B8C", // Color consistente con el tema
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 15,
        width: '80%',
        maxWidth: 300,
        alignSelf: 'center',
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});