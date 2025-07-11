import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import ConsultorioCard from "../../components/ConsultorioCard";
import { useNavigation } from "@react-navigation/native";
import { listarConsultorios, eliminarConsultorio } from "../../Src/Servicios/ConsultorioService";
import { listarSedes } from "../../Src/Servicios/SedeService";

import styles from "../../Styles/ListarConsultorioStyles";

export default function ListarConsultorio (){
    const [consultorios, setConsultorios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sedesMap, setSedesMap] = useState({});
    const navigation = useNavigation();

    const handleConsultorios = async () => {
        setLoading(true);
        try {
            const sedesResult = await listarSedes();
            let tempSedesMap = {};
            if (sedesResult.success) {
                console.log("Sedes cargadas:", sedesResult.data);
                sedesResult.data.forEach(sede => {
                    tempSedesMap[sede.id] = sede.Nombre;
                });
                setSedesMap(tempSedesMap);
            } else {
                Alert.alert("Error", sedesResult.message || "No se pudieron cargar las sedes.");
            }

            const consultoriosResult = await listarConsultorios();
            if (consultoriosResult.success) {
                console.log("Consultorios cargados:", consultoriosResult.data);
                const enrichedConsultorios = consultoriosResult.data.map(consultorio => {
                    // CAMBIO CLAVE AQUÍ: de consultorio.IdSede a consultorio.idSede
                    const nombreSede = tempSedesMap[consultorio.idSede] || 'Sede Desconocida';
                    console.log(`Consultorio ID: ${consultorio.id}, idSede: ${consultorio.idSede}, Nombre Sede: ${nombreSede}`);
                    return {
                        ...consultorio,
                        nombreSede: nombreSede
                    };
                });
                setConsultorios(enrichedConsultorios);
            } else {
                Alert.alert ("Error", consultoriosResult.message || "No se pudieron cargar los consultorios");
            }
        } catch (error) {
            console.error("Error al cargar consultorios o sedes:", error);
            Alert.alert ("Error", "Ocurrió un error al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleConsultorios);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar este consultorio?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarConsultorio(id);
                            if (result.success) {
                                Alert.alert("Éxito", "Consultorio eliminado correctamente.");
                                handleConsultorios();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el Consultorio");
                            }
                        } catch (error) {
                            console.error("Error al eliminar consultorio:", error);
                            Alert.alert("Error", "No se pudo eliminar el consultorio debido a un error inesperado.");
                        }
                    },
                },
            ]
        );
    };

    const handleCrear = () => {
        navigation.navigate('CrearConsultorio');
    };

    const handleEditar = (consultorio) => {
        navigation.navigate("EditarConsultorios", { consultorio });
    };

    const handleVerDetalle = (consultorioId) => {
        navigation.navigate("DetalleConsultorios", { consultorioId });
    };


    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando consultorios...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={consultorios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ConsultorioCard
                        consultorio={item}
                        nombreSede={item.nombreSede}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onPress={() => handleVerDetalle(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="business-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay consultorios registrados.</Text>
                        <Text style={styles.emptyText}>¡Crea un nuevo consultorio!</Text>
                    </View>
                }
                contentContainerStyle={consultorios.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Consultorio</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

