import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent";
import { obtenerConsultorioPorId } from "../../Src/Servicios/ConsultorioService";
import { listarSedes } from "../../Src/Servicios/SedeService";

import styles from "../../Styles/DetalleConsultorioStyles";

/**
 * DetalleConsultorio: Componente de pantalla que muestra los detalles de un consultorio específico.
 * Obtiene el ID del consultorio a través de los parámetros de navegación,
 * carga su información y el nombre de la sede asociada.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.route - Objeto de ruta de React Navigation, contiene los parámetros pasados (consultorioId).
 * @param {object} props.navigation - Objeto de navegación de React Navigation para controlar la navegación.
 */
export default function DetalleConsultorio({ route, navigation }) {
    // Extrae el `consultorioId` de los parámetros de la ruta.
    const { consultorioId } = route.params;

    // Estados para almacenar los datos del consultorio, el nombre de la sede y el estado de carga.
    const [consultorio, setConsultorio] = useState(null);
    const [sedeNombre, setSedeNombre] = useState("Cargando..."); // Estado para mostrar el nombre de la sede
    const [loading, setLoading] = useState(true); // Controla el estado de carga de los datos

    // useEffect para cargar los detalles del consultorio y el nombre de la sede al montar el componente
    useEffect(() => {
        const cargarDetallesConsultorio = async () => {
            setLoading(true); // Inicia el estado de carga
            try {
                // 1. Cargar el consultorio por su ID utilizando el servicio `obtenerConsultorioPorId`.
                const consultorioResult = await obtenerConsultorioPorId(consultorioId);
                if (consultorioResult.success) {
                    setConsultorio(consultorioResult.data); // Almacena los datos del consultorio

                    // 2. Si el consultorio se cargó correctamente y tiene un `IdSede`, busca el nombre de la sede.
                    if (consultorioResult.data && consultorioResult.data.IdSede) {
                        const sedesResult = await listarSedes(); // Obtiene la lista completa de sedes
                        if (sedesResult.success) {
                            // Busca la sede por su ID entre todas las sedes obtenidas
                            const foundSede = sedesResult.data.find(s => s.id === consultorioResult.data.IdSede);
                            setSedeNombre(foundSede ? foundSede.Nombre : "Desconocida"); // Asigna el nombre o "Desconocida"
                        } else {
                            setSedeNombre("Error al cargar sede"); // Manejo de error si no se pueden listar las sedes
                        }
                    } else {
                        setSedeNombre("N/A"); // Si el consultorio no tiene un IdSede, se muestra "N/A"
                    }
                } else {
                    // Si falla la carga del consultorio, muestra una alerta y resetea el estado del consultorio.
                    Alert.alert("Error", consultorioResult.message || "No se pudo cargar el consultorio.");
                    setConsultorio(null);
                }
            } catch (error) {
                // Captura errores inesperados durante el proceso de carga.
                console.error("Error al cargar detalles del consultorio:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar el consultorio.");
                setConsultorio(null);
            } finally {
                setLoading(false); // Finaliza el estado de carga, independientemente del resultado
            }
        };

        cargarDetallesConsultorio(); // Ejecuta la función de carga al montar el componente o cambiar `consultorioId`
    }, [consultorioId]); // Dependencia del `useEffect`: se ejecuta cada vez que `consultorioId` cambia

    // Muestra un indicador de carga mientras los datos están siendo obtenidos.
    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Consultorio...</Text>
            </View>
        );
    }

    // Muestra un mensaje de error si no se pudo cargar el consultorio.
    if (!consultorio) {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
                <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle del Consultorio</Text>
                <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                    <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para este consultorio.</Text>
                    <BotonComponent
                        title="Volver al Listado"
                        onPress={() => navigation.goBack()}
                        buttonStyle={styles.backButton}
                        textStyle={styles.buttonText}
                    />
                </View>
            </SafeAreaView>
        );
    }

    // Si los datos se cargaron correctamente, muestra los detalles del consultorio.
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
            <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle del Consultorio</Text>

            <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                <Text style={[styles.consultorioName, {color: '#2c3e50'}]}>{consultorio.Nombre}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{consultorio.id}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Número: </Text>{consultorio.Numero}</Text>
                {/* Muestra el nombre de la sede */}
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Sede: </Text>{sedeNombre}</Text>

                {/* Muestra el área solo si existe */}
                {consultorio.Area && (
                    <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Área: </Text>{consultorio.Area}</Text>
                )}
            </View>

            {/* Botón para volver a la pantalla anterior */}
            <BotonComponent
                title="Volver al Listado"
                onPress={() => navigation.goBack()}
                buttonStyle={styles.backButton}
                textStyle={styles.buttonText}
            />
        </SafeAreaView>
    );
}