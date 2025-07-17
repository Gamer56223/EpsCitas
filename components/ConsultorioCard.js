import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import styles from '../Styles/ConsultorioCardStyles';

/**
 * ConsultorioCard: Componente para mostrar la información de un consultorio.
 * Muestra los detalles del consultorio, incluyendo el nombre de la sede, y botones de acción.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.consultorio - Objeto con los datos del consultorio (Nombre, Numero).
 * @param {string} props.nombreSede - El nombre de la sede a la que pertenece el consultorio.
 * @param {function} props.onEdit - Función que se ejecuta al presionar el botón de editar.
 * @param {function} props.onDelete - Función que se ejecuta al presionar el botón de eliminar.
 */
function ConsultorioCard({ consultorio, nombreSede, onEdit, onDelete, onDetail }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                {/* Muestra el nombre y número del consultorio */}
                <Text style={styles.nombre}>{consultorio.Nombre}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Número:</Text> {consultorio.Numero}</Text>
                {/* Muestra el nombre de la sede asociada al consultorio */}
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Sede:</Text> {nombreSede}</Text>
            </View>
            <View style={styles.actions}>
                {/* Botón para editar el consultorio con ícono de Ionicons */}
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={26} color="#1976D2" />
                </TouchableOpacity>
                {/* Botón para eliminar el consultorio con ícono de Ionicons */}
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={26} color="#D32F2F" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDetail} style={styles.iconBtn}>
                    <Ionicons name="bulb-outline" size={26} color="silver" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

// React.memo optimiza el rendimiento, evitando re-renders innecesarios
// si las props del componente no han cambiado.
export default React.memo(ConsultorioCard);