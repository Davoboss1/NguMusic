import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import BackgroundView from "@/components/containers/BackgroundView";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from "@/constants/Colors";
import { Input } from "@/components/elements/Input";
import { Dropdown } from "@/components/elements/Dropdown";
import { dropdownItem } from "@/types";
import { TextButton } from "@/components/elements/Button";
import { FontAwesome6 } from "@expo/vector-icons";
import { TextSize } from "@/constants/Size";
import * as DocumentPicker from 'expo-document-picker';
import { useState } from "react";
import { z } from "zod";
import { parseZodError, showToast } from "@/utils";
import { GradientButton } from "@/components/elements/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAlbums, getGenres, uploadTrack } from "@/api";

const createMusicSchema = z.object({
    name: z.string().trim().min(1, { message: "Please enter a valid name" }),
    album: z.number({ message: "Please select an album" }),
    genre: z.number({ message: "Please select a genre" }),
});

const createMusicModal = ({ show, onClose }: { show: boolean, onClose: () => void }) => {
    const data: dropdownItem[] = [
        {
            label: "Music To see",
            value: "Music to see",
            icon: "album"
        },
        {
            label: "Music To hear",
            value: "Music to hear",
            icon: "album"
        },
    ]

    const { data: genres, isFetching: genres_is_fetching } =
        useQuery({
            queryKey: ["genres"],
            queryFn: () => getGenres(),
        });

    const { data: albums, isFetching: albums_is_fetching } =
        useQuery({
            queryKey: ["albums"],
            queryFn: () => getAlbums(),
        });

    const genresList: dropdownItem[] = genres?.map((genre: any) => ({
        label: genre.name,
        value: genre.id,
        icon: "album"
    }));

    const albumList: dropdownItem[] = albums?.map((album: any) => ({
        label: album.name,
        value: album.id,
        icon: "album"
    }));

    const [musicInformation, setMusicInformation] = useState({
        name: "",
        album: "",
        genre: "",
        file: {
            uri: "",
            name: "",
            type: ""
        }
    });

    const createTrackMutation = useMutation({
        mutationFn: uploadTrack, onSuccess() {
            setMusicInformation({
                name: "",
                album: "",
                genre: "",
                file: {
                    uri: "",
                    name: "",
                    type: ""
                }
            })
        }
    });

    const zodValidity = createMusicSchema.safeParse(musicInformation);
    const errors = parseZodError(zodValidity);
    const updateMusicInformation = (field: string, value: string) => {
        setMusicInformation({
            ...musicInformation,
            [field]: value
        });
    }


    return (
        <Modal onBackButtonPress={onClose} isVisible={show}>
            <BackgroundView style={{ flex: 1, borderRadius: 10 }}>
                <View style={styles.modalHeaderContainer}>
                    <Text style={styles.modalHeaderText}>Create Music</Text>
                    <MaterialCommunityIcons name="window-close" size={24} color="white" onPress={onClose} />
                </View>
                <View>

                    <Input errorText={errors["name"]} label={"Song title "}
                        onChangeText={(text) => updateMusicInformation("name", text)} placeholder="Enter song name" containerStyle={{
                            margin: 10,
                        }} value={musicInformation.name} />

                    <Dropdown currentItem={albumList?.find((val) => val.value === musicInformation.album)} errorText={errors["album"]} label="Select Album" data={albumList} onChange={(val) => {
                        updateMusicInformation("album", val)
                    }} />

                    <Dropdown currentItem={genresList?.find((val) => val.value === musicInformation.genre)} errorText={errors["genre"]} label="Select Genre" data={genresList} onChange={(val) => {
                        updateMusicInformation("genre", val)
                    }} />

                    <View style={{ margin: 10 }}>
                        <Text style={{
                            color: "white",
                            marginBottom: 10
                        }}>
                            Select Audio Wav File
                        </Text>

                        <TextButton onPress={() => {
                            DocumentPicker.getDocumentAsync({
                                type: 'audio/*',
                                copyToCacheDirectory: true
                            })
                                .then(res => {
                                    console.log(res);
                                    if (res.assets && res.assets[0]) {
                                        setMusicInformation({ ...musicInformation, file: { uri: res.assets[0].uri, name: res.assets[0].name, type: res.assets[0].mimeType as string } })
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }} leftIcon={<FontAwesome6 name="upload" size={20} style={{ marginRight: 10 }} color={Colors.primary} />} style={{ width: "auto" }} textStyle={{ fontSize: TextSize.sm, color: Colors.primary }} >
                            {musicInformation?.file?.name || "Browse and select .wav file"}
                        </TextButton>
                        <Text style={{ color: "red" }}>{musicInformation.file?.uri ? "" : "Please select a file"}</Text>
                    </View>
                    <GradientButton loading={createTrackMutation.isPending} onPress={() => {

                        if (zodValidity.success && musicInformation.file?.uri) {
                            createTrackMutation.mutate(musicInformation);
                        }
                    }} style={{ marginHorizontal: 10 }}>
                        Upload Music
                    </GradientButton>
                    {createTrackMutation.isSuccess && <Text style={{
                        backgroundColor: Colors.success,
                        padding: 15,
                        color: "white",
                        margin: 10,
                        borderRadius: 5,
                        textAlign: "center"
                    }} >
                        Track has been created successfully.
                    </Text>}

                </View>
            </BackgroundView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalHeaderContainer: {
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: Colors.secondary
    },
    modalHeaderText: {
        color: "white",
        fontWeight: "bold",
    }
});

export default createMusicModal;