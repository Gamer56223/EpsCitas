import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 30,
        backgroundColor: "#F5F8FA",
    },
    container: {
        width: '90%',
        maxWidth: 420,
        padding: 30,
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "#2C3E50",
        marginBottom: 35,
        textAlign: "center",
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 15,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    icon: {
        marginRight: 12,
        color: "#888",
    },

    input: {
        flex: 1,
        height: 55,
        fontSize: 16,
        color: "#333333",
        paddingVertical: 0,
    },

    errorText: {
        color: "#E74C3C",
        textAlign: "center",
        marginBottom: 15,
        fontSize: 14,
        fontWeight: '600',
    },
    label: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
        marginTop: 5,
        width: '100%',
        textAlign: 'left',
        fontWeight: '500',
    },
    pickerContainer: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        alignSelf: 'center',
        overflow: 'hidden',
        backgroundColor: '#F8F8F8',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    picker: {
        height: 55,
        width: '100%',
        color: '#333333',
    },
    pickerItem: {
        fontSize: 16,
        color: '#333333',
    },

    // --- ESTILOS PARA HACER LOS BOTONES MÁS PEQUEÑOS ---
    registerButtonPrimary: {
        backgroundColor: "#2196F3",
        paddingVertical: 12, // CONTROL DE ALTURA DEL BOTÓN
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
        marginTop: 20,
        shadowColor: "#2196F3",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 8,
    },
    loginButtonSecondary: {
        backgroundColor: "#9E9E9E",
        paddingVertical: 12, // CONTROL DE ALTURA DEL BOTÓN
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
        marginTop: 10,
        shadowColor: "#9E9E9E",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 15, // CONTROL DE TAMAÑO DEL TEXTO DEL BOTÓN
        textTransform: 'uppercase',
    },
});

export default styles;