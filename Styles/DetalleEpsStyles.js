import { StyleSheet } from 'react-native';

/**
 * Estilos para pantallas de detalle de elementos, como "Ver EPS", "Ver Consultorio", etc.
 * Proporciona un diseño claro y centrado para la presentación de información detallada.
 */
const styles = StyleSheet.create({
    // Contenedor principal de la pantalla.
    container: {
        flex: 1, // Ocupa todo el espacio disponible.
        justifyContent: "center", // Centra el contenido verticalmente.
        alignItems: "center", // Centra el contenido horizontalmente.
        padding: 20, // Relleno alrededor del contenido.
        backgroundColor: "#EBF5FB", // Fondo suave para la pantalla.
    },
    // Título principal de la vista de detalle.
    title: {
        fontSize: 28, // Tamaño de fuente grande.
        fontWeight: "bold", // Negrita.
        marginBottom: 25, // Espacio debajo del título.
        textAlign: 'center', // Centra el texto del título.
        color: "#2C3E50", // Color de texto oscuro.
    },
    // Tarjeta que contiene los detalles del elemento.
    detailCard: {
        width: "100%", // Ocupa todo el ancho disponible.
        maxWidth: 400, // Ancho máximo para mejor legibilidad en pantallas grandes.
        backgroundColor: "#FFFFFF", // Fondo blanco para la tarjeta.
        padding: 25, // Relleno interno de la tarjeta.
        borderRadius: 15, // Bordes redondeados.
        shadowColor: "#000", // Color de la sombra.
        shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra.
        shadowOpacity: 0.15, // Opacidad de la sombra.
        shadowRadius: 8, // Radio de difuminado de la sombra.
        elevation: 8, // Elevación para sombra en Android.
        alignItems: "flex-start", // Alinea los elementos hijos a la izquierda.
        marginBottom: 20, // Margen inferior de la tarjeta.
        borderWidth: 1, // Borde sutil.
        borderColor: '#E0E0E0', // Color del borde.
    },
    // Nombre principal del elemento dentro de la tarjeta de detalle (ej. Nombre de la EPS).
    epsName: {
        fontSize: 24, // Tamaño de fuente grande para el nombre.
        fontWeight: "bold", // Negrita.
        marginBottom: 15, // Espacio debajo del nombre.
        textAlign: 'center', // Centra el nombre dentro de su ancho.
        width: '100%', // Ocupa todo el ancho.
        borderBottomWidth: StyleSheet.hairlineWidth, // Línea delgada en la parte inferior.
        borderBottomColor: '#ccc', // Color gris para la línea.
        paddingBottom: 10, // Relleno debajo del nombre antes de la línea.
        color: '#333333', // Color de texto oscuro.
    },
    // Texto para cada detalle individual (ej. Dirección, Teléfono).
    detailText: {
        fontSize: 18, // Tamaño de fuente para el detalle.
        marginBottom: 8, // Espacio debajo de cada línea de detalle.
        width: '100%', // Ocupa todo el ancho.
        color: '#555555', // Color de texto gris.
    },
    // Etiqueta para los detalles (ej. "Nombre:", "ID:").
    detailLabel: {
        fontWeight: 'bold', // Negrita para la etiqueta.
        color: '#444444', // Color de texto ligeramente más oscuro.
    },
    // Mensaje de error a mostrar en la pantalla.
    errorText: {
        fontSize: 18, // Tamaño de fuente del error.
        color: 'red', // Color rojo para el error.
        textAlign: 'center', // Centra el texto del error.
        marginBottom: 20, // Margen inferior del error.
        width: '100%', // Ocupa todo el ancho.
    },
    // Botón para regresar a la pantalla anterior.
    backButton: {
        backgroundColor: "#007B8C", // Color azul turquesa.
        paddingVertical: 12, // Relleno vertical.
        paddingHorizontal: 25, // Relleno horizontal.
        borderRadius: 8, // Bordes redondeados.
        marginTop: 15, // Margen superior.
        width: '80%', // Ancho del botón.
        maxWidth: 300, // Ancho máximo del botón.
        alignSelf: 'center', // Centra el botón horizontalmente dentro de su contenedor.
        // Sombra para dar efecto de elevación.
        shadowColor: "#007B8C",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    // Texto dentro del botón de regreso.
    buttonText: {
        color: "#FFFFFF", // Color de texto blanco.
        fontWeight: "bold", // Negrita.
        fontSize: 16, // Tamaño de fuente.
        textAlign: 'center', // Centra el texto.
    },
});

export default styles;