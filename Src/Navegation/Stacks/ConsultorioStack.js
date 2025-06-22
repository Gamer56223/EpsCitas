import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarConsultorio from "../../../Screen/Consultorios/ListarConsultorio";
import DetalleConsultorio from "../../../Screen/Consultorios/DetalleConsultorio";
import EditarConsultorio from "../../../Screen/Consultorios/EditarConsultorio";

const Stack = createStackNavigator();

export default function ConsultoriosStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name= "ListarConsultorios"
                component={ListarConsultorio}
                options={{ title: "consultorios" }}
            />
             <Stack.Screen 
                name= "DetalleConsultorios"
                component={DetalleConsultorio}
                options={{ title: "Detalle Consultorio" }}
            />
             <Stack.Screen 
                name= "EditarConsultorios"
                component={EditarConsultorio}
                options={{ title: "Nuevo/Editar Consultorios" }}
            />
        </Stack.Navigator>
    );
}