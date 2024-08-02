import { LoginRequest } from "@/api";
import { GoogleIcon, Logo } from "@/assets/icons";
import BackgroundView from "@/components/containers/BackgroundView";
import { Button, GradientButton, TextButton } from "@/components/elements/Button";
import { DoubleLinedText } from "@/components/elements/CustomText";
import { Colors } from "@/constants/Colors";
import { TextSize } from "@/constants/Size";
import { usePersistedStore } from "@/stores";
import { showToast } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link, Redirect, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const LoginView = () => {
    const [setAccessToken, setRefreshToken, setUser] = usePersistedStore((state) => [state.setAccessToken,state.setRefreshToken, state.setUser]);
    const router = useRouter();
    const loginMutation = useMutation({
        mutationFn: LoginRequest,
        onSuccess(data) {
            setAccessToken(data.access);
            setRefreshToken(data.refresh);
            setUser(data.user);
            showToast("Logged in successfully.", "success");
            router.push("/home/")
        },
    });
    const [loginInformation, setLoginInformation] = useState({
        email: "",
        password: ""
    });

    return (
        <BackgroundView>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '85%',
                marginHorizontal: "auto"
            }}>
                <Image style={{
                    width: 70,
                    height: 70,
                }} source={Logo} />
                <Text style={styles.mainText}>NGU Music</Text>
                <Text style={styles.titleText}> Sign in to your account</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email Address</Text>
                    <TextInput style={styles.input} placeholder="test@example.com" onChangeText={(text) => setLoginInformation({
                        ...loginInformation,
                        email: text,
                    })} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput style={styles.input} placeholder="Password" onChangeText={(text) => setLoginInformation({
                        ...loginInformation,
                        password: text,
                    })} secureTextEntry />
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20
                }}>

                    <BouncyCheckbox size={20} fillColor={Colors.primary} unFillColor="white" text="Remember Me" style={{
                        flexShrink: 1
                    }} textStyle={{
                        color: "white",
                        fontSize: TextSize.sm,
                    }} onPress={(isChecked: boolean) => { }} />

                    <TextButton textStyle={{
                        color: Colors.primary,
                        fontSize: 14
                    }}>
                        Forgot your password
                    </TextButton>
                </View>
                {/* <Link href="/home/" asChild> */}
                <GradientButton onPress={() => {
                    ToastAndroid.show("Signing in...", ToastAndroid.LONG);
                    loginMutation.mutate(loginInformation);
                }} loading={loginMutation.isPending} style={{ marginTop: 15, width: "100%" }}>
                    Sign In
                </GradientButton>
                {/* </Link> */}
                <DoubleLinedText color={"grey"} containerStyle={{
                    marginTop: 15
                }}>
                    Continue
                </DoubleLinedText>

                <Button style={styles.googleBtn} textStyle={styles.googleBtnText}
                    icon={<Image source={GoogleIcon} style={styles.googleIcon} />}
                >
                    Sign in with Google
                </Button>
            </View>
        </BackgroundView>
    )
}

const styles = StyleSheet.create({
    mainText: {
        fontSize: 24,
        marginTop: 15,
        fontWeight: 'bold',
        color: Colors.primary
    },
    titleText: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
        color: "white"
    },
    inputContainer: {
        width: '100%',
        marginTop: 10,
    },
    inputLabel: {
        fontSize: 14,
        marginTop: 10,
        color: "white"
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 5,
        fontSize: 14,
        marginTop: 5,
        color: "black"
    },
    googleBtnText: {
        color: "grey",
        fontSize: TextSize.md,
        marginLeft: 15
    },
    googleIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    googleBtn: {
        backgroundColor: "white",
        width: "100%",
        marginTop: 15,
        flexDirection: "row"
    }
});

export default LoginView;