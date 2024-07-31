import { TextSize } from "@/constants/Size";
import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"

const Input = (props: TextInputProps & { icon?: React.ReactNode, label?: string, labelStyle?: TextStyle, containerStyle?: ViewStyle, errorText? : string }) => {
    return <View style={props.containerStyle}>
        {props.label && <Text style={[styles.label,props.labelStyle ]}>{props.label}</Text>}
        <View style={[styles.inputContainer]}>
            {props.icon}
            <TextInput style={{
                height: 40,
                width: "100%",
                paddingLeft: props.icon ? 15 : 0
            }} {...props} />
            
        </View>
        {props.errorText && <Text style={styles.errorText}>{props.errorText}</Text>}
    </View>
}

const styles = StyleSheet.create({

    inputContainer: {
        backgroundColor: "white",
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        borderRadius: 5,
        fontSize: 14,
        marginTop: 5,
        color: "black"
    },
    label: {
        marginVertical: 10,
        color: "white",
        marginBottom: 5
    },
    errorText: {
        color: "red",
        fontSize: TextSize.sm,
        marginTop: 5,
    }
});

export { Input }