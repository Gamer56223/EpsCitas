import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent"; 

export default function EditarCita({ route, navigation }) {

    const { citaId } = route.params || {};

    const [cita, setCita] = useState(null);
    const [loading, setLoading] = useState(true);

  
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [estado, setEstado] = useState('');
    const [hora, setHora] = useState('');
    const [tipo, setTipo] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const citasEjemplo = [
        { id: '1', Nombre: 'Consulta General', Fecha: '2025-07-01', Estado: 'Activo', Hora: '10:00 AM', Tipo: 'Consulta', Observaciones: 'Paciente con síntomas leves de resfriado.' },
        { id: '2', Nombre: 'Revisión Dental', Fecha: '2025-07-05', Estado: 'Activo', Hora: '03:30 PM', Tipo: 'Revisión', Observaciones: 'Revisión anual y limpieza.' },
        { id: '3', Nombre: 'Terapia Física', Fecha: '2025-07-10', Estado: 'Inactivo', Hora: '09:00 AM', Tipo: 'urgencia', Observaciones: 'Sesión para rehabilitación de rodilla.' },
    ];

    useEffect(() => {
        if (citaId) {
            const foundCita = citasEjemplo.find(c => c.id === citaId);
            if (foundCita) {
                setCita(foundCita);
                setNombre(foundCita.Nombre);
                setFecha(foundCita.Fecha);
                setEstado(foundCita.Estado);
                setHora(foundCita.Hora);
                setTipo(foundCita.Tipo);
                setObservaciones(foundCita.Observaciones || '');
            } else {
                Alert.alert("Error", "Cita no encontrada.");
                navigation.goBack(); // Volver si la cita no existe
            }
        } else {
        }
        setLoading(false);
    }, [citaId]);

    const handleSave = () => {
        const citaData = {
            id: citaId || new Date().getTime().toString(), // Generar ID si es nueva
            Nombre: nombre,
            Fecha: fecha,
            Estado: estado,
            Hora: hora,
            Tipo: tipo,
            Observaciones: observaciones,
        };
        console.log("Datos a guardar:", citaData);
        Alert.alert("Guardar", "Funcionalidad de guardar pendiente. Datos en consola.");
        navigation.goBack(); 
    };

    const handleCancel = () => {
        navigation.goBack(); 
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={styles.loadingText}>Cargando datos de la cita...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{citaId ? "Editar Cita" : "Crear Nueva Cita"}</Text>

            <ScrollView style={styles.formScrollView}>
                <View style={styles.formCard}>
                    <Text style={styles.label}>Nombre de la Cita:</Text>
                    <TextInput
                        style={styles.input}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Ej. Consulta General"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Fecha:</Text>
                    <TextInput
                        style={styles.input}
                        value={fecha}
                        onChangeText={setFecha}
                        placeholder="Ej. 2025-07-01"
                        placeholderTextColor="#999"
                        keyboardType="default" // Podrías usar 'datetime' o una librería de selección de fecha
                    />

                    <Text style={styles.label}>Estado:</Text>
                    <TextInput
                        style={styles.input}
                        value={estado}
                        onChangeText={setEstado}
                        placeholder="Ej. Activo / Inactivo"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Hora:</Text>
                    <TextInput
                        style={styles.input}
                        value={hora}
                        onChangeText={setHora}
                        placeholder="Ej. 10:00 AM"
                        placeholderTextColor="#999"
                        keyboardType="default" 
                    />

                    <Text style={styles.label}>Tipo:</Text>
                    <TextInput
                        style={styles.input}
                        value={tipo}
                        onChangeText={setTipo}
                        placeholder="Ej. Consulta / Revisión / Urgencia"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Observaciones:</Text>
                    <TextInput
                        style={styles.inputTextArea}
                        value={observaciones}
                        onChangeText={setObservaciones}
                        placeholder="Añade observaciones aquí..."
                        placeholderTextColor="#999"
                        multiline={true}
                        numberOfLines={4}
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
    inputTextArea: {
        borderColor: "#BDC3C7",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10, // Ajuste para multiline
        fontSize: 16,
        color: "#34495E",
        backgroundColor: "#F9F9F9",
        marginBottom: 15,
        minHeight: 100, // Altura mínima para el área de texto
        textAlignVertical: 'top', // Para que el texto empiece arriba
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