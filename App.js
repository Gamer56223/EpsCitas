import AppNavegacion from "./Src/Navegation/AppNavegacion";
import * as Notifications from 'expo-notifications';
import React, {useEffect} from 'react';
import { Button, View } from 'react-native';

export default function App() {
  useEffect(() => {
    //como se debe manejar las notificaciones cuando la app está abierta
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true, //Muestra la notificación como alerta.
        shouldPlaySound: true, //Reproduce un sonido cuando se recibe la notificación.
        shouldSetBadge: false, // No cambia el ícono de la app.
      }),
    });
    const getPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      // Corregir la lógica aquí: si el estado NO es "granted", entonces alertar.
      if (status !== "granted") {
        alert('Se requieren permisos para recibir notificaciones');
      } else {
        console.log('Permisos de notificación concedidos.');
      }
    };
    getPermissions();

  }, []);

  const enviarNotificacionlocal = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Hola!", // <--- ¡Corrección aquí!
        body: "Esta es una notificación local de prueba.",
      },
      trigger: { seconds: 2},
    });
  };

  return (
    <View style={{ flex:1}}>
      <AppNavegacion />
      <Button title="Probar notificación local" onPress={enviarNotificacionlocal} />
    </View>
  );
}