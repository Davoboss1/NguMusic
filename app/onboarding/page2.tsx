import BackgroundView
    from "@/components/containers/BackgroundView";
import { GradientButton } from "@/components/elements/Button";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IntroductionView = () => {

    return (<BackgroundView>
        <View style={styles.container}>
            <Image source={require('@/assets/images/ListenMusic.png')} style={{
                height: 150,
                width: 150
            }} />
            <Text style={styles.titleText}>Are you an Artist?</Text>
            <Text style={styles.bodyText}> Promote and distribute your music to a global audience.</Text>

            <Link href={"auth/signup"} asChild>
                <GradientButton style={{
                    marginTop: 15,
                    width: "80%",
                }} >
                    Next
                </GradientButton>

            </Link>
        </View>
    </BackgroundView>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: "white",
        textAlign: 'center',
        maxWidth: "70%"
    },
    bodyText: {
        fontSize: 15,
        color: "white",
        textAlign: 'center',
        maxWidth: "80%"

    }
});

export default IntroductionView;