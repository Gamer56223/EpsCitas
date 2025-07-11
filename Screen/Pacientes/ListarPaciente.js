import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PacienteCard from '../../components/PacienteCard';
import { useNavigation } from "@react-navigation/native";
import { listarPacientes, eliminarPaciente } from "../../Src/Servicios/PacienteService";

export default function ListarPaciente() {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handlePacientes = async () => {
        setLoading(true);
        try {
            const result = await listarPacientes();
            if (result.success) {
                setPacientes(result.data);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar los pacientes");
            }
        } catch (error) {
            console.error("Error al cargar pacientes:", error);
            Alert.alert("Error", "Ocurrió un error al cargar los pacientes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handlePacientes);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación", // Título más claro
            "¿Estás seguro de que deseas eliminar este paciente?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarPaciente(id);
                            if (result.success) {
                                // Actualiza el estado para reflejar la eliminación sin recargar toda la lista del backend
                                setPacientes(prevPacientes => prevPacientes.filter((p) => p.id !== id));
                                Alert.alert("Éxito", "Paciente eliminado correctamente.");
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el Paciente.");
                            }
                        } catch (error) {
                            console.error("Error al eliminar paciente:", error);
                            Alert.alert("Error", "No se pudo eliminar el paciente.");
                        }
                    },
                },
            ]
        );
    };

    const handleCrear = () => {
        navigation.navigate('CrearPaciente'); // Asegúrate que 'CrearPaciente' es el nombre correcto en tu Stack Navigator
    };

    const handleEditar = (paciente) => {
        navigation.navigate("EditarPaciente", { paciente }); // Asegúrate que 'EditarPaciente' es el nombre correcto en tu Stack Navigator
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando pacientes...</Text>
            </View>
        );
    }

    const renderPacienteItem = ({ item }) => (
        <PacienteCard
            paciente={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            onPress={() => navigation.navigate('DetallePaciente', { pacienteId: item.id })} // Asegúrate que 'DetallePaciente' es el nombre correcto
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={pacientes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderPacienteItem}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="body-outline" size={80} color="#BDC3C7" /> {/* Icono para pacientes */}
                        <Text style={styles.emptyText}>No hay pacientes registrados.</Text>
                        <Text style={styles.emptyText}>¡Crea un nuevo paciente!</Text>
                    </View>
                }
                contentContainerStyle={pacientes.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Paciente</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBF5FB', // Fondo suave
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    centeredContainer: { // Renombrado para mayor claridad
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBF5FB',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
        fontWeight: '500',
    },
    emptyListContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#7F8C8D',
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 25,
    },
    flatListContent: {
        paddingBottom: 20, // Espacio al final de la lista si hay elementos
    },
    flatListEmpty: {
        flex: 1, // Asegura que el contenido se centre verticalmente cuando la lista está vacía
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonCrear: {
        backgroundColor: '#28A745', // Un verde más amigable y moderno
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignSelf: 'center',
        width: '90%',
        marginBottom: 20,
        marginTop: 10,
        shadowColor: "#28A745",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 12,
    },
    botonCrearContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonCrearIcon: {
        marginRight: 10,
    },
    textoBotonCrear: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});