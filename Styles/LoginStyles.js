import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 25,
        backgroundColor: "#EBF5FB",
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
    },
    registerButton: {
        marginTop: 15,
    }
});

export default styles;