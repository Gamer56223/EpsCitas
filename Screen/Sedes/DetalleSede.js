import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, ScrollView, Alert } from "react-native"; // Añadido ScrollView y Alert
import BotonComponent from "../../components/BottonComponent";
import { obtenerSedePorId } from "../../Src/Servicios/SedeService"; // Importar el servicio para obtener sede por ID

export default function DetalleSede({ route, navigation }) {
    const { sedeId } = route.params;

    const [sede, setSede] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSede = async () => {
            try {
                const result = await obtenerSedePorId(sedeId); // Llama a tu servicio real
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
    detailScrollCard: { // Nuevo estilo para el ScrollView que envuelve el detalle
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
        backgroundColor: '#FFFFFF', // Fondo y sombra movidos aquí
        shadowColor: 'rgba(0, 0, 0, 0.1)', // Sombra movida aquí
    },
    detailCardContent: {
        width: '100%',
        // No background or shadow here, they are on the ScrollView wrapper
    },
    sedeName: { // Cambiado de especialidadName a sedeName
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
        backgroundColor: "#007B8C",
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