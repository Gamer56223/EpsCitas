import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from 'react';

function CustomButton({
    title,
    onPress,
    style,
    color = "primary",
    size = "medium",
    disabled = false,
    loading = false,
    textStyle
}) {
    const buttonStyles = [
        styles.buttonBase,
        styles[`button_${color}`],
        styles[`button_${size}`],
        disabled && styles.button_disabled,
        style
    ];

    const textStyles = [
        styles.textBase,
        styles[`text_${color}`],
        styles[`text_${size}`],
        disabled && styles.text_disabled,
        textStyle
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={styles.textBase.color} size="small" />
            ) : (
                <Text style={textStyles}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

export default React.memo(CustomButton);

const styles = StyleSheet.create({
    buttonBase: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 8,
        minWidth: 100,
        flexDirection: 'row',
    },

    button_primary: {
        backgroundColor: "#1976D2",
        shadowColor: "#1976D2",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    button_secondary: {
        backgroundColor: "#6C757D",
        shadowColor: "#6C757D",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    button_danger: {
        backgroundColor: "#DC3545",
        shadowColor: "#DC3545",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,
    },
    button_success: {
        backgroundColor: "#28A745",
        shadowColor: "#28A745",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,
    },
    button_green: {
        backgroundColor: "green",
    },

    button_small: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 6,
        minWidth: 80,
    },
    button_medium: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        minWidth: 100,
    },
    button_large: {
        paddingVertical: 16,
        paddingHorizontal: 25,
        borderRadius: 10,
        minWidth: 150,
    },

    button_disabled: {
        backgroundColor: "#B0B0B0",
        opacity: 0.7,
        shadowOpacity: 0,
        elevation: 0,
    },

    textBase: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: 'center',
    },

    text_primary: { },
    text_secondary: { },
    text_danger: { },
    text_success: { },
    text_green: { },

    text_small: {
        fontSize: 14,
    },
    text_medium: {
        fontSize: 16,
    },
    text_large: {
        fontSize: 18,
    },

    text_disabled: {
        color: "#E0E0E0",
    }
});