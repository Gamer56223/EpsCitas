import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        backgroundColor: "#EBF5FB", // Fondo suave y claro
    },
    container: {
        width: '100%',
        maxWidth: 400,
        padding: 25,
        backgroundColor: "#EBF5FB",
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#2C3E50",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        height: 55,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingHorizontal: 18,
        marginBottom: 20,
        fontSize: 16,
        color: "#333333",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
        width: '100%',
    },
    errorText: {
        color: "#E74C3C", // Rojo más vivo para errores
        textAlign: "center",
        marginBottom: 15,
        fontSize: 15,
        fontWeight: '500',
    },
    // Estilos para los botones BottonComponent
    registerButtonPrimary: {
        backgroundColor: "#1976D2", // Color primario
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        width: "100%", // Ocupa todo el ancho del contenedor
        marginTop: 10,
        shadowColor: "#1976D2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    loginButtonSecondary: {
        backgroundColor: "#6C757D", // Color secundario
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        width: "100%", // Ocupa todo el ancho del contenedor
        marginTop: 10,
        shadowColor: "#6C757D",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default styles;