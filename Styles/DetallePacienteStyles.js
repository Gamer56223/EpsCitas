import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // Eliminamos justifyContent y alignItems aquí para que el ScrollView tome el control del contenido.
        padding: 20,
        backgroundColor: '#f0f4f8', // Aseguramos un color de fondo claro
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: 'center',
        color: '#2c3e50', // Color más oscuro para el título
    },
    // Estilos para el contenedor del scroll, centrándolo
    detailScrollCard: {
        flexGrow: 1, // Permite que el contenido crezca y sea scrollable
        justifyContent: 'center', // Centra verticalmente si el contenido no llena la pantalla
        alignItems: 'center', // Centra horizontalmente el detailCardContent
        paddingBottom: 20, // Espacio al final del scroll para el botón
    },
    detailCardContent: { // Nuevo contenedor para el contenido dentro del ScrollView
        width: "100%",
        maxWidth: 400,
        padding: 25,
        borderRadius: 15,
        backgroundColor: '#FFFFFF', // Fondo blanco para la tarjeta
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        alignItems: "flex-start", // Alinea los textos a la izquierda dentro de la tarjeta
        marginBottom: 20,
    },
    pacienteName: {
        fontSize: 22, // Un poco más pequeño
        fontWeight: "bold",
        marginBottom: 10, // Menos margen
        textAlign: 'center', // Centrado para el nombre
        width: '100%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        paddingBottom: 8, // Menos padding
        color: '#2c3e50',
    },
    detailText: {
        fontSize: 16, // Tamaño de fuente más pequeño para los detalles
        marginBottom: 6, // Márgenes más pequeños entre líneas
        width: '100%',
        color: '#5C6F7F',
    },
    detailLabel: {
        fontWeight: 'bold',
        color: '#34495E', // Color ligeramente diferente para las etiquetas
    },
    errorText: {
        fontSize: 16, // Ajustar el tamaño
        color: 'red',
        textAlign: 'center',
        marginBottom: 15, // Ajustar margen
        width: '100%',
    },
    backButton: {
        backgroundColor: "#007B8C",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 15,
        width: '80%',
        maxWidth: 300,
        alignSelf: 'center',
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: 'center', // Asegurar que el texto del botón esté centrado
    },
    centeredContainer: { // Estilos para el estado de carga
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
    },
    loadingText: {
        marginTop: 15,
        fontSize: 18,
        color: '#555',
    }
});

export default styles;