import { getAlbums } from "@/api";
import BackgroundView from "@/components/containers/BackgroundView";
import { TextButton } from "@/components/elements/Button";
import { Colors } from "@/constants/Colors";
import { TextSize } from "@/constants/Size"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CreateAlbumModal from "../../others/createAlbumModal";
import { EmptyDisplay } from "@/components/elements/EmptyDisplay";

const AlbumsView = () => {

    const { data: albums, isFetching } =
        useQuery({
            queryKey: ["all_albums"],
            queryFn: () => getAlbums(),
        });

    const router = useRouter();

    const albumList: {
        name: string,
        thumbnail: string,
        id: number,
    }[] = albums?.map((album: any) => ({
        name: album?.name,
        thumbnail: album?.thumbnail,
        id: album?.id,
    }));

    const [showCreateAlbumModal, setShowCreateAlbumModal] = useState(false);


    return (
        <BackgroundView>
        <CreateAlbumModal show={showCreateAlbumModal} onClose={() => setShowCreateAlbumModal(false)} />

            <View style={{
                flexDirection: "row", paddingHorizontal: 10, borderBottomColor: Colors.primary,
                borderBottomWidth: 1,
            }}>

                <Text style={styles.mainText}>
                    Albums
                </Text>
                <TextButton style={{ marginLeft: "auto" }} onPress={() => setShowCreateAlbumModal(true)}>Create +</TextButton>
            </View>

            <View style={{ flex: 1 }}>
                <FlatList ListEmptyComponent={<>
            {isFetching ? <ActivityIndicator color={Colors.primary} size={"small"} /> : <EmptyDisplay />}
            </>} contentContainerStyle={
                    styles.mainContainer
                } data={albumList} renderItem={({ item }) => (
                    <TouchableOpacity style={{
                        marginBottom: 20,
                        alignItems: "center",
                        width: 100,
                    }} onPress={() => {
                        router.push({
                            pathname: "/home/albums_view",
                            params: {
                                id: item.id
                            }
                        });
                    }}>
                        <Image style={[styles.thumbnail, {
                            height: 80,
                            width: 80,
                            marginBottom: 10,
                        }]}
                            source={{ uri: item.thumbnail }}
                        />
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
    mainText: {
        color: "white",
        fontSize: TextSize.md,
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: 10
    },
    mainContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 20,
        flexWrap: "wrap",
        width: "100%"
    },
    mainTitleText: {

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
    }
});

export default AlbumsView;