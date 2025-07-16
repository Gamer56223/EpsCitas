import React, { useState, useEffect } from "react";
import { View, Text, Switch, SafeAreaView, Alert, Button } from "react-native";
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../../Styles/ConfiguracionStyles"; // Estilos específicos para la pantalla de Configuración

/**
 * Configuracion: Componente de pantalla que muestra las opciones de configuración de la aplicación.
 * Actualmente, presenta un tema de diseño fijo (claro) y una opción de "Notificaciones".
 */
export default function Configuracion() {
    const [permisoNotificaciones, setPermisoNotificaciones] = useState(false); // Renombrado a camelCase estándar
    const [loading, setLoading] = useState(true);

    // Mover la función toggleSwitch AQUÍ, antes del primer return
    const toggleSwitch = async (valor) => {
        // Asegúrate de que 'valor' es el estado deseado del switch (true para activado, false para desactivado)
        if (valor) { // Si el usuario intenta activar las notificaciones
            const { status } = await Notifications.requestPermissionsAsync();
            if (status === 'granted') {
                await AsyncStorage.setItem('notificaciones_activas', 'true');
                setPermisoNotificaciones(true);
                Alert.alert('Permiso concedido', 'Ahora puedes recibir notificaciones');
            } else {
                // Si el permiso no se concede, el switch debe volver a su estado 'desactivado'
                await AsyncStorage.setItem('notificaciones_activas', 'false');
                setPermisoNotificaciones(false); // Es importante para que el switch se visualice correctamente
                Alert.alert('Permiso denegado', 'No podrás recibir notificaciones. Para activar, ve a la configuración de la aplicación en tu dispositivo.');
            }
        } else { // Si el usuario intenta desactivar las notificaciones
            await AsyncStorage.setItem('notificaciones_activas', 'false');
            setPermisoNotificaciones(false);
            Alert.alert(
                'Notificaciones Desactivadas',
                'Has desactivado las notificaciones para esta aplicación.'
            );
            // Opcional: Podrías considerar aquí un método para revocar permisos a nivel de sistema,
            // pero Notifications.requestPermissionsAsync() solo solicita, no revoca.
            // La sugerencia "hazlo desde la configuración" en tu código original es la forma correcta de hacerlo a nivel de OS.
        }
    };


    useEffect(() => {
        const checkPermisosYPreferencia = async () => { // Renombrado para claridad
            // Obtener el estado actual del permiso a nivel de sistema
            const { status: systemStatus } = await Notifications.getPermissionsAsync();

            // Obtener la preferencia del usuario guardada en AsyncStorage
            const preferencia = await AsyncStorage.getItem('notificaciones_activas');

            // Determinar el estado inicial del switch:
            // Debe estar 'true' solo si el permiso del sistema está concedido Y la preferencia es 'true'.
            setPermisoNotificaciones(systemStatus === 'granted' && preferencia === 'true');
            setLoading(false);
        };

        checkPermisosYPreferencia();
    }, []);

    // Definición de estilos fijos para el modo claro.
    // Estos estilos sobrescriben o complementan los definidos en `ConfiguracionStyles`.
    const containerStyle = {
        backgroundColor: '#f0f4f8', // Fondo claro fijo para la pantalla
    };

    const textStyle = {
        color: '#2c3e50', // Color de texto oscuro fijo para los elementos
    };

    const cardStyle = {
        backgroundColor: '#FFFFFF', // Fondo de tarjeta claro fijo
        shadowColor: 'rgba(0, 0, 0, 0.1)', // Sombra ligera para las tarjetas en modo claro
    };


    // Si está cargando, muestra el indicador de carga
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Cargando Configuración...</Text>
            </View>
        );
    }

    // Una vez que ha cargado, muestra la interfaz de configuración
    return (
        <SafeAreaView style={[styles.container, containerStyle]}>
            {/* Título de la pantalla de configuración */}
            <Text style={[styles.title, textStyle]}>Configuración</Text>

            {/* Opción de configuración para Notificaciones */}
            <View style={[styles.optionCard, cardStyle]}>
                <Text style={[styles.optionText, textStyle]}>Notificaciones</Text>
                <Switch
                    value={permisoNotificaciones} // Utiliza el estado correcto
                    onValueChange={toggleSwitch} // Llama a la función correcta
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={permisoNotificaciones ? "#f5dd4b" : "#f4f3f4"} // El thumbColor puede cambiar si está activado/desactivado
                    ios_backgroundColor="#3e3e3e"
                />
            </View>

            {/* Aquí se pueden añadir más opciones de configuración siguiendo el mismo patrón */}
        </SafeAreaView>
    );
}