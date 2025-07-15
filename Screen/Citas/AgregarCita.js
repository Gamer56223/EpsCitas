import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { crearCita } from "../../Src/Servicios/CitaService"; // Servicio para interactuar con la API de citas

import styles from "../../Styles/AgregarCitaStyles"; // Estilos específicos para esta pantalla

/**
 * AgregarCita: Componente de pantalla para añadir una nueva cita médica.
 * Permite al usuario ingresar los detalles de una cita y guardarla a través de una API.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation para controlar la navegación entre pantallas.
 */
export default function AgregarCita({ navigation }) {
    // Estados para almacenar los valores de los campos del formulario
    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [estado, setEstado] = useState("");
    const [hora, setHora] = useState("");
    const [tipo, setTipo] = useState("");

    // Estado para controlar el indicador de carga (spinner) y deshabilitar el botón
    const [loading, setLoading] = useState(false);

    /**
     * getAlertMessage: Función auxiliar para formatear mensajes de error recibidos de la API.
     * Puede manejar strings, objetos con 'errors' (validaciones) o objetos con un 'message'.
     *
     * @param {string|object} msg - El mensaje o objeto de error recibido.
     * @param {string} defaultMsg - Mensaje por defecto si el formato del error no es reconocido.
     * @returns {string} El mensaje de error formateado para mostrar en una alerta.
     */
    const getAlertMessage = (msg, defaultMsg) => {
        if (typeof msg === 'string') {
            return msg;
        }
        if (msg && typeof msg === 'object') {
            if (msg.errors) {
                // Si el error contiene un objeto 'errors' (ej. de validación de Laravel)
                const messages = Object.values(msg.errors).flat(); // Extrae todos los mensajes de error
                return messages.join('\n'); // Une los mensajes con saltos de línea
            }
            if (msg.message && typeof msg.message === 'string') {
                return msg.message; // Si hay un mensaje directo en la propiedad 'message'
            }
            return JSON.stringify(msg); // Si es un objeto, pero no tiene el formato esperado, lo convierte a string JSON
        }
        return defaultMsg; // Retorna el mensaje por defecto si no se puede procesar
    };

    /**
     * handleGuardar: Función asíncrona para manejar el envío del formulario.
     * Valida que todos los campos estén llenos, llama al servicio `crearCita`
     * y gestiona la respuesta de la API (éxito o error).
     */
    const handleGuardar = async () => {
        // Validación de campos obligatorios antes de enviar
        if (!nombre || !fecha || !estado || !hora || !tipo) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }

        setLoading(true); // Activa el estado de carga
        try {
            // Llama al servicio para crear la cita con los datos del formulario
            const result = await crearCita({
                Nombre: nombre,
                Fecha: fecha,
                Hora: hora,
                Estado: estado,
                Tipo: tipo
            });

            if (result.success) {
                // Si la cita se creó correctamente, muestra una alerta de éxito y regresa a la pantalla anterior
                Alert.alert("Éxito", "Cita creada correctamente");
                navigation.goBack();
            } else {
                // Si hay un error en la respuesta del servicio, muestra una alerta con el mensaje formateado
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear la cita"));
            }
        } catch (error) {
            // Captura errores de red o errores inesperados durante la operación
            console.error("Error al crear cita:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear la cita."));
        } finally {
            setLoading(false); // Desactiva el estado de carga al finalizar (éxito o error)
        }
    };

    return (
        // KeyboardAvoidingView ajusta la vista para que el teclado no cubra los inputs
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"} // Comportamiento diferente para iOS y Android
        >
            {/* TouchableWithoutFeedback y Keyboard.dismiss permiten ocultar el teclado al tocar fuera de los inputs */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {/* ScrollView permite desplazar el contenido si excede el tamaño de la pantalla */}
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Nueva Cita</Text>

                        {/* Campos de texto para los datos de la cita */}
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor="#888"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Fecha (YYYY-MM-DD)" // Formato sugerido para la fecha
                            placeholderTextColor="#888"
                            value={fecha}
                            onChangeText={setFecha}
                            keyboardType="default" // Permite guiones para el formato de fecha
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Estado"
                            placeholderTextColor="#888"
                            value={estado}
                            onChangeText={setEstado}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Hora (HH:MM)" // Formato sugerido para la hora
                            placeholderTextColor="#888"
                            value={hora}
                            onChangeText={setHora}
                            keyboardType="default" // Permite dos puntos para el formato de hora
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Tipo"
                            placeholderTextColor="#888"
                            value={tipo}
                            onChangeText={setTipo}
                        />

                        {/* Botón para guardar la nueva cita */}
                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                            {loading ? (
                                // Muestra un spinner si la operación está en curso
                                <ActivityIndicator color="#fff" />
                            ) : (
                                // Muestra el texto y el ícono si no está cargando
                                <View style={styles.botonContent}>
                                    <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>Crear Cita</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        {/* Botón para volver a la pantalla anterior */}
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-circle-outline" size={24} color="#555" />
                            <Text style={styles.backButtonText}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}