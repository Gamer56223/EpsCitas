import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarPaciente from "../../../Screen/Pacientes/ListarPaciente";
import DetallePaciente from "../../../Screen/Pacientes/DetallePaciente";
import EditarPaciente from "../../../Screen/Pacientes/EditarPaciente";
import AgregarPaciente from "../../../Screen/Pacientes/AgregarPaciente";

const Stack = createStackNavigator();

export default function PacientesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListarPacientes"
                component={ListarPaciente}
                options={{ title: "Pacientes" }}
            />
            <Stack.Screen
                name="DetallePaciente"
                component={DetallePaciente}
                options={{ title: "Detalle Paciente" }}
            />
            <Stack.Screen
                name="EditarPaciente"
                component={EditarPaciente}
                options={{ title: "Editar Paciente" }}
            />
            <Stack.Screen
                name="CrearPaciente"
                component={AgregarPaciente}
                options={{ title: "Nuevo Paciente" }}
            />
        </Stack.Navigator>
    );
}