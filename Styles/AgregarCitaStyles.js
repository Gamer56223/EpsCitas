import { StyleSheet } from 'react-native';

/**
 * Estilos para pantallas de formularios (ej. Agregar/Editar Cita, Consultorio, Especialidad, etc.).
 * Proporciona un diseño consistente y responsivo.
 */
const styles = StyleSheet.create({
    // Contenedor principal que ajusta la vista cuando el teclado aparece.
    keyboardAvoidingView: {
        flex: 1, // Ocupa todo el espacio disponible.
        backgroundColor: "#EBF5FB", // Fondo azul claro.
    },
    // Contenedor desplazable que centra el contenido y maneja el espacio para el teclado.
    scrollContainer: {
        flexGrow: 1, // Permite que el contenido se expanda.
        justifyContent: "center", // Centra verticalmente.
        alignItems: "center", // Centra horizontalmente.
        paddingVertical: 20, // Relleno superior e inferior.
        paddingBottom: 200, // **Importante:** Espacio extra para evitar que el teclado oculte inputs.
    },
    // Contenedor principal del formulario (efecto de tarjeta).
    container: {
        width: '90%', // Ancho del 90% de la pantalla.
        maxWidth: 500, // Ancho máximo para pantallas grandes.
        padding: 25, // Relleno interno.
        borderRadius: 15, // Bordes redondeados.
        backgroundColor: "#FFFFFF", // Fondo blanco.
        shadowColor: "#000", // Color de la sombra.
        shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra.
        shadowOpacity: 0.1, // Opacidad de la sombra.
        shadowRadius: 8, // Radio de la sombra.
        elevation: 6, // Elevación para Android.
        alignItems: "center", // Centra los elementos hijos horizontalmente.
    },
    // Estilo para el título de la pantalla.
    title: {
        fontSize: 28, // Tamaño de fuente grande.
        fontWeight: "700", // Negrita.
        color: "#2C3E50", // Color de texto oscuro.
        marginBottom: 30, // Margen inferior.
        textAlign: "center", // Centra el texto.
    },
    // Estilo para los campos de entrada de texto (TextInput).
    input: {
        height: 55, // Altura fija.
        backgroundColor: "#F8F8F8", // Fondo gris claro.
        borderRadius: 10, // Bordes redondeados.
        paddingHorizontal: 18, // Relleno horizontal.
        marginBottom: 18, // Margen inferior.
        fontSize: 16, // Tamaño de fuente.
        color: "#333333", // Color de texto.
        width: "100%", // Ocupa todo el ancho disponible.
        borderWidth: 1, // Borde fino.
        borderColor: "#E0E0E0", // Color del borde.
    },
    // Estilo para el botón de acción principal (ej. Guardar, Crear).
    boton: {
        backgroundColor: "#28A745", // Color de fondo verde.
        paddingVertical: 14, // Relleno vertical.
        paddingHorizontal: 25, // Relleno horizontal.
        borderRadius: 10, // Bordes redondeados.
        flexDirection: 'row', // Permite icono y texto en fila.
        justifyContent: 'center', // Centra horizontalmente.
        alignItems: 'center', // Centra verticalmente.
        width: "100%", // Ocupa todo el ancho.
        marginTop: 20, // Margen superior.
        shadowColor: "#28A745", // Color de la sombra del botón.
        shadowOffset: { width: 0, height: 5 }, // Desplazamiento de la sombra.
        shadowOpacity: 0.3, // Opacidad de la sombra.
        shadowRadius: 10, // Radio de la sombra.
        elevation: 10, // Elevación para Android.
    },
    // Contenedor para el icono y texto dentro del botón.
    botonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    // Estilo para el icono dentro del botón.
    botonIcon: {
        marginRight: 10, // Margen a la derecha del icono.
    },
    // Estilo para el texto dentro del botón.
    textoBoton: {
        color: "#fff", // Color de texto blanco.
        fontSize: 18, // Tamaño de fuente.
        fontWeight: "bold", // Negrita.
    },
    // Estilo para el botón de "Volver".
    backButton: {
        marginTop: 20, // Margen superior.
        flexDirection: 'row', // Permite icono y texto en fila.
        alignItems: 'center', // Centra verticalmente.
        paddingVertical: 10, // Relleno vertical.
        paddingHorizontal: 15, // Relleno horizontal.
        borderRadius: 8, // Bordes redondeados.
        backgroundColor: '#E9ECEF', // Fondo gris claro.
    },
    // Estilo para el texto del botón de "Volver".
    backButtonText: {
        marginLeft: 8, // Margen a la izquierda del texto.
        fontSize: 16, // Tamaño de fuente.
        color: '#555', // Color de texto gris oscuro.
        fontWeight: '500', // Peso de fuente mediano.
    },
    // Estilo para mostrar mensajes de error.
    error: {
        color: "#E74C3C", // Color de texto rojo.
        marginTop: 10, // Margen superior.
        marginBottom: 10, // Margen inferior.
        textAlign: "center", // Centra el texto.
        fontSize: 15, // Tamaño de fuente.
        fontWeight: '500', // Peso de fuente mediano.
    },
});

export default styles;