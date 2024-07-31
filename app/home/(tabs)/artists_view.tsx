import { getArtist, getSomeTracks } from "@/api";
import BackgroundView from "@/components/containers/BackgroundView";
import { Colors } from "@/constants/Colors";
import { TextSize } from "@/constants/Size"
import { track } from "@/types";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { Link, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler";

const ArtistsView = () => {


    const { id } = useLocalSearchParams();
    console.log("Artist ID: ", id);
    const { data: artist, isFetching } =
        useQuery({
            queryKey: ["artist", id],
            queryFn: () => getArtist(id as string),
        });

    const { data: tracks, isFetching: tracks_is_fetching } =
        useQuery({
            queryKey: ["tracks", "forarit", id],
            queryFn: () => getSomeTracks(id as string),
        });


    console.log(artist);

    const artistData: {
        artist_name: string,
        first_name: string,
        last_name: string,
        id: string,
        albums: {
            id: string,
            name: string,
            thumbnail: string
        }[]
    } = {
        artist_name: artist?.artist_name,
        first_name: artist?.first_name,
        last_name: artist?.last_name,
        albums: artist?.album_set,
        id: id as string
    };

    const tracksData: track[] = tracks?.map((track: any) => ({
        name: track?.name,
        file_link: track?.file,
        album_name: track?.album?.name,
        thumbnail: track?.album?.thumbnail,
        artist: track?.album?.user?.artist_name,
        genre: track?.genre?.name,
        featured_artists: track?.featured_artists
    }));


    return (
        <BackgroundView>
            <Text style={styles.mainTitle}>
                {artistData.artist_name}
            </Text>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <FontAwesome name="user-circle" size={70} style={{ marginBottom: 10 }} color="grey" />
                    {/* <Image style={[styles.thumbnail, {
                            height: 80,
                            width: 80,
                            marginBottom: 10,
                        }]}
                            source={{ uri: item.thumbnail }}
                        /> */}
                    <View style={styles.albumsTextsContainer}>
                        <Text style={styles.albumText}>
                            First Name: {artistData.first_name}
                        </Text>
                        <Text style={styles.albumText}>
                            Last Name: {artistData.last_name}
                        </Text>
                        <Text style={styles.albumText} >
                            Artist Name: {artistData.artist_name}
                        </Text>

                    </View>

                </View>

                <Text style={styles.albumsContainer}>
                    Albums
                </Text>
                <ScrollView horizontal style={{
                    margin: 20,
                    maxHeight: 120,
                }}>

                    <View style={{ flexDirection: "row" }}>
                        {artistData.albums?.map((album) => (

                            <TouchableOpacity key={album.id} style={{
                                marginTop: 10,
                                alignItems: "center",
                                width: 100,
                                alignSelf: "flex-start",
                            }}>
                                <Image style={[styles.thumbnail, {
                                    height: 70,
                                    width: 70,
                                    marginBottom: 5
                                }]}
                                    source={{ uri: album.thumbnail }}
                                />
                                <Text style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}>
                                    {album.name}
                                </Text>
                            </TouchableOpacity>))}
                    </View>
                </ScrollView>
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
                    {tracksData?.map((item) => (
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
                                        {item.artist}
                                    </Text>
                                </View>
                                <MaterialCommunityIcons name="chevron-right" size={24} color="white" style={{ marginLeft: "auto" }} />
                            </TouchableOpacity>
                        </Link>
                    ))}
                </View>
            </ScrollView>
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
        marginVertical: 10,
        alignItems: "center",
        borderBottomWidth: 1,
        paddingVertical: 10,
        borderBottomColor: "grey",
    },
    mainTitle: {
        color: "white",
        fontSize: TextSize.md,
        fontWeight: "bold",
        textAlign: "center",
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    albumsContainer: {
        fontSize: TextSize.md,
        fontWeight: "bold",
        color: "white",
        marginHorizontal: 20,
        justifyContent: "space-around"
    }
});

export default ArtistsView;