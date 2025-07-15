import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import styles from '../Styles/EspecialidadCardStyles';

/**
 * EspecialidadCard: Componente para mostrar la información de una especialidad médica.
 * Presenta el nombre y descripción de la especialidad, junto con opciones para editarla o eliminarla.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.especialidad - Objeto con los datos de la especialidad (Nombre, Descripcion).
 * @param {function} props.onEdit - Función a ejecutar al presionar el botón de editar.
 * @param {function} props.onDelete - Función a ejecutar al presionar el botón de eliminar.
 */
function EspecialidadCard({ especialidad, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                {/* Muestra el nombre de la especialidad */}
                <Text style={styles.nombre}>{especialidad.Nombre}</Text>
                {/* Muestra la descripción de la especialidad */}
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Descripción:</Text> {especialidad.Descripcion}</Text>
            </View>
            <View style={styles.actions}>
                {/* Botón para editar la especialidad, con ícono de lápiz */}
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={26} color="#1976D2" />
                </TouchableOpacity>
                {/* Botón para eliminar la especialidad, con ícono de papelera */}
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={26} color="#D32F2F" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

// React.memo se usa para optimizar el rendimiento, evitando re-renders del componente
// si sus propiedades no han cambiado.
export default React.memo(EspecialidadCard);