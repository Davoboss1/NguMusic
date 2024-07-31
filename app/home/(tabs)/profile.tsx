import BackgroundView from "@/components/containers/BackgroundView";
import { TextSize } from "@/constants/Size"
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native"

const ProfileView = () => {
    return (
        <BackgroundView>
            <View>
                <Image source={require("@/assets/images/profile.jpeg")} style={styles.profileImage} />
                <Text style={styles.profileName}>
                    David Akinfenwa
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
                        David Akinfenwa
                    </Text>
                </View>
            </View>
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