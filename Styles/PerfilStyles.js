import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F4F8", // Un azul grisáceo muy claro, suave y moderno
        padding: 25, // Un poco más de padding general
    },
    title: {
        fontSize: 34, // Título más grande y prominente
        fontWeight: "800", // Más audaz
        marginBottom: 40, // Mayor margen inferior para separar del contenido
        color: "#2C3E50", // Azul oscuro casi negro para el título
        textShadowColor: 'rgba(0, 0, 0, 0.08)', // Sombra sutil en el texto
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    containerPerfil: {
        width: "100%",
        maxWidth: 420, // Un poco más ancho que 400
        padding: 35, // Mayor padding interno para más espacio
        backgroundColor: "#FFFFFF", // Fondo blanco limpio para la tarjeta de perfil
        borderRadius: 20, // Esquinas más redondeadas para un look suave
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 }, // Sombra más pronunciada para la tarjeta
        shadowOpacity: 0.15, // Más opaca
        shadowRadius: 15, // Más difusa
        elevation: 15, // Mayor elevación para Android
        alignItems: "flex-start", // Alinear texto a la izquierda
    },
    profileText: {
        fontSize: 17, // Tamaño de fuente legible
        marginBottom: 12, // Espacio entre líneas de texto
        color: "#4A4A4A", // Color de texto gris oscuro para mayor legibilidad
        width: "100%",
        borderBottomWidth: StyleSheet.hairlineWidth * 1.2, // Línea sutil en la parte inferior, un poco más visible
        borderBottomColor: "#E8E8E8", // Color de línea más claro y suave
        paddingBottom: 10, // Más padding para la línea
        paddingTop: 5,
    },
    detailLabel: {
        fontWeight: '700', // Etiqueta en negrita más fuerte
        color: "#1A2A3A", // Azul oscuro para las etiquetas
    },
    errorText: {
        fontSize: 16,
        color: "#D32F2F", // Rojo vibrante para errores
        textAlign: "center",
        marginBottom: 25, // Más espacio debajo del error
        width: "100%",
        fontWeight: '700',
    },
    profileButtonContainer: {
        marginTop: 35, // Mayor margen superior para el contenedor de botones
        width: '100%',
        alignItems: 'center', // Centrar los botones dentro de este contenedor
    },
    // Estilos para los botones (adaptados para consistencia con Registro/Login)
    editProfileButton: {
        backgroundColor: "#007BFF", // Azul vibrante para "Editar Perfil" (similar a primary)
        paddingVertical: 14, // Altura consistente con otros botones
        paddingHorizontal: 25,
        borderRadius: 10, // Bordes redondeados
        marginTop: 15, // Margen superior
        width: '90%', // Ancho del botón
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },
    logoutButton: {
        backgroundColor: "#DC3545", // Rojo vibrante para "Cerrar Sesión"
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 15,
        width: '90%',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },
    loginButton: { // Para el botón "Ir a Iniciar Sesión" cuando no hay perfil
        backgroundColor: "#6C757D", // Gris oscuro
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "700", // Negrita más fuerte
        fontSize: 16, // Tamaño de texto de botón consistente
        textTransform: 'uppercase', // Texto en mayúsculas
    },
});

export default styles;