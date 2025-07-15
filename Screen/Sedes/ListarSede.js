import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import SedeCard from "../../components/SedeCard"; // Asegúrate de que la ruta sea correcta
import { useNavigation } from "@react-navigation/native";
import { listarSedes, eliminarSede } from "../../Src/Servicios/SedeService";

import styles from '../../Styles/ListarSedeStyles'; // Asegúrate de que la ruta sea correcta

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
            console.error("Error al cargar sedes:", error);
            Alert.alert("Error", "Ocurrió un error al cargar las sedes.");
        } finally {
            setLoading(false);
        }
    };

    // Recargar sedes cada vez que la pantalla se enfoca
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleSedes);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación", // Título más claro
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
                            console.error("Error al eliminar sede:", error);
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
                <ActivityIndicator size="large" color="#007BFF" />
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
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            {/* Nuevo encabezado */}
            <View style={styles.headerContainer}>
                <Ionicons name="business-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Sedes</Text>
            </View>

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

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva Sede</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}