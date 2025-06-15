import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// === CAMBIO IMPORTANTE AQUÍ ===
// Asegúrate de que el nombre del componente importado y la ruta coincidan EXACTAMENTE
// con el nombre de tu archivo. Si el archivo es 'Configuracion.js', impórtalo como 'Configuracion'.
import Configuracion from "../../../Screen/Configuracion/Configuracion"; // Cambiado de 'Configuración' a 'Configuracion' (sin tilde)

const Stack = createStackNavigator();

export default function ConfiguracionesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ConfiguracionPantalla" // Es buena práctica darle un nombre descriptivo a la pantalla dentro del stack
                component={Configuracion} // Asegúrate que este nombre coincida con el import de arriba
                options={{
                    title: "Configuraciones",
                    headerStyle: { // <-- Agregado para el color de encabezado
                        backgroundColor: '#6A5ACD', // Un color púrpura/lavanda para Configuración
                    },
                    headerTintColor: '#fff', // Color del texto del título y el icono de retroceso
                    headerTitleStyle: {
                        fontWeight: 'bold', // Título en negrita
                    },
                }}
            />
        </Stack.Navigator>
    );
}