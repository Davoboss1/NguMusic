import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { ActivityIndicator, Pressable, PressableProps, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";

const Button = React.forwardRef<typeof Pressable, PressableProps & { children: string, style?: ViewStyle, gradientStyle?: ViewStyle, textStyle?: TextStyle, icon?: React.ReactNode }>((props, ref) => {

    return (
        <Pressable {...props} ref={ref as any} style={[styles.button,
        {
            backgroundColor: '#24CEF0',
        }, props.style]}>
            {props.icon}
            <Text style={[styles.buttonText, props.textStyle]}>
                {props.children}
            </Text>
        </Pressable>
    );
});

const TextButton = React.forwardRef<typeof Pressable, PressableProps & { children: string, leftIcon?: ReactNode, rightIcon?: ReactNode , style?: ViewStyle, textStyle?: TextStyle}>((props, ref) => {

    return (
        <Pressable ref={ref as any} {...props} style={[styles.button, props.style]}>
            {props.leftIcon}
            <Text style={[styles.buttonText, props.textStyle]}>
                {props.children}
            </Text>
            {props.rightIcon}
        </Pressable>
    );
});

const GradientButton = React.forwardRef<typeof Pressable, PressableProps & { children: string, style?: ViewStyle, gradientStyle?: ViewStyle, loading?: boolean}>((props, ref) => {

    return (<Pressable {...props} ref={ref as any}>

        <LinearGradient style={[styles.button, props.gradientStyle]} colors={["#24CEF0", "#24EBCA"]}>


            <Text style={styles.buttonText}>
                {props.children}
            </Text> 
            {props.loading && <ActivityIndicator color={"white"} size={"small"} style={{ marginLeft: 10 }} />}
        </LinearGradient>
    </Pressable>

    )
});

const GradientButtonPlain = ({ children, style, size = "fit" }: { children: string, style?: ViewStyle, size?: "full" | "fit" }) => {

    return (
        <LinearGradient style={[styles.button,
        {
            width: size === 'full' ? '100%' : 'auto'
        }, style]} colors={["#24CEF0", "#24EBCA"]}>

            <Pressable >

                <Text style={styles.buttonText}>
                    {children}
                </Text>
            </Pressable>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export { Button, GradientButton, TextButton };