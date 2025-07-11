import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: "#EBF5FB", // Fondo para toda la vista
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        paddingBottom: 200, // Aumentar este padding para dar espacio al teclado y la barra de navegación
    },
    container: {
        width: '90%',
        maxWidth: 500,
        padding: 25,
        borderRadius: 15,
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#2C3E50",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        height: 55,
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        paddingHorizontal: 18,
        marginBottom: 18,
        fontSize: 16,
        color: "#333333",
        width: "100%",
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    pickerLabelActual: { // Nuevo estilo para el label del picker
        alignSelf: 'flex-start', // Alinea a la izquierda dentro del contenedor
        marginLeft: 5, // Pequeño margen para separación visual
        marginBottom: 5, // Espacio entre el label y el picker
        fontSize: 16,
        color: '#555',
        fontWeight: '600',
    },
    pickerContainer: {
        borderColor: "#E0E0E0",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 18,
        width: "100%",
        backgroundColor: "#F8F8F8",
        justifyContent: 'center',
        height: 55,
    },
    picker: {
        height: '100%',
        width: "100%",
        color: '#333333',
    },
    pickerItem: {
        fontSize: 16,
        color: '#495057',
    },
    pickerLoading: {
        marginBottom: 18,
    },
    boton: {
        backgroundColor: "#1976D2", // Color azul para guardar cambios
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        marginTop: 20,
        shadowColor: "#1976D2",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    botonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botonIcon: {
        marginRight: 10,
    },
    textoBoton: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    backButton: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#E9ECEF',
    },
    backButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#555',
        fontWeight: '500',
    },
    error: {
        color: "#E74C3C",
        marginTop: 10,
        textAlign: "center",
        fontSize: 15,
        fontWeight: '500',
    },
});

export default styles;