import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import styles from '../Styles/PacienteCardStyles';

/**
 * PacienteCard: Componente para mostrar la información detallada de un paciente.
 * Incluye datos personales, de contacto, documento, fecha de nacimiento, género y la EPS asociada,
 * junto con botones para editar o eliminar.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.paciente - Objeto con los datos del paciente (Nombre, Apellido, Correo, Telefono, Direccion, TipoDocumento, NumeroDocumento, FechaNacimiento, Genero, idEps, y opcionalmente 'eps.Nombre').
 * @param {function} props.onEdit - Función a ejecutar al presionar el botón de editar.
 * @param {function} props.onDelete - Función a ejecutar al presionar el botón de eliminar.
 */
function PacienteCard({ paciente, onEdit, onDelete }) {
    // Función auxiliar para formatear la fecha de nacimiento a un formato legible.
    const formatFecha = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return dateString; // Retorna el string original si hay un error en el formato
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                {/* Muestra el nombre completo del paciente */}
                <Text style={styles.nombre}>{paciente.Nombre} {paciente.Apellido}</Text>
                {/* Detalles de contacto y demográficos del paciente */}
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Correo:</Text> {paciente.Correo}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Teléfono:</Text> {paciente.Telefono}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Dirección:</Text> {paciente.Direccion}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Tipo Doc.:</Text> {paciente.TipoDocumento}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Núm. Doc.:</Text> {paciente.NumeroDocumento}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nacimiento:</Text> {formatFecha(paciente.FechaNacimiento)}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Género:</Text> {paciente.Genero}</Text>
                {/* Muestra el nombre de la EPS si está disponible, de lo contrario, muestra el ID de la EPS */}
                {paciente.eps && paciente.eps.Nombre ? (
                    <Text style={styles.detalle}><Text style={styles.detalleLabel}>EPS:</Text> {paciente.eps.Nombre}</Text>
                ) : (
                    <Text style={styles.detalle}><Text style={styles.detalleLabel}>ID EPS:</Text> {paciente.idEps}</Text>
                )}
            </View>
            <View style={styles.actions}>
                {/* Botón para editar el paciente con ícono de Ionicons */}
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={26} color="#1976D2" />
                </TouchableOpacity>
                {/* Botón para eliminar el paciente con ícono de Ionicons */}
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={26} color="#D32F2F" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

// React.memo optimiza el rendimiento, evitando re-renders innecesarios
// si las props del componente no han cambiado.
export default React.memo(PacienteCard);