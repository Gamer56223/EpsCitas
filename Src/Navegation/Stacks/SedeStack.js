import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarSede from "../../../Screen/Sedes/ListarSede";
import EditarSede from "../../../Screen/Sedes/EditarSede";
import AgregarSede from "../../../Screen/Sedes/AgregarSede";
import DetalleSede from "../../../Screen/Sedes/DetalleSede";

const Stack = createStackNavigator();

export default function SedesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarSedes"
                component={ListarSede}
                options={{ title: "Sedes" }}
            />
             <Stack.Screen 
                name= "EditarSede"
                component={EditarSede}
                options={{ title: "Nuevo/Editar Sedes" }}
            />
            <Stack.Screen
                name= "CrearSede" // Nuevo nombre de ruta para la pantalla de creación
                component={AgregarSede} // Asigna el nuevo componente
                options={{ title: "Nueva Sede" }}
            />
            <Stack.Screen
                name= "DetalleSede" // Nuevo nombre de ruta para la pantalla de creación
                component={DetalleSede} // Asigna el nuevo componente
                options={{ title: "Detalle Sede" }}
            />
        </Stack.Navigator>
    );
}