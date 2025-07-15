import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { crearEps, editarEps } from "../../Src/Servicios/EpsService"; // Servicios para crear y editar EPS
import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService"; // Servicio para listar especialidades
import Ionicons from '@expo/vector-icons/Ionicons'; // Iconos

import styles from "../../Styles/EditarEpsStyles"; // Estilos para la pantalla

/**
 * EditarEps: Componente de pantalla para crear o editar una entidad de EPS (Entidad Promotora de Salud).
 * Permite al usuario ingresar o modificar los datos de una EPS, incluyendo su especialidad asociada.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation para controlar la navegación entre pantallas.
 */
export default function EditarEps({ navigation }) {
    const route = useRoute();
    // Obtiene el objeto `eps` de los parámetros de la ruta si se está editando.
    const eps = route.params?.eps;

    // Estados para los campos del formulario, inicializados con los datos de la EPS si es edición, o vacíos si es creación.
    const [nombre, setNombre] = useState(eps?.Nombre || "");
    const [direccion, setDireccion] = useState(eps?.direccion || "");
    const [telefono, setTelefono] = useState(eps?.Telefono || "");
    const [nit, setNit] = useState(eps?.Nit || "");
    // El ID de especialidad se convierte a string para el Picker.
    const [idEspecialidad, setIdEspecialidad] = useState(eps?.idEspecialidad?.toString() || "");

    // Estado para almacenar la lista de especialidades disponibles.
    const [especialidades, setEspecialidades] = useState([]);

    // Estados para controlar los indicadores de carga.
    const [loading, setLoading] = useState(false); // Para la operación de guardar/crear EPS
    const [loadingEspecialidades, setLoadingEspecialidades] = useState(true); // Para la carga inicial de especialidades

    // Determina si la pantalla está en modo edición o creación.
    const esEdicion = !!eps;

    /**
     * getAlertMessage: Función auxiliar para formatear mensajes de error provenientes de la API.
     * Puede manejar diferentes formatos de respuesta de error para mostrar un mensaje claro al usuario.
     *
     * @param {string|object} msg - El mensaje o objeto de error recibido.
     * @param {string} defaultMsg - Mensaje por defecto si el formato del error no es reconocido.
     * @returns {string} El mensaje de error formateado.
     */
    const getAlertMessage = (msg, defaultMsg) => {
        if (typeof msg === 'string') {
            return msg;
        }
        if (msg && typeof msg === 'object') {
            if (msg.errors) {
                // Si el error contiene un objeto 'errors' (ej. de validación de Laravel)
                const messages = Object.values(msg.errors).flat();
                return messages.join('\n');
            }
            if (msg.message && typeof msg.message === 'string') {
                return msg.message;
            }
            return JSON.stringify(msg);
        }
        return defaultMsg;
    };

    // useEffect para cargar las especialidades disponibles al iniciar la pantalla.
    useEffect(() => {
        const fetchEspecialidades = async () => {
            setLoadingEspecialidades(true); // Inicia el indicador de carga de especialidades.
            try {
                const result = await listarEspecialidades(); // Llama al servicio para obtener especialidades.
                if (result.success) {
                    setEspecialidades(result.data); // Almacena las especialidades.

                    // Si es modo edición y la EPS ya tiene una especialidad, la selecciona en el Picker.
                    // Si no es edición y hay especialidades, selecciona la primera por defecto.
                    // Si no hay especialidades, el Picker queda sin selección inicial.
                    if (esEdicion && eps?.idEspecialidad) {
                        setIdEspecialidad(eps.idEspecialidad.toString());
                    } else if (result.data.length > 0) {
                        setIdEspecialidad(result.data[0].id.toString());
                    } else {
                        setIdEspecialidad(""); // No hay especialidades para seleccionar
                    }
                } else {
                    Alert.alert("Error", result.message || "No se pudieron cargar las especialidades.");
                }
            } catch (error) {
                console.error("Error al cargar especialidades:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar las especialidades.");
            } finally {
                setLoadingEspecialidades(false); // Finaliza el indicador de carga de especialidades.
            }
        };

        fetchEspecialidades(); // Ejecuta la función de carga.
    }, [esEdicion, eps]); // Dependencias: se ejecuta cuando cambia el modo (edición/creación) o los datos de la EPS.

    /**
     * handleGuardar: Función asíncrona para manejar el envío del formulario (creación o edición de EPS).
     * Valida los campos, llama al servicio correspondiente (crear o editar) y gestiona la respuesta.
     */
    const handleGuardar = async () => {
        // Validación de campos obligatorios.
        if (!nombre || !direccion || !telefono || !nit || !idEspecialidad) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos");
            return;
        }
        // Validación si no hay especialidades cargadas para asignar.
        if (especialidades.length === 0) {
            Alert.alert("Error", "No hay especialidades disponibles para asignar. Por favor, agregue especialidades primero.");
            return;
        }

        setLoading(true); // Activa el indicador de carga del botón.
        let result;
        try {
            // Prepara los datos a enviar a la API.
            const dataToSave = {
                Nombre: nombre,
                direccion: direccion,
                Telefono: telefono,
                Nit: nit,
                idEspecialidad: parseInt(idEspecialidad) // Asegura que el ID de especialidad sea un número.
            };

            // Llama al servicio de crear o editar según el modo de la pantalla.
            if (esEdicion) {
                result = await editarEps(eps.id, dataToSave);
            } else {
                result = await crearEps(dataToSave);
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "EPS actualizada correctamente" : "EPS creada correctamente");
                navigation.goBack(); // Regresa a la pantalla anterior después de la operación exitosa.
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la EPS"));
            }
        } catch (error) {
            console.error("Error al guardar EPS:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar la EPS."));
        } finally {
            setLoading(false); // Desactiva el indicador de carga.
        }
    };

    // Si las especialidades aún están cargando, muestra un spinner.
    if (loadingEspecialidades) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando especialidades...</Text>
            </View>
        );
    }

    return (
        // KeyboardAvoidingView ajusta la vista para evitar que el teclado oculte los inputs.
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"} // Ajusta el comportamiento según la plataforma.
        >
            {/* TouchableWithoutFeedback y Keyboard.dismiss permiten cerrar el teclado al tocar fuera de los inputs. */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {/* ScrollView permite que el contenido sea desplazable si es demasiado largo. */}
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>{esEdicion ? "Editar EPS" : "Nueva EPS"}</Text>

                        {/* Campo de Nombre */}
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor="#888"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        {/* Campo de Dirección (área de texto multi-línea) */}
                        <TextInput
                            style={styles.inputTextArea}
                            placeholder="Dirección"
                            placeholderTextColor="#888"
                            value={direccion}
                            onChangeText={setDireccion}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top" // Alinea el texto en la parte superior para Android.
                        />
                        {/* Campo de Teléfono */}
                        <TextInput
                            style={styles.input}
                            placeholder="Teléfono"
                            placeholderTextColor="#888"
                            value={telefono}
                            onChangeText={setTelefono}
                            keyboardType="phone-pad" // Teclado numérico optimizado para teléfonos.
                        />
                        {/* Campo de NIT */}
                        <TextInput
                            style={styles.input}
                            placeholder="Nit"
                            placeholderTextColor="#888"
                            value={nit}
                            onChangeText={setNit}
                            keyboardType="numeric" // Teclado numérico.
                        />

                        {/* Etiqueta para el Picker de especialidades */}
                        <Text style={styles.pickerLabelActual}>Seleccionar Especialidad:</Text>
                        <View style={styles.pickerContainer}>
                            {/* Renderiza el Picker solo si hay especialidades disponibles */}
                            {especialidades.length > 0 ? (
                                <Picker
                                    selectedValue={idEspecialidad}
                                    onValueChange={(itemValue) => setIdEspecialidad(itemValue)}
                                    style={styles.picker}
                                    // Aplica itemStyle solo en iOS para evitar warnings en Android
                                    itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                                >
                                    {/* Opción por defecto para seleccionar */}
                                    <Picker.Item label="-- Seleccione una especialidad --" value="" />
                                    {/* Mapea las especialidades a Picker.Item */}
                                    {especialidades.map((esp) => (
                                        <Picker.Item
                                            key={esp.id.toString()} // Usa el ID como key
                                            label={esp.Nombre || esp.nombre || `Especialidad ID: ${esp.id}`} // Muestra Nombre, nombre o ID
                                            value={esp.id.toString()} // El valor siempre debe ser string para el Picker
                                        />
                                    ))}
                                </Picker>
                            ) : (
                                // Mensaje si no hay especialidades disponibles
                                <Text style={styles.noEspecialidadesText}>No hay especialidades disponibles.</Text>
                            )}
                        </View>

                        {/* Botón para Guardar/Crear EPS */}
                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                            {loading ? (
                                // Muestra ActivityIndicator cuando está cargando
                                <ActivityIndicator color="#fff" />
                            ) : (
                                // Muestra texto e icono cuando no está cargando
                                <View style={styles.botonContent}>
                                    <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear EPS"}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        {/* Botón para Volver */}
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