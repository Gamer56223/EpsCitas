import { View, Text, StyleSheet, ScrollView } from "react-native";
import BotonComponent from "../../components/BottonComponent"; // Asegúrate de que la ruta sea correcta

export default function ListarEspecialidad ({navigation}){

    const especialidadesEjemplo = [
        { id: '1', Nombre: 'Cardiología', Descripcion: 'Estudio del Corazón'},
        { id: '2', Nombre: 'Dermatología', Descripcion: 'Estudio de la Piel'},
        { id: '3', Nombre: 'Pediatría', Descripcion: 'Atención medica infantil'},
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Especialidades</Text>

            {/*
                El ScrollView ahora tiene solo las propiedades de tamaño.
                Las propiedades de layout para sus hijos directos van en contentContainerStyle
                si afectaran el contenedor de todos los elementos dentro del scroll.
                En este caso, justifyContent y flexDirection no van aquí,
                sino en el contenedor de los botones dentro de cada tarjeta.
            */}
            <ScrollView style={styles.especialidadScrollView}>
                {especialidadesEjemplo.map((especialidad) => (
                    <View key={especialidad.id} style={styles.especialidadCard}>
                        <Text style={styles.especialidadTitle}>{especialidad.Nombre}</Text>
                        <Text style={styles.especialidadDetail}>Descripcion: {especialidad.Descripcion}</Text>

                        {/*
                            Este es el contenedor de los botones.
                            Aquí es donde necesitas flexDirection: "row" y justifyContent: "space-around".
                        */}
                        <View style={styles.buttonContainer}>
                            <BotonComponent
                                title="Ver Detalles"
                                onPress={() => navigation.navigate("DetalleEspecialidad", { especialidadId: especialidad.id })}
                                buttonStyle={styles.viewButton}
                                textStyle={styles.buttonText}
                            />
                            <BotonComponent
                                title="Editar"
                                onPress={() => navigation.navigate("EditarEspecialidad", { especialidadId: especialidad.id })}
                                buttonStyle={styles.editButton}
                                textStyle={styles.buttonText}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>

            <BotonComponent
                title="Agendar Nueva Especialidad"
                onPress={() => { /* navigation.navigate("CrearEspecialidad") */ }}
                buttonStyle={styles.newEspecialidadButton}
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

    // Nuevo nombre para el estilo del ScrollView para evitar duplicación
    especialidadScrollView: {
        width: "100%", // Ocupa todo el ancho disponible
        flex: 1, // Permite que el ScrollView ocupe el espacio restante
    },

    especialidadCard: {
        backgroundColor: "skyblue", // Fondo blanco para cada tarjeta de cita
        borderRadius: 10,
        padding: 15,
        marginBottom: 15, // Espacio entre tarjetas
        shadowColor: "#000", // Sombra suave
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3, // Elevación para Android
        // boxShadow no es una propiedad válida en React Native. Se usan las propiedades shadow*.
        // Removido: boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
    },

    especialidadTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#34495E", // Color para el título de la cita
    },

    especialidadDetail: {
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

    newEspecialidadButton: {
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