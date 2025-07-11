import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Perfil from "../../../Screen/Perfil/Perfil";

const Stack = createStackNavigator();

// PerfilesStack ahora acepta updateUserToken como prop
export default function PerfilesStack ({ updateUserToken }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "Perfil" 
                // Pasamos updateUserToken como prop a la pantalla Perfil
                children={() => <Perfil updateUserToken={updateUserToken} />}
                options={{ title: "Perfiles" }}
            />
        </Stack.Navigator>
    );
}
