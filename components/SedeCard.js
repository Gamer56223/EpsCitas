import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'; // Importar React para React.memo

function SedeCard({ sede, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{sede.Nombre}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Dirección:</Text> {sede.Direccion}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Teléfono:</Text> {sede.Telefono}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={26} color="#1976D2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={26} color="#D32F2F" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default React.memo(SedeCard); // Usar React.memo para optimización

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    info: {
        flex: 1,
        marginRight: 15,
    },
    nombre: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
    },
    detalle: {
        fontSize: 15,
        color: '#555555',
        lineHeight: 22,
    },
    detalleLabel: {
        fontWeight: '600',
        color: '#444444',
    },
    actions: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBtn: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
});