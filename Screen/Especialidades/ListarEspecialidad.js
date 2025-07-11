import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
// import BotonComponent from "../../components/BottonComponent"; // No se usa directamente aquí, considerar eliminar si no se utiliza
import EspecialidadCard from "../../components/EspecialidadCard";
import { useNavigation } from "@react-navigation/native";
import { listarEspecialidades, eliminarEspecialidad } from "../../Src/Servicios/EspecialidadService";

import styles from "../../Styles/ListarEspecialidadStyles";

export default function ListarEspecialidad (){
    const [especialidades, setEspecialidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleEspecialidades = async () => {
        setLoading(true);
        try {
            const result = await listarEspecialidades();
            if (result.success) {
                setEspecialidades(result.data);
            } else {
                Alert.alert ("Error", result.message || "No se pudieron cargar las especialidades");
            }
        } catch (error) {
            console.error("Error al listar especialidades:", error); // Añadir log para depuración
            Alert.alert ("Error", "Ocurrió un error al cargar las especialidades.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleEspecialidades);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación", // Título más claro
            "¿Estás seguro de que deseas eliminar esta especialidad?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarEspecialidad(id);
                            if (result.success) {
                                handleEspecialidades(); // Recargar la lista después de eliminar
                                Alert.alert("Éxito", "Especialidad eliminada correctamente.");
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la Especialidad.");
                            }
                        } catch (error) {
                            console.error("Error al eliminar especialidad:", error); // Añadir log para depuración
                            Alert.alert("Error", "Ocurrió un error inesperado al eliminar la especialidad.");
                        }
                    },
                },
            ]
        )
    }

    const handleCrear = () => {
        navigation.navigate('CrearEspecialidad'); // Asegúrate que 'CrearEspecialidad' es el nombre correcto en tu Stack Navigator
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando especialidades...</Text>
            </View>
        );
    }

    const handleEditar = (especialidad) => {
        navigation.navigate("EditarEspecialidad", {especialidad}); // Asegúrate que 'EditarEspecialidad' es el nombre correcto en tu Stack Navigator
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={especialidades}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <EspecialidadCard
                        especialidad={item}
                        onEdit={() => handleEditar (item)}
                        onDelete={() => handleEliminar (item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="medical-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay especialidades registradas.</Text>
                        <Text style={styles.emptyText}>¡Crea una nueva especialidad!</Text>
                    </View>
                }
                contentContainerStyle={especialidades.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva Especialidad</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

