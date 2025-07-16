import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarConsultorio from "../../../Screen/Consultorios/ListarConsultorio";
import EditarConsultorio from "../../../Screen/Consultorios/EditarConsultorio";
import AgregarConsultorio from "../../../Screen/Consultorios/AgregarConsultorio";

const Stack = createStackNavigator();

export default function ConsultoriosStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarConsultorios"
                component={ListarConsultorio}
                options={{ title: "Consultorios" }}
            />
             <Stack.Screen
                name= "EditarConsultorios"
                component={EditarConsultorio}
                options={{ title: "Editar Consultorio" }}
            />
            <Stack.Screen
                name= "CrearConsultorio"
                component={AgregarConsultorio}
                options={{ title: "Nuevo Consultorio" }}
            />
        </Stack.Navigator>
    );
}