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


export default function Inicio() {
    const navigation = useNavigation();

    const navigateToFlow = (flowName) => {
        navigation.navigate(flowName);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f0f2f5" />

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Bienvenido a Eps</Text>
                    <Text style={styles.headerSubtitle}>Estado: <Text style={styles.statusText}>Habilitado</Text></Text>
                    <Text style={styles.headerSubtitle}>Carlos Estiven Rodriguez</Text>
                </View>

                <View style={styles.gridContainer}>
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('CitasFlow')}
                    >
                        <Fontisto name="date" size={24} color="black" />
                        <Text style={styles.gridItemText}>Citas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('ConsultoriosFlow')}
                    >
                        <MaterialCommunityIcons name="microsoft-office" size={24} color="gold" />
                        <Text style={styles.gridItemText}>Consultorios</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('EpsFlow')}
                    >
                        <MaterialIcons name="health-and-safety" size={24} color="silver" />
                        <Text style={styles.gridItemText}>Eps</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('EspecialidadesFlow')}
                    >
                        <MaterialCommunityIcons name="professional-hexagon" size={24} color="red" />
                        <Text style={styles.gridItemText}>Especialidades</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('MedicosFlow')}
                    >
                        <Fontisto name="doctor" size={24} color="lightblue" />
                        <Text style={styles.gridItemText}>Medicos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('PacientesFlow')}
                    >
                        <FontAwesome6 name="people-group" size={24} color="brown" />
                        <Text style={styles.gridItemText}>Pacientes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('SedesFlow')}
                    >
                        <FontAwesome5 name="laptop-house" size={24} color="yellow" />
                        <Text style={styles.gridItemText}>Sedes</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
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
        backgroundColor: '#ffffff',
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