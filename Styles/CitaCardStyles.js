import { StyleSheet } from "react-native";

/**
 * Estilos para el componente de tarjeta (card) utilizado para mostrar información
 * de elementos como consultorios, especialidades, etc. Incluye estilos para
 * la información del elemento y los botones de acción.
 */
const styles = StyleSheet.create({
    // Estilo para el contenedor principal de la tarjeta.
    card: {
        backgroundColor: '#FFFFFF', // Fondo blanco para la tarjeta.
        borderRadius: 12, // Bordes redondeados para un aspecto suave.
        padding: 20, // Relleno interno de la tarjeta.
        marginVertical: 10, // Margen vertical entre tarjetas.
        marginHorizontal: 15, // Margen horizontal para espaciado en los lados.
        flexDirection: 'row', // Organiza los elementos hijos en una fila.
        justifyContent: 'space-between', // Distribuye el espacio entre los elementos hijos.
        alignItems: 'center', // Alinea los elementos hijos verticalmente al centro.
        shadowColor: '#000', // Color de la sombra.
        shadowOffset: { width: 0, height: 6 }, // Desplazamiento de la sombra (efecto 3D).
        shadowOpacity: 0.1, // Opacidad de la sombra.
        shadowRadius: 10, // Radio de difuminado de la sombra.
        elevation: 8, // Elevación para sombra en Android.
        borderWidth: 1, // Ancho del borde.
        borderColor: '#E0E0E0', // Color del borde.
    },
    // Contenedor para la información textual dentro de la tarjeta.
    info: {
        flex: 1, // Permite que la información ocupe el espacio disponible.
        marginRight: 15, // Margen a la derecha para separar de las acciones.
    },
    // Estilo para el nombre o título principal dentro de la tarjeta.
    nombre: {
        fontSize: 20, // Tamaño de fuente grande.
        fontWeight: 'bold', // Texto en negrita.
        color: '#333333', // Color de texto oscuro.
        marginBottom: 8, // Margen inferior para separar del detalle.
    },
    // Estilo para el texto de detalle o descripción.
    detalle: {
        fontSize: 15, // Tamaño de fuente estándar.
        color: '#555555', // Color de texto gris.
        lineHeight: 22, // Altura de línea para mejor legibilidad.
    },
    // Estilo para las etiquetas dentro del texto de detalle (ej. "Dirección:").
    detalleLabel: {
        fontWeight: '600', // Seminegrita para la etiqueta.
        color: '#444444', // Color de texto ligeramente más oscuro.
    },
    // Contenedor para los botones de acción (iconos) dentro de la tarjeta.
    actions: {
        flexDirection: 'column', // Organiza los botones en una columna.
        justifyContent: 'center', // Centra los botones verticalmente.
        alignItems: 'center', // Centra los botones horizontalmente.
    },
    // Estilo base para los botones de icono (ej. editar, eliminar).
    iconBtn: {
        padding: 8, // Relleno alrededor del icono.
        borderRadius: 20, // Bordes muy redondeados para hacerlos circulares.
        backgroundColor: '#F0F0F0', // Fondo gris claro para el botón de icono.
        marginVertical: 5, // Margen vertical entre botones de icono.
        shadowColor: '#000', // Color de la sombra.
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra.
        shadowOpacity: 0.1, // Opacidad de la sombra.
        shadowRadius: 3, // Radio de difuminado de la sombra.
        elevation: 3, // Elevación para sombra en Android.
    },
});

export default styles;