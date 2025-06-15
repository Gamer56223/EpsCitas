import {View, Text, Button } from "react-native"

export default function ListarCita ({navigation}){
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Listar Cita</Text>
            <Button
                title="Ver Cita"
                onPress={() => navigation.navigate("DetalleCitas")}
            />
            <Button
               title="Editar Cita"
               onPress={() => navigation.navigate("EditarCitas")}
            />         
        </View>
    );
}