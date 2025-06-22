import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent"; 

export default function EditarSede({ route, navigation }) {
    const { sedeId } = route.params || {};

    const [sede, setSede] = useState(null);
    const [loading, setLoading] = useState(true);

    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');

    // Datos de ejemplo para simular la carga de una Sede a editar
    const sedesEjemplo = [
        { id: '1', Nombre: 'Sede Santa Fe', Direccion: 'Calle 57 - El Campin', Telefono: '3108909090'},
        { id: '2', Nombre: 'Sede Soacha', Direccion: 'Calle 22', Telefono: '7603102'},
        { id: '3', Nombre: 'Sede Bosa', Direccion: 'Calle 11', Telefono: '7603100'},
    ];

    useEffect(() => {
        if (sedeId) {
            const foundSede = sedesEjemplo.find(s => s.id === sedeId);
            if (foundSede) {
                setSede(foundSede);
                setNombre(foundSede.Nombre);
                setDireccion(foundSede.Direccion);
                setTelefono(foundSede.Telefono);
            } else {
                Alert.alert("Error", "Sede no encontrada.");
                navigation.goBack();
            }
        } else {
            
        }
        setLoading(false);
    }, [sedeId]);

    const handleSave = () => {
        const sedeData = {
            id: sedeId || new Date().getTime().toString(), // Generar ID si es nueva
            Nombre: nombre,
            Direccion: direccion,
            Telefono: telefono,
        };
        console.log("Datos a guardar:", sedeData);
        Alert.alert("Guardar", "Funcionalidad de guardar pendiente. Datos en consola.");
        navigation.goBack(); // Volver a la pantalla anterior después de guardar
    };

    const handleCancel = () => {
        navigation.goBack(); // Volver sin guardar cambios
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={styles.loadingText}>Cargando datos de la Sede...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{sedeId ? "Editar Sede" : "Registrar Nueva Sede"}</Text>

            <ScrollView style={styles.formScrollView}>
                <View style={styles.formCard}>
                    <Text style={styles.label}>Nombre de la Sede:</Text>
                    <TextInput
                        style={styles.input}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Ej. Sede Central"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Dirección:</Text>
                    <TextInput
                        style={styles.input}
                        value={direccion}
                        onChangeText={setDireccion}
                        placeholder="Ej. Calle Principal #123"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Teléfono:</Text>
                    <TextInput
                        style={styles.input}
                        value={telefono}
                        onChangeText={setTelefono}
                        placeholder="Ej. 3001234567"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                    />

                    <View style={styles.buttonContainer}>
                        <BotonComponent
                            title="Guardar Cambios"
                            onPress={handleSave}
                            buttonStyle={styles.saveButton}
                            textStyle={styles.buttonText}
                        />
                        <BotonComponent
                            title="Cancelar"
                            onPress={handleCancel}
                            buttonStyle={styles.cancelButton}
                            textStyle={styles.buttonText}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E0F2F7", // Fondo suave, consistente
        alignItems: "center",
        paddingTop: 20, // Ajuste para SafeAreaView
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
    },
    loadingText: {
        marginTop: 15,
        fontSize: 18,
        color: '#555',
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 25,
        color: "#2C3E50",
        textAlign: 'center',
    },
    formScrollView: {
        width: "100%",
        paddingHorizontal: 20,
    },
    formCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#34495E",
        marginBottom: 8,
        marginTop: 10,
    },
    input: {
        height: 48,
        borderColor: "#BDC3C7", // Borde suave
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: "#34495E",
        backgroundColor: "#F9F9F9", // Fondo claro para inputs
        marginBottom: 15,
    },
    
    // inputTextArea: {
    //     borderColor: "#BDC3C7",
    //     borderWidth: 1,
    //     borderRadius: 8,
    //     paddingHorizontal: 12,
    //     paddingVertical: 10,
    //     fontSize: 16,
    //     color: "#34495E",
    //     backgroundColor: "#F9F9F9",
    //     marginBottom: 15,
    //     minHeight: 100,
    //     textAlignVertical: 'top',
    // },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: "#28A745", // Verde para guardar
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        minWidth: 140,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: "#6C757D", // Gris para cancelar
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        minWidth: 140,
        alignItems: 'center',
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});