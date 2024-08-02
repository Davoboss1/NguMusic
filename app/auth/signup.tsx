import { RegisterUser } from "@/api";
import { GoogleIcon, Logo } from "@/assets/icons";
import BackgroundView from "@/components/containers/BackgroundView";
import { Button, GradientButton, TextButton } from "@/components/elements/Button";
import { DoubleLinedText } from "@/components/elements/CustomText";
import { Colors } from "@/constants/Colors";
import { TextSize } from "@/constants/Size";
import { globalStyles } from "@/styles";
import { showToast } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Toast from "react-native-root-toast";

const SignupView = () => {
    const registerMutation = useMutation({
        mutationFn: RegisterUser,
        onSuccess() {
            showToast("Registered successfully.", "success");
        },
        onError(error: any) {
            let data: object = error?.response?.data;

            if (data) {
                showToast(Object.values(data)[0].toString(), "error");
            }
        },
    });
    const [userInformation, setUserInformation] = useState({
        first_name: "",
        last_name: "",
        artist_name: "",
        email: "",
        password: ""
    });

    const updateUserInformation = (field: string, value: string) => {
        setUserInformation({
            ...userInformation,
            [field]: value
        });
    }

    if (registerMutation.isSuccess) {
        return <Redirect href="/auth/login" />;
    }

    return (
        <BackgroundView>
            <ScrollView>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '85%',
                    marginHorizontal: "auto",
                    paddingVertical: 30
                }}>
                    <Image style={{
                        width: 70,
                        height: 70,
                    }} source={Logo} />
                    <Text style={styles.mainText}>Welcome to NGU Music</Text>
                    <Text style={styles.titleText}> Create your account</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>First Name</Text>
                        <TextInput style={styles.input} placeholder="John" onChangeText={(text) => updateUserInformation("first_name", text)} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Last Name</Text>
                        <TextInput style={styles.input} placeholder="Bull" onChangeText={(text) => updateUserInformation("last_name", text)} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Artist Name</Text>
                        <TextInput style={styles.input} placeholder="Artisty" onChangeText={(text) => updateUserInformation("artist_name", text)} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email Address</Text>
                        <TextInput style={styles.input} placeholder="test@example.com" onChangeText={(text) => updateUserInformation("email", text)} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <TextInput style={styles.input} placeholder="Password" onChangeText={(text) => updateUserInformation("password", text)} secureTextEntry />
                    </View>

                    <GradientButton loading={registerMutation.isPending} style={{ marginTop: 25, width: "100%" }} onPress={() => {

                        registerMutation.mutate(userInformation);
                    }}>
                        Sign Up
                    </GradientButton>

                    <DoubleLinedText color={"grey"} containerStyle={{
                        marginTop: 15
                    }}>
                        Or continue with
                    </DoubleLinedText>

                    <Button style={styles.googleBtn} textStyle={styles.googleBtnText}
                        icon={<Image source={GoogleIcon} style={styles.googleIcon} />}
                    >
                        Sign up with Google
                    </Button>

                    <View style={[globalStyles.rowCenter, { marginTop: 15 }]}>

                        <Text style={{
                            color: "white"
                        }}>
                            Already have an account?
                        </Text>
                        <Link href={"/auth/login"} asChild>
                            <TextButton textStyle={{
                                color: Colors.primary,
                                fontSize: 14
                            }}>
                                Sign in
                            </TextButton>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </BackgroundView >
    )
}

const styles = StyleSheet.create({
    mainText: {
        fontSize: TextSize.xxl,
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

export default SignupView;