import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import EspecialidadCard from "../../components/EspecialidadCard";
import { useNavigation } from "@react-navigation/native";
import { listarEspecialidades, eliminarEspecialidad } from "../../Src/Servicios/EspecialidadService";

import styles from "../../Styles/ListarEspecialidadStyles";

/**
 * ListarEspecialidad: Componente de pantalla que muestra una lista de especialidades médicas.
 * Permite a los usuarios ver, editar y eliminar especialidades.
 */
export default function ListarEspecialidad (){
    // Estado para almacenar la lista de especialidades
    const [especialidades, setEspecialidades] = useState([]);
    // Estado para controlar el indicador de carga
    const [loading, setLoading] = useState(true);
    // Hook para acceder al objeto de navegación
    const navigation = useNavigation();

    /**
     * handleEspecialidades: Función asíncrona para cargar la lista de especialidades desde el servicio.
     * Gestiona el estado de carga y muestra alertas en caso de error.
     */
    const handleEspecialidades = async () => {
        setLoading(true); // Activa el indicador de carga
        try {
            const result = await listarEspecialidades(); // Llama al servicio para obtener las especialidades
            if (result.success) {
                setEspecialidades(result.data); // Actualiza el estado con las especialidades obtenidas
            } else {
                // Muestra una alerta si la carga falla
                Alert.alert ("Error", result.message || "No se pudieron cargar las especialidades");
            }
        } catch (error) {
            // Captura y muestra errores inesperados
            console.error("Error al listar especialidades:", error);
            Alert.alert ("Error", "Ocurrió un error al cargar las especialidades.");
        } finally {
            setLoading(false); // Desactiva el indicador de carga al finalizar
        }
    };

    // useEffect para recargar las especialidades cada vez que la pantalla se enfoca (visible).
    useEffect(() => {
        // Añade un listener para el evento 'focus' de la navegación
        const unsubscribe = navigation.addListener('focus', handleEspecialidades);
        // Retorna una función de limpieza para remover el listener cuando el componente se desmonte
        return unsubscribe;
    }, [navigation]); // Dependencia: se ejecuta solo si el objeto de navegación cambia

    /**
     * handleEliminar: Muestra una alerta de confirmación antes de eliminar una especialidad.
     * Si el usuario confirma, llama al servicio `eliminarEspecialidad` y recarga la lista.
     * @param {number} id - El ID de la especialidad a eliminar.
     */
    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación", // Título de la alerta
            "¿Estás seguro de que deseas eliminar esta especialidad?", // Mensaje de la alerta
            [
                { text: "Cancelar", style: "cancel" }, // Botón "Cancelar"
                {
                    text: "Eliminar", // Botón "Eliminar"
                    style: "destructive", // Estilo destructivo (rojo en iOS)
                    onPress: async () => {
                        try {
                            const result = await eliminarEspecialidad(id); // Llama al servicio de eliminación
                            if (result.success) {
                                handleEspecialidades(); // Recarga la lista después de eliminar
                                Alert.alert("Éxito", "Especialidad eliminada correctamente.");
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la Especialidad.");
                            }
                        } catch (error) {
                            console.error("Error al eliminar especialidad:", error);
                            Alert.alert("Error", "Ocurrió un error inesperado al eliminar la especialidad.");
                        }
                    },
                },
            ]
        );
    }

    /**
     * handleCrear: Navega a la pantalla para crear una nueva especialidad.
     */
    const handleCrear = () => {
        navigation.navigate('CrearEspecialidad'); // Navega a la ruta 'CrearEspecialidad'
    };

    /**
     * handleEditar: Navega a la pantalla para editar una especialidad existente, pasando los datos de la especialidad.
     * @param {object} especialidad - El objeto de la especialidad a editar.
     */
    const handleEditar = (especialidad) => {
        navigation.navigate("EditarEspecialidad", {especialidad}); // Navega a 'EditarEspecialidad' con los datos
    }

    const handleDetalle = (especialidadId) => {
        navigation.navigate("DetalleEspecialidad", {especialidadId: especialidadId});
    }

    // Muestra un indicador de carga si los datos están siendo obtenidos.
    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loadingText}>Cargando especialidades...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            {/* Configura la barra de estado */}
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            {/* Encabezado de la pantalla */}
            <View style={styles.headerContainer}>
                <Ionicons name="medical-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Especialidades</Text>
            </View>

            {/* Lista de especialidades */}
            <FlatList
                data={especialidades}
                keyExtractor={(item) => item.id.toString()} // Usa el ID como clave única para cada elemento
                renderItem={({ item }) => (
                    <EspecialidadCard
                        especialidad={item}
                        onEdit={() => handleEditar (item)} // Pasa la función de edición con el item
                        onDelete={() => handleEliminar (item.id)} // Pasa la función de eliminación con el ID
                        onDetail={() => handleDetalle (item.id)} // Pasa la función de detalles con el ID
                    />
                )}
                // Componente a mostrar si la lista está vacía
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="medical-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay especialidades registradas.</Text>
                        <Text style={styles.emptyText}>¡Crea una nueva especialidad!</Text>
                    </View>
                }
                // Estilo del contenedor de la lista, ajustado si está vacía
                contentContainerStyle={especialidades.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            {/* Botón flotante para crear una nueva especialidad */}
            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva Especialidad</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}