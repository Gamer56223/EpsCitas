import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent";
import { listarMedicos } from "../../Src/Servicios/MedicoService";
import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService"; // Necesitas esto para mostrar el nombre de la especialidad

export default function DetalleMedico({ route, navigation }) {
    const { medicoId } = route.params;

    const [medico, setMedico] = useState(null);
    const [loading, setLoading] = useState(true);
    const [especialidades, setEspecialidades] = useState([]);

    useEffect(() => {
        const fetchMedicoDetails = async () => {
            setLoading(true);
            try {
                // Cargar todas las especialidades
                const especialidadesResult = await listarEspecialidades();
                if (especialidadesResult.success) {
                    setEspecialidades(especialidadesResult.data);
                } else {
                    console.warn("No se pudieron cargar las especialidades:", especialidadesResult.message);
                }

                // Cargar los médicos y encontrar el específico
                const medicosResult = await listarMedicos();
                if (medicosResult.success && medicosResult.data) {
                    const foundMedico = medicosResult.data.find(m => m.id === medicoId);
                    setMedico(foundMedico);
                } else {
                    Alert.alert("Error", medicosResult.message || "No se pudo cargar el detalle del médico.");
                }
            } catch (error) {
                console.error("Error fetching medico details:", error);
                Alert.alert("Error", "Ocurrió un error al cargar el detalle del médico.");
            } finally {
                setLoading(false);
            }
        };

        fetchMedicoDetails();
    }, [medicoId]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Médico...</Text>
            </View>
        );
    }

    if (!medico) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: '#f0f4f8' }]}>
                <Text style={[styles.title, { color: '#2c3e50' }]}>Detalle del Médico</Text>
                <View style={[styles.detailCard, { backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)' }]}>
                    <Text style={[styles.errorText, { color: 'red' }]}>No se encontraron detalles para este Médico.</Text>
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

    // Buscar el nombre de la especialidad
    const especialidadNombre = especialidades.find(e => e.id === medico.IdEspecialidad)?.nombre || 'Desconocida';

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#f0f4f8' }]}>
            <Text style={[styles.title, { color: '#2c3e50' }]}>Detalle del Médico</Text>

            <View style={[styles.detailCard, { backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)' }]}>
                {/* Accede a las propiedades usando los nombres de las columnas en PascalCase */}
                <Text style={[styles.medicoName, { color: '#2c3e50' }]}>{medico.Nombre} {medico.Apellido}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>ID: </Text>{medico.id}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Apellido: </Text>{medico.Apellido}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Correo: </Text>{medico.Correo}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Teléfono: </Text>{medico.Telefono}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Tipo Documento: </Text>{medico.TipoDocumento}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Número Documento: </Text>{medico.NumeroDocumento}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Activo: </Text>{medico.Activo ? "Sí" : "No"}</Text>
                <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Especialidad: </Text>{especialidadNombre}</Text>
                {/* Si tu API de Laravel devuelve una propiedad 'Area' o similar, la mantendrías */}
                {medico.Area && (
                    <Text style={[styles.detailText, { color: '#5C6F7F' }]}><Text style={styles.detailLabel}>Área: </Text>{medico.Area}</Text>
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
    medicoName: {
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