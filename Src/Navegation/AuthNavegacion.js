import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaLogin from '../../Screen/Auth/Login'; // Importa la pantalla de Login
import PantallaRegistro from '../../Screen/Auth/Registro'; // Importa la pantalla de Registro

// Crea una instancia de Stack Navigator
const Stack = createNativeStackNavigator();

/**
 * AuthNavegacion: Componente que define la pila de navegación para el flujo de autenticación (Login y Registro).
 *
 * Este componente es responsable de:
 * 1. Configurar las **opciones de estilo** para el encabezado de todas las pantallas dentro de esta pila.
 * 2. Definir las **pantallas** que forman parte del flujo de autenticación.
 * 3. Pasar la función `updateUserToken` a `PantallaLogin` para que pueda actualizar el estado de autenticación
 * en el componente raíz (`AppNavegacion`) una vez que el usuario inicia sesión correctamente.
 *
 * @param {object} props - Propiedades del componente.
 * @param {function} props.updateUserToken - Una función que se utiliza para actualizar el token de autenticación
 * en el componente raíz de la aplicación (usualmente `AppNavegacion`).
 * Recibe el nuevo token como argumento (o `null` para cerrar sesión).
 */
export default function AuthNavegacion({ updateUserToken }) {
    return (
        <Stack.Navigator
            // Opciones de estilo globales para el encabezado de todas las pantallas en esta pila
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#007B8C', // Color de fondo del encabezado
                    shadowColor: '#000', // Color de la sombra para efecto de elevación
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5, // Elevación para Android
                },
                headerTintColor: '#FFFFFF', // Color del texto y los iconos en el encabezado
                headerTitleStyle: {
                    fontWeight: 'bold', // Estilo de la fuente del título
                    fontSize: 20, // Tamaño de la fuente del título
                },
                headerTitleAlign: 'center', // Alinea el título al centro
                contentStyle: {
                    backgroundColor: '#E0F2F7', // Color de fondo del contenido de la pantalla
                },
            }}
        >
            {/* Pantalla de Login */}
            <Stack.Screen
                name="Login" // Nombre de la ruta para esta pantalla
                // Utilizamos una función `children` para pasar props adicionales a `PantallaLogin`.
                // Esto es necesario porque `updateUserToken` es una prop personalizada y no es parte de las props estándar de navegación.
                children={({ navigation }) => (
                    <PantallaLogin
                        navigation={navigation} // Pasamos el objeto `navigation` estándar
                        updateUserToken={updateUserToken} // Pasamos nuestra prop personalizada
                    />
                )}
                options={{ title: 'Iniciar Sesión' }} // Título que se mostrará en el encabezado
            />

            {/* Pantalla de Registro */}
            <Stack.Screen
                name="Registro" // Nombre de la ruta para esta pantalla
                component={PantallaRegistro} // Componente asociado a esta ruta
                options={{ title: 'Registro' }} // Título que se mostrará en el encabezado
            />
        </Stack.Navigator>
    );
}