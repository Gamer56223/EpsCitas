import { createStackNavigator } from "@react-navigation/stack";
import ListarEps from "../../../Screen/Eps/ListarEps";
import EditarEps from "../../../Screen/Eps/EditarEps";
import AgregarEps from "../../../Screen/Eps/AgregarEps";

const Stack = createStackNavigator();

export default function EpsStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarEps"
                component={ListarEps}
                options={{
                    title: "EPS" ,
                }}
            />
            <Stack.Screen
                name= "EditarEps"
                component={EditarEps}
                options={{ title: "Nuevo/Editar EPS" }}
            />
            <Stack.Screen
                name= "CrearEps"
                component={AgregarEps}
                options={{ title: "Nueva EPS" }}
            />
        </Stack.Navigator>
    );
}