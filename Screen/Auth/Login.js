import { View, Text, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { useState } from "react";
import { loginUser } from "../../Src/Servicios/AuthService";
// import AsyncStorage from "@react-native-async-storage/async-storage"; // No se usa directamente aquí, pero podría ser relevante para la persistencia del token.

import styles from '../../Styles/LoginStyles'; // Importa los estilos específicos para la pantalla de Login
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importa el componente Icon de MaterialIcons para los íconos de los inputs

/**
 * LoginScreen: Componente de pantalla para el inicio de sesión de usuarios.
 * Permite a los usuarios ingresar sus credenciales (correo y contraseña)
 * y manejar el proceso de autenticación.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation para la transición entre pantallas.
 * @param {function} props.updateUserToken - Función para actualizar el token de autenticación del usuario en el estado global de la aplicación.
 */
export default function LoginScreen({ navigation, updateUserToken }) {
    // Estados para almacenar el correo electrónico, la contraseña y el estado de carga del botón.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Indica si la operación de login está en curso

    /**
     * handleLogin: Función asíncrona para manejar el proceso de inicio de sesión.
     * Valida los campos, llama al servicio de autenticación y gestiona las respuestas (éxito/error).
     */
    const handleLogin = async () => {
        // Valida que los campos de correo y contraseña no estén vacíos.
        if (!email || !password) {
            Alert.alert("Campos Vacíos", "Por favor, ingresa tu correo y contraseña.");
            return;
        }

        setLoading(true); // Activa el estado de carga del botón

        try {
            // Llama al servicio de autenticación para intentar iniciar sesión.
            const result = await loginUser(email, password);

            if (result.success) {
                // Si el login es exitoso, muestra una alerta de bienvenida y actualiza el token.
                Alert.alert("Éxito", "¡Bienvenido!", [
                    {
                        text: "OK",
                        onPress: () => {
                            console.log("Login exitoso, redirigiendo automáticamente...");
                            // Llama a la función proporcionada por las props para actualizar el token global.
                            if (updateUserToken) {
                                updateUserToken(result.token);
                            }
                        }
                    }
                ]);
            } else {
                // Si el login falla, muestra un mensaje de error específico.
                Alert.alert(
                    "Error de Login",
                    result.message || "Ocurrió un error al iniciar sesión." // Usa el mensaje del servidor o uno genérico
                );
            }
        } catch (error) {
            // Captura errores inesperados durante el proceso de login.
            console.error("Error inesperado en login:", error);
            Alert.alert(
                "Error",
                "Ocurrió un error inesperado al intentar iniciar sesión."
            );
        } finally {
            setLoading(false); // Desactiva el estado de carga, sin importar el resultado
        }
    };

    return (
        // TouchableWithoutFeedback y Keyboard.dismiss permiten ocultar el teclado al tocar fuera de los inputs.
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Iniciar Sesión</Text>

                {/* Contenedor del campo de correo electrónico con ícono */}
                <View style={styles.inputContainer}>
                    <Icon name="email" size={24} color="#888" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Correo Electronico"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address" // Configura el teclado para correos
                        autoCapitalize="none"        // Evita que la primera letra se ponga en mayúscula automáticamente
                        placeholderTextColor="#888"
                        selectionColor="#1976D2"     // Color del cursor
                    />
                </View>

                {/* Contenedor del campo de contraseña con ícono */}
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={24} color="#888" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry              // Oculta el texto de la contraseña
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#888"
                        selectionColor="#1976D2"
                    />
                </View>

                {/* Botón personalizado para iniciar sesión */}
                <BottonComponent
                    title="Ingresar"
                    onPress={handleLogin}
                    loading={loading} // Pasa el estado de carga al botón
                    disabled={loading} // Deshabilita el botón mientras carga
                    color="primary"
                />
                {/* Botón para navegar a la pantalla de registro */}
                <BottonComponent
                    title="¿No tienes cuenta?, Regístrate"
                    onPress={() => navigation.navigate("Registro")}
                    color="secondary"
                    size="small"
                    style={styles.registerButton}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}