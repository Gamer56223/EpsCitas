import { View, Text, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { useState } from "react";
import { loginUser } from "../../Src/Servicios/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from '../../Styles/LoginStyles';

export default function LoginScreen({ navigation, updateUserToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);

        try {
            const result = await loginUser(email, password);
            if (result.success) {
                Alert.alert("Éxito", "¡Bienvenido!", [
                    {
                        text: "OK",
                        onPress: () => {
                            console.log("Login exitoso, redirigiendo automáticamente...")
                            if (updateUserToken) {
                                updateUserToken(result.token);
                            }
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