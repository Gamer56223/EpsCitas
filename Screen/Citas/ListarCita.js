import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import CitaCard from '../../components/CitaCard';
import { useNavigation } from "@react-navigation/native";
import { listarCitas, eliminarCita } from "../../Src/Servicios/CitaService";
// Importar servicios para entidades relacionadas (asumiendo que existen y tienen funciones de listar)
import { listarMedicos } from "../../Src/Servicios/MedicoService";
import { listarPacientes } from "../../Src/Servicios/PacienteService"; // Asume que tienes un PacienteService
import { listarConsultorios } from "../../Src/Servicios/ConsultorioService";
import { listarEps } from "../../Src/Servicios/EpsService"; // Asume que tienes un EpsService

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
                // Asume que tienes una función listarPacientes en PacienteService
                // Si no existe, deberás crearla o ajustar esta línea
                listarPacientes(),
                listarConsultorios(),
                // Asume que tienes una función listarEps en EpsService
                // Si no existe, deberás crearla o ajustar esta línea
                listarEps(),
                listarCitas()
            ]);

            let tempMedicosMap = {};
            if (medicosRes.success) {
                console.log("Médicos cargados:", medicosRes.data);
                medicosRes.data.forEach(medico => {
                    tempMedicosMap[medico.id] = `${medico.Nombre} ${medico.Apellido}`;
                });
                setMedicosMap(tempMedicosMap);
            } else {
                console.error("Error al cargar médicos:", medicosRes.message);
            }

            let tempPacientesMap = {};
            if (pacientesRes.success) {
                console.log("Pacientes cargados:", pacientesRes.data);
                pacientesRes.data.forEach(paciente => {
                    tempPacientesMap[paciente.id] = `${paciente.Nombre} ${paciente.Apellido}`;
                });
                setPacientesMap(tempPacientesMap);
            } else {
                console.error("Error al cargar pacientes:", pacientesRes.message);
            }

            let tempConsultoriosMap = {};
            if (consultoriosRes.success) {
                console.log("Consultorios cargados:", consultoriosRes.data);
                consultoriosRes.data.forEach(consultorio => {
                    tempConsultoriosMap[consultorio.id] = consultorio.Nombre;
                });
                setConsultoriosMap(tempConsultoriosMap);
            } else {
                console.error("Error al cargar consultorios:", consultoriosRes.message);
            }

            let tempEpsMap = {};
            if (epsRes.success) {
                console.log("EPS cargadas:", epsRes.data);
                epsRes.data.forEach(epsItem => {
                    tempEpsMap[epsItem.id] = epsItem.Nombre;
                });
                setEpsMap(tempEpsMap);
            } else {
                console.error("Error al cargar EPS:", epsRes.message);
            }

            if (citasRes.success) {
                console.log("Citas cargadas:", citasRes.data);
                const enrichedCitas = citasRes.data.map(citaItem => {
                    // *** IMPORTANTE: AJUSTA ESTAS CLAVES (idMedico, idPaciente, etc.)
                    // SI NO COINCIDEN CON LOS NOMBRES REALES EN TU TABLA DE CITAS EN LARAVEL ***
                    const nombreMedico = tempMedicosMap[citaItem.idMedico] || 'Médico Desconocido';
                    const nombrePaciente = tempPacientesMap[citaItem.idPaciente] || 'Paciente Desconocido';
                    const nombreConsultorio = tempConsultoriosMap[citaItem.idConsultorio] || 'Consultorio Desconocido';
                    const nombreEps = tempEpsMap[citaItem.idEps] || 'EPS Desconocida';

                    console.log(`Cita ID: ${citaItem.id}, idMedico: ${citaItem.idMedico}, Nombre Médico: ${nombreMedico}`);
                    console.log(`Cita ID: ${citaItem.id}, idPaciente: ${citaItem.idPaciente}, Nombre Paciente: ${nombrePaciente}`);
                    console.log(`Cita ID: ${citaItem.id}, idConsultorio: ${citaItem.idConsultorio}, Nombre Consultorio: ${nombreConsultorio}`);
                    console.log(`Cita ID: ${citaItem.id}, idEps: ${citaItem.idEps}, Nombre EPS: ${nombreEps}`);

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
                                handleCitas();
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
        )
    }

    const handleCrear = () => {
        navigation.navigate('CrearCita');
    };

    const handleEditar = (cita) => {
        navigation.navigate("EditarCitas", {cita});
    }

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando citas...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
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
                        onEdit={() => handleEditar (item)}
                        onDelete={() => handleEliminar (item.id)}
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

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva Cita</Text>
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