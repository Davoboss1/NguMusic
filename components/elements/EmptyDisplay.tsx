import { TextSize } from "@/constants/Size";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const EmptyDisplay = ({ message } : { message?: string }) => (<View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 10 }} >
    <MaterialCommunityIcons name="trash-can-outline" size={40} color="white" />
    <Text style={{ color: "white", fontWeight: "bold", fontSize: TextSize.lg, marginLeft: 15 }} >
        {message || "No item found"}
    </Text>
</View>)