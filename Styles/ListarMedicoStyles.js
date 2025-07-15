import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#F5F8FA', // Fondo general suave
    },
    container: {
        flex: 1,
        backgroundColor: '#F5F8FA', // Fondo general suave
        paddingHorizontal: 15,
        paddingTop: 15, // Pequeño padding superior para que el FlatList no se pegue al header
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F8FA',
    },
    loadingText: {
        marginTop: 15, // Más espacio
        fontSize: 18, // Más grande
        color: '#555',
        fontWeight: '500',
    },
    // Estilos para el nuevo encabezado
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Centrar el contenido del encabezado
        paddingVertical: 20, // Más padding vertical
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF', // Fondo blanco para el encabezado
        borderBottomWidth: StyleSheet.hairlineWidth, // Línea sutil en la parte inferior
        borderBottomColor: '#E0E6EB',
        marginBottom: 15, // Espacio entre el encabezado y la lista
        // Añadir una sombra suave al encabezado
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    headerIcon: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 26, // Título más grande y prominente
        fontWeight: '700',
        color: '#2C3E50', // Color oscuro para el título
    },
    emptyListContainer: {
        flexGrow: 1, // Asegura que el contenedor ocupe el espacio disponible
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
        // Añadir una tarjeta para la vista vacía
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginHorizontal: 15,
        marginTop: 30, // Para separarlo del posible encabezado o del top
        padding: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
    },
    emptyText: {
        fontSize: 18,
        color: '#7F8C8D',
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 26, // Mayor espacio entre líneas
        fontWeight: '500',
    },
    flatListContent: {
        paddingBottom: 20, // Espacio al final de la lista si hay elementos
        paddingHorizontal: 5, // Pequeño padding horizontal para las tarjetas
    },
    flatListEmpty: {
        flexGrow: 1, // Asegura que el contenido se centre verticalmente cuando la lista está vacía
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonCrear: {
        backgroundColor: '#007BFF', // Un azul vibrante, como el color primario
        paddingVertical: 16, // Más alto
        paddingHorizontal: 25,
        borderRadius: 12, // Bordes más redondeados
        alignSelf: 'center',
        width: '90%',
        marginBottom: 25, // Más margen inferior
        marginTop: 20, // Más margen superior
        // Sombra más profesional
        shadowColor: "#007BFF",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 15,
    },
    botonCrearContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonCrearIcon: {
        marginRight: 12, // Más espacio entre el icono y el texto
    },
    textoBotonCrear: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});

export default styles;