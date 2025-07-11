import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import EpsCard from "../../components/EpsCard";
import { useNavigation } from "@react-navigation/native";
import { listarEps, eliminarEps } from "../../Src/Servicios/EpsService";
import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService"; // Importar listarEspecialidades

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
                console.log("Especialidades cargadas:", especialidadesResult.data); // LOG DE DEPURACIÓN
                especialidadesResult.data.forEach(especialidad => {
                    // Asegúrate de que 'id' y 'Nombre' son las claves correctas de tu API para especialidades
                    tempEspecialidadesMap[especialidad.id] = especialidad.Nombre;
                });
                setEspecialidadesMap(tempEspecialidadesMap);
            } else {
                Alert.alert("Error", especialidadesResult.message || "No se pudieron cargar las especialidades.");
            }

            // 2. Cargar las EPS
            const epsResult = await listarEps();
            if (epsResult.success) {
                console.log("EPS cargadas:", epsResult.data); // LOG DE DEPURACIÓN
                // 3. Enriquecer cada EPS con el nombre de la especialidad
                const enrichedEps = epsResult.data.map(epsItem => {
                    // Asegúrate de que 'idEspecialidad' es la clave correcta en tu objeto EPS
                    const nombreEspecialidad = tempEspecialidadesMap[epsItem.idEspecialidad] || 'Especialidad Desconocida';
                    console.log(`EPS ID: ${epsItem.id}, idEspecialidad: ${epsItem.idEspecialidad}, Nombre Especialidad: ${nombreEspecialidad}`); // LOG DE DEPURACIÓN
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
                                handleEps();
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
    }

    const handleCrear = () => {
        navigation.navigate('CrearEps');
    };

    const handleEditar = (epsItem) => {
        navigation.navigate("EditarEps", { eps: epsItem });
    }

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando EPS...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={eps}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <EpsCard
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

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva EPS</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBF5FB',
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    centeredContainer: {
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
        paddingBottom: 20,
    },
    flatListEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonCrear: {
        backgroundColor: '#28A745',
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