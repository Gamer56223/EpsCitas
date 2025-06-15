import {View, Text, Button } from "react-native"

export default function ListarEps ({navigation}){
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Listar Eps</Text>
            <Button
                title="Ver Eps"
                onPress={() => navigation.navigate("DetalleEps")}
            />
            <Button
               title="Editar Eps"
               onPress={() => navigation.navigate("EditarEps")}
            />         
        </View>
    );
}