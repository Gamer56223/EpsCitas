import CitasStack from "./Stacks/CitaStack";
import ConsultoriosStack from "./Stacks/ConsultorioStack";
import EpsStack from "./Stacks/EpsStack";
import EspecialidadesStack from "./Stacks/EspecialidadStack";
import MedicosStack from "./Stacks/MedicoStack";
import PacientesStack from "./Stacks/PacienteStack";
import SedesStack from "./Stacks/SedeStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';




const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
    return (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#f4340c", // color cuando está activo
            tabBarActiveTintColor: "#f4340c", // color cuando esta inactivo
            tabBarActiveTintColor: {backgroundColor: "#f4340c"}, // Fondo de la barra
          }}
        >
            <Tab.Screen name="Citas" component={CitasStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <Fontisto name="date" size={24} color="lightblue" />
                ),
            }}/>

            <Tab.Screen name="Consultorios" component={ConsultoriosStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="clinic-medical" size={24} color="red" />
                )
            }}/>

            <Tab.Screen name="Eps" component={EpsStack} options={{
                tabBarIcon: ({ color, size }) =>
                    <MaterialCommunityIcons name="microsoft-office" size={24} color="black" />

            }}/>

            <Tab.Screen name="Especialidades" component={EspecialidadesStack} options={{
                tabBarIcon: ({ color, size }) =>
                    <FontAwesome5 name="hospital-user" size={24} color="silver" />

            }}/>

            <Tab.Screen name="Medicos" component={MedicosStack} options={{
                tabBarIcon: ({ color, size }) =>
                    <Fontisto name="doctor" size={24} color="gold" />
            }}/>

            <Tab.Screen name="Pacientes" component={PacientesStack} options={{
                tabBarIcon: ({ color, size }) =>
                    <FontAwesome6 name="people-group" size={24} color="purple" />
            }}/>

            <Tab.Screen name="Sedes" component={SedesStack} options={{
                tabBarIcon: ({ color, size }) =>
                    <FontAwesome6 name="house-medical-flag" size={24} color="green" />
            }}/>
        </Tab.Navigator>
    );
}
