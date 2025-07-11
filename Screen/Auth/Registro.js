import { View, Text, TextInput, Alert, ActivityIndicator, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import BottonComponent from "../../components/BottonComponent"; 
import { useState } from "react";
import { Register } from "../../Src/Servicios/AuthService";

// Importa los estilos desde el nuevo archivo
import styles from "../../Styles/RegistroStyles"; // <--- RUTA CORREGIDA AQUÍ

export default function RegistroScreen({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async () => {
        setError("");
        setLoading(true);

        if (!name || !email || !password || !confirmPassword || !role) {
            setError("Todos los campos (nombre, correo, contraseña, confirmar contraseña, rol) son obligatorios.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            setLoading(false);
            return;
        }

        try {
            const result = await Register(name, email, password, role);

            if (result.success) {
                Alert.alert("Éxito", "¡Registro exitoso! Ahora puedes iniciar sesión.");
                navigation.navigate("Login");
            } else {
                Alert.alert(
                    "Error de Registro",
                    result.message || "Ocurrió un error al registrar el usuario."
                );
            }
        } catch (err) {
            console.error("Error inesperado en el registro:", err);
            Alert.alert(
                "Error",
                "Ocurrió un error inesperado al intentar registrarse."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Registrarse</Text>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TextInput
                        style={styles.input}
                        placeholder="Nombre Completo"
                        placeholderTextColor="#888"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Correo Electrónico"
                        placeholderTextColor="#888"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="#888"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar Contraseña"
                        placeholderTextColor="#888"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Rol (ej. user o admin)"
                        placeholderTextColor="#888"
                        value={role}
                        onChangeText={setRole}
                        autoCapitalize="none"
                    />

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