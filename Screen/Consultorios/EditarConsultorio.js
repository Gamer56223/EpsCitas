import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent"; // Asegúrate de que la ruta sea correcta

export default function EditarConsultorio({ route, navigation }) {
    // Obtener el ID del consultorio de los parámetros de navegación, si existe
    // Si es un nuevo consultorio, consultorioId será undefined
    const { consultorioId } = route.params || {};

    const [consultorio, setConsultorio] = useState(null);
    const [loading, setLoading] = useState(true);

    // Estados para los campos del formulario
    const [nombre, setNombre] = useState('');
    const [numero, setNumero] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [piso, setPiso] = useState('');

    // Datos de ejemplo para simular la carga de un consultorio a editar
    const consultoriosEjemplo = [
        { id: '1', Nombre: 'Consultorio B2', Numero: '202', Descripcion: 'Consultorio para especialidades generales.', Piso: '2'},
        { id: '2', Nombre: 'Consultorio B3', Numero: '203', Descripcion: 'Consultorio con equipo de rayos X.', Piso: '2'},
        { id: '3', Nombre: 'Consultorio C1', Numero: '506', Descripcion: 'Consultorio de pediatría con área de juegos.', Piso: '5'},
    ];

    useEffect(() => {
        if (consultorioId) {
            // Si hay un consultorioId, significa que estamos editando un consultorio existente
            const foundConsultorio = consultoriosEjemplo.find(c => c.id === consultorioId);
            if (foundConsultorio) {
                setConsultorio(foundConsultorio);
                setNombre(foundConsultorio.Nombre);
                setNumero(foundConsultorio.Numero);
                setDescripcion(foundConsultorio.Descripcion || '');
                setPiso(foundConsultorio.Piso || '');
            } else {
                Alert.alert("Error", "Consultorio no encontrado.");
                navigation.goBack(); // Volver si el consultorio no existe
            }
        } else {
            // Si no hay consultorioId, estamos creando un nuevo consultorio, los campos se quedan vacíos
        }
        setLoading(false);
    }, [consultorioId]);

    const handleSave = () => {
        // Lógica para guardar el consultorio (crear o actualizar)
        const consultorioData = {
            id: consultorioId || new Date().getTime().toString(), // Generar ID si es nuevo
            Nombre: nombre,
            Numero: numero,
            Descripcion: descripcion,
            Piso: piso,
        };
        console.log("Datos a guardar:", consultorioData);
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
                <Text style={styles.loadingText}>Cargando datos del consultorio...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{consultorioId ? "Editar Consultorio" : "Crear Nuevo Consultorio"}</Text>

            <ScrollView style={styles.formScrollView}>
                <View style={styles.formCard}>
                    <Text style={styles.label}>Nombre del Consultorio:</Text>
                    <TextInput
                        style={styles.input}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Ej. Consultorio B2"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Número:</Text>
                    <TextInput
                        style={styles.input}
                        value={numero}
                        onChangeText={setNumero}
                        placeholder="Ej. 202"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Descripción:</Text>
                    <TextInput
                        style={styles.inputTextArea}
                        value={descripcion}
                        onChangeText={setDescripcion}
                        placeholder="Añade una descripción del consultorio..."
                        placeholderTextColor="#999"
                        multiline={true}
                        numberOfLines={4}
                    />

                    <Text style={styles.label}>Piso:</Text>
                    <TextInput
                        style={styles.input}
                        value={piso}
                        onChangeText={setPiso}
                        placeholder="Ej. 2"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
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