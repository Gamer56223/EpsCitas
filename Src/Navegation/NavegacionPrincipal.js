import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather, MaterialCommunityIcons, MaterialIcons, Fontisto } from "@expo/vector-icons";

// Importa los Stack Navigators para cada sección principal de la aplicación.
// Estos Stacks contendrán las pantallas específicas de cada funcionalidad (ej. Inicio, Perfil, Configuraciones).
import InicioStack from "./Stacks/InicioStack";
import PerfilesStack from "./Stacks/PerfilStack";
import ConfiguracionesStack from "./Stacks/ConfiguracionStack";

// Importa los Stack Navigators adicionales para otras funcionalidades.
// Estos están actualmente comentados, pero listos para ser habilitados.
// import CitasStack from "./Stacks/CitaStack";
// import ConsultoriosStack from "./Stacks/ConsultorioStack";
// import EpsStack from "./Stacks/EpsStack";
// import EspecialidadesStack from "./Stacks/EspecialidadStack";
// import MedicosStack from "./Stacks/MedicoStack";
// import PacientesStack from "./Stacks/PacienteStack";
// import SedesStack from "./Stacks/SedeStack";

// Crea una instancia de Bottom Tab Navigator.
const Tab = createBottomTabNavigator();

/**
 * NavegacionPrincipal: Componente que define la estructura de navegación principal de la aplicación
 * utilizando un Bottom Tab Navigator.
 *
 * Esta navegación se muestra una vez que el usuario ha iniciado sesión correctamente.
 * Cada pestaña en la barra inferior corresponde a un Stack Navigator diferente,
 * permitiendo una navegación de pila dentro de cada sección.
 *
 * @param {object} props - Propiedades del componente.
 * @param {function} props.updateUserToken - Una función para actualizar el token de autenticación
 * en el componente raíz (`AppNavegacion`). Se pasa a las pilas internas (ej. PerfilStack)
 * para permitir el cierre de sesión.
 */
export default function NavegacionPrincipal({ updateUserToken }) {
    return (
        <Tab.Navigator
            // Opciones de estilo globales para la barra de pestañas (tab bar)
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#F8F8F8', // Un blanco suave para el fondo de la barra
                    borderTopWidth: 0, // Elimina el borde superior predeterminado
                    height: 65, // Aumenta la altura de la barra para un mejor espacio
                    paddingBottom: 8, // Relleno inferior para iconos y texto
                    paddingTop: 8, // Relleno superior
                    // Sombra sutil para dar un efecto flotante a la barra
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 5, // Sombra más visible para elevar la barra
                    },
                    shadowOpacity: 0.08,
                    shadowRadius: 6,
                    elevation: 10, // Elevación para Android
                },
                // Colores de los iconos y etiquetas de las pestañas
                tabBarActiveTintColor: "#007B8C", // Azul teal para la pestaña activa
                tabBarInactiveTintColor: "#7F8C8D", // Gris suave para la pestaña inactiva
                tabBarLabelStyle: {
                    fontSize: 11, // Tamaño de fuente ligeramente ajustado para las etiquetas
                    fontWeight: '700', // Texto de etiqueta más audaz
                    marginTop: 4, // Margen entre el icono y el texto
                },
            }}
        >
            {/* Pestaña de Inicio */}
            <Tab.Screen
                name="Inicio" // Nombre de la ruta para esta pestaña
                component={InicioStack} // El componente asociado es un Stack Navigator
                options={{
                    headerShown: false, // Oculta el encabezado del Tab Navigator; el Stack interno lo manejará
                    tabBarIcon: ({ color, size }) => (
                        // Icono de "casa" de MaterialIcons. `color` y `size` son props pasadas por el navegador.
                        <MaterialIcons name="home" size={size + 2} color={color} />
                    ),
                    tabBarLabel: 'Inicio', // Texto que se mostrará debajo del icono en la barra de pestañas
                }}
            />

            {/* Pestaña de Perfil */}
            <Tab.Screen
                name="Perfil" // Nombre de la ruta
                // Se utiliza una función `children` para pasar la prop `updateUserToken` a `PerfilesStack`.
                // Esto es necesario para que `PerfilesStack` (y sus pantallas) puedan llamar a esta función
                // para, por ejemplo, cerrar la sesión y cambiar el flujo de navegación principal.
                children={() => <PerfilesStack updateUserToken={updateUserToken} />}
                options={{
                    headerShown: false, // Oculta el encabezado del Tab Navigator
                    tabBarIcon: ({ color, size }) => (
                        // Icono de "usuario" de FeatherIcons
                        <Feather name="user" size={size + 2} color={color} />
                    ),
                    tabBarLabel: 'Perfil', // Texto de la etiqueta de la pestaña
                }}
            />

            {/* Pestaña de Configuración */}
            <Tab.Screen
                name="Configuración" // Nombre de la ruta
                component={ConfiguracionesStack} // El componente asociado es un Stack Navigator
                options={{
                    headerShown: false, // Oculta el encabezado del Tab Navigator
                    tabBarIcon: ({ color, size }) => (
                        // Icono de "engranaje" de Ionicons
                        <Ionicons name="settings-outline" size={size + 2} color={color} />
                    ),
                    tabBarLabel: 'Configuración', // Texto de la etiqueta de la pestaña
                }}
            />

            {/*
                Las siguientes pestañas están comentadas. Para habilitarlas, simplemente descomenta
                el bloque <Tab.Screen> correspondiente. Asegúrate de que el `import` para el
                Stack Navigator respectivo también esté descomentado arriba.
            */}
            {/*
            <Tab.Screen
                name="CitasStack"
                component={CitasStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="calendar-month-outline" size={size} color={color} />),
                    tabBarLabel: 'Citas',
                }}
            />
            <Tab.Screen
                name="ConsultoriosStack"
                component={ConsultoriosStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="office-building-outline" size={size} color={color} />),
                    tabBarLabel: 'Consultorios',
                }}
            />
            <Tab.Screen
                name="EpsStack"
                component={EpsStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="hospital-building" size={size} color={color} />),
                    tabBarLabel: 'EPS',
                }}
            />
            <Tab.Screen
                name="EspecialidadesStack"
                component={EspecialidadesStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="doctor" size={size} color={color} />),
                    tabBarLabel: 'Especialidades',
                }}
            />
            <Tab.Screen
                name="MedicosStack"
                component={MedicosStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="medical-bag" size={size} color={color} />),
                    tabBarLabel: 'Médicos',
                }}
            />
            <Tab.Screen
                name="PacientesStack"
                component={PacientesStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-group-outline" size={size} color={color} />),
                    tabBarLabel: 'Pacientes',
                }}
            />
            <Tab.Screen
                name="SedesStack"
                component={SedesStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="map-marker-multiple-outline" size={size} color={color} />),
                    tabBarLabel: 'Sedes',
                }}
            />
            */}
        </Tab.Navigator>
    );
}