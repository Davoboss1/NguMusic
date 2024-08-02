import { getAlbum } from "@/api";
import BackgroundView from "@/components/containers/BackgroundView";
import { EmptyDisplay } from "@/components/elements/EmptyDisplay";
import { Colors } from "@/constants/Colors";
import { TextSize } from "@/constants/Size"
import { track } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";

const AlbumsView = () => {

    const { id } = useLocalSearchParams();
    console.log("Album ID: ", id);
    const { data: album, isFetching } =
        useQuery({
            queryKey: ["album", id],
            queryFn: () => getAlbum(id as string),
        });

    console.log(album);

    const albumData: {
        name: string,
        thumbnail: string,
        id: number,
        artist: string,
        date: string,
        tracks: track[]
    } = {
        name: album?.name,
        artist: album?.user?.artist_name,
        thumbnail: album?.thumbnail,
        id: album?.id,
        tracks: album?.tracks?.map((track: any) => ({
            name: track?.name,
            file_link: track?.file,
            album_name: track?.album?.name,
            thumbnail: album?.thumbnail,
            artist: album?.user?.artist_name,
            genre: track?.genre?.name,
            featured_artists: track?.featured_artists
        })),
        date: new Date(album?.created_at).toDateString(),
    };

    const listHeader = (
        <>
            <View style={styles.mainContainer}>
                <Image style={styles.thumbnail} source={{ uri: albumData.thumbnail }} />
                <View style={styles.albumsTextsContainer}>
                    <Text style={styles.albumText}>
                        Album Name: {albumData.name}
                    </Text>
                    <Text style={styles.albumText} >
                        Artist Name: {albumData.artist}
                    </Text>
                    <Text style={styles.albumText}>
                        Release Date: {albumData.date}
                    </Text>
                    <Text style={styles.albumText}>
                        No of tracks: {albumData?.tracks?.length}
                    </Text>
                </View>
            </View>
            <View>
                <View style={{
                    marginHorizontal: 20
                }}>
                    <Text style={{
                        fontSize: TextSize.md,
                        fontWeight: "bold",
                        color: "white"
                    }}>
                        Tracks
                    </Text>
                </View>
            </View>
        </>)

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
                {albumData.name}
            </Text>

            
            <FlatList data={albumData.tracks} ListEmptyComponent={<>
            {isFetching ? <ActivityIndicator color={Colors.primary} size={"small"} /> : <EmptyDisplay />}
            </>} ListHeaderComponent={listHeader}
                renderItem={({ item }) => (
                    <Link href={{
                        pathname: "/home/now_playing",
                        params: {
                            track: JSON.stringify(item)
                        }
                    }} asChild>
                        <TouchableOpacity style={styles.trackContainer}>
                            <MaterialCommunityIcons name="music-box" size={50} color={Colors.primary} />
                            {/* <Text style={{ color: "white", fontWeight: "bold"}}>
                            {item.track_no}.
                        </Text> */}
                            <View style={{
                                marginLeft: 10,
                            }}>
                                <Text style={{
                                    color: "white",
                                    fontWeight: "bold",
                                }}>
                                    {item.name}
                                </Text>
                                <Text style={{ color: "white", marginTop: 5 }}>
                                    {albumData.artist}  • {item.featured_artists}
                                </Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={24} color="white" style={{ marginLeft: "auto" }} />
                        </TouchableOpacity>
                    </Link>
                )} />

        </BackgroundView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        margin: 20,
        alignItems: "center",
    },
    thumbnail: {
        width: "45%",
        height: 150,
        borderRadius: 10,
    },
    albumsTextsContainer:
    {
        marginLeft: 10,
        width: "50%"
    },
    albumText: {
        color: "white",
        marginBottom: 10,
    },

    trackContainer: {
        flexDirection: "row",
        marginBottom: 10,
        marginHorizontal: 20,
        alignItems: "center",
        borderBottomWidth: 1,
        paddingVertical: 10,
        borderBottomColor: "grey",
    }
});

export default AlbumsView;