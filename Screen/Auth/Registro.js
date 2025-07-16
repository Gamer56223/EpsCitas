import { View, Text, TextInput, Alert, ActivityIndicator, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import BottonComponent from "../../components/BottonComponent";
import { useState } from "react";
// *** ESTA ES LA ÚNICA LÍNEA CORRECTA PARA IMPORTAR registerUser ***
import { registerUser } from "../../Src/Servicios/AuthService"; // <-- Esta es la única línea que debe existir para importar registerUser
import styles from "../../Styles/RegistroStyles";
import Icon from 'react-native-vector-icons/MaterialIcons';

/**
 * RegistroScreen: Componente de pantalla para el registro de nuevos usuarios.
 * Permite a los usuarios ingresar sus datos para crear una cuenta (nombre, correo, contraseña, rol).
 * Incluye validaciones de campos y manejo de estado de carga/error.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.navigation - Objeto de navegación de React Navigation para la transición entre pantallas.
 */
export default function RegistroScreen({ navigation }) {
    // Estados para los campos del formulario y el estado de la operación
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("user"); // Rol por defecto
    const [loading, setLoading] = useState(false); // Indica si la operación de registro está en curso
    const [error, setError] = useState(""); // Para mostrar mensajes de error al usuario

    const MIN_PASSWORD_LENGTH = 8; // Longitud mínima requerida para la contraseña

    /**
     * handleRegister: Función asíncrona para gestionar el proceso de registro.
     * Realiza validaciones de los campos, invoca el servicio de registro
     * y maneja las respuestas (éxito, errores de validación, errores de API).
     */
    const handleRegister = async () => {
        setError(""); // Limpia cualquier error previo
        setLoading(true); // Activa el estado de carga

        // Validaciones de campos obligatorios
        if (!name || !email || !password || !confirmPassword || !role) {
            setError("Todos los campos (nombre, correo, contraseña, confirmar contraseña, rol) son obligatorios.");
            setLoading(false);
            return;
        }

        // Validación de longitud mínima de la contraseña
        if (password.length < MIN_PASSWORD_LENGTH) {
            Alert.alert(
                "Error de Contraseña",
                `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`
            );
            setLoading(false);
            return;
        }

        // Validación de coincidencia de contraseñas
        if (password !== confirmPassword) {
            Alert.alert(
                "Error de Contraseña",
                "Las contraseñas no coinciden."
            );
            setLoading(false);
            return;
        }

        try {
            // Llama a 'registerUser'
            const result = await registerUser(name, email, password, role);

            if (result.success) {
                // Si el registro es exitoso, muestra una alerta y navega a la pantalla de Login
                Alert.alert("Éxito", "¡Registro exitoso! Ahora puedes iniciar sesión.");
                navigation.navigate("Login");
            } else {
                // Si el registro falla (por ejemplo, correo ya registrado), muestra el mensaje de error del backend
                Alert.alert(
                    "Error de Registro",
                    result.message || "Ocurrió un error al registrar el usuario."
                );
            }
        } catch (err) {
            // Captura errores inesperados durante la llamada al servicio
            console.error("Error inesperado en el registro:", err);
            Alert.alert(
                "Error",
                "Ocurrió un error inesperado al intentar registrarse."
            );
        } finally {
            setLoading(false); // Desactiva el estado de carga al finalizar la operación
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Registrarse</Text>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <View style={styles.inputContainer}>
                        <Icon name="person" size={24} color="#888" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre Completo"
                            placeholderTextColor="#888"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="email" size={24} color="#888" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Correo Electrónico"
                            placeholderTextColor="#888"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="lock" size={24} color="#888" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#888"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="lock-reset" size={24} color="#888" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar Contraseña"
                            placeholderTextColor="#888"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            autoCapitalize="none"
                        />
                    </View>

                    <Text style={styles.label}>Selecciona tu Rol:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={role}
                            onValueChange={(itemValue) => setRole(itemValue)}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                        >
                            <Picker.Item label="Usuario" value="user" />
                            <Picker.Item label="Administrador" value="admin" />
                        </Picker>
                    </View>

                    <BottonComponent
                        title={loading ? <ActivityIndicator color="#fff" /> : "Registrarse"}
                        onPress={handleRegister}
                        disabled={loading}
                        buttonStyle={styles.registerButtonPrimary}
                        textStyle={styles.buttonText}
                    />
                    <BottonComponent
                        title="¿Ya tienes cuenta?, Iniciar Sesión"
                        onPress={() => navigation.navigate("Login")}
                        buttonStyle={styles.loginButtonSecondary}
                        textStyle={styles.buttonText}
                    />
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}