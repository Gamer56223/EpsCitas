import { NavigationContainer } from "@react-navigation/native";
import AuthNavegacion from "./AuthNavegacion";
import NavegacionPrincipal from "./NavegacionPrincipal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect, useRef} from "react";
import { ActivityIndicator, View, StyleSheet, AppState, Text } from "react-native"; 

export default function AppNavegacion() {
    const [isLoading, setIsLoading] = useState (true);
    const [userToken, setUserToken] = useState(null);
    const appState = useRef(AppState.currentState);

    // Función para cargar el token y actualizar el estado
    const loadToken = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            setUserToken(token);
        } catch (e){
            console.error("Error al cargar el token desde AsyncStorage:", e);
            setUserToken(null); // Asegurarse de que el token sea null si hay un error
        } finally {
            setIsLoading(false);
        }
    };

    // Función que se pasará a los componentes hijos para forzar la actualización del token
    const updateUserToken = async (newToken) => {
        if (newToken === null) {
            await AsyncStorage.removeItem("userToken");
        } else {
            await AsyncStorage.setItem("userToken", newToken);
        }
        setUserToken(newToken); // Actualiza el estado para que AppNavegacion re-renderice
    };

    useEffect(() => {
        loadToken(); 
    }, []);

    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                console.log('App ha vuelto a estar activa, verificando token...');
                loadToken();
            }
            appState.current = nextAppState;
        };
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription?.remove();
    }, []);

    
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando aplicación...</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            {/* Pasamos updateUserToken como prop a NavegacionPrincipal */}
            {userToken ? <NavegacionPrincipal updateUserToken={updateUserToken} /> : <AuthNavegacion/>}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#EBF5FB',
    },
    loadingText: {
        marginTop: 15,
        fontSize: 18,
        color: '#555',
        fontWeight: '600',
    },
});
