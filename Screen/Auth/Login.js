import { View, Text, TextInput, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { useState } from "react";
import { loginUser } from "../../Src/Servicios/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);

        try {
            const result = await loginUser(email, password);
            if (result.success) {
                // Aquí se guardaría el token al inicio de sesión
                // Si tu API devuelve el token en result.data.token, deberías guardarlo así:
                // await AsyncStorage.setItem("userToken", result.data.token); 
                // Y si tu API devuelve datos de usuario, y los guardabas para Perfil, sería así:
                // await AsyncStorage.setItem("userData", JSON.stringify(result.data.user)); 

                Alert.alert("Éxito", "¡Bienvenido!", [
                    {
                        text: "OK",
                        onPress: () => {
                            console.log("Login exitoso, redirigiendo automáticamente...")
                            // En esta versión, la redirección NO es inmediata.
                            // Se espera que AppNavegacion detecte el cambio al reiniciar o reactivarse.
                        }
                    }
                ]);
            } else {
                Alert.alert(
                    "Error de Login",
                    result.message || "Ocurrió un error al iniciar sesión."
                );
            }
        } catch (error) {
            console.error("Error inesperado en login:", error);
            Alert.alert(
                "Error",
                "Ocurrió un error inesperado al intentar iniciar sesión."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Iniciar Sesión</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Correo Electronico"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                    selectionColor="#1976D2"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#888"
                    selectionColor="#1976D2"
                />
                <BottonComponent
                    title="Ingresar"
                    onPress={handleLogin}
                    loading={loading}
                    disabled={loading}
                    color="primary"
                />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 25,
        backgroundColor: "#EBF5FB", 
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
    },
    registerButton: {
        marginTop: 15,
    }
});