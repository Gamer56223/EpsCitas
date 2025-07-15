import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import React from 'react';
import styles from "../Styles/BottonComponentStyles"; // Importamos los estilos compartidos para el botón

/**
 * Componente de botón altamente personalizable y reutilizable.
 * Permite definir el texto, la acción al presionar, el color, el tamaño,
 * el estado deshabilitado y un estado de carga.
 *
 * @param {object} props - Las propiedades (props) para el componente CustomButton.
 * @param {string} props.title - El texto que se mostrará dentro del botón.
 * @param {function} props.onPress - La función que se ejecutará cuando se presione el botón.
 * @param {object} [props.style] - Opcional: Estilos personalizados adicionales para aplicar al contenedor del botón.
 * @param {"primary"|"secondary"|"success"|"danger"|"warning"|"info"|"light"|"dark"} [props.color="primary"] -
 * Define el esquema de color del botón (ej. "primary", "secondary"). Esto afecta el fondo y el color del texto.
 * @param {"small"|"medium"|"large"} [props.size="medium"] - Define el tamaño del botón (ej. "small", "medium", "large").
 * Esto afecta el padding y el tamaño de la fuente.
 * @param {boolean} [props.disabled=false] - Si es `true`, el botón no se podrá presionar y se mostrará con un estilo de deshabilitado.
 * @param {boolean} [props.loading=false] - Si es `true`, se mostrará un `ActivityIndicator` (spinner) en lugar del texto
 * del título, indicando que hay una operación en curso. El botón también se deshabilitará automáticamente en este estado.
 * @param {object} [props.textStyle] - Opcional: Estilos personalizados adicionales para aplicar al texto del botón.
 */
function CustomButton({
    title,
    onPress,
    style,
    color = "primary", // El color por defecto es "primary"
    size = "medium",   // El tamaño por defecto es "medium"
    disabled = false,  // Por defecto, el botón no está deshabilitado
    loading = false,   // Por defecto, el botón no está en estado de carga
    textStyle          // Permite sobrescribir estilos de texto
}) {
    // Definimos los estilos para el contenedor del botón.
    // Combinamos los estilos base con los estilos específicos de color, tamaño y estado deshabilitado.
    // El 'style' pasado por props se aplica al final para permitir sobrescrituras personalizadas.
    const buttonStyles = [
        styles.buttonBase,          // Estilos base que se aplican a todos los botones
        styles[`button_${color}`],  // Estilos de color específicos (ej. button_primary)
        styles[`button_${size}`],   // Estilos de tamaño específicos (ej. button_medium)
        disabled && styles.button_disabled, // Aplica estilos de deshabilitado si 'disabled' es true
        style                       // Estilos personalizados pasados a través de la prop 'style'
    ];

    // Definimos los estilos para el texto dentro del botón.
    // Combinamos los estilos base del texto con los estilos específicos de color, tamaño y estado deshabilitado.
    // El 'textStyle' pasado por props se aplica al final para permitir sobrescrituras personalizadas.
    const textStyles = [
        styles.textBase,            // Estilos base para el texto de todos los botones
        styles[`text_${color}`],    // Estilos de texto de color específicos (ej. text_primary)
        styles[`text_${size}`],     // Estilos de texto de tamaño específicos (ej. text_medium)
        disabled && styles.text_disabled,   // Aplica estilos de texto deshabilitado si 'disabled' es true
        textStyle                   // Estilos personalizados pasados a través de la prop 'textStyle'
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            // El botón se deshabilita si la prop 'disabled' es true O si la prop 'loading' es true.
            disabled={disabled || loading}
            activeOpacity={0.7} // Controla la opacidad del botón cuando se presiona, dando feedback visual.
        >
            {/* Renderizado condicional: Si 'loading' es true, muestra un indicador de actividad; de lo contrario, muestra el título del botón. */}
            {loading ? (
                // Muestra un `ActivityIndicator` (spinner) para indicar que algo está cargando.
                // El color del indicador se toma del color base del texto para asegurar buena visibilidad.
                <ActivityIndicator color={styles.textBase.color} size="small" />
            ) : (
                // Muestra el texto del título del botón.
                <Text style={textStyles}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

// React.memo es una optimización de rendimiento.
// Evita que el componente se re-renderice si sus props no han cambiado.
// Esto es útil en listas o interfaces donde el botón puede ser renderizado muchas veces
// y sus props no cambian con frecuencia.
export default React.memo(CustomButton);