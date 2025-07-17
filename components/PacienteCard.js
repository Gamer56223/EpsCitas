import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import styles from '../Styles/PacienteCardStyles';

function PacienteCard({ paciente, onEdit, onDelete, onDetail }) {
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
            return dateString;
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{paciente.Nombre} {paciente.Apellido}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Correo:</Text> {paciente.Correo}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Teléfono:</Text> {paciente.Telefono}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Dirección:</Text> {paciente.Direccion}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Tipo Doc.:</Text> {paciente.TipoDocumento}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Núm. Doc.:</Text> {paciente.NumeroDocumento}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nacimiento:</Text> {formatFecha(paciente.FechaNacimiento)}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Género:</Text> {paciente.Genero}</Text>
                {paciente.eps && paciente.eps.Nombre ? (
                    <Text style={styles.detalle}><Text style={styles.detalleLabel}>EPS:</Text> {paciente.eps.Nombre}</Text>
                ) : (
                    <Text style={styles.detalle}><Text style={styles.detalleLabel}>ID EPS:</Text> {paciente.idEps}</Text>
                )}
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={26} color="#1976D2" />
                </TouchableOpacity>
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

export default React.memo(PacienteCard);