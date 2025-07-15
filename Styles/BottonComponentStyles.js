import { StyleSheet } from "react-native";

/**
 * Estilos para componentes de botones reutilizables en React Native.
 * Define una base y variaciones de estilo por tipo (color), tamaño y estado (deshabilitado).
 */
const styles = StyleSheet.create({
    // Estilo base para todos los botones. Define propiedades compartidas.
    buttonBase: {
        paddingVertical: 12, // Relleno vertical estándar.
        paddingHorizontal: 20, // Relleno horizontal estándar.
        borderRadius: 8, // Bordes ligeramente redondeados.
        alignItems: "center", // Centra el contenido horizontalmente.
        justifyContent: "center", // Centra el contenido verticalmente.
        marginVertical: 8, // Margen vertical para separar botones.
        minWidth: 100, // Ancho mínimo para el botón.
        flexDirection: 'row', // Permite que el contenido (ej. icono y texto) se alinee en fila.
    },

    // --- Estilos por Tipo (Colores y Sombras) ---
    // Botón principal: típicamente para acciones importantes o por defecto.
    button_primary: {
        backgroundColor: "#1976D2", // Color azul vibrante.
        shadowColor: "#1976D2", // Sombra con el color del botón.
        shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra.
        shadowOpacity: 0.3, // Opacidad de la sombra.
        shadowRadius: 5, // Radio de difuminado de la sombra.
        elevation: 8, // Elevación para sombra en Android.
    },
    // Botón secundario: para acciones menos prioritarias.
    button_secondary: {
        backgroundColor: "#6C757D", // Color gris neutro.
        shadowColor: "#6C757D", // Sombra gris.
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    // Botón de peligro: para acciones destructivas o de advertencia.
    button_danger: {
        backgroundColor: "#DC3545", // Color rojo.
        shadowColor: "#DC3545", // Sombra roja.
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,
    },
    // Botón de éxito: para acciones que confirman una operación exitosa.
    button_success: {
        backgroundColor: "#28A745", // Color verde.
        shadowColor: "#28A745", // Sombra verde.
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,
    },
    // Botón verde genérico (considerar si se superpone con 'button_success').
    button_green: {
        backgroundColor: "green",
    },

    // --- Estilos por Tamaño ---
    // Botón pequeño: para interfaces compactas o acciones secundarias.
    button_small: {
        paddingVertical: 8, // Menor relleno vertical.
        paddingHorizontal: 15, // Menor relleno horizontal.
        borderRadius: 6, // Bordes ligeramente menos redondeados.
        minWidth: 80, // Ancho mínimo más pequeño.
    },
    // Botón mediano: tamaño por defecto, equilibrado.
    button_medium: {
        paddingVertical: 12, // Relleno vertical estándar.
        paddingHorizontal: 20, // Relleno horizontal estándar.
        borderRadius: 8, // Bordes estándar.
        minWidth: 100, // Ancho mínimo estándar.
    },
    // Botón grande: para acciones prominentes o interfaces con más espacio.
    button_large: {
        paddingVertical: 16, // Mayor relleno vertical.
        paddingHorizontal: 25, // Mayor relleno horizontal.
        borderRadius: 10, // Bordes más redondeados.
        minWidth: 150, // Ancho mínimo más grande.
    },

    // --- Estado Deshabilitado ---
    // Estilo para botones inactivos.
    button_disabled: {
        backgroundColor: "#B0B0B0", // Fondo gris claro.
        opacity: 0.7, // Reduce la opacidad para indicar inactividad.
        shadowOpacity: 0, // Elimina la sombra.
        elevation: 0, // Elimina la elevación en Android.
    },

    // --- Estilos de Texto Base ---
    // Estilo base para el texto dentro de todos los botones.
    textBase: {
        color: "#FFFFFF", // Color de texto blanco por defecto.
        fontWeight: "bold", // Texto en negrita.
        fontSize: 16, // Tamaño de fuente estándar.
        textAlign: 'center', // Centra el texto.
    },

    // --- Estilos de Texto por Tipo (Actualmente no aplican cambios de color adicionales) ---
    text_primary: { /* Hereda de textBase */ },
    text_secondary: { /* Hereda de textBase */ },
    text_danger: { /* Hereda de textBase */ },
    text_success: { /* Hereda de textBase */ },
    text_green: { /* Hereda de textBase */ },

    // --- Estilos de Texto por Tamaño ---
    // Texto para botones pequeños.
    text_small: {
        fontSize: 14, // Fuente más pequeña.
    },
    // Texto para botones medianos.
    text_medium: {
        fontSize: 16, // Fuente estándar.
    },
    // Texto para botones grandes.
    text_large: {
        fontSize: 18, // Fuente más grande.
    },

    // --- Estado Deshabilitado (Texto) ---
    // Estilo para el texto de botones deshabilitados.
    text_disabled: {
        color: "#E0E0E0", // Color de texto gris claro.
    }
});

export default styles;