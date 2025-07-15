import React, { useState, useEffect } from "react";
import { View, Text, Switch, SafeAreaView } from "react-native";

import styles from "../../Styles/ConfiguracionStyles"; // Estilos específicos para la pantalla de Configuración

/**
 * Configuracion: Componente de pantalla que muestra las opciones de configuración de la aplicación.
 * Actualmente, presenta un tema de diseño fijo (claro) y una opción de "Notificaciones".
 */
export default function Configuracion() {
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

    return (
        // SafeAreaView asegura que el contenido no se solape con la barra de estado o la muesca en dispositivos iOS.
        <SafeAreaView style={[styles.container, containerStyle]}>
            {/* Título de la pantalla de configuración */}
            <Text style={[styles.title, textStyle]}>Configuración</Text>

            {/*
             * El Switch de Modo Oscuro ha sido eliminado y los estilos son fijos en modo claro.
             * El código comentado a continuación muestra cómo estaba implementado antes si se necesitara reactivarlo:
             *
             * <View style={[styles.optionCard, cardStyle]}>
             * <Text style={[styles.optionText, textStyle]}>Modo Oscuro</Text>
             * <Switch
             * trackColor={{ false: "#767577", true: "#81b0ff" }}
             * thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
             * ios_backgroundColor="#3e3e3e"
             * onValueChange={toggleDarkMode}
             * value={isDarkMode}
             * />
             * </View>
            */}

            {/* Opción de configuración para Notificaciones */}
            <View style={[styles.optionCard, cardStyle]}>
                <Text style={[styles.optionText, textStyle]}>Notificaciones</Text>
                <Switch
                    // El valor `true` aquí es un ejemplo; en una aplicación real,
                    // se manejaría con un `useState` y se guardaría la preferencia.
                    value={true} // Ejemplo: el switch de notificaciones está siempre activado
                    onValueChange={() => {}} // Función vacía, ya que no hay lógica asociada actualmente
                    trackColor={{ false: "#767577", true: "#81b0ff" }} // Colores para el switch (apagado/encendido)
                    thumbColor={"#f4f3f4"} // Color del "pulgar" del switch
                    ios_backgroundColor="#3e3e3e" // Color de fondo para iOS cuando está apagado
                />
            </View>

            {/* Aquí se pueden añadir más opciones de configuración siguiendo el mismo patrón */}
        </SafeAreaView>
    );
}