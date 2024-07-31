import { StatusBar } from "expo-status-bar";
import { ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BackgroundView ({children, style } : { children : React.ReactNode , style?: ViewStyle }) {

    return (
        <>
        <StatusBar style="light" />
         <SafeAreaView style={{ flex: 1, backgroundColor: '#151521', ...style }}>
            
            {children}
        </SafeAreaView>
        </>
       );
}