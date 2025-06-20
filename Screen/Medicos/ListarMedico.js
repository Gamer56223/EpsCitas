import {View, Text, Button, StyleSheet, ScrollView } from "react-native"
import BotonComponent from "../../components/BottonComponent"; // Asegúrate de que la ruta sea correcta

export default function ListarMedico ({navigation}){
    const medicosEjemplo = [
        { id: '1', Nombre: 'Tommy', Apellido: 'Vercety', Correo:'peñalosa@gmail', Telefono: '3212118621', NumeroDocumento: '1052836122', Activo: 'True'},
        { id: '2', Nombre: 'Carlos', Apellido: 'Rodríguez', Correo: 'carlos@gmail', Telefono: '3212118621', NumeroDocumento: '1052836128', Activo: 'False'},,
        { id: '3', Nombre: 'Carl', Apellido: 'Johnson', Correo:'cjblackman@gmail', Telefono: '3201089089', NumeroDocumento: '1052836109', Activo: 'True'},
    ];
    return (
            <View style={styles.container}>
                <Text style={styles.title}>Listado de Medicos</Text>
    
                <ScrollView style={styles.especialidadScrollView}>
                    {medicosEjemplo.map((medico) => (
                        <View key={medico.id} style={styles.medicoCard}>
                            <Text style={styles.medicoTitle}>{medico.Nombre}</Text>
                            <Text style={styles.medicoDetail}>Nombre: {medico.Nombre}</Text>
                            <Text style={styles.medicoDetail}>Apellido: {medico.Apellido}</Text>
                            <Text style={styles.medicoDetail}>Correo: {medico.Correo}</Text>
                            <Text style={styles.medicoDetail}>Telefono: {medico.Telefono}</Text>
                            <Text style={styles.medicoDetail}>NumeroDocumento: {medico.NumeroDocumento}</Text>
                            <Text style={styles.medicoDetail}>Activo: {medico.Activo}</Text>

                            <View style={styles.buttonContainer}>
                                <BotonComponent
                                    title="Ver Detalles"
                                    onPress={() => navigation.navigate("DetalleMedico", { medicoId: medico.id })}
                                    buttonStyle={styles.viewButton}
                                    textStyle={styles.buttonText}
                                />
                                <BotonComponent
                                    title="Editar"
                                    onPress={() => navigation.navigate("EditarMedico", { medicoId: medico.id })}
                                    buttonStyle={styles.editButton}
                                    textStyle={styles.buttonText}
                                />
                            </View>
                        </View>
                    ))}
                </ScrollView>
    
                <BotonComponent
                    title="Agregar Nuevo Medico"
                    onPress={() => { /* navigation.navigate("CrearMedico") */ }}
                    buttonStyle={styles.newMedicoButton}
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
    
     
    medicoScrollView: {
        width: "100%", // Ocupa todo el ancho disponible
        flex: 1, // Permite que el ScrollView ocupe el espacio restante
    },
    
    medicoCard: {
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
    
    medicoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#34495E", // Color para el título de la cita
    },
    
    medicoDetail: {
        fontSize: 16,
        color: "#5C6F7F", // Color para los detalles de la cita
        marginBottom: 4,
    },
    
        // Este es el estilo correcto para el contenedor de los botones dentro de cada tarjeta
    buttonContainer: {
        flexDirection: "row", // Botones en la misma fila
        justifyContent: "space-around", // Distribuye los botones equitativamente
        marginTop: 15,
    },
    
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
    
    newMedicoButton: {
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

    
