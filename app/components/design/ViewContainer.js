import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "@constants/colors";

export default function ViewContainer ({ children, style }) {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
        backgroundColor: colors.black,
    },
});