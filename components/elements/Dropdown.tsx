import { Colors } from "@/constants/Colors";
import { TextSize } from "@/constants/Size";
import { dropdownItem } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ReactNode, useState } from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import SelectDropdown from "react-native-select-dropdown";

const Dropdown = ({ containerStyle, data, onChange, label, labelStyle, errorText, currentItem }: { containerStyle?: ViewStyle, label?: string, labelStyle?: TextStyle, errorText?: string, onChange: (val: string) => void, data: dropdownItem[], currentItem?: dropdownItem }) => {

    return <>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

        <SelectDropdown data={data}
            renderButton={() => (
                <TouchableOpacity style={[styles.dropdownContainer, containerStyle]}>

                    <Text style={{
                        color: Colors.secondary
                    }}>
                        {currentItem?.label || "Select an option"}
                    </Text>

                    <MaterialCommunityIcons name="chevron-down" size={24}
                        color={Colors.secondary} />
                </TouchableOpacity>
            )}
            renderItem={(item) => (
                <TouchableOpacity style={styles.dropdownItemContainer}>
                    <Text style={{
                        color: "white"
                    }}>
                        {item.label}
                    </Text>
                    {<MaterialCommunityIcons name={item.icon || "chevron-right"} size={20}
                        color={"grey"} />}
                </TouchableOpacity>
            )}
            dropdownStyle={{
                backgroundColor: Colors.secondary,
                borderRadius: 5,
                marginTop: 5
            }}
            onSelect={(item) => {
                onChange(item.value);
            }} />
                    
        {errorText && <Text style={styles.errorText}>{errorText}</Text>}      

    </>
}

const styles = StyleSheet.create({
    dropdownContainer: {
        backgroundColor: "white",
        paddingHorizontal: 10,
        margin: 10,
        height: 40,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        color: "black",
        fontSize: TextSize.md,
        marginTop: 5
    },
    dropdownItemContainer: {
        paddingHorizontal: 5,
        marginHorizontal: 10,
        height: 40,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        color: "black",
        fontSize: TextSize.md,
        marginTop: 5,
        marginBottom: 5
    },
    label: {
        margin: 10,
        color: "white",
        marginBottom: 5
    },
    errorText: {
        color: "red",
        fontSize: TextSize.sm,
        marginHorizontal: 10
    }
});

export { Dropdown }