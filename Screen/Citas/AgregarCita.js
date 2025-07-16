import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottonComponent from "../../components/BottonComponent";
import { crearCita } from "../../Src/Servicios/CitaService";
import * as Notifications from 'expo-notifications';
import styles from "../../Styles/AgregarCitaStyles";

export default function AgregarCita({ navigation }) {
    // Usamos un solo estado para la fecha y la hora, inicializado a la fecha y hora actual
    const [dateTime, setDateTime] = useState(new Date());

    const [nombre, setNombre] = useState("");
    const [estado, setEstado] = useState("");
    const [tipo, setTipo] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [loading, setLoading] = useState(false);

    // Función para manejar el cambio de fecha
    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            const newDateTime = new Date(dateTime);
            newDateTime.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
            setDateTime(newDateTime);
        }
    };

    // Función para manejar el cambio de hora
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
        const fechaFormateada = dateTime.toISOString().split('T')[0];
        const horaFormateada = `${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}`;

        if (!nombre || !estado || !tipo) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos.");
            return;
        }

        if (dateTime < new Date()) {
            Alert.alert("Fecha/Hora Inválida", "No puedes programar una cita en el pasado.");
            return;
        }

        setLoading(true);
        const result = await crearCita({
            Nombre: nombre,
            Fecha: fechaFormateada,
            Hora: horaFormateada,
            Estado: estado,
            Tipo: tipo
        });
        setLoading(false);

        if (result.success) {
            Alert.alert("Éxito", "Cita creada correctamente");
            
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "¡Nueva Cita Programada! 🗓️",
                    body: `Tu cita '${nombre}' ha sido creada para el ${fechaFormateada} a las ${horaFormateada}.`,
                },
                trigger: { seconds: 2 },
            });

            navigation.goBack();
        } else {
            Alert.alert("Error", "No se pudo crear la cita.");
        }
    };

    // Pide permisos para notificaciones al cargar la pantalla
    useEffect(() => {
        const requestPermissions = async () => {
            const { status } = await Notifications.getPermissionsAsync();
            if (status !== 'granted') {
                await Notifications.requestPermissionsAsync();
            }
        };
        requestPermissions();
    }, []);

    return (
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Nueva Cita</Text>

                        <View style={styles.inputContainer}>
                           <Ionicons name="person-outline" size={24} color="#888" style={styles.icon} />
                           <TextInput style={styles.input} placeholder="Nombre de la cita" value={nombre} onChangeText={setNombre} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="pulse-outline" size={24} color="#888" style={styles.icon} />
                            <TextInput style={styles.input} placeholder="Estado (ej. Programada, Cancelada)" value={estado} onChangeText={setEstado} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons name="medkit-outline" size={24} color="#888" style={styles.icon} />
                            <TextInput style={styles.input} placeholder="Tipo (ej. General, Odontología)" value={tipo} onChangeText={setTipo} />
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
                            <DateTimePicker value={dateTime} mode="date" display="default" onChange={onChangeDate} minimumDate={new Date()} />
                        )}
                        {showTimePicker && (
                            <DateTimePicker value={dateTime} mode="time" display="default" onChange={onChangeTime} />
                        )}

                        <BottonComponent title="Crear Cita" onPress={handleGuardar} loading={loading} />
                        <BottonComponent title="Volver" onPress={() => navigation.goBack()} color="secondary" />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}