import {View, Text, Button, StyleSheet, ScrollView } from "react-native"
import BotonComponent from "../../components/BottonComponent"; // Asegúrate de que la ruta sea correcta

export default function ListarPaciente ({navigation}){

    const pacientesEjemplo = [
        { id: '1', Nombre: 'Tommy', Apellido: 'Vercety', Correo:'peñalosa@gmail', Direccion: '3212118621', TipoDocumento: '1052836122', NumeroDocumento: 'True', FechaNacimiento: '', Genero: ''},
        { id: '2', Nombre: 'Carlos', Apellido: 'Rodríguez', Correo: 'carlos@gmail', Telefono: '3212118621', NumeroDocumento: '1052836128', Activo: 'False'},,
        { id: '3', Nombre: 'Carl', Apellido: 'Johnson', Correo:'cjblackman@gmail', Telefono: '3201089089', NumeroDocumento: '1052836109', Activo: 'True'},
    ];
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Listar Paciente</Text>
            <Button
                title="Ver Paciente"
                onPress={() => navigation.navigate("DetallePaciente")}
            />
            <Button
               title="Editar Paciente"
               onPress={() => navigation.navigate("EditarPaciente")}
            />         
        </View>
    );
}