import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import MedicoCard from "../../components/MedicoCard"; // Asegúrate de que la ruta sea correcta
import { useNavigation } from "@react-navigation/native";
import { listarMedicos, eliminarMedico } from "../../Src/Servicios/MedicoService";
import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService"; // Importar listarEspecialidades

import styles from "../../Styles/ListarMedicoStyles"; // Asegúrate de que la ruta sea correcta

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
                // console.log("Especialidades cargadas:", especialidadesResult.data); // LOG DE DEPURACIÓN
                especialidadesResult.data.forEach(especialidad => {
                    // Asegúrate de que 'id' y 'Nombre' son las claves correctas de tu API para especialidades
                    tempEspecialidadesMap[especialidad.id] = especialidad.Nombre;
                });
                setEspecialidadesMap(tempEspecialidadesMap);
            } else {
                console.error("Error al cargar especialidades:", especialidadesResult.message);
                Alert.alert("Error de Carga", especialidadesResult.message || "No se pudieron cargar las especialidades.");
            }

            // 2. Cargar los médicos
            const medicosResult = await listarMedicos();
            if (medicosResult.success) {
                // console.log("Médicos cargados:", medicosResult.data); // LOG DE DEPURACIÓN
                // 3. Enriquecer cada médico con el nombre de la especialidad
                const enrichedMedicos = medicosResult.data.map(medicoItem => {
                    // Asegúrate de que 'idEspecialidad' es la clave correcta en tu objeto médico
                    const nombreEspecialidad = tempEspecialidadesMap[medicoItem.idEspecialidad] || 'Especialidad Desconocida';
                    // console.log(`Médico ID: ${medicoItem.id}, idEspecialidad: ${medicoItem.idEspecialidad}, Nombre Especialidad: ${nombreEspecialidad}`);
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

    // Recargar médicos cada vez que la pantalla se enfoca
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
                                handleMedicos(); // Recargar la lista
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
        navigation.navigate('CrearMedico'); // Asegúrate de que 'CrearMedico' sea el nombre de tu ruta
    };

    const handleEditar = (medico) => {
        navigation.navigate("EditarMedico", { medico }); // Asegúrate de que 'EditarMedico' sea el nombre de tu ruta
    }

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loadingText}>Cargando médicos...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            {/* Nuevo encabezado */}
            <View style={styles.headerContainer}>
                <Ionicons name="people-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Médicos</Text>
            </View>

            <FlatList
                data={medicos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MedicoCard
                        // Asegúrate de que los nombres de las props coincidan con lo que MedicoCard espera
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

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Médico</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}