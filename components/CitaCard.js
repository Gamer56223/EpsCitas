// Ruta: components/CitaCard.js

import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import styles from '../Styles/CitaCardStyles';

const parsearFechaHora = (fechaStr, horaStr) => {
  if (!fechaStr || !horaStr) {
    return new Date();
  }
  try {
    const partesFecha = fechaStr.split('-');
    const anio = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10) - 1;
    const dia = parseInt(partesFecha[2], 10);
    const partesHora = horaStr.split(':');
    const horas = parseInt(partesHora[0], 10);
    const minutos = parseInt(partesHora[1], 10);
    const fechaFinal = new Date(anio, mes, dia, horas, minutos);
    if (isNaN(fechaFinal.getTime())) {
      return new Date();
    }
    return fechaFinal;
  } catch (error) {
    console.error("Error al parsear fecha y hora:", error);
    return new Date();
  }
};


function CitaCard({ cita, nombreMedico, nombrePaciente, nombreConsultorio, nombreEps, onEdit, onDelete }) {
    
    const fechaHoraCita = parsearFechaHora(cita.Fecha, cita.Hora);

    const fechaMostrada = fechaHoraCita.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    const horaMostrada = fechaHoraCita.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{cita.Nombre}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fecha:</Text> {fechaMostrada}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Hora:</Text> {horaMostrada}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Estado:</Text> {cita.Estado}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Tipo:</Text> {cita.Tipo}</Text>
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

export default React.memo(CitaCard);