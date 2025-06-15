import {View, Text, Button } from "react-native"

export default function ListarSede ({navigation}){
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Listar Sede</Text>
            <Button
                title="Ver Sede"
                onPress={() => navigation.navigate("DetalleSedes")}
            />
            <Button
               title="Editar Sede"
               onPress={() => navigation.navigate("EditarSedes")}
            />         
        </View>
    );
}