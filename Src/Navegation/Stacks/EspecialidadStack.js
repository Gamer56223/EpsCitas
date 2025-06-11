import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarEspecialidad from "../../../Screen/Especialidades/ListarEspecialidad";
import DetalleEspecialidad from "../../../Screen/Especialidades/DetalleEspecialidad";
import EditarEspecialidad from "../../../Screen/Especialidades/EditarEspecialidad";

const Stack = createStackNavigator();

export default function EspecialidadesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarEspecialidades"
                component={ListarEspecialidad}
                options={{ title: "Especialidad" }}
            />
             <Stack.Screen 
                name= "DetalleEspecialidad"
                component={DetalleEspecialidad}
                options={{ title: "Detalle Especialidad" }}
            />
             <Stack.Screen 
                name= "EditarEspecialidad"
                component={EditarEspecialidad}
                options={{ title: "Nuevo/Editar Especialidad" }}
            />
        </Stack.Navigator>
    );
}