import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PacienteCard from '../../components/PacienteCard'; // Asegúrate de que la ruta sea correcta
import { useNavigation } from "@react-navigation/native";
import { listarPacientes, eliminarPaciente } from "../../Src/Servicios/PacienteService";

import styles from '../../Styles/ListarPacienteStyles'; // Asegúrate de que la ruta sea correcta

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

    // Recargar pacientes cada vez que la pantalla se enfoca
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handlePacientes);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
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
                <ActivityIndicator size="large" color="#007BFF" />
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
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            {/* Nuevo encabezado */}
            <View style={styles.headerContainer}>
                <Ionicons name="body-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Pacientes</Text>
            </View>

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

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Paciente</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}