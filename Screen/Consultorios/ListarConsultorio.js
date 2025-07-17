import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import ConsultorioCard from "../../components/ConsultorioCard"; // Asegúrate de que la ruta sea correcta
import { useNavigation } from "@react-navigation/native";
import { listarConsultorios, eliminarConsultorio } from "../../Src/Servicios/ConsultorioService";
import { listarSedes } from "../../Src/Servicios/SedeService";

import styles from "../../Styles/ListarConsultorioStyles"; // Asegúrate de que la ruta sea correcta

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
                // console.log("Sedes cargadas:", sedesResult.data);
                sedesResult.data.forEach(sede => {
                    tempSedesMap[sede.id] = sede.Nombre;
                });
                setSedesMap(tempSedesMap);
            } else {
                Alert.alert("Error de Carga", sedesResult.message || "No se pudieron cargar las sedes.");
            }

            const consultoriosResult = await listarConsultorios();
            if (consultoriosResult.success) {
                // console.log("Consultorios cargados:", consultoriosResult.data);
                const enrichedConsultorios = consultoriosResult.data.map(consultorio => {
                    // CAMBIO CLAVE AQUÍ: de consultorio.IdSede a consultorio.idSede
                    // Asegúrate de que esta clave (idSede) coincide con tu API
                    const nombreSede = tempSedesMap[consultorio.idSede] || 'Sede Desconocida';
                    // console.log(`Consultorio ID: ${consultorio.id}, idSede: ${consultorio.idSede}, Nombre Sede: ${nombreSede}`);
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

    // Recargar consultorios cada vez que la pantalla se enfoca
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
                                handleConsultorios(); // Recargar la lista
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
        navigation.navigate('CrearConsultorio'); // Asegúrate de que 'CrearConsultorio' sea el nombre de tu ruta
    };

    const handleEditar = (consultorio) => {
        navigation.navigate("EditarConsultorios", { consultorio }); // Asegúrate de que 'EditarConsultorios' sea el nombre de tu ruta
    };

    const handleDetalle = (consultorioId) => {
        navigation.navigate("DetalleConsultorios", {consultorioId: consultorioId});
    }



    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loadingText}>Cargando consultorios...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            {/* Nuevo encabezado */}
            <View style={styles.headerContainer}>
                <Ionicons name="business-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Consultorios</Text>
            </View>

            <FlatList
                data={consultorios}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ConsultorioCard
                        // Asegúrate de que los nombres de las props coincidan con lo que ConsultorioCard espera
                        consultorio={item}
                        nombreSede={item.nombreSede}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onPress={() => handleVerDetalle(item.id)} // Si tienes una vista de detalle
                        onDetail={() => handleDetalle(item.id)} // Si tienes una vista de detalle
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

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Consultorio</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}