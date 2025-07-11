import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
// import BotonComponent from "../../components/BottonComponent"; // No se usa directamente aquí, considerar eliminar si no se utiliza
import EspecialidadCard from "../../components/EspecialidadCard";
import { useNavigation } from "@react-navigation/native";
import { listarEspecialidades, eliminarEspecialidad } from "../../Src/Servicios/EspecialidadService";

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