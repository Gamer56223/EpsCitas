import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PacienteCard from '../../components/PacienteCard';
import { useNavigation } from "@react-navigation/native";
import { listarPacientes, eliminarPaciente } from "../../Src/Servicios/PacienteService";

import styles from '../../Styles/ListarPacienteStyles';

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
        navigation.navigate('CrearPaciente');
    };

    const handleEditar = (paciente) => {
        navigation.navigate("EditarPaciente", { paciente });
    };

    const handleDetalle = (pacienteId) => {
        navigation.navigate("DetallePaciente", { pacienteId: pacienteId});
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
            onPress={() => navigation.navigate('DetallePaciente', { pacienteId: item.id })}
            onDetail={() => handleDetalle(item.id)}
        />
    );

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

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
                        <Ionicons name="body-outline" size={80} color="#BDC3C7" />
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