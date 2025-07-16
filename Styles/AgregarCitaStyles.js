import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: "#EBF5FB",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
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
    // Contenedor para el ícono y el campo de texto
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        width: "100%",
    },
    icon: {
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        height: 55,
        paddingRight: 18,
        fontSize: 16,
        color: "#333333",
    },
    inputTextDisplay: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 18,
    },
    
});

export default styles;