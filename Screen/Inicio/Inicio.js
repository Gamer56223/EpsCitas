import React, { useState } from 'react'; // Importa useState
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Platform } from 'react-native'; // Importa Platform
import { Ionicons, Feather, Entypo, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

const CONTAINER_HORIZONTAL_PADDING = 20;
const GRID_CONTAINER_HORIZONTAL_PADDING = 5;
const GRID_ITEM_HORIZONTAL_MARGIN = 10;

const availableWidthForGridContent = width - (CONTAINER_HORIZONTAL_PADDING * 2) - (GRID_CONTAINER_HORIZONTAL_PADDING * 2);

const itemWidth = (availableWidthForGridContent - (GRID_ITEM_HORIZONTAL_MARGIN * 4)) / 2;

const cardData = [
    // Se añaden lightColor y darkColor para cada tarjeta
    { name: 'Citas', icon: <Fontisto name="date" size={24} color="#007BFF" />, flow: 'CitasFlow', lightColor: '#E3F2FD', darkColor: '#1A237E' },
    { name: 'Consultorios', icon: <MaterialCommunityIcons name="microsoft-office" size={24} color="#FFC107" />, flow: 'ConsultoriosFlow', lightColor: '#FFF8E1', darkColor: '#3F2C00' },
    { name: 'Eps', icon: <MaterialIcons name="health-and-safety" size={24} color="#28A745" />, flow: 'EpsFlow', lightColor: '#E8F5E9', darkColor: '#0F3D1F' },
    { name: 'Especialidades', icon: <MaterialCommunityIcons name="professional-hexagon" size={24} color="#DC3545" />, flow: 'EspecialidadesFlow', lightColor: '#FFEBEE', darkColor: '#4F1018' },
    { name: 'Medicos', icon: <Fontisto name="doctor" size={24} color="#6F42C1" />, flow: 'MedicosFlow', lightColor: '#F3E5F5', darkColor: '#2C194D' },
    { name: 'Pacientes', icon: <FontAwesome6 name="people-group" size={24} color="#17A2B8" />, flow: 'PacientesFlow', lightColor: '#E0F7FA', darkColor: '#053C47' },
    { name: 'Sedes', icon: <FontAwesome5 name="laptop-house" size={24} color="#FD7E14" />, flow: 'SedesFlow', lightColor: '#FFF3E0', darkColor: '#4A2A04' },
];


export default function Inicio() {
    const navigation = useNavigation();
    const [isDarkMode, setIsDarkMode] = useState(false); // Estado para el modo oscuro

    // Función para alternar el tema
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const navigateToFlow = (flowName) => {
        navigation.navigate(flowName);
    };

    // Obtener los estilos dinámicamente según el tema actual
    const themeStyles = getStyles(isDarkMode);

    // Estilos para la Status Bar basados en el tema
    const statusBarStyle = isDarkMode ? 'light-content' : 'dark-content';
    const statusBarBackgroundColor = isDarkMode ? themeStyles.safeArea.backgroundColor : '#F0F4F8';

    return (
        <SafeAreaView style={themeStyles.safeArea}>
            {/* Sets the status bar style for better visibility */}
            <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBackgroundColor} />

            <ScrollView style={themeStyles.container} contentContainerStyle={themeStyles.scrollViewContent}>
                <View style={themeStyles.header}>
                    <Text style={themeStyles.headerTitle}>Bienvenido a Eps</Text>
                    <Text style={themeStyles.headerSubtitle}>Estado: <Text style={themeStyles.statusText}>Habilitado</Text></Text>
                    <Text style={themeStyles.headerSubtitle}>Carlos Estiven Rodríguez</Text>
                </View>

                {/* Botón para alternar el modo oscuro */}
                <TouchableOpacity onPress={toggleTheme} style={themeStyles.themeToggleButton}>
                    <Ionicons
                        name={isDarkMode ? "sunny-outline" : "moon-outline"} // Cambia el icono según el tema
                        size={28}
                        color={isDarkMode ? "#FFD700" : "#666"} // Color del icono (dorado para sol, gris para luna)
                    />
                </TouchableOpacity>

                <View style={themeStyles.gridContainer}>
                    {cardData.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                themeStyles.gridItem,
                                { backgroundColor: isDarkMode ? item.darkColor : item.lightColor } // Color de fondo de la tarjeta dinámico
                            ]}
                            onPress={() => navigateToFlow(item.flow)}
                        >
                            {/* Clonar el icono para cambiar su color dinámicamente si es necesario */}
                            {React.cloneElement(item.icon, {
                                color: isDarkMode ? '#F8F8F8' : item.icon.props.color, // Color del icono dentro de la tarjeta
                                size: 32 // Un poco más grande para mejor visibilidad
                            })}
                            <Text style={themeStyles.gridItemText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

// Función que devuelve el objeto de estilos basado en el tema actual
const getStyles = (isDarkMode) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: isDarkMode ? '#121212' : '#F0F4F8', // Fondo principal de la SafeArea
    },
    container: {
        flex: 1,
        backgroundColor: isDarkMode ? '#121212' : '#F0F4F8', // Fondo del ScrollView
        padding: CONTAINER_HORIZONTAL_PADDING,
    },
    scrollViewContent: {
        paddingBottom: 80,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: isDarkMode ? '#E0E0E0' : '#333', // Color del título
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 18,
        color: isDarkMode ? '#B0B0B0' : '#666', // Color del subtítulo
    },
    statusText: {
        fontWeight: 'bold',
        color: isDarkMode ? '#8BC34A' : '#28a745', // Color del texto de estado "Habilitado"
    },
    // Estilo para el botón de alternar tema
    themeToggleButton: {
        position: 'absolute',
        // Ajuste para iOS (SafeArea) y Android
        top: Platform.OS === 'ios' ? 50 : 25,
        right: 20,
        padding: 8,
        borderRadius: 20,
        backgroundColor: isDarkMode ? '#333333' : '#EFEFEF', // Fondo del botón
        zIndex: 1, // Asegura que el botón esté por encima de otros elementos
        shadowColor: isDarkMode ? '#000' : '#CCC',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: GRID_CONTAINER_HORIZONTAL_PADDING,
    },
    gridItem: {
        width: itemWidth,
        height: itemWidth,
        borderRadius: 15,
        marginVertical: 10,
        marginHorizontal: GRID_ITEM_HORIZONTAL_MARGIN,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.1)', // Sombra de la tarjeta
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDarkMode ? 0.3 : 0.1,
        shadowRadius: 6,
    },
    gridItemText: {
        marginTop: 15,
        fontSize: 17,
        fontWeight: '600',
        color: isDarkMode ? '#F8F8F8' : '#444', // Color del texto de la tarjeta
        textAlign: 'center',
    },
});