import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import React, { useState } from "react";
import { Register } from "../../Src/Navegation/Services/AuthService"; 

export default function RegistroScreen({ navigation }) {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState(""); 
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const [role, setRole] = useState("user"); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async () => {
        setError("");
        setLoading(true);

      
        if (!name || !email || !password || !confirmarPassword || !role) {
            setError("Todos los campos (nombre, correo, contraseña, rol) son obligatorios.");
            setLoading(false);
            return;
        }

        if (password !== confirmarPassword) {
            setError("Las contraseñas no coinciden.");
            setLoading(false);
            return;
        }

        try {
            const result = await Register(name, email, password, role);

            if (result.success) {
                Alert.alert("Éxito", "¡Registro exitoso! Ahora puedes iniciar sesión.");
                navigation.navigate("Login");
                // Limpiar campos
                setName('');
                setEmail('');
                setTelefono(''); // Se limpia aunque no se envíe
                setPassword('');
                setConfirmarPassword('');
                setRole('user'); 
            } else {
                setError(result.message || "Ocurrió un error desconocido al registrarte.");
            }
        } catch (err) {
            console.error("Error inesperado durante el registro:", err);
            setError("Error de conexión. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>

            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Nombre Completo"
                value={name} 
                onChangeText={setName} 
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
            />
            
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                secureTextEntry
                value={confirmarPassword}
                onChangeText={setConfirmarPassword}
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Rol (ej. user, admin)"
                value={role} // <-- Usa el estado 'role'
                onChangeText={setRole} // <-- Actualiza el estado 'role'
                autoCapitalize="none"
                editable={!loading}
            />

            <BottonComponent
                title={loading ? "Registrando..." : "Registrarse"}
                onPress={handleRegister}
                disabled={loading}
                buttonStyle={styles.registerButton}
                textStyle={styles.buttonText}
            />
            <BottonComponent
                title="Iniciar Sesión"
                onPress={() => navigation.navigate("Login")}
                disabled={loading}
                buttonStyle={styles.loginButton}
                textStyle={styles.buttonText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#F0F4F8",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        color: "#2C3E50",
    },
    input: {
        height: 50,
        borderColor: "#BDC3C7",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 15,
        backgroundColor: "#FFFFFF",
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    errorMessage: {
        color: "#E74C3C",
        textAlign: "center",
        marginBottom: 15,
        fontSize: 14,
    },
    registerButton: {
        backgroundColor: "#28B463",
        paddingVertical: 14,
        borderRadius: 8,
        marginVertical: 8,
        shadowColor: "#239B56",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    loginButton: {
        backgroundColor: "#3498DB",
        paddingVertical: 14,
        borderRadius: 8,
        marginVertical: 8,
        shadowColor: "#2874A6",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 17,
        textAlign: "center",
    },
});