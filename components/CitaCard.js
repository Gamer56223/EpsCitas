// Ruta: components/CitaCard.js

import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import styles from '../Styles/CitaCardStyles'; // Asegúrate de que esta ruta sea correcta

/**
 * CitaCard: Componente para mostrar la información de una cita médica.
 * Muestra los detalles de la cita y botones para editar, eliminar o ver detalle.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.cita - Objeto con los datos de la cita (Nombre, Fecha, Estado, Hora, Tipo, etc.).
 * @param {string} props.nombreMedico - Nombre del médico asociado a la cita.
 * @param {string} props.nombrePaciente - Nombre del paciente asociado a la cita.
 * @param {string} props.nombreConsultorio - Nombre del consultorio de la cita.
 * @param {string} props.nombreEps - Nombre de la EPS asociada a la cita.
 * @param {function} props.onEdit - Función a ejecutar al presionar el botón de editar.
 * @param {function} props.onDelete - Función a ejecutar al presionar el botón de eliminar.

 * 
 */
function CitaCard({ cita, nombreMedico, nombrePaciente, nombreConsultorio, nombreEps, onEdit, onDelete }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                {/* Muestra los detalles principales de la cita */}
                <Text style={styles.nombre}>{cita.Nombre}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fecha:</Text> {cita.Fecha}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Estado:</Text> {cita.Estado}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Hora:</Text> {cita.Hora}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Tipo:</Text> {cita.Tipo}</Text>
                {/* Opcional: Podrías añadir aquí los nombres relacionados si quieres que se vean en la tarjeta de la lista */}
                {/* <Text style={styles.detalle}><Text style={styles.detalleLabel}>Médico:</Text> {nombreMedico}</Text> */}
                {/* <Text style={styles.detalle}><Text style={styles.detalleLabel}>Paciente:</Text> {nombrePaciente}</Text> */}
                {/* <Text style={styles.detalle}><Text style={styles.detalleLabel}>Consultorio:</Text> {nombreConsultorio}</Text> */}
                {/* <Text style={styles.detalle}><Text style={styles.detalleLabel}>EPS:</Text> {nombreEps}</Text> */}
            </View>
            <View style={styles.actions}>
                {/* Botón de Editar */}
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={26} color="#1976D2" />
                </TouchableOpacity>
                {/* Botón de Eliminar */}
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={26} color="#D32F2F" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default React.memo(CitaCard);