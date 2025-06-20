import { View, Text, StyleSheet, ScrollView } from "react-native";
import BotonComponent from "../../components/BottonComponent"; // Asegúrate de que la ruta sea correcta

export default function ListarCita({ navigation }) {
    
    const citasEjemplo = [
        { id: '1', Nombre: 'Consulta General', Fecha: '2025-07-01', Estado: 'Activo', Hora: '10:00 AM', Tipo: 'Consulta' },
        { id: '2', Nombre: 'Revisión Dental', Fecha: '2025-07-05', Estado: 'Activo', Hora: '03:30 PM', Tipo: 'Revisión' },
        { id: '3', Nombre: 'Terapia Física', Fecha: '2025-07-10', Estado: 'Inactivo', Hora: '09:00 AM', Tipo: 'urgencia' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Citas</Text>

            <ScrollView style={styles.citasContainer}>
                {citasEjemplo.map((cita) => (
                    <View key={cita.id} style={styles.citaCard}>
                        <Text style={styles.citaTitle}>{cita.Nombre}</Text>
                        <Text style={styles.citaDetail}>Fecha: {cita.Fecha}</Text>
                        <Text style={styles.citaDetail}>Estado: {cita.Estado}</Text>
                        <Text style={styles.citaDetail}>Hora: {cita.Hora}</Text>
                        <Text style={styles.citaDetail}>Tipo: {cita.Tipo}</Text>
                        
                        <View style={styles.buttonContainer}>
                            <BotonComponent
                                title="Ver Detalles"
                                onPress={() => navigation.navigate("DetalleCitas", { citaId: cita.id })}
                                buttonStyle={styles.viewButton}
                                textStyle={styles.buttonText}
                            />
                            <BotonComponent
                                title="Editar"
                                onPress={() => navigation.navigate("EditarCitas", { citaId: cita.id })}
                                buttonStyle={styles.editButton}
                                textStyle={styles.buttonText}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>

            <BotonComponent
                title="Agendar Nueva Cita"
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
        width: "100%", // Ocupa todo el ancho disponible
        flex: 1, // Permite que el ScrollView ocupe el espacio restante
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
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
    },
    citaTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#34495E", // Color para el título de la cita
    },
    citaDetail: {
        fontSize: 16,
        color: "#5C6F7F", // Color para los detalles de la cita
        marginBottom: 4,
    },
    buttonContainer: {
        flexDirection: "row", // Botones en la misma fila
        justifyContent: "space-around", // Distribuye los botones equitativamente
        marginTop: 15,
    },
    // Estilos para BotonComponent
    viewButton: {
        backgroundColor: "#3498DB", // Azul para "Ver Detalles"
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        minWidth: 120, // Ancho mínimo para los botones
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
        marginTop: 20, // Espacio superior
        marginBottom: 10, // Espacio inferior si hay más contenido abajo
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});