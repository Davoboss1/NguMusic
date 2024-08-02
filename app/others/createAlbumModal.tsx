import { ScrollView, StyleSheet, Text, View } from "react-native";
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
import { getAlbums, getGenres, uploadAlbum, uploadTrack } from "@/api";


const createMusicSchema = z.object({
    name: z.string().trim().min(1, { message: "Please enter a valid name" }),
    description: z.string().trim().min(10, { message: "Please enter a valid description, minimum of 10 characters" }),
});

const createAlbumModal = ({ show, onClose }: { show: boolean, onClose: () => void }) => {
   
    const [musicInformation, setMusicInformation] = useState({
        name: "",
        description: "",
        thumbnail: {
            uri: "",
            name: "",
            type: ""
        }
    });

    const createAlbumMutation = useMutation({
        mutationFn: uploadAlbum, onSuccess() {
            setMusicInformation({
                name: "",
                description: "",
                thumbnail: {
                    uri: "",
                    name: "",
                    type: ""
                }
            })
        }
    });

    const zodValidity = createMusicSchema.safeParse(musicInformation);
    const errors = parseZodError(zodValidity);
    const updateMusicInformation = (field: string, value: string | number) => {
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
                <ScrollView >
                    <View style={{ paddingBottom: 15 }}>

        
                        <Input errorText={errors["name"]} label={"Enter Album name "}
                            onChangeText={(text) => updateMusicInformation("name", text)} placeholder="Enter album name" containerStyle={{
                                margin: 10,
                            }} value={musicInformation.name} />

                        <Input errorText={errors["description"]} label={"Description"}
                            onChangeText={(text) => updateMusicInformation("description", text)} placeholder="Enter description" containerStyle={{
                                margin: 10,
                            }} value={musicInformation.description} />

                        <View style={{ margin: 10 }}>
                            <Text style={{
                                color: "white",
                                marginBottom: 10
                            }}>
                                Select Thumbnail Image
                            </Text>

                            <TextButton onPress={() => {
                                DocumentPicker.getDocumentAsync({
                                    type: 'image/*',
                                    copyToCacheDirectory: true
                                })
                                    .then(res => {
                                        console.log(res);
                                        if (res.assets && res.assets[0]) {
                                            setMusicInformation({ ...musicInformation, thumbnail: { uri: res.assets[0].uri, name: res.assets[0].name, type: res.assets[0].mimeType as string } })
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                            }} leftIcon={<FontAwesome6 name="upload" size={20} style={{ marginRight: 10 }} color={Colors.primary} />} style={{ width: "auto" }} textStyle={{ fontSize: TextSize.sm, color: Colors.primary }} >
                                {musicInformation?.thumbnail?.name || "Browse and select an image file"}
                            </TextButton>
                            <Text style={{ color: "red" }}>{musicInformation.thumbnail?.uri ? "" : "Please select a file"}</Text>
                        </View>
                        <GradientButton loading={createAlbumMutation.isPending} onPress={() => {

                            if (zodValidity.success && musicInformation.thumbnail?.uri) {
                                createAlbumMutation.mutate(musicInformation);
                            }
                        }} style={{ marginHorizontal: 10 }}>
                            Upload Music
                        </GradientButton>
                        {createAlbumMutation.isSuccess && <Text style={{
                            backgroundColor: Colors.success,
                            padding: 15,
                            color: "white",
                            margin: 10,
                            borderRadius: 5,
                            textAlign: "center"
                        }} >
                            Album has been created successfully.
                        </Text>}

                    </View>
                </ScrollView>
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

export default createAlbumModal;