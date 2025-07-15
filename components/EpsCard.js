import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import styles from '../Styles/EpsCardStyles';

/**
 * EpsCard: Componente para mostrar la información detallada de una EPS.
 * Incluye datos como nombre, dirección, teléfono, NIT y la especialidad asociada,
 * junto con opciones para editar o eliminar.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.eps - Objeto con los datos de la EPS (Nombre, Direccion, Telefono, Nit).
 * @param {string} props.nombreEspecialidad - El nombre de la especialidad asociada a la EPS.
 * @param {function} props.onEdit - Función a ejecutar al presionar el botón de editar.
 * @param {function} props.onDelete - Función a ejecutar al presionar el botón de eliminar.
 */
function EpsCard({ eps, nombreEspecialidad, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                {/* Muestra los detalles principales de la EPS */}
                <Text style={styles.nombre}>{eps.Nombre}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Dirección:</Text> {eps.Direccion}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Teléfono:</Text> {eps.Telefono}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {eps.Nit}</Text>
                {/* Muestra el nombre de la especialidad asociada a la EPS */}
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Especialidad:</Text> {nombreEspecialidad}</Text>
            </View>
            <View style={styles.actions}>
                {/* Botón para editar la EPS con ícono de Ionicons */}
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={26} color="#1976D2" />
                </TouchableOpacity>
                {/* Botón para eliminar la EPS con ícono de Ionicons */}
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={26} color="#D32F2F" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

// React.memo optimiza el rendimiento, evitando re-renders innecesarios
// si las props del componente no han cambiado.
export default React.memo(EpsCard);