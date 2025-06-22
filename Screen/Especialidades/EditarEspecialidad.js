import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent"; 

export default function EditarEspecialidad({ route, navigation }) {
    
    const { especialidadId } = route.params || {};

    const [especialidad, setEspecialidad] = useState(null);
    const [loading, setLoading] = useState(true);

    // Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [area, setArea] = useState('');

   
    const especialidadesEjemplo = [
        { id: '1', Nombre: 'Cardiología', Descripcion: 'Estudio y tratamiento de enfermedades del corazón y el sistema circulatorio.', Area: 'Medicina Interna'},
        { id: '2', Nombre: 'Dermatología', Descripcion: 'Diagnóstico y tratamiento de enfermedades de la piel, cabello y uñas.', Area: 'Medicina General'},
        { id: '3', Nombre: 'Pediatría', Descripcion: 'Atención médica integral para bebés, niños y adolescentes.', Area: 'Medicina Familiar'},
    ];

    useEffect(() => {
        if (especialidadId) {
            const foundEspecialidad = especialidadesEjemplo.find(e => e.id === especialidadId);
            if (foundEspecialidad) {
                setEspecialidad(foundEspecialidad);
                setNombre(foundEspecialidad.Nombre);
                setDescripcion(foundEspecialidad.Descripcion || '');
                setArea(foundEspecialidad.Area || '');
            } else {
                Alert.alert("Error", "Especialidad no encontrada.");
                navigation.goBack(); 
            }
        } else {
            // Si no hay especialidadId, estamos creando una nueva especialidad, los campos se quedan vacíos
        }
        setLoading(false);
    }, [especialidadId]);

    const handleSave = () => {
        
        const especialidadData = {
            id: especialidadId || new Date().getTime().toString(), // Generar ID si es nueva
            Nombre: nombre,
            Descripcion: descripcion,
            Area: area,
        };
        console.log("Datos a guardar:", especialidadData);
        Alert.alert("Guardar", "Funcionalidad de guardar pendiente. Datos en consola.");
        // llamar a  API para guardar
        // Por ejemplo: api.post('/especialidades', especialidadData) o api.put(`/especialidades/${especialidadId}`, especialidadData)
        navigation.goBack(); // Volver a la pantalla anterior después de guardar
    };

    const handleCancel = () => {
        navigation.goBack(); // Volver sin guardar cambios
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={styles.loadingText}>Cargando datos de la Especialidad...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{especialidadId ? "Editar Especialidad" : "Crear Nueva Especialidad"}</Text>

            <ScrollView style={styles.formScrollView}>
                <View style={styles.formCard}>
                    <Text style={styles.label}>Nombre de la Especialidad:</Text>
                    <TextInput
                        style={styles.input}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Ej. Cardiología"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Descripción:</Text>
                    <TextInput
                        style={styles.inputTextArea}
                        value={descripcion}
                        onChangeText={setDescripcion}
                        placeholder="Añade una descripción de la especialidad..."
                        placeholderTextColor="#999"
                        multiline={true}
                        numberOfLines={4}
                    />

                    <Text style={styles.label}>Área:</Text>
                    <TextInput
                        style={styles.input}
                        value={area}
                        onChangeText={setArea}
                        placeholder="Ej. Medicina Interna"
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