import {View, Text, Button, StyleSheet, ScrollView } from "react-native"
import BotonComponent from "../../components/BottonComponent"; 

export default function ListarMedico ({navigation}){
    const medicosEjemplo = [
        { id: '1', Nombre: 'Angie', Apellido: 'Cardenas', Correo: 'cardenas@gmail', Telefono: '3108909090', TipoDocumento: 'CC', NumeroDocumento: '1052836128', Activo: 'TRUE'},
        { id: '2', Nombre: 'Carlos', Apellido: 'Rodríguez', Correo: 'carlol@gmail', Telefono: '3213595990', TipoDocumento: 'CC', NumeroDocumento: '1052836122', Activo: 'TRUE'},
        { id: '3', Nombre: 'Diane', Apellido: 'León', Correo: 'diane@gmail', Telefono: '3107890890', TipoDocumento: 'CC', NumeroDocumento: '1052836120', Activo: 'FALSE'},
    ];
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Medicos</Text>

            <ScrollView style={styles.medicoScrollView}>
                {medicosEjemplo.map((medico) => (
                    <View key={medico.id} style={styles.medicoCard}>
                        <Text style={styles.medicoTitle}>{medico.Nombre} {medico.Apellido}</Text> {/* Título ahora incluye nombre y apellido */}         
                        <Text style={styles.medicoDetail}><Text style={styles.detailLabel}>Apellido: </Text>{medico.Apellido}</Text>
                        <Text style={styles.medicoDetail}><Text style={styles.detailLabel}>Correo: </Text>{medico.Correo}</Text>
                        <Text style={styles.medicoDetail}><Text style={styles.detailLabel}>Telefono: </Text>{medico.Telefono}</Text>
                        <Text style={styles.medicoDetail}><Text style={styles.detailLabel}>TipoDocumento: </Text>{medico.TipoDocumento}</Text>
                        <Text style={styles.medicoDetail}><Text style={styles.detailLabel}>NumeroDocumento: </Text>{medico.NumeroDocumento}</Text>
                        <Text style={styles.medicoDetail}><Text style={styles.detailLabel}>Activo: </Text>{medico.Activo === 'TRUE' ? 'Sí' : 'No'}</Text>

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
        width: "100%", 
        flex: 1, 
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
    // Nuevo estilo para aplicar negrita solo al nombre del campo
    detailLabel: {
        fontWeight: 'bold',
    },

    buttonContainer: {
        flexDirection: "row", 
        justifyContent: "space-around", 
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
        marginTop: 20,
        marginBottom: 10, 
    },

    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});