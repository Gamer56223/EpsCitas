import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f4f8', // Fondo claro y moderno
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: 'center',
        color: '#2c3e50', // Color oscuro para el título
    },
    // Estilos para el contenedor del scroll, centrándolo
    detailScrollCard: {
        flexGrow: 1, // Permite que el contenido crezca y sea scrollable
        justifyContent: 'center', // Centra verticalmente si el contenido no llena la pantalla
        alignItems: 'center', // Centra horizontalmente el detailCardContent
        paddingBottom: 20, // Espacio al final del scroll para el botón
    },
    detailCardContent: { // Contenedor principal de la tarjeta de detalle
        width: "100%",
        maxWidth: 400, // Limita el ancho de la tarjeta
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
    epsName: { // Estilo para el nombre de la EPS (similar a pacienteName)
        fontSize: 22, // Un poco más pequeño que el título de la pantalla
        fontWeight: "bold",
        marginBottom: 10, // Menos margen para que se vea más compacto
        textAlign: 'center', // Centrado para el nombre de la EPS
        width: '100%',
        borderBottomWidth: StyleSheet.hairlineWidth, // Línea sutil debajo del nombre
        borderBottomColor: '#ccc',
        paddingBottom: 8, // Espacio entre el nombre y la línea
        color: '#2c3e50',
    },
    detailText: { // Estilo para cada línea de detalle
        fontSize: 16, // Tamaño de fuente más pequeño para los detalles
        marginBottom: 6, // Márgenes más pequeños entre líneas
        width: '100%',
        color: '#5C6F7F',
    },
    detailLabel: { // Estilo para las etiquetas en negrita (ej. "Dirección:")
        fontWeight: 'bold',
        color: '#34495E', // Color ligeramente diferente para las etiquetas
    },
    errorText: {
        fontSize: 16, // Ajustar el tamaño del texto de error
        color: 'red',
        textAlign: 'center',
        marginBottom: 15, // Ajustar margen
        width: '100%',
    },
    backButton: {
        backgroundColor: "#007B8C", // Color del botón "Volver"
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 15,
        width: '80%',
        maxWidth: 300,
        alignSelf: 'center', // Centra el botón en la pantalla
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: 'center', // Centra el texto del botón
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