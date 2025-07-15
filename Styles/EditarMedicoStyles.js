import { StyleSheet } from 'react-native';

/**
 * Estilos generales para pantallas de formularios en la aplicación.
 * Incluye estilos para el diseño general, inputs de texto, selectores (pickers)
 * y botones, tanto de acción principal como de navegación.
 */
const styles = StyleSheet.create({
    // Contenedor principal que maneja el ajuste de la vista cuando el teclado está activo.
    keyboardAvoidingView: {
        flex: 1, // Ocupa todo el espacio disponible.
        backgroundColor: "#EBF5FB", // Color de fondo suave.
    },
    // Contenedor desplazable que centra el contenido y provee espacio para el teclado.
    scrollContainer: {
        flexGrow: 1, // Permite que el contenido crezca y sea desplazable.
        justifyContent: "center", // Centra los elementos hijos verticalmente.
        alignItems: "center", // Centra los elementos hijos horizontalmente.
        paddingVertical: 20, // Relleno vertical en la parte superior e inferior.
        paddingBottom: 200, // **Importante:** Aumenta este relleno para evitar que el teclado y la barra de navegación oculten los campos de entrada.
        backgroundColor: "#EBF5FB", // Fondo suave, consistente con `keyboardAvoidingView`.
    },
    // Contenedor principal para el formulario (efecto de tarjeta flotante).
    container: {
        width: '90%', // Ocupa el 90% del ancho de la pantalla.
        maxWidth: 500, // Ancho máximo para mantener la legibilidad en pantallas grandes.
        padding: 25, // Relleno interno de la tarjeta.
        borderRadius: 15, // Bordes redondeados.
        backgroundColor: "#FFFFFF", // Fondo blanco para la tarjeta.
        shadowColor: "#000", // Color de la sombra.
        shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra (efecto 3D).
        shadowOpacity: 0.1, // Opacidad de la sombra.
        shadowRadius: 8, // Radio de difuminado de la sombra.
        elevation: 6, // Elevación para sombra en Android.
        alignItems: "center", // Centra los elementos internos horizontalmente.
    },
    // Estilo para los títulos de las pantallas o secciones.
    title: {
        fontSize: 28, // Tamaño de fuente grande.
        fontWeight: "700", // Negrita.
        color: "#2C3E50", // Color azul oscuro casi negro para el texto.
        marginBottom: 30, // Margen inferior para separar del contenido del formulario.
        textAlign: "center", // Centra el texto del título.
    },
    // Estilo para los campos de entrada de texto (TextInput).
    input: {
        height: 55, // Altura fija del campo.
        backgroundColor: "#F8F8F8", // Fondo gris muy claro para el input.
        borderRadius: 10, // Bordes redondeados.
        paddingHorizontal: 18, // Relleno horizontal para el texto.
        marginBottom: 18, // Margen inferior para separar los inputs.
        fontSize: 16, // Tamaño de fuente del texto.
        color: "#333333", // Color de texto oscuro.
        width: "100%", // Ocupa todo el ancho disponible.
        borderWidth: 1, // Borde sutil.
        borderColor: "#E0E0E0", // Color del borde.
    },
    // Contenedor para el componente Picker (selector de opciones).
    pickerContainer: {
        borderColor: "#E0E0E0", // Color del borde.
        borderWidth: 1, // Ancho del borde.
        borderRadius: 10, // Bordes redondeados.
        marginBottom: 18, // Margen inferior para separar de otros campos.
        width: "100%", // Ocupa todo el ancho disponible.
        backgroundColor: "#F8F8F8", // Fondo gris claro, consistente con los inputs.
        justifyContent: 'center', // Centra el contenido verticalmente.
        height: 55, // Altura consistente con la de los inputs.
        overflow: 'hidden', // Evita que el contenido se desborde, importante para Android.
    },
    // Etiqueta flotante o de información para el Picker (si se implementa).
    pickerLabelActual: {
        alignSelf: 'flex-start', // Alinea la etiqueta a la izquierda.
        marginLeft: 5, // Margen a la izquierda.
        marginBottom: 5, // Margen inferior.
        fontSize: 16, // Tamaño de fuente.
        color: '#555', // Color de texto gris.
        fontWeight: '600', // Peso de fuente seminegrita.
    },
    // Estilo para el componente Picker en sí.
    picker: {
        height: '100%', // Ocupa toda la altura del contenedor.
        width: "100%", // Ocupa todo el ancho del contenedor.
        color: '#333333', // Color de texto de las opciones.
    },
    // Estilo para los ítems individuales del Picker (dependiendo de la implementación del Picker).
    pickerItem: {
        fontSize: 16, // Tamaño de fuente para los ítems.
        color: '#495057', // Color de texto para los ítems.
    },
    // Estilo para indicar que el Picker está cargando opciones.
    pickerLoading: {
        marginBottom: 18, // Margen inferior, similar a los inputs.
    },
    // Estilo para el botón de acción principal (ej. "Guardar", "Enviar").
    boton: {
        backgroundColor: "#1976D2", // Color azul vibrante.
        paddingVertical: 14, // Relleno vertical.
        paddingHorizontal: 25, // Relleno horizontal.
        borderRadius: 10, // Bordes redondeados.
        flexDirection: 'row', // Permite que el icono y el texto se alineen en fila.
        justifyContent: 'center', // Centra el contenido horizontalmente.
        alignItems: 'center', // Centra el contenido verticalmente.
        width: "100%", // Ocupa todo el ancho disponible.
        marginTop: 20, // Margen superior para separarlo del formulario.
        shadowColor: "#1976D2", // Sombra con el color del botón.
        shadowOffset: { width: 0, height: 5 }, // Desplazamiento de la sombra.
        shadowOpacity: 0.3, // Opacidad de la sombra.
        shadowRadius: 10, // Radio de difuminado de la sombra.
        elevation: 10, // Elevación para sombra en Android.
    },
    // Contenedor para el contenido interno del botón (si incluye icono y texto).
    botonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    // Estilo para los iconos dentro de los botones.
    botonIcon: {
        marginRight: 10, // Margen a la derecha del icono para separarlo del texto.
    },
    // Estilo para el texto dentro de los botones.
    textoBoton: {
        color: "#fff", // Color de texto blanco.
        fontSize: 18, // Tamaño de fuente grande.
        fontWeight: "bold", // Texto en negrita.
    },
    // Estilo para un botón de "Volver" o "Atrás".
    backButton: {
        marginTop: 20, // Margen superior.
        flexDirection: 'row', // Permite que el icono y el texto se alineen en fila.
        alignItems: 'center', // Centra el contenido verticalmente.
        paddingVertical: 10, // Relleno vertical.
        paddingHorizontal: 15, // Relleno horizontal.
        borderRadius: 8, // Bordes redondeados.
        backgroundColor: '#E9ECEF', // Color gris claro para el botón de volver.
    },
    // Estilo para el texto del botón de "Volver".
    backButtonText: {
        marginLeft: 8, // Margen a la izquierda del texto.
        fontSize: 16, // Tamaño de fuente.
        color: '#555', // Color de texto gris.
        fontWeight: '500', // Peso de fuente mediano.
    },
    // Estilo para mostrar mensajes de error.
    error: {
        color: "#E74C3C", // Color rojo vibrante para errores.
        marginTop: 10, // Margen superior.
        textAlign: "center", // Centra el texto del error.
        fontSize: 15, // Tamaño de fuente.
        fontWeight: '500', // Peso de fuente mediano.
    },
});

export default styles;