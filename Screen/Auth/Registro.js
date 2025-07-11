import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import BottonComponent from "../../components/BottonComponent"; // Manteniendo BottonComponent
import { useState } from "react";
import { Register } from "../../Src/Servicios/AuthService";

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
                        // Estilos para el BottonComponent de registro
                        buttonStyle={styles.registerButtonPrimary}
                        textStyle={styles.buttonText}
                    />
                    <BottonComponent
                        title="¿Ya tienes cuenta?, Iniciar Sesión"
                        onPress={() => navigation.navigate("Login")}
                        // Estilos para el BottonComponent de login
                        buttonStyle={styles.loginButtonSecondary}
                        textStyle={styles.buttonText}
                    />
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        backgroundColor: "#EBF5FB", // Fondo suave y claro
    },
    container: {
        width: '100%',
        maxWidth: 400,
        padding: 25,
        backgroundColor: "#EBF5FB",
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#2C3E50",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        height: 55,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingHorizontal: 18,
        marginBottom: 20,
        fontSize: 16,
        color: "#333333",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
        width: '100%',
    },
    errorText: {
        color: "#E74C3C", // Rojo más vivo para errores
        textAlign: "center",
        marginBottom: 15,
        fontSize: 15,
        fontWeight: '500',
    },
    // Estilos para los botones BottonComponent
    registerButtonPrimary: {
        backgroundColor: "#1976D2", // Color primario
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        width: "100%", // Ocupa todo el ancho del contenedor
        marginTop: 10,
        shadowColor: "#1976D2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    loginButtonSecondary: {
        backgroundColor: "#6C757D", // Color secundario
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        width: "100%", // Ocupa todo el ancho del contenedor
        marginTop: 10,
        shadowColor: "#6C757D",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});