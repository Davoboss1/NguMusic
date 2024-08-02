import BackgroundView from "@/components/containers/BackgroundView";
import { TextButton } from "@/components/elements/Button";
import { Colors } from "@/constants/Colors";
import { TextSize } from "@/constants/Size"
import { usePersistedStore } from "@/stores";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native"

const ProfileView = () => {

    const user = usePersistedStore(state=> state.user);
    const router = useRouter();
    return (
        <BackgroundView>
            <View>
                <Image source={require("@/assets/images/profile.jpeg")} style={styles.profileImage} />
                <Text style={styles.profileName}>
                   {user?.first_name} {user?.last_name}
                </Text>

            </View>

            <View style={{
                margin: 20,
            }}>
                <Text style={styles.profileTextTitle}>
                    Personal Information
                </Text>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 10
                }}>
                    <Text style={styles.profileText}>
                        Name:
                    </Text>

                    <Text style={styles.profileText2}>
                    {user?.first_name} {user?.last_name}
                    </Text>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 10
                }}>
                    <Text style={styles.profileText}>
                        Email:
                    </Text>

                    <Text style={styles.profileText2}>
                        {user?.email}
                    </Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 10
                }}>
                    <Text style={styles.profileText}>
                        Artist Name:
                    </Text>

                    <Text style={styles.profileText2}>
                        {user?.artist_name}
                    </Text>
                </View>
            </View>

            <View style={{
                margin: 20,
            }}>
                <Text style={styles.profileTextTitle}>
                    More information
                </Text>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 10
                }}>
                    <Text style={styles.profileText}>
                        Privacy Policy
                    </Text>

                    <Text style={styles.profileText2}>

                        <MaterialCommunityIcons name="chevron-right" size={24} color="grey" style={{ marginLeft: "auto" }} />

                    </Text>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginVertical: 10
                }}>
                    <Text style={styles.profileText}>
                        Subscriptions
                    </Text>

                    <Text style={styles.profileText2}>

                        <MaterialCommunityIcons name="chevron-right" size={24} color="grey" style={{ marginLeft: "auto" }} />

                    </Text>
                </View>

            </View>

            <TextButton onPress={() => {
                AsyncStorage.clear();
                router.push("/auth/login");
            }} textStyle={{ color: Colors.primary}}>
                Logout
            </TextButton>
        </BackgroundView>
    )
}

const styles = StyleSheet.create({
    profileImage: {
        width: 150,
        height: 150,
        marginHorizontal: "auto",
        borderRadius: 75,
        marginTop: 20
    },
    profileName: {
        color: "white",
        fontSize: TextSize.xl,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10
    },
    profileTextTitle: {
        fontWeight: "light",
        color: "#bdbdbd",
        fontSize: TextSize.md
    },
    profileText: {
        color: "white",
        fontWeight: "bold",
        fontSize: TextSize.md
    },
    profileText2: {
        color: "white",
        fontSize: TextSize.md
    }
});

export default ProfileView;