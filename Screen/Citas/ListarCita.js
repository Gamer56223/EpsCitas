import { View, Text, StyleSheet, ScrollView } from "react-native";
import BotonComponent from "../../components/BottonComponent"; 


export default function ListarCita({ navigation }) {

    const citasEjemplo = [
        { id: '1', Nombre: 'Consulta General', Fecha: '2025-07-01', Estado: 'Activo', Hora: '10:00 AM', Tipo: 'Consulta' },
        { id: '2', Nombre: 'Revisión Dental', Fecha: '2025-07-05', Estado: 'Activo', Hora: '03:30 PM', Tipo: 'Revisión' },
        { id: '3', Nombre: 'Terapia Física', Fecha: '2025-07-10', Estado: 'Inactivo', Hora: '09:00 AM', Tipo: 'urgencia' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Citas</Text> {/* El título ya estaba completo, se mantiene */}

            <ScrollView style={styles.citasContainer}>
                {citasEjemplo.map((cita) => (
                    <View key={cita.id} style={styles.citaCard}>
                        <Text style={styles.citaTitle}>{cita.Nombre}</Text>
                        {/* Se aplican estilos de negrita solo a los nombres de los campos */}
                        <Text style={styles.citaDetail}><Text style={styles.detailLabel}>Fecha: </Text>{cita.Fecha}</Text>
                        <Text style={styles.citaDetail}><Text style={styles.detailLabel}>Estado: </Text>{cita.Estado}</Text>
                        <Text style={styles.citaDetail}><Text style={styles.detailLabel}>Hora: </Text>{cita.Hora}</Text>
                        <Text style={styles.citaDetail}><Text style={styles.detailLabel}>Tipo: </Text>{cita.Tipo}</Text>

                        <View style={styles.buttonContainer}>
                            <BotonComponent
                                title="Ver Detalles" // Título completo
                                onPress={() => navigation.navigate("DetalleCitas", { citaId: cita.id })}
                                buttonStyle={styles.viewButton}
                                textStyle={styles.buttonText}
                            />
                            <BotonComponent
                                title="Editar Cita" // Título completo
                                onPress={() => navigation.navigate("EditarCitas", { citaId: cita.id })}
                                buttonStyle={styles.editButton}
                                textStyle={styles.buttonText}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>

            <BotonComponent
                title="Agendar Nueva Cita" // Título completo
                onPress={() => { /* navigation.navigate("CrearCita") */ }}
                buttonStyle={styles.newCitaButton}
                textStyle={styles.buttonText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F0F4F8", // Fondo suave
        alignItems: "center", // Centra el contenido horizontalmente
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25,
        color: "#2C3E50", // Color de título oscuro
    },
    citasContainer: {
        width: "100%", 
        flex: 1, 
    },
    citaCard: {
        backgroundColor: "skyblue", // Fondo blanco para cada tarjeta de cita
        borderRadius: 10,
        padding: 15,
        marginBottom: 15, // Espacio entre tarjetas
        shadowColor: "#000", // Sombra suave
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3, // Elevación para Android
    },
    citaTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#34495E", 
    },
    
    citaDetail: {
        fontSize: 16,
        color: "#5C6F7F", 
        marginBottom: 4,
    },
    
    detailLabel: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: "row", 
        justifyContent: "space-around",
        marginTop: 15,
    },
    // Estilos para BotonComponent
    viewButton: {
        backgroundColor: "#3498DB", // Azul para "Ver Detalles"
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        minWidth: 120, 
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: "#2ECC71", // Verde para "Editar"
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        minWidth: 120,
        alignItems: 'center',
    },
    newCitaButton: {
        backgroundColor: "#E67E22", // Naranja para "Agendar Nueva Cita"
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 20, 
        marginBottom: 10, 
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});