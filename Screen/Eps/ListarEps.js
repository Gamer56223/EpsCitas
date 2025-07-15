import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de que Ionicons esté disponible
import EpsCard from "../../components/EpsCard"; // Asegúrate de que la ruta sea correcta
import { useNavigation } from "@react-navigation/native";
import { listarEps, eliminarEps } from "../../Src/Servicios/EpsService";
import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService"; // Importar listarEspecialidades

import styles from "../../Styles/ListarEpsStyles"; // Asegúrate de que la ruta sea correcta

export default function ListarEps (){
    const [eps, setEps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [especialidadesMap, setEspecialidadesMap] = useState({}); // Nuevo estado para mapear ID de especialidad a nombre
    const navigation = useNavigation();

    const handleEps = async () => {
        setLoading(true);
        try {
            // 1. Cargar todas las especialidades primero
            const especialidadesResult = await listarEspecialidades();
            let tempEspecialidadesMap = {};
            if (especialidadesResult.success) {
                // console.log("Especialidades cargadas:", especialidadesResult.data);
                especialidadesResult.data.forEach(especialidad => {
                    // Asegúrate de que 'id' y 'Nombre' son las claves correctas de tu API para especialidades
                    tempEspecialidadesMap[especialidad.id] = especialidad.Nombre;
                });
                setEspecialidadesMap(tempEspecialidadesMap);
            } else {
                console.error("Error al cargar especialidades:", especialidadesResult.message);
                Alert.alert("Error de Carga", especialidadesResult.message || "No se pudieron cargar las especialidades.");
            }

            // 2. Cargar las EPS
            const epsResult = await listarEps();
            if (epsResult.success) {
                // console.log("EPS cargadas:", epsResult.data);
                // 3. Enriquecer cada EPS con el nombre de la especialidad
                const enrichedEps = epsResult.data.map(epsItem => {
                    // Asegúrate de que 'idEspecialidad' es la clave correcta en tu objeto EPS
                    const nombreEspecialidad = tempEspecialidadesMap[epsItem.idEspecialidad] || 'Especialidad Desconocida';
                    // console.log(`EPS ID: ${epsItem.id}, idEspecialidad: ${epsItem.idEspecialidad}, Nombre Especialidad: ${nombreEspecialidad}`);
                    return {
                        ...epsItem,
                        nombreEspecialidad: nombreEspecialidad
                    };
                });
                setEps(enrichedEps);
            } else {
                Alert.alert ("Error", epsResult.message || "No se pudieron cargar las EPS");
            }
        } catch (error) {
            console.error("Error al cargar EPS o especialidades:", error);
            Alert.alert ("Error", "Ocurrió un error al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    // Recargar EPS cada vez que la pantalla se enfoca
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleEps);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar esta EPS?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarEps(id);
                            if (result.success) {
                                Alert.alert("Éxito", "EPS eliminada correctamente.");
                                handleEps(); // Recargar la lista
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la EPS.");
                            }
                        } catch (error) {
                            console.error("Error al eliminar EPS:", error);
                            Alert.alert("Error", "Ocurrió un error inesperado al eliminar la EPS.");
                        }
                    },
                },
            ]
        )
    };

    const handleCrear = () => {
        navigation.navigate('CrearEps'); // Asegúrate de que 'CrearEps' sea el nombre de tu ruta
    };

    const handleEditar = (epsItem) => {
        navigation.navigate("EditarEps", { eps: epsItem }); // Asegúrate de que 'EditarEps' sea el nombre de tu ruta
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loadingText}>Cargando EPS...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            {/* Nuevo encabezado */}
            <View style={styles.headerContainer}>
                <Ionicons name="medkit-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de EPS</Text>
            </View>

            <FlatList
                data={eps}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <EpsCard
                        // Asegúrate de que los nombres de las props coincidan con lo que EpsCard espera
                        eps={item}
                        nombreEspecialidad={item.nombreEspecialidad} // Pasamos el nombre de la especialidad
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="medkit-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay EPS registradas.</Text>
                        <Text style={styles.emptyText}>¡Crea una nueva EPS!</Text>
                    </View>
                }
                contentContainerStyle={eps.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva EPS</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}