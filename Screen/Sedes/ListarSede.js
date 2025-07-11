import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import SedeCard from "../../components/SedeCard"; // Asegúrate de que la ruta sea correcta
import { useNavigation } from "@react-navigation/native";
import { listarSedes, eliminarSede } from "../../Src/Servicios/SedeService";

export default function ListarSede() {
    const [sedes, setSedes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleSedes = async () => {
        setLoading(true);
        try {
            const result = await listarSedes();
            if (result.success) {
                setSedes(result.data);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar las sedes");
            }
        } catch (error) {
            console.error("Error al cargar sedes:", error); // Añadir log para depuración
            Alert.alert("Error", "Ocurrió un error al cargar las sedes."); // Mensaje más genérico para el usuario
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleSedes);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar Sede",
            "¿Estás seguro de que deseas eliminar esta sede?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarSede(id);
                            if (result.success) {
                                // Actualizar la lista localmente para una actualización más rápida
                                setSedes(prevSedes => prevSedes.filter((s) => s.id !== id));
                                Alert.alert("Éxito", "Sede eliminada correctamente.");
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la Sede");
                            }
                        } catch (error) {
                            console.error("Error al eliminar sede:", error); // Añadir log
                            Alert.alert("Error", "No se pudo eliminar la sede.");
                        }
                    },
                },
            ]
        );
    };

    const handleCrear = () => {
        navigation.navigate('CrearSede'); // Asegúrate de que esta ruta exista en tu Stack Navigator
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando sedes...</Text>
            </View>
        );
    }

    const handleEditar = (sede) => {
        navigation.navigate("EditarSede", { sede }); // Asegúrate de que esta ruta exista y reciba 'sede'
    };

    // Función para renderizar cada item de la FlatList
    const renderSedeItem = ({ item }) => (
        <SedeCard
            sede={item}
            onEdit={() => handleEditar(item)}
            onDelete={() => handleEliminar(item.id)}
            onPress={() => navigation.navigate('DetalleSede', { sedeId: item.id })} // Agregado para navegar al detalle
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={sedes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderSedeItem}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="business-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay sedes registradas.</Text>
                        <Text style={styles.emptyText}>¡Crea una nueva sede!</Text>
                    </View>
                }
                contentContainerStyle={sedes.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva Sede</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBF5FB', // Fondo suave, consistente con los otros archivos
        paddingHorizontal: 15, // Más padding horizontal
        paddingTop: 15, // Más padding superior
    },
    centeredContainer: { // Renombrado para mayor claridad y consistencia
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
        flexGrow: 1, // Permite que el contenedor se expanda y centre su contenido
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50, // Espacio vertical cuando no hay items
    },
    emptyText: {
        fontSize: 18,
        color: '#7F8C8D', // Un gris más oscuro
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 25, // Mayor espacio entre líneas
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
        borderRadius: 10, // Bordes más redondeados
        alignSelf: 'center', // Centra el botón horizontalmente
        width: '90%', // Ocupa un buen ancho
        marginBottom: 20, // Espacio en la parte inferior
        marginTop: 10,
        shadowColor: "#28A745", // Sombra a juego con el botón
        shadowOffset: {
            width: 0,
            height: 6, // Sombra más pronunciada
        },
        shadowOpacity: 0.35, // Opacidad de la sombra
        shadowRadius: 8, // Radio de desenfoque de la sombra
        elevation: 12, // Elevación para Android
    },
    botonCrearContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonCrearIcon: {
        marginRight: 10, // Espacio entre icono y texto
    },
    textoBotonCrear: {
        color: '#FFFFFF',
        fontSize: 18, // Tamaño de fuente más grande
        fontWeight: '700', // Más negrita
    },
});