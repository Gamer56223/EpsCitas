import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottonComponent from "../../components/BottonComponent";
import { editarCita } from "../../Src/Servicios/CitaService";
import * as Notifications from 'expo-notifications';
import styles from "../../Styles/EditarCitaStyles";

const parsearFechaHora = (fechaStr, horaStr) => {
  if (!fechaStr || !horaStr) {
    return new Date();
  }

  try {
    // Se espera fechaStr = "YYYY-MM-DD"
    const partesFecha = fechaStr.split('-');
    const anio = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10) - 1; 
    const dia = parseInt(partesFecha[2], 10);

    // Se espera horaStr = "HH:mm"
    const partesHora = horaStr.split(':');
    const horas = parseInt(partesHora[0], 10);
    const minutos = parseInt(partesHora[1], 10);

    // Se construye el objeto Date con todos los componentes en la zona horaria local
    const fechaFinal = new Date(anio, mes, dia, horas, minutos);

    if (isNaN(fechaFinal.getTime())) {
      return new Date(); // Si la fecha resultante es inválida, usar la actual
    }
    return fechaFinal;
  } catch (error) {
    console.error("Error al parsear fecha y hora:", error);
    return new Date(); // Fallback final
  }
};


export default function EditarCita({ navigation }) {
    const route = useRoute();
    const { cita } = route.params;

    const [dateTime, setDateTime] = useState(new Date());
    const [nombre, setNombre] = useState("");
    const [estado, setEstado] = useState("");
    const [tipo, setTipo] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cita) {
            const newInitialDate = parsearFechaHora(cita?.Fecha, cita?.Hora);
            setDateTime(newInitialDate);
            setNombre(cita?.Nombre || "");
            setEstado(cita?.Estado || "");
            setTipo(cita?.Tipo || "");
        }
    }, [cita]);

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            const newDateTime = new Date(dateTime);
            newDateTime.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
            setDateTime(newDateTime);
        }
    };

    const onChangeTime = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === 'ios');
        if (selectedTime) {
            const newDateTime = new Date(dateTime);
            newDateTime.setHours(selectedTime.getHours());
            newDateTime.setMinutes(selectedTime.getMinutes());
            setDateTime(newDateTime);
        }
    };

    const handleGuardar = async () => {
        const pad = (num) => num.toString().padStart(2, '0');
        const fechaFormateada = `${dateTime.getFullYear()}-${pad(dateTime.getMonth() + 1)}-${pad(dateTime.getDate())}`;
        const horaFormateada = `${pad(dateTime.getHours())}:${pad(dateTime.getMinutes())}`;

        if (!nombre || !estado || !tipo) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos.");
            return;
        }

        const hoyStr = new Date().toISOString().split('T')[0];
        if (fechaFormateada < hoyStr) {
            Alert.alert("Fecha Inválida", "No puedes programar una cita en una fecha pasada.");
            return;
        }

        setLoading(true);
        const result = await editarCita(cita.id, {
            Nombre: nombre,
            Fecha: fechaFormateada,
            Hora: horaFormateada,
            Estado: estado,
            Tipo: tipo
        });
        setLoading(false);

        if (result.success) {
            Alert.alert("Éxito", "Cita actualizada correctamente");
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Cita Actualizada 🔔",
                    body: `Tu cita '${nombre}' ha sido actualizada para el ${fechaFormateada} a las ${horaFormateada}.`,
                },
                trigger: { seconds: 2 },
            });
            navigation.goBack();
        } else {
            Alert.alert("Error", "No se pudo actualizar la cita.");
        }
    };
    
    return (
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Editar Cita</Text>
                        <View style={styles.inputContainer}>
                           <Ionicons name="person-outline" size={24} color="#888" style={styles.icon} />
                           <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="pulse-outline" size={24} color="#888" style={styles.icon} />
                            <TextInput style={styles.input} placeholder="Estado" value={estado} onChangeText={setEstado} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="medkit-outline" size={24} color="#888" style={styles.icon} />
                            <TextInput style={styles.input} placeholder="Tipo" value={tipo} onChangeText={setTipo} />
                        </View>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputContainer}>
                            <Ionicons name="calendar-outline" size={24} color="#888" style={styles.icon} />
                            <Text style={styles.inputTextDisplay}>{dateTime.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.inputContainer}>
                            <Ionicons name="time-outline" size={24} color="#888" style={styles.icon} />
                            <Text style={styles.inputTextDisplay}>{dateTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker value={dateTime} mode="date" display="default" onChange={onChangeDate} />
                        )}
                        {showTimePicker && (
                            <DateTimePicker value={dateTime} mode="time" display="default" onChange={onChangeTime} />
                        )}
                        <BottonComponent title="Guardar Cambios" onPress={handleGuardar} loading={loading} />
                        <BottonComponent title="Cancelar" onPress={() => navigation.goBack()} color="secondary" />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}