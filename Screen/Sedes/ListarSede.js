import { View, Text, StyleSheet, ScrollView } from "react-native";
import BotonComponent from "../../components/BottonComponent"; 


export default function ListarSede ({navigation}){

    const SedesEjemplo = [
        { id: '1', Nombre: 'Sede Santa Fe', Direccion: 'Calle 57 - El Campin', Telefono: '3108909090'},
        { id: '2', Nombre: 'Sede Soacha', Direccion: 'Calle 22', Telefono: '7603102'},
        { id: '3', Nombre: 'Sede Bosa', Direccion: 'Calle 11', Telefono: '7603100'},
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Sedes</Text>

            <ScrollView style={styles.sedeScrollView}>
                {SedesEjemplo.map((sede) => (
                    <View key={sede.id} style={styles.sedeCard}>
                        <Text style={styles.sedeTitle}>{sede.Nombre}</Text>
                        {/* Se aplican estilos de negrita solo a los nombres de los campos existentes */}
                        <Text style={styles.sedeDetail}><Text style={styles.detailLabel}>Direccion: </Text>{sede.Direccion}</Text>
                        <Text style={styles.sedeDetail}><Text style={styles.detailLabel}>Telefono: </Text>{sede.Telefono}</Text>


                        <View style={styles.buttonContainer}>
                            <BotonComponent
                                title="Ver Detalles"
                                onPress={() => navigation.navigate("DetalleSede", { sedeId: sede.id })}
                                buttonStyle={styles.viewButton}
                                textStyle={styles.buttonText}
                            />
                            <BotonComponent
                                title="Editar"
                                onPress={() => navigation.navigate("EditarSede", { sedeId: sede.id })}
                                buttonStyle={styles.editButton}
                                textStyle={styles.buttonText}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>

            <BotonComponent
                title="Agregar Nuevo sede"
                onPress={() => { /* navigation.navigate("Crearsede") */ }}
                buttonStyle={styles.newsedeButton}
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

    sedeScrollView: {
        width: "100%", // Ocupa todo el ancho disponible
        flex: 1, 
    },

    sedeCard: {
        backgroundColor: "skyblue", // Fondo blanco para cada tarjeta de sede
        borderRadius: 10,
        padding: 15,
        marginBottom: 15, // Espacio entre tarjetas
        shadowColor: "#000", // Sombra suave
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3, // Elevación para Android
        
    },

    sedeTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#34495E", // Color para el título de la sede
    },

    sedeDetail: {
        fontSize: 16,
        color: "#5C6F7F", // Color para los detalles de la sede
        marginBottom: 4,
    },
    
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

    newsedeButton: {
        backgroundColor: "#E67E22", // Naranja para "Agregar Nueva Sede"
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