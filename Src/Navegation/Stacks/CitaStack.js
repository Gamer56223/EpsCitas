import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Importa las pantallas relacionadas con las citas
import ListarCita from "../../../Screen/Citas/ListarCita";
import DetalleCita from "../../../Screen/Citas/DetalleCita";
import EditarCita from "../../../Screen/Citas/EditarCita";
import AgregarCita from "../../../Screen/Citas/AgregarCita";

// Crea una instancia de Stack Navigator
const Stack = createStackNavigator();

/**
 * CitasStack: Componente que define la estructura de navegación de pila para las pantallas de citas.
 * Este componente agrupa todas las pantallas relacionadas con la gestión de citas,
 * permitiendo la navegación entre ellas.
 */
export default function CitasStack () {
    return (
        <Stack.Navigator
            // Opciones de pantalla por defecto para el Stack Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#007BFF', // Color de fondo para el encabezado
                },
                headerTintColor: '#fff', // Color del texto y los iconos en el encabezado
                headerTitleStyle: {
                    fontWeight: 'bold', // Estilo del texto del título del encabezado
                },
                headerBackTitleVisible: false, // Oculta el título del botón de retroceso en iOS
            }}
        >
            {/* Pantalla para listar todas las citas */}
            <Stack.Screen
                name= "ListarCitas"
                component={ListarCita}
                options={{ title: "Citas Programadas" }} // Título del encabezado para esta pantalla
            />
            {/* Pantalla para mostrar los detalles de una cita específica */}
            <Stack.Screen
                name= "DetalleCitas"
                component={DetalleCita}
                options={{ title: "Detalle de Cita" }} // Título del encabezado
            />
            {/* Pantalla para editar una cita existente */}
            <Stack.Screen
                name= "EditarCitas"
                component={EditarCita}
                options={{ title: "Editar Cita" }} // Título del encabezado
            />
            {/* Pantalla para agregar una nueva cita */}
            <Stack.Screen
                name= "CrearCita"
                component={AgregarCita}
                options={{ title: "Nueva Cita" }} // Título del encabezado
            />

        </Stack.Navigator>
    );
}