import {View, Text, Button } from "react-native"

export default function ListarConsultorio ({navigation}){
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Listar Consultorio</Text>
            <Button
                title="Ver Consultorio"
                onPress={() => navigation.navigate("DetalleConsultorios")}
            />
            <Button
               title="Editar Consultorio"
               onPress={() => navigation.navigate("EditarConsultorios")}
            />         
        </View>
    );
}