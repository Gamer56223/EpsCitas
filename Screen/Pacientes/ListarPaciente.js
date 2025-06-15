import {View, Text, Button } from "react-native"

export default function ListarPaciente ({navigation}){
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