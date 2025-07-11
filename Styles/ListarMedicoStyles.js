import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBF5FB',
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBF5FB',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
        fontWeight: '500',
    },
    emptyListContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    emptyText: {
        fontSize: 18,
        color: '#7F8C8D',
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 25,
    },
    flatListContent: {
        paddingBottom: 20,
    },
    flatListEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonCrear: {
        backgroundColor: '#28A745',
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignSelf: 'center',
        width: '90%',
        marginBottom: 20,
        marginTop: 10,
        shadowColor: "#28A745",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.35,
        shadowRadius: 8,
        elevation: 12,
    },
    botonCrearContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonCrearIcon: {
        marginRight: 10,
    },
    textoBotonCrear: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
});

export default styles;