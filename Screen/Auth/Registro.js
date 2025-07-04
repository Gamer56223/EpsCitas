import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../components/BottonComponent"; // Asumiendo que esta ruta es correcta
import { useState, } from "react";
import { Register } from "../../Src/Servicios/AuthService";


export default function RegistroScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

  const handleRegister = async () => {
    setError(""); 
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError("Todos los campos (nombre, correo, teléfono, contraseña) son obligatorios.");
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
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoCapitalize="none"
      />

      <BottonComponent
        title={loading ? "Registrando..." : "Registrarse"}
        onPress={handleRegister}
        disabled={loading}
      />
      <BottonComponent
        title="¿Ya tienes cuenta?, Iniciar Sesión"
        onPress={() => navigation.navigate("Login")}
        buttonStyle={{ backgroundColor: "#3498DB", marginTop: 10 }} // Estilo diferente para este botón
        textStyle={{ color: "#FFFFFF" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
  },
});