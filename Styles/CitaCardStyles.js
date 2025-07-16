// Styles/CitaCardStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    info: {
        flex: 1, // Permite que la información ocupe el espacio restante
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    detalle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 3,
    },
    detalleLabel: {
        fontWeight: 'bold',
        color: '#444',
    },
    actions: {
        flexDirection: 'row', // Asegura que los botones estén en fila
        alignItems: 'center',
        // Agrega un poco de espacio entre los botones si es necesario
    },
    iconBtn: {
        padding: 5, // Aumenta el área táctil
        marginLeft: 10, // Espacio entre los iconos
    },
});