import { StyleSheet } from "react-native";

/**
 * Estilos para pantallas de listado general en la aplicación, como la lista de EPS, Consultorios, Especialidades.
 * Incluye estilos para el contenedor principal, indicadores de carga, encabezados,
 * mensajes de lista vacía y botones de creación.
 */
const styles = StyleSheet.create({
    // Contenedor principal que ocupa toda la pantalla.
    fullScreenContainer: {
        flex: 1, // Ocupa todo el espacio disponible.
        backgroundColor: '#F5F8FA', // Fondo general suave para la aplicación.
    },
    // Contenedor principal de la lista, con padding horizontal y superior.
    container: {
        flex: 1, // Ocupa todo el espacio disponible.
        backgroundColor: '#F5F8FA', // Fondo suave, consistente con el global.
        paddingHorizontal: 15, // Relleno a los lados.
        paddingTop: 15, // Pequeño relleno superior para separar la lista del encabezado.
    },
    // Contenedor para centrar elementos (ej. indicadores de carga o mensajes).
    centeredContainer: {
        flex: 1, // Ocupa todo el espacio disponible.
        justifyContent: 'center', // Centra el contenido verticalmente.
        alignItems: 'center', // Centra el contenido horizontalmente.
        backgroundColor: '#F5F8FA', // Fondo suave.
    },
    // Estilo para el texto de "Cargando...".
    loadingText: {
        marginTop: 15, // Más espacio por encima.
        fontSize: 18, // Tamaño de fuente más grande.
        color: '#555', // Color de texto gris.
        fontWeight: '500', // Peso de fuente mediano.
    },
    // --- Estilos para el Encabezado de la Pantalla ---
    headerContainer: {
        flexDirection: 'row', // Los elementos internos se alinean en fila.
        alignItems: 'center', // Alinea los elementos verticalmente al centro.
        justifyContent: 'center', // Centra el contenido horizontalmente.
        paddingVertical: 20, // Más relleno vertical.
        paddingHorizontal: 15, // Relleno horizontal.
        backgroundColor: '#FFFFFF', // Fondo blanco para el encabezado.
        borderBottomWidth: StyleSheet.hairlineWidth, // Línea sutil en la parte inferior.
        borderBottomColor: '#E0E6EB', // Color de la línea.
        marginBottom: 15, // Espacio entre el encabezado y el contenido de la lista.
        // Sombra suave para el encabezado, dándole un efecto de elevación.
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    // Estilo para el icono opcional en el encabezado.
    headerIcon: {
        marginRight: 10, // Margen a la derecha para separar del título.
    },
    // Estilo para el texto del título en el encabezado.
    headerTitle: {
        fontSize: 26, // Título más grande y prominente.
        fontWeight: '700', // Muy negrita.
        color: '#2C3E50', // Color oscuro para el título.
    },
    // --- Estilos para la Vista de Lista Vacía ---
    emptyListContainer: {
        flexGrow: 1, // Asegura que el contenedor ocupe el espacio disponible para centrar el contenido.
        justifyContent: 'center', // Centra el contenido verticalmente.
        alignItems: 'center', // Centra el contenido horizontalmente.
        paddingVertical: 50, // Relleno vertical dentro de la tarjeta.
        backgroundColor: '#FFFFFF', // Fondo blanco para la tarjeta de lista vacía.
        borderRadius: 15, // Bordes redondeados.
        marginHorizontal: 15, // Margen horizontal.
        marginTop: 30, // Margen superior para separarlo del encabezado o del borde superior.
        padding: 30, // Relleno general.
        // Sombra para dar efecto de tarjeta.
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
    },
    // Estilo para el texto cuando la lista está vacía.
    emptyText: {
        fontSize: 18, // Tamaño de fuente.
        color: '#7F8C8D', // Color gris suave.
        textAlign: 'center', // Centra el texto.
        marginTop: 15, // Margen superior.
        lineHeight: 26, // Mayor espacio entre líneas para legibilidad.
        fontWeight: '500', // Peso de fuente mediano.
    },
    // --- Estilos para FlatList ---
    // Estilo del contenido de FlatList (útil para añadir padding inferior).
    flatListContent: {
        paddingBottom: 20, // Espacio al final de la lista para que el último elemento no se pegue.
        paddingHorizontal: 5, // Pequeño padding horizontal para las tarjetas dentro de la lista.
    },
    // Estilo para el contenedor de FlatList cuando está vacío, permitiendo centrar el mensaje.
    flatListEmpty: {
        flexGrow: 1, // Permite que el contenido ocupe el espacio disponible.
        justifyContent: 'center', // Centra el contenido verticalmente.
        alignItems: 'center', // Centra el contenido horizontalmente.
    },
    // --- Estilos para el Botón de Creación Flotante o Fijo ---
    botonCrear: {
        backgroundColor: '#007BFF', // Un azul vibrante, comúnmente usado como color primario.
        paddingVertical: 16, // Mayor altura para el botón.
        paddingHorizontal: 25, // Relleno horizontal.
        borderRadius: 12, // Bordes más redondeados.
        alignSelf: 'center', // Centra el botón horizontalmente si no ocupa todo el ancho.
        width: '90%', // Ancho del botón.
        marginBottom: 25, // Mayor margen inferior.
        marginTop: 20, // Mayor margen superior.
        // Sombra más pronunciada y profesional para destacar.
        shadowColor: "#007BFF",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 15,
    },
    // Contenedor para el icono y texto del botón de creación.
    botonCrearContent: {
        flexDirection: 'row', // Los elementos se alinean en fila.
        alignItems: 'center', // Alinea los elementos verticalmente al centro.
        justifyContent: 'center', // Centra los elementos horizontalmente.
    },
    // Estilo para el icono dentro del botón de creación.
    botonCrearIcon: {
        marginRight: 12, // Más espacio entre el icono y el texto.
    },
    // Estilo para el texto del botón de creación.
    textoBotonCrear: {
        color: '#FFFFFF', // Color de texto blanco.
        fontSize: 18, // Tamaño de fuente.
        fontWeight: '700', // Negrita.
    },
});

export default styles;