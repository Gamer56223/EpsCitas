import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
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
    { name: 'Citas', icon: <Fontisto name="date" size={24} color="#007BFF" />, flow: 'CitasFlow', color: '#E3F2FD' },
    { name: 'Consultorios', icon: <MaterialCommunityIcons name="microsoft-office" size={24} color="#FFC107" />, flow: 'ConsultoriosFlow', color: '#FFF8E1' },
    { name: 'Eps', icon: <MaterialIcons name="health-and-safety" size={24} color="#28A745" />, flow: 'EpsFlow', color: '#E8F5E9' },
    { name: 'Especialidades', icon: <MaterialCommunityIcons name="professional-hexagon" size={24} color="#DC3545" />, flow: 'EspecialidadesFlow', color: '#FFEBEE' },
    { name: 'Medicos', icon: <Fontisto name="doctor" size={24} color="#6F42C1" />, flow: 'MedicosFlow', color: '#F3E5F5' },
    { name: 'Pacientes', icon: <FontAwesome6 name="people-group" size={24} color="#17A2B8" />, flow: 'PacientesFlow', color: '#E0F7FA' },
    { name: 'Sedes', icon: <FontAwesome5 name="laptop-house" size={24} color="#FD7E14" />, flow: 'SedesFlow', color: '#FFF3E0' },
];


export default function Inicio() {
    const navigation = useNavigation();

    const navigateToFlow = (flowName) => {
        navigation.navigate(flowName);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Sets the status bar style for better visibility */}
            <StatusBar barStyle="dark-content" backgroundColor="#F0F4F8" /> 

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Bienvenido a Eps</Text>
                    <Text style={styles.headerSubtitle}>Estado: <Text style={styles.statusText}>Habilitado</Text></Text>
                    <Text style={styles.headerSubtitle}>Carlos Estiven Rodríguez</Text>
                </View>

                <View style={styles.gridContainer}>
                    {cardData.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.gridItem, { backgroundColor: item.color }]}
                            onPress={() => navigateToFlow(item.flow)}
                        >
                            {item.icon}
                            <Text style={styles.gridItemText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // Changed background color to a light, harmonious shade
        backgroundColor: '#F0F4F8', 
    },
    container: {
        flex: 1,
        // Changed background color to a light, harmonious shade
        backgroundColor: '#F0F4F8', 
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
        color: '#333',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#666',
    },
    statusText: {
        fontWeight: 'bold',
        color: '#28a745',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    gridItemText: {
        marginTop: 15,
        fontSize: 17,
        fontWeight: '600',
        color: '#444',
        textAlign: 'center',
    },
});