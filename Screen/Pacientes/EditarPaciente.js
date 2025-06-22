import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent"; 

export default function EditarPaciente({ route, navigation }) {
    const { pacienteId } = route.params || {};

    const [paciente, setPaciente] = useState(null);
    const [loading, setLoading] = useState(true);

    // Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');

    // Datos de ejemplo para simular la carga de un Paciente a editar
    const pacientesEjemplo = [
        { id: '1', Nombre: 'Angie', Apellido: 'Cardenas', Correo: 'cardenas@gmail.com', Telefono: '3108909090', TipoDocumento: 'CC', NumeroDocumento: '1052836128', FechaNacimiento: '04/05/2007', Genero: 'Femenino'},
        { id: '2', Nombre: 'Carlos', Apellido: 'Rodríguez', Correo: 'carlol@gmail.com', Telefono: '3213595990', TipoDocumento: 'CC', NumeroDocumento: '1052836122', FechaNacimiento: '04/12/2003', Genero: 'Masculino'},
        { id: '3', Nombre: 'Diane', Apellido: 'León', Correo: 'diane@gmail.com', Telefono: '3107890890', TipoDocumento: 'CC', NumeroDocumento: '1052836120', FechaNacimiento: '17/06/1988', Genero: 'Femenino'},
    ];

    useEffect(() => {
        if (pacienteId) {
            // Si hay un pacienteId, significa que estamos editando un paciente existente
            const foundPaciente = pacientesEjemplo.find(p => p.id === pacienteId);
            if (foundPaciente) {
                setPaciente(foundPaciente);
                setNombre(foundPaciente.Nombre);
                setApellido(foundPaciente.Apellido);
                setCorreo(foundPaciente.Correo);
                setTelefono(foundPaciente.Telefono);
                setTipoDocumento(foundPaciente.TipoDocumento);
                setNumeroDocumento(foundPaciente.NumeroDocumento);
                setFechaNacimiento(foundPaciente.FechaNacimiento);
                setGenero(foundPaciente.Genero);
            } else {
                Alert.alert("Error", "Paciente no encontrado.");
                navigation.goBack(); // Volver si el paciente no existe
            }
        } else {
            // Si no hay pacienteId, estamos creando un nuevo paciente, los campos se quedan vacíos
        }
        setLoading(false);
    }, [pacienteId]);

    const handleSave = () => {
        // Lógica para guardar el Paciente (crear o actualizar)
        const pacienteData = {
            id: pacienteId || new Date().getTime().toString(), // Generar ID si es nuevo
            Nombre: nombre,
            Apellido: apellido,
            Correo: correo,
            Telefono: telefono,
            TipoDocumento: tipoDocumento,
            NumeroDocumento: numeroDocumento,
            FechaNacimiento: fechaNacimiento,
            Genero: genero,
        };
        console.log("Datos a guardar:", pacienteData);
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
                <Text style={styles.loadingText}>Cargando datos del Paciente...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{pacienteId ? "Editar Paciente" : "Registrar Nuevo Paciente"}</Text>

            <ScrollView style={styles.formScrollView}>
                <View style={styles.formCard}>
                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Ej. Ana"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Apellido:</Text>
                    <TextInput
                        style={styles.input}
                        value={apellido}
                        onChangeText={setApellido}
                        placeholder="Ej. García"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Correo:</Text>
                    <TextInput
                        style={styles.input}
                        value={correo}
                        onChangeText={setCorreo}
                        placeholder="Ej. ana.garcia@example.com"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
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

                    <Text style={styles.label}>Tipo de Documento:</Text>
                    <TextInput
                        style={styles.input}
                        value={tipoDocumento}
                        onChangeText={setTipoDocumento}
                        placeholder="Ej. CC, TI, Pasaporte"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Número de Documento:</Text>
                    <TextInput
                        style={styles.input}
                        value={numeroDocumento}
                        onChangeText={setNumeroDocumento}
                        placeholder="Ej. 1234567890"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Fecha de Nacimiento:</Text>
                    <TextInput
                        style={styles.input}
                        value={fechaNacimiento}
                        onChangeText={setFechaNacimiento}
                        placeholder="DD/MM/AAAA"
                        placeholderTextColor="#999"
                        keyboardType="numbers-and-punctuation" // O podrías usar 'default' y una librería de selección de fecha
                    />

                    <Text style={styles.label}>Género:</Text>
                    <TextInput
                        style={styles.input}
                        value={genero}
                        onChangeText={setGenero}
                        placeholder="Ej. Masculino / Femenino / Otro"
                        placeholderTextColor="#999"
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
    inputTextArea: { // En caso de que necesites un área de texto más grande
        borderColor: "#BDC3C7",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: "#34495E",
        backgroundColor: "#F9F9F9",
        marginBottom: 15,
        minHeight: 100,
        textAlignVertical: 'top',
    },
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