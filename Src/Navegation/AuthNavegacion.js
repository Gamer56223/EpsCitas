import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaLogin from '../../Screen/Auth/Login';
import PantallaRegistro from '../../Screen/Auth/Registro';

const Stack = createNativeStackNavigator();

// AuthNavegacion ahora acepta updateUserToken como prop
export default function AuthNavegacion({ updateUserToken }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#007B8C',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                },
                headerTitleAlign: 'center',
                contentStyle: {
                    backgroundColor: '#E0F2F7',
                },
            }}
        >
            <Stack.Screen
                name="Login"
                // CAMBIO CLAVE AQUÍ: Pasamos la prop `navigation` explícitamente
                children={({ navigation }) => <PantallaLogin navigation={navigation} updateUserToken={updateUserToken} />}
                options={{ title: 'Iniciar Sesión' }}
            />
            <Stack.Screen
                name="Registro"
                component={PantallaRegistro}
                options={{ title: 'Registro' }}
            />
        </Stack.Navigator>
    );
}