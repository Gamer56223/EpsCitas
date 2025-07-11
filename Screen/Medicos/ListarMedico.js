import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import MedicoCard from "../../components/MedicoCard";
import { useNavigation } from "@react-navigation/native";
import { listarMedicos, eliminarMedico } from "../../Src/Servicios/MedicoService";
import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService"; // Importar listarEspecialidades

import styles from "../../Styles/ListarMedicoStyles";

export default function ListarMedico (){
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [especialidadesMap, setEspecialidadesMap] = useState({}); // Nuevo estado para mapear ID de especialidad a nombre
    const navigation = useNavigation();

    const handleMedicos = async () => {
        setLoading(true);
        try {
            // 1. Cargar todas las especialidades primero
            const especialidadesResult = await listarEspecialidades();
            let tempEspecialidadesMap = {};
            if (especialidadesResult.success) {
                console.log("Especialidades cargadas:", especialidadesResult.data); // LOG DE DEPURACIÓN
                especialidadesResult.data.forEach(especialidad => {
                    // Asegúrate de que 'id' y 'Nombre' son las claves correctas de tu API para especialidades
                    tempEspecialidadesMap[especialidad.id] = especialidad.Nombre;
                });
                setEspecialidadesMap(tempEspecialidadesMap);
            } else {
                Alert.alert("Error", especialidadesResult.message || "No se pudieron cargar las especialidades.");
            }

            // 2. Cargar los médicos
            const medicosResult = await listarMedicos();
            if (medicosResult.success) {
                console.log("Médicos cargados:", medicosResult.data); // LOG DE DEPURACIÓN
                // 3. Enriquecer cada médico con el nombre de la especialidad
                const enrichedMedicos = medicosResult.data.map(medicoItem => {
                    // Asegúrate de que 'idEspecialidad' es la clave correcta en tu objeto médico
                    const nombreEspecialidad = tempEspecialidadesMap[medicoItem.idEspecialidad] || 'Especialidad Desconocida';
                    console.log(`Médico ID: ${medicoItem.id}, idEspecialidad: ${medicoItem.idEspecialidad}, Nombre Especialidad: ${nombreEspecialidad}`); // LOG DE DEPURACIÓN
                    return {
                        ...medicoItem,
                        nombreEspecialidad: nombreEspecialidad
                    };
                });
                setMedicos(enrichedMedicos);
            } else {
                Alert.alert ("Error", medicosResult.message || "No se pudieron cargar los médicos");
            }
        } catch (error) {
            console.error("Error al cargar médicos o especialidades:", error);
            Alert.alert ("Error", "Ocurrió un error inesperado al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleMedicos);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar este médico?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarMedico(id);
                            if (result.success) {
                                Alert.alert("Éxito", "Médico eliminado correctamente.");
                                handleMedicos();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el Médico.");
                            }
                        } catch (error) {
                            console.error("Error al eliminar médico:", error);
                            Alert.alert("Error", "Ocurrió un error inesperado al eliminar el médico.");
                        }
                    },
                },
            ]
        )
    }

    const handleCrear = () => {
        navigation.navigate('CrearMedico');
    };

    const handleEditar = (medico) => {
        navigation.navigate("EditarMedico", { medico });
    }

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando médicos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={medicos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MedicoCard
                        medico={item}
                        nombreEspecialidad={item.nombreEspecialidad} // Pasamos el nombre de la especialidad
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="people-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay médicos registrados.</Text>
                        <Text style={styles.emptyText}>¡Crea un nuevo médico!</Text>
                    </View>
                }
                contentContainerStyle={medicos.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Médico</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

