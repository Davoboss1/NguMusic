import { getArtists } from "@/api";
import BackgroundView from "@/components/containers/BackgroundView";
import { EmptyDisplay } from "@/components/elements/EmptyDisplay";
import { Colors } from "@/constants/Colors";
import { TextSize } from "@/constants/Size"
import { FontAwesome, FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const ArtistsView = () => {

    const { data: artists, isFetching } =
        useQuery({
            queryKey: ["all_artists"],
            queryFn: () => getArtists(),
        });

    const router = useRouter();

    const artistList: {
        name: string,
        profile_pic: string,
        id: number,
    }[] = artists?.map((artist: any) => ({
        name: artist?.artist_name,
        profile_pic: artist?.profile_pic,
        id: artist?.id,
    }));

    return (
        <BackgroundView>
            <Text style={{
                color: "white",
                fontSize: TextSize.md,
                fontWeight: "bold",
                textAlign: "center",
                borderBottomColor: Colors.primary,
                borderBottomWidth: 1,
                paddingVertical: 10
            }}>
                Artists
            </Text>
            <View style={{ flex: 1 }}>
                <FlatList ListEmptyComponent={<>
            {isFetching ? <ActivityIndicator color={Colors.primary} size={"small"} /> : <EmptyDisplay />}
            </>} contentContainerStyle={
                    styles.mainContainer
                } data={artistList} renderItem={({ item }) => (
                    <TouchableOpacity style={{
                        marginBottom: 20,
                        alignItems: "center",
                        width: 100,
                    }} onPress={() => {
                        router.push({
                            pathname: "/home/artists_view",
                            params: {
                                id: item.id
                            }
                        });
                    }}>
                        <FontAwesome name="user-circle" size={70} style={{ marginBottom: 10 }} color="grey" />
                        {/* <Image style={[styles.thumbnail, {
                            height: 80,
                            width: 80,
                            marginBottom: 10,
                        }]}
                            source={{ uri: item.thumbnail }}
                        /> */}
                        <Text style={{
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "center",
                            width: "100%"
                        }}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )} />

            </View>
        </BackgroundView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 20,
        flexWrap: "wrap",
        width: "100%"
    },
    thumbnail: {
        width: "45%",
        height: 150,
        borderRadius: 10,
    },
    artistsTextsContainer:
    {
        marginLeft: 10,
        width: "50%"
    },
    artistText: {
        color: "white",
        marginBottom: 10,
    },

    trackContainer: {
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center",
        borderBottomWidth: 1,
        paddingVertical: 10,
        borderBottomColor: "grey",
    }
});

export default ArtistsView;