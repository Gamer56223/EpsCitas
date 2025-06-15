import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons"; // Añadido MaterialCommunityIcons

import InicioStack from "./Stacks/InicioStack";
import PerfilesStack from "./Stacks/PerfilStack";
import ConfiguracionesStack from "./Stacks/ConfiguracionStack";
// import CitasStack from "./Stacks/CitaStack";
// import ConsultoriosStack from "./Stacks/ConsultorioStack";
// import EpsStack from "./Stacks/EpsStack";
// import EspecialidadesStack from "./Stacks/EspecialidadStack";
// import MedicosStack from "./Stacks/MedicoStack";
// import PacientesStack from "./Stacks/PacienteStack";
// import SedesStack from "./Stacks/SedeStack";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';

const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
    return (
        <Tab.Navigator
            screenOptions={{
                // Estilo para la barra de pestañas en general
                tabBarStyle: {
                    backgroundColor: '#ffffff', // Fondo blanco limpio para la barra
                    borderTopWidth: 1, // Borde superior sutil
                    borderTopColor: '#e0e0e0', // Color del borde
                    height: 60, // Aumenta la altura para mayor espacio
                    paddingBottom: 5, // Un poco de padding en la parte inferior para iconos/texto
                    paddingTop: 5, // Un poco de padding en la parte superior
                },
                // Colores de los iconos y texto de la pestaña
                tabBarActiveTintColor: "#1a73e8", // Azul más profesional para activa
                tabBarInactiveTintColor: "#808080", // Gris oscuro para inactiva
                tabBarLabelStyle: {
                    fontSize: 12, // Tamaño de fuente para el texto de la pestaña
                    fontWeight: '600', // Un poco más de peso para el texto
                    marginTop: 2, // Pequeño margen entre icono y texto
                },
            }}
        >
            <Tab.Screen
                name="Inicio"
                component={InicioStack}
                options={{
                    headerShown: false, // Oculta el encabezado del TabNavigator para que el Stack interno lo maneje
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="not-started" size={24} color="red" />
                    ),
                    tabBarLabel: 'Inicio', // Asegura que el texto de la pestaña sea 'Inicio'
                }}
            />

            <Tab.Screen
                name="Perfil" // Nombre de la ruta (lo que usas para navegar si es necesario)
                component={PerfilesStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        // Icono más apropiado para Perfil
                        <Feather name="user" size={size} color="red" /> // 'user' o 'person'
                    ),
                    tabBarLabel: 'Perfil', // Asegura que el texto de la pestaña sea 'Perfil'
                }}
            />

            <Tab.Screen
                name="Configuración" // Nombre de la ruta
                component={ConfiguracionesStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        // Icono más apropiado para Configuración
                        <Ionicons name="settings-outline" size={size} color="red" /> // 'settings-outline' o 'cog'
                        // O si prefieres de MaterialCommunityIcons:
                        // <MaterialCommunityIcons name="cog-outline" size={size} color={color} />
                    ),
                    tabBarLabel: 'Configuración', // Asegura que el texto de la pestaña sea 'Configuración'
                }}
            />
        </Tab.Navigator>
    );
}