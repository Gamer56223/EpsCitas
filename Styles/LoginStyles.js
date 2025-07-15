import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 30, // Aumentar el padding para más espacio
        backgroundColor: "#F5F8FA", // Fondo suave y claro
    },

    title: {
        fontSize: 32, // Un poco más grande
        fontWeight: "800", // Más audaz
        color: "#2C3E50", // Un azul oscuro casi negro
        marginBottom: 35, // Más espacio debajo del título
        textAlign: "center",
    },

    // Estilo mejorado para el contenedor del input y el icono
    inputContainer: {
        flexDirection: 'row', // Para alinear el icono y el input horizontalmente
        alignItems: 'center', // Centrar verticalmente
        backgroundColor: "#F8F8F8", // Fondo ligeramente gris para los inputs
        borderRadius: 10, // Bordes redondeados
        marginBottom: 18, // Espacio entre inputs
        borderWidth: 1, // Borde sutil
        borderColor: '#E0E0E0', // Color del borde
        paddingHorizontal: 15, // Padding para el contenedor completo
        shadowColor: "#000", // Sombra sutil
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    // Estilo para el icono
    icon: {
        marginRight: 12, // Espacio entre el icono y el texto
        color: "#888", // Color sutil para el icono
    },

    // Estilo modificado para el TextInput
    input: {
        flex: 1, // Para que el TextInput ocupe el espacio restante
        height: 55, // Altura para el TextInput
        fontSize: 16,
        color: "#333333", // Color de texto oscuro
        paddingVertical: 0, // Eliminar padding vertical por defecto
    },

    // Estilos para los botones (copiados y adaptados de RegistroStyles.js)
    // El BottonComponent en LoginScreen usa 'color="primary"' y 'color="secondary"',
    // así que no se aplican directamente estos estilos.
    // Si tu BottonComponent usa 'buttonStyle' y 'textStyle', deberías pasarlos desde aquí.
    // Asumo que tu BottonComponent maneja 'color="primary"' y 'color="secondary"' internamente
    // y aplica los estilos base.
    // Si necesitas que estos estilos se apliquen directamente al BottonComponent,
    // deberás modificar BottonComponent o cómo lo usas en LoginScreen.
    primaryButton: { // Nombre cambiado para evitar conflicto si BottonComponent usa 'primary'
        backgroundColor: "#2196F3", // Un azul más vibrante (Material Blue)
        paddingVertical: 12, // Más pequeño
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
        marginTop: 25,
        shadowColor: "#2196F3",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 8,
    },
    secondaryButton: { // Nombre cambiado para evitar conflicto si BottonComponent usa 'secondary'
        backgroundColor: "#9E9E9E", // Un gris más neutro y moderno (Material Grey)
        paddingVertical: 12, // Más pequeño
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
        marginTop: 10,
        shadowColor: "#9E9E9E",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 15, // Más pequeño
        textTransform: 'uppercase',
    },

    registerButton: { // Este es el estilo que ya tenías para el segundo botón
        marginTop: 15, // Mantener el margen superior
    }
});

export default styles;