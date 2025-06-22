import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent"; 

export default function EditarMedico({ route, navigation }) {

    const { medicoId } = route.params || {};

    const [medico, setMedico] = useState(null);
    const [loading, setLoading] = useState(true);

   
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [activo, setActivo] = useState(''); 

   
    const medicosEjemplo = [
        { id: '1', Nombre: 'Angie', Apellido: 'Cardenas', Correo: 'cardenas@gmail.com', Telefono: '3108909090', TipoDocumento: 'CC', NumeroDocumento: '1052836128', Activo: 'TRUE'},
        { id: '2', Nombre: 'Carlos', Apellido: 'Rodríguez', Correo: 'carlol@gmail.com', Telefono: '3213595990', TipoDocumento: 'CC', NumeroDocumento: '1052836122', Activo: 'TRUE'},
        { id: '3', Nombre: 'Diane', Apellido: 'León', Correo: 'diane@gmail.com', Telefono: '3107890890', TipoDocumento: 'CC', NumeroDocumento: '1052836120', Activo: 'FALSE'},
    ];

    useEffect(() => {
        if (medicoId) {
            
            const foundMedico = medicosEjemplo.find(m => m.id === medicoId);
            if (foundMedico) {
                setMedico(foundMedico);
                setNombre(foundMedico.Nombre);
                setApellido(foundMedico.Apellido);
                setCorreo(foundMedico.Correo);
                setTelefono(foundMedico.Telefono);
                setTipoDocumento(foundMedico.TipoDocumento);
                setNumeroDocumento(foundMedico.NumeroDocumento);
                setActivo(foundMedico.Activo);
            } else {
                Alert.alert("Error", "Médico no encontrado.");
                navigation.goBack(); // Volver si el médico no existe
            }
        } else {
            // Si no hay medicoId, estamos creando un nuevo médico, los campos se quedan vacíos
        }
        setLoading(false);
    }, [medicoId]);

    const handleSave = () => {
        
        const medicoData = {
            id: medicoId || new Date().getTime().toString(), // Generar ID si es nuevo
            Nombre: nombre,
            Apellido: apellido,
            Correo: correo,
            Telefono: telefono,
            TipoDocumento: tipoDocumento,
            NumeroDocumento: numeroDocumento,
            Activo: activo, // Podrías convertir esto a booleano si tu backend lo espera
        };
        console.log("Datos a guardar:", medicoData);
        Alert.alert("Guardar", "Funcionalidad de guardar pendiente. Datos en consola.");
        // llamar a tu API para guardar
        // Por ejemplo: api.post('/medicos', medicoData) o api.put(`/medicos/${medicoId}`, medicoData)
        navigation.goBack(); // Volver a la pantalla anterior después de guardar
    };

    const handleCancel = () => {
        navigation.goBack(); // Volver sin guardar cambios
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={styles.loadingText}>Cargando datos del Médico...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{medicoId ? "Editar Médico" : "Registrar Nuevo Médico"}</Text>

            <ScrollView style={styles.formScrollView}>
                <View style={styles.formCard}>
                    <Text style={styles.label}>Nombre:</Text>
                    <TextInput
                        style={styles.input}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Ej. Juan"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Apellido:</Text>
                    <TextInput
                        style={styles.input}
                        value={apellido}
                        onChangeText={setApellido}
                        placeholder="Ej. Pérez"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Correo:</Text>
                    <TextInput
                        style={styles.input}
                        value={correo}
                        onChangeText={setCorreo}
                        placeholder="Ej. juan.perez@example.com"
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
                        placeholder="Ej. CC, TI"
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

                    <Text style={styles.label}>Activo (TRUE/FALSE):</Text>
                    <TextInput
                        style={styles.input}
                        value={activo}
                        onChangeText={setActivo}
                        placeholder="Ej. TRUE / FALSE"
                        placeholderTextColor="#999"
                        autoCapitalize="characters" // Para facilitar el ingreso de TRUE/FALSE
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
    switchContainer: { // Estilo para el contenedor del Switch si se usa
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingVertical: 5,
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