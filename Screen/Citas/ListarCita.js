// Ruta: Screen/Citas/ListarCita.js

import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CitaCard from '../../components/CitaCard'; // Asegúrate de que la ruta sea correcta
import { useNavigation } from "@react-navigation/native";
import { listarCitas, eliminarCita } from "../../Src/Servicios/CitaService";
// Importar servicios para entidades relacionadas (asumiendo que existen y tienen funciones de listar)
import { listarMedicos } from "../../Src/Servicios/MedicoService";
import { listarPacientes } from "../../Src/Servicios/PacienteService";
import { listarConsultorios } from "../../Src/Servicios/ConsultorioService";
import { listarEps } from "../../Src/Servicios/EpsService";

import styles from "../../Styles/ListarCitaStyles"; // Asegúrate de que la ruta sea correcta

export default function ListarCita (){
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [medicosMap, setMedicosMap] = useState({});
    const [pacientesMap, setPacientesMap] = useState({});
    const [consultoriosMap, setConsultoriosMap] = useState({});
    const [epsMap, setEpsMap] = useState({});
    const navigation = useNavigation();

    const handleCitas = async () => {
        setLoading(true);
        try {
            // Cargar todas las entidades relacionadas primero
            const [medicosRes, pacientesRes, consultoriosRes, epsRes, citasRes] = await Promise.all([
                listarMedicos(),
                listarPacientes(),
                listarConsultorios(),
                listarEps(),
                listarCitas()
            ]);

            let tempMedicosMap = {};
            if (medicosRes.success) {
                medicosRes.data.forEach(medico => {
                    tempMedicosMap[medico.id] = `${medico.Nombre} ${medico.Apellido}`;
                });
                setMedicosMap(tempMedicosMap);
            } else {
                console.error("Error al cargar médicos:", medicosRes.message);
                Alert.alert("Error de Carga", medicosRes.message || "No se pudieron cargar los médicos.");
            }

            let tempPacientesMap = {};
            if (pacientesRes.success) {
                pacientesRes.data.forEach(paciente => {
                    tempPacientesMap[paciente.id] = `${paciente.Nombre} ${paciente.Apellido}`;
                });
                setPacientesMap(tempPacientesMap);
            } else {
                console.error("Error al cargar pacientes:", pacientesRes.message);
                Alert.alert("Error de Carga", pacientesRes.message || "No se pudieron cargar los pacientes.");
            }

            let tempConsultoriosMap = {};
            if (consultoriosRes.success) {
                consultoriosRes.data.forEach(consultorio => {
                    tempConsultoriosMap[consultorio.id] = consultorio.Nombre;
                });
                setConsultoriosMap(tempConsultoriosMap);
            } else {
                console.error("Error al cargar consultorios:", consultoriosRes.message);
                Alert.alert("Error de Carga", consultoriosRes.message || "No se pudieron cargar los consultorios.");
            }

            let tempEpsMap = {};
            if (epsRes.success) {
                epsRes.data.forEach(epsItem => {
                    tempEpsMap[epsItem.id] = epsItem.Nombre;
                });
                setEpsMap(tempEpsMap);
            } else {
                console.error("Error al cargar EPS:", epsRes.message);
                Alert.alert("Error de Carga", epsRes.message || "No se pudieron cargar las EPS.");
            }

            if (citasRes.success) {
                const enrichedCitas = citasRes.data.map(citaItem => {
                    // IMPORTANTE: AJUSTA ESTAS CLAVES (idMedico, idPaciente, etc.)
                    // SI NO COINCIDEN CON LOS NOMBRES REALES EN TU TABLA DE CITAS EN LARAVEL
                    const nombreMedico = tempMedicosMap[citaItem.idMedico] || 'Médico Desconocido';
                    const nombrePaciente = tempPacientesMap[citaItem.idPaciente] || 'Paciente Desconocido';
                    const nombreConsultorio = tempConsultoriosMap[citaItem.idConsultorio] || 'Consultorio Desconocido';
                    const nombreEps = tempEpsMap[citaItem.idEps] || 'EPS Desconocida';

                    return {
                        ...citaItem,
                        nombreMedico,
                        nombrePaciente,
                        nombreConsultorio,
                        nombreEps
                    };
                });
                setCitas(enrichedCitas);
            } else {
                Alert.alert("Error", citasRes.message || "No se pudieron cargar las citas");
            }
        } catch (error) {
            console.error("Error general al cargar datos de citas y relacionados:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos de las citas.");
        } finally {
            setLoading(false);
        }
    };

    // Recargar citas cada vez que la pantalla se enfoca
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleCitas);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar esta cita?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarCita(id);
                            if (result.success) {
                                Alert.alert("Éxito", "Cita eliminada correctamente.");
                                handleCitas(); // Recargar la lista
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la cita.");
                            }
                        } catch (error) {
                            console.error("Error al eliminar cita:", error);
                            Alert.alert("Error", "Ocurrió un error inesperado al eliminar la cita.");
                        }
                    },
                },
            ]
        );
    };

    const handleCrear = () => {
        navigation.navigate('CrearCita'); 
    };

    const handleEditar = (cita) => {
        navigation.navigate("EditarCitas", {cita}); // 'EditarCitas' ruta en CitasStack.js
    };



    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando citas...</Text>
            </View>
        );
    }

    return (
        // Usar SafeAreaView y StatusBar para mejor experiencia de usuario
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            {/* Nuevo encabezado */}
            <View style={styles.headerContainer}>
                <Ionicons name="calendar-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Citas</Text>
            </View>

            <FlatList
                data={citas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CitaCard
                        cita={item}
                        nombreMedico={item.nombreMedico}
                        nombrePaciente={item.nombrePaciente}
                        nombreConsultorio={item.nombreConsultorio}
                        nombreEps={item.nombreEps}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        
                    />
                )}
                ListEmptyComponent = {
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="calendar-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay citas registradas.</Text>
                        <Text style={styles.emptyText}>¡Crea una nueva cita!</Text>
                    </View>
                }
                contentContainerStyle={citas.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva Cita</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}