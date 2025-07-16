import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { editarPerfil } from '../../Src/Servicios/AuthService';
import styles from '../../Styles/EditarPerfilStyles';

export default function EditarPerfil({ navigation }) {
    const route = useRoute();
    const { usuario } = route.params;

    const [name, setName] = useState(usuario?.name || '');
    const [email, setEmail] = useState(usuario?.email || '');
    const [role, setRole] = useState(usuario?.role || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGuardar = async () => {
        if (!name || !email || !role) { 
            Alert.alert("Campos requeridos", "Nombre, correo y rol son obligatorios.");
            return;
        }

        if (password && password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);
        try {
            const data = { name, email, role };
            if (password) {
                data.password = password;
            }

            const result = await editarPerfil(usuario.id, data);

            if (result.success) {
                Alert.alert("Éxito", "Perfil actualizado correctamente.");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo actualizar el perfil.");
            }
        } catch (error) {
            console.error("Error al guardar perfil:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al guardar.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Editar Perfil</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nombre Completo"
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Correo Electrónico"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#888"
                        />
                        
                        <TextInput
                            style={styles.input}
                            placeholder="Rol (ej. user, admin)"
                            value={role}
                            onChangeText={setRole}
                            autoCapitalize="none"
                            placeholderTextColor="#888"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Nueva Contraseña (opcional)"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar Nueva Contraseña"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholderTextColor="#888"
                        />

                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.botonContent}>
                                    <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>Guardar Cambios</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-circle-outline" size={24} color="#555" />
                            <Text style={styles.backButtonText}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}