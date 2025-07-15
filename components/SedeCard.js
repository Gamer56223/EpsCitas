import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import styles from '../Styles/SedeCardStyles';

/**
 * SedeCard: Componente para mostrar la información de una sede.
 * Muestra el nombre, dirección y teléfono de la sede, junto con botones para editar o eliminar.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.sede - Objeto con los datos de la sede (Nombre, Direccion, Telefono).
 * @param {function} props.onEdit - Función a ejecutar al presionar el botón de editar.
 * @param {function} props.onDelete - Función a ejecutar al presionar el botón de eliminar.
 */
function SedeCard({ sede, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                {/* Muestra el nombre de la sede */}
                <Text style={styles.nombre}>{sede.Nombre}</Text>
                {/* Muestra la dirección de la sede */}
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Dirección:</Text> {sede.Direccion}</Text>
                {/* Muestra el teléfono de la sede */}
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Teléfono:</Text> {sede.Telefono}</Text>
            </View>
            <View style={styles.actions}>
                {/* Botón para editar la sede con ícono de Ionicons */}
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={26} color="#1976D2" />
                </TouchableOpacity>
                {/* Botón para eliminar la sede con ícono de Ionicons */}
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={26} color="#D32F2F" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

// React.memo optimiza el rendimiento, evitando re-renders innecesarios
// si las props del componente no han cambiado.
export default React.memo(SedeCard);