import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, SafeAreaView } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage"; // Ya no es necesario si eliminamos la preferencia de modo oscuro

import styles from "../../Styles/ConfiguracionStyles";

export default function Configuracion() {
   
    const containerStyle = {
        backgroundColor: '#f0f4f8', // Fondo claro fijo
    };

    const textStyle = {
        color: '#2c3e50', // Color de texto oscuro fijo
    };

    const cardStyle = {
        backgroundColor: '#FFFFFF', // Fondo de tarjeta claro fijo
        shadowColor: 'rgba(0, 0, 0, 0.1)', // Sombra para modo claro
    };

    return (
        <SafeAreaView style={[styles.container, containerStyle]}>
            <Text style={[styles.title, textStyle]}>Configuración</Text>

            {/* El Switch de Modo Oscuro ha sido eliminado */}
            {/* <View style={[styles.optionCard, cardStyle]}>
                <Text style={[styles.optionText, textStyle]}>Modo Oscuro</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleDarkMode}
                    value={isDarkMode}
                />
            </View> */}

            {/* Puedes agregar más opciones de configuración aquí */}
            <View style={[styles.optionCard, cardStyle]}>
                <Text style={[styles.optionText, textStyle]}>Notificaciones</Text>
                <Switch
                    // Puedes manejar el estado de las notificaciones con otro useState
                    value={true} // Ejemplo: siempre activado
                    onValueChange={() => {}}
                    trackColor={{ false: "#767577", true: "#81b0ff" }} // Estilos de switch genéricos
                    thumbColor={"#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                />
            </View>
        </SafeAreaView>
    );
}


