import { Logo } from "@/assets/icons";
import BackgroundView
    from "@/components/containers/BackgroundView";
import { GradientButton, TextButton } from "@/components/elements/Button";
import { Input } from "@/components/elements/Input";
import { Colors } from "@/constants/Colors";
import { TextSize } from "@/constants/Size";
import { usePersistedStore } from "@/stores";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FlatList, Image, ScrollView, StyleSheet, Text, TextStyle, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateMusicModal from "../../others/createMusicModal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTracks } from "@/api";
import { track } from "@/types";


const IntroductionView = () => {

    const user = usePersistedStore((state) => state.user);
    const [showCreateMusicModal, setShowCreateMusicModal] = useState(false);

    const { data: tracks_data, isFetching: is_fetching } =
        useQuery({
            queryKey: ["tracks"],
            queryFn: () => getTracks(),
        });

    const tracks: track[] = tracks_data?.map((track: any) => ({
        name: track?.name,
        file_link: track?.file,
        album_name: track?.album?.name,
        thumbnail: track?.album?.thumbnail,
        artist: track?.album?.user?.artist_name,
        genre: track?.genre?.name,
        featured_artists: track?.featured_artists
    }));

    return (<BackgroundView>
        <CreateMusicModal show={showCreateMusicModal} onClose={() => setShowCreateMusicModal(false)} />
        <View>
            <View style={{ flexDirection: "row", padding: 15, alignItems: "center" }}>
                <FontAwesome name="user-circle-o" size={24} color="white" style={styles.userIcon} />
                <Text style={styles.welcomeText} >
                    Welcome {user?.first_name},
                </Text>

                <TextButton style={{ marginLeft: "auto" }} onPress={() => setShowCreateMusicModal(true)}>Create +</TextButton>

            </View>
            <Text style={styles.welcomeDescriptionText}>
                Explore a vast libary of music from around the world.
            </Text>

            <Input containerStyle={{
                marginHorizontal: 10,
                marginTop: 15
            }} icon={<FontAwesome name="search" size={18} color="grey" />} placeholder="Search for songs" />

            <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
                <TextButton textStyle={[styles.barButton, { color: Colors.primary }] as TextStyle} >
                    Singles
                </TextButton>
                <TextButton textStyle={styles.barButton} >
                    Albums
                </TextButton>
                <TextButton textStyle={styles.barButton} >
                    Playlists
                </TextButton>
                <TextButton textStyle={styles.barButton} >
                    Favourites
                </TextButton>
            </View>



            <FlatList ListHeaderComponent={<>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <View style={styles.musciCardContainer}>
                        <View >
                            <Text style={styles.musicCardTextTitle}>Albums</Text>
                            <Text style={styles.musicCardText} >20</Text>

                        </View>
                        <MaterialCommunityIcons name="album" size={20} color="white" />

                    </View>
                    <View style={styles.musciCardContainer}>
                        <View >
                            <Text style={styles.musicCardTextTitle}>Playlists</Text>
                            <Text style={styles.musicCardText} >4</Text>

                        </View>
                        <MaterialCommunityIcons name="playlist-play" size={20} color="white" />

                    </View>
                    <View style={styles.musciCardContainer}>
                        <View >
                            <Text style={styles.musicCardTextTitle}>Songs</Text>
                            <Text style={styles.musicCardText} >200</Text>

                        </View>
                        <MaterialCommunityIcons name="music" size={20} color="white" />

                    </View>
                </View>

                <View>
                    <View style={styles.topTextContainer}>
                        <Text style={{ color: "white", fontSize: TextSize.sm }}>
                            Recently Played
                        </Text>
                        <TextButton textStyle={{ color: "white", fontSize: TextSize.sm }}>
                            See All
                        </TextButton>
                    </View>
                </View>
            </>} data={tracks} renderItem={({ item }) => <View style={styles.trackCardContainer}>
                <Image style={styles.trackCardImage} source={Logo} />
                <View style={{
                    marginLeft: 10
                }}>
                    <Text style={styles.trackCardTitleText}>{item.name}</Text>
                    <Text style={styles.trackCardText}>{item.artist} </Text>
                    <Text style={styles.trackCardText}>{item.album_name} </Text>
                </View>
                <Link href={{ pathname: "/home/now_playing", params: {
                    track: JSON.stringify(item)
                }}} asChild>
                    <TouchableOpacity style={styles.trackCardPlayIconContainer} >
                        <FontAwesome name="play-circle" size={30} color={Colors.primary} />
                    </TouchableOpacity>
                </Link>
            </View>} />

        </View>
    </BackgroundView>)
}

const styles = StyleSheet.create({
    welcomeText: {
        color: "white",
        fontWeight: "bold",
        fontSize: TextSize.md,
    },
    welcomeDescriptionText: {
        color: "white",
        paddingLeft: 15,
        fontSize: TextSize.xs,
    },
    userIcon: {
        marginRight: 10,
    },
    barButton: {
        fontSize: TextSize.sm,
    },
    topTextContainer: {
        flexDirection: "row",
        marginHorizontal: 15,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10
    },
    trackCardContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 15,
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5
    },
    trackCardImage: {
        borderRadius: 15,
        width: 70,
        height: 70
    },
    trackCardTitleText: {
        color: "white",
        fontWeight: "bold",
        fontSize: TextSize.md,
    },
    trackCardText: {
        color: "white",
        fontSize: TextSize.xs,
        marginTop: 5
    },
    trackCardPlayIconContainer: {
        marginLeft: "auto",
        marginRight: 10
    },
    musciCardContainer: {
        backgroundColor: "#27285f",
        flexDirection: "row",
        alignItems: "center",
        width: "30%",
        padding: 10,
        borderRadius: 10,
        justifyContent: "space-around"
    },
    musicCardTextTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: TextSize.md,
    },
    musicCardText: {
        color: "white",
        marginTop: 5,
        fontSize: TextSize.sm,
    }
});

export default IntroductionView;