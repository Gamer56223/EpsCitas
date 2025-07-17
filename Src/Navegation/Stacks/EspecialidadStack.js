import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarEspecialidad from "../../../Screen/Especialidades/ListarEspecialidad";
import DetalleEspecialidad from "../../../Screen/Especialidades/DetalleEspecialidad";
import EditarEspecialidad from "../../../Screen/Especialidades/EditarEspecialidad";
import AgregarEspecialidad from "../../../Screen/Especialidades/AgregarEspecialidad";

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
                name= "EditarEspecialidad"
                component={EditarEspecialidad}
                options={{ title: "Editar Especialidad" }}
            />
            <Stack.Screen
                name= "CrearEspecialidad"
                component={AgregarEspecialidad}
                options={{ title: "Nueva Especialidad" }}
            />
            <Stack.Screen
                name= "DetalleEspecialidad"
                component={DetalleEspecialidad}
                options={{ title: "Nuevo Detalle Especialidad" }}
            />
        </Stack.Navigator>
    );
}