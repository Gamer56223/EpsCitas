import {View, Text, Button } from "react-native"

export default function ListarMedico ({navigation}){
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Listar Medico</Text>
            <Button
                title="Ver Medico"
                onPress={() => navigation.navigate("DetalleMedico")}
            />
            <Button
               title="Editar Medico"
               onPress={() => navigation.navigate("EditarMedico")}
            />         
        </View>
    );
}