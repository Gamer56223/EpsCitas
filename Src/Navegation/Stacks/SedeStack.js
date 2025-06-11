import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarSede from "../../../Screen/Sedes/ListarSede";
import DetalleSede from "../../../Screen/Sedes/DetalleSede";
import EditarSede from "../../../Screen/Sedes/EditarSede";

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
                name= "DetalleSedes"
                component={DetalleSede}
                options={{ title: "Detalle Sede" }}
            />
             <Stack.Screen 
                name= "EditarSedes"
                component={EditarSede}
                options={{ title: "Nuevo/Editar Sedes" }}
            />
        </Stack.Navigator>
    );
}