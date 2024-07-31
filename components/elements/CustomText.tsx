import { Text, StyleSheet, View, TextStyle, ViewStyle } from "react-native";
import React, { Children } from "react";

const DoubleLinedText = ({ children, color = "white", textStyle, containerStyle }: { children: string, color?: string, textStyle?: TextStyle, containerStyle?: ViewStyle }) => {

    return (
        <View style={[{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
        }, containerStyle]}>
            <View style={[styles.line, {
                backgroundColor: color
            }]}></View>
            <Text style={[textStyle, {
                color: color,
                width: "40%",
                textAlign: "center"
            }]}>
                {children}
            </Text>
            <View style={[styles.line, {
                backgroundColor: color
            }]}></View>
        </View >
    );
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        width: "30%"
    }
});

export { DoubleLinedText };