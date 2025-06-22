import { View, Text, StyleSheet, ScrollView } from "react-native";

import BotonComponent from "../../components/BottonComponent";

// import { View, Text, Button, StyleSheet, ScrollView } from "react-native";


export default function ListarPaciente ({navigation}){

    const PacientesEjemplo = [
        { id: '1', Nombre: 'Angie', Apellido: 'Cardenas', Correo: 'cardenas@gmail', Telefono: '3108909090', TipoDocumento: 'CC', NumeroDocumento: '1052836128', FechaNacimiento: '04/05/2007', Genero: 'Masculino'},
        { id: '2', Nombre: 'Carlos', Apellido: 'Rodríguez', Correo: 'carlol@gmail', Telefono: '3213595990', TipoDocumento: 'CC', NumeroDocumento: '1052836122', FechaNacimiento: '04/12/2003', Genero: 'Masculino'},
        { id: '3', Nombre: 'Diane', Apellido: 'León', Correo: 'diane@gmail', Telefono: '3107890890', TipoDocumento: 'CC', NumeroDocumento: '1052836120', FechaNacimiento: '17/06/1988', Genero: 'Femenino'},
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Pacientes</Text>

            <ScrollView style={styles.pacienteScrollView}>
                {PacientesEjemplo.map((paciente) => (
                    <View key={paciente.id} style={styles.pacienteCard}>
                        <Text style={styles.pacienteTitle}>{paciente.Nombre} {paciente.Apellido}</Text>
                        <Text style={styles.pacienteDetail}><Text style={styles.detailLabel}>Correo: </Text>{paciente.Correo}</Text>
                        <Text style={styles.pacienteDetail}><Text style={styles.detailLabel}>Telefono: </Text>{paciente.Telefono}</Text>
                        <Text style={styles.pacienteDetail}><Text style={styles.detailLabel}>TipoDocumento: </Text>{paciente.TipoDocumento}</Text>
                        <Text style={styles.pacienteDetail}><Text style={styles.detailLabel}>NumeroDocumento: </Text>{paciente.NumeroDocumento}</Text>
                        <Text style={styles.pacienteDetail}><Text style={styles.detailLabel}>FechaNacimiento: </Text>{paciente.FechaNacimiento}</Text>
                        <Text style={styles.pacienteDetail}><Text style={styles.detailLabel}>Genero: </Text>{paciente.Genero}</Text>


                        <View style={styles.buttonContainer}>
                            <BotonComponent
                                title="Ver Detalles"
                                onPress={() => navigation.navigate("DetallePaciente", { pacienteId: paciente.id })}
                                buttonStyle={styles.viewButton}
                                textStyle={styles.buttonText}
                            />
                            <BotonComponent
                                title="Editar"
                                onPress={() => navigation.navigate("EditarPaciente", { pacienteId: paciente.id })}
                                buttonStyle={styles.editButton}
                                textStyle={styles.buttonText}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>

            <BotonComponent
                title="Agregar Nuevo Paciente"
                onPress={() => { /* navigation.navigate("Crearpaciente") */ }}
                buttonStyle={styles.newPacienteButton} // Nombre de estilo corregido aquí
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

    pacienteScrollView: {
        width: "100%", // Ocupa todo el ancho disponible
        flex: 1, 
    },

    pacienteCard: {
        backgroundColor: "skyblue", 
        borderRadius: 10,
        padding: 15,
        marginBottom: 15, // Espacio entre tarjetas
        shadowColor: "#000", // Sombra suave
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3, // Elevación para Android
   
    },

    pacienteTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#34495E", // Color para el título del paciente
    },

    pacienteDetail: {
        fontSize: 16,
        color: "#5C6F7F", // Color para los detalles del paciente
        marginBottom: 4,
    },
    // Nuevo estilo para aplicar negrita solo al nombre del campo
    detailLabel: {
        fontWeight: 'bold',
    },

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

    newPacienteButton: { // Nombre de estilo corregido aquí
        backgroundColor: "#E67E22", // Naranja para "Agregar Nuevo Paciente"
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