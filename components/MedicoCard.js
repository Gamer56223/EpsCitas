import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import styles from '../Styles/MedicoCardStyles';

/**
 * MedicoCard: Componente para mostrar la información detallada de un médico.
 * Incluye datos personales, de contacto, documento, estado de actividad y su especialidad,
 * junto con botones para editar o eliminar.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.medico - Objeto con los datos del médico (Nombre, Apellido, Correo, Telefono, TipoDocumento, NumeroDocumento, Activo).
 * @param {string} props.nombreEspecialidad - El nombre de la especialidad del médico.
 * @param {function} props.onEdit - Función a ejecutar al presionar el botón de editar.
 * @param {function} props.onDelete - Función a ejecutar al presionar el botón de eliminar.
 */
function MedicoCard({ medico, nombreEspecialidad, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                {/* Muestra el nombre completo del médico */}
                <Text style={styles.nombre}>{medico.Nombre} {medico.Apellido}</Text>
                {/* Muestra los detalles de contacto y documento del médico */}
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Correo:</Text> {medico.Correo}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Teléfono:</Text> {medico.Telefono}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Tipo Doc.:</Text> {medico.TipoDocumento}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Núm. Doc.:</Text> {medico.NumeroDocumento}</Text>
                {/* Muestra si el médico está activo */}
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Activo:</Text> {medico.Activo ? 'Sí' : 'No'}</Text>
                {/* Muestra el nombre de la especialidad del médico */}
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Especialidad:</Text> {nombreEspecialidad}</Text>
            </View>
            <View style={styles.actions}>
                {/* Botón para editar el médico con ícono de Ionicons */}
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={26} color="#1976D2" />
                </TouchableOpacity>
                {/* Botón para eliminar el médico con ícono de Ionicons */}
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={26} color="#D32F2F" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

// React.memo optimiza el rendimiento, evitando re-renders innecesarios
// si las props del componente no han cambiado.
export default React.memo(MedicoCard);