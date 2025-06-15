import {View, Text, Button } from "react-native"

export default function ListarEspecialidad ({navigation}){
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Listar Especialidad</Text>
            <Button
                title="Ver Especialidad"
                onPress={() => navigation.navigate("DetalleEspecialidad")}
            />
            <Button
               title="Editar Especialidad"
               onPress={() => navigation.navigate("EditarEspecialidad")}
            />         
        </View>
    );
}