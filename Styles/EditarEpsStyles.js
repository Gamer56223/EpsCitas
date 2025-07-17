import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: "#F0F4F8", // Fondo más claro y moderno
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 25, // Un poco más de padding vertical
        paddingBottom: 200, // Espacio para el teclado
    },
    container: {
        width: '92%', // Un poco más de ancho
        maxWidth: 450, // Max width ligeramente reducido
        padding: 30, // Más padding interno
        borderRadius: 12, // Bordes ligeramente más suaves
        backgroundColor: "#FFFFFF",
        shadowColor: "rgba(0, 0, 0, 0.1)", // Sombra más sutil
        shadowOffset: { width: 0, height: 6 }, // Mayor desplazamiento vertical de la sombra
        shadowOpacity: 0.15, // Opacidad de sombra ajustada
        shadowRadius: 12, // Radio de desenfoque de sombra ajustado
        elevation: 8, // Elevación para Android
        alignItems: "center",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F4F8", // Fondo consistente
    },
    loadingText: {
        marginTop: 15, // Más margen
        fontSize: 17, // Tamaño de fuente ligeramente más grande
        color: '#666', // Color de texto más suave
        fontWeight: '500',
    },
    title: {
        fontSize: 28, // Tamaño de fuente del título
        fontWeight: "bold", // Usar 'bold' en lugar de '700' para consistencia
        color: "#2C3E50", // Color oscuro para el título
        marginBottom: 35, // Más espacio debajo del título
        textAlign: "center",
    },
    input: {
        height: 50, // Altura estándar para inputs
        backgroundColor: "#FDFDFD", // Fondo del input más claro
        borderRadius: 8, // Bordes más suaves
        paddingHorizontal: 15, // Padding horizontal
        marginBottom: 16, // Espacio entre inputs
        fontSize: 16, // Tamaño de fuente del input
        color: "#34495E", // Color de texto oscuro
        width: "100%",
        borderWidth: 1,
        borderColor: "#E0E6EB", // Borde suave
        // Quitar sombra aquí para inputs individuales, la tarjeta ya tiene sombra
    },
    inputTextArea: {
        height: 100, // Altura reducida para el área de texto
        paddingVertical: 12, // Padding vertical
        textAlignVertical: 'top', // Asegura que el texto comience desde arriba
    },
    pickerContainer: {
        borderColor: "#E0E6EB", // Borde del contenedor del picker
        borderWidth: 1,
        borderRadius: 8, // Bordes suaves
        marginBottom: 16, // Espacio debajo del picker
        width: "100%",
        backgroundColor: "#FDFDFD", // Fondo del picker
        height: 50, // Altura estándar
        justifyContent: 'center', // Centrar verticalmente el contenido
        overflow: 'hidden', // Ocultar desbordamientos
    },
    pickerLabelActual: {
        position: 'absolute', // Posicionar la etiqueta de forma absoluta
        top: -10, // Un poco por encima del picker
        left: 12, // Alineado con el padding del input
        backgroundColor: '#FDFDFD', // Fondo para que el texto no se superponga con el borde del picker
        paddingHorizontal: 5,
        fontSize: 13, // Tamaño de fuente más pequeño para la etiqueta
        color: '#8A9BA7', // Color de texto más suave
        zIndex: 1, // Asegurar que esté por encima del picker
    },
    picker: {
        height: '100%',
        width: "100%",
        color: '#34495E', // Color de texto del picker
    },
    pickerItem: {
        fontSize: 16,
        color: '#495057',
    },
    noEspecialidadesText: {
        textAlign: 'center',
        fontSize: 15, // Tamaño de fuente ligeramente más pequeño
        color: '#888',
        paddingVertical: 10,
        fontStyle: 'italic', // Texto en cursiva
    },
    boton: {
        backgroundColor: "#007BFF", // Azul vibrante para la acción principal
        paddingVertical: 15, // Más padding vertical
        paddingHorizontal: 25,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        marginTop: 25, // Más espacio superior
        shadowColor: "rgba(0, 123, 255, 0.4)", // Sombra de color para el botón
        shadowOffset: { width: 0, height: 8 }, // Mayor desplazamiento vertical para la sombra
        shadowOpacity: 0.4,
        shadowRadius: 15,
        elevation: 12, // Mayor elevación para Android
    },
    botonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botonIcon: {
        marginRight: 10,
    },
    textoBoton: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    backButton: {
        marginTop: 15, // Menos margen superior para el botón de regresar
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20, // Más padding horizontal
        borderRadius: 8,
        backgroundColor: '#E9ECEF',
        alignSelf: 'center', // Centrar el botón de regresar
    },
    backButtonText: {
        marginLeft: 10, // Más margen
        fontSize: 16,
        color: '#555',
        fontWeight: '600', // Un poco más de peso a la fuente
    },
    error: {
        color: "#E74C3C",
        marginTop: 10,
        marginBottom: 10, // Añadir margen inferior para separación
        textAlign: "center",
        fontSize: 14, // Tamaño de fuente ligeramente más pequeño para errores
        fontWeight: '600',
    },
});

export default styles;