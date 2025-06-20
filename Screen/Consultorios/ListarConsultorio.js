import {View, Text, StyleSheet, ScrollView } from "react-native"
import BotonComponent from "../../components/BottonComponent"; // Asegúrate de que la ruta sea correcta


export default function ListarConsultorio ({navigation}){

    const consultoriosEjemplo = [
        { id: '1', Nombre: 'Consultorio B2', Numero: '202'},
        { id: '2', Nombre: 'Consultorio B3', Numero: '203'},
        { id: '3', Nombre: 'Consultorio C1', Numero: '506'},
    ];
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Consultorios</Text>
            <ScrollView style={styles.consultorioContainer}>
                {consultoriosEjemplo.map((consultorio) => (
                    <View key={consultorio.id} style={styles.consultorioCard}>
                        <Text style={styles.consultorioTitle}>{consultorio.Nombre}</Text>
                        <Text style={styles.consultorioDetail}>Fecha: {consultorio.Numero}</Text>          
                        <View style={styles.buttonContainer}>
                            <BotonComponent
                                title="Ver Detalles"
                                onPress={() => navigation.navigate("DetalleConsultorios", { consultorioId: consultorio.id })}
                                buttonStyle={styles.viewButton}
                                textStyle={styles.buttonText}
                            />
                            <BotonComponent
                                title="Editar"
                                onPress={() => navigation.navigate("EditarConsultorios", { consultorioId: consultorio.id })}
                                buttonStyle={styles.editButton}
                                textStyle={styles.buttonText}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>
    
            <BotonComponent
                title="Agendar Nuevo Consultorio"
                onPress={() => { /* navigation.navigate("CrearConsultorio") */ }}
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

    consultorioContainer: {
        width: "100%", // Ocupa todo el ancho disponible
        flex: 1, // Permite que el ScrollView ocupe el espacio restante
    },

    consultorioCard: {
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

    consultorioTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#34495E", // Color para el título de la cita
    },

    consultorioDetail: {
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