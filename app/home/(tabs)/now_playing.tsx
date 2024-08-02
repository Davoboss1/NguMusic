import BackgroundView from "@/components/containers/BackgroundView";
import { Colors } from "@/constants/Colors";
import { TextSize } from "@/constants/Size"
import { track } from "@/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Slider } from "react-native-awesome-slider";
import { ColorSpace, useSharedValue } from "react-native-reanimated";

const NowPlayingView = () => {

    const [currentInterval, setCurrentInterval] = useState<any | undefined>();
    const [currentDuration, setCurrentDuration] = useState(0);

    const [totalDuration, setTotalDuration] = useState(0);
    const progress = useSharedValue(0);
    const min = useSharedValue(0);
    const max = useSharedValue(0);

    const params = useLocalSearchParams();
    const track: track = JSON.parse(params?.track as string || "{}");
    console.log(track);

    const [sound, setSound] = useState<Audio.Sound>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        console.log("Init sound");
        (async () => {
            
        })();
    }, []);
    async function playSound() {
        console.log('Loading Sound');
        const { sound: _sound } = await Audio.Sound.createAsync({ uri: track.file_link });
        setSound(_sound);

        //if (sound) {
            console.log('Playing Sound');
            await _sound.playAsync();

            _sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    let duration = Math.floor((status?.durationMillis || 0) / 1000);
                    setTotalDuration(duration);
                    max.value = duration;
                    progress.value = 0;
                    if (status.isPlaying && duration > 0) {
                        const interval = setInterval(() => {

                            progress.value += 1;
                            if (progress.value >= duration) {
                                clearInterval(interval);
                                setIsPlaying(false);
                                // sound.unloadAsync();

                                return;
                            }
                            setCurrentDuration(Math.floor(progress.value));

                        }, 1000);
                        setCurrentInterval(interval);
                    }
                }
            });

            setIsPlaying(true);
    //    }
    }

    async function pauseSound() {
        await sound?.pauseAsync();
        clearInterval(currentInterval);
        setIsPlaying(false);
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                setIsPlaying(false);
                clearInterval(currentInterval);
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <BackgroundView>
            <View style={styles.topbarContainer}>
                <TouchableOpacity style={{
                    position: "absolute",
                    left: 0
                }}>
                    <FontAwesome6 name="chevron-left" size={20} color="white" />

                </TouchableOpacity>
                <Text style={{
                    color: "white",
                    fontSize: TextSize.sm
                }}>
                    Now Playing
                </Text>
            </View>

            <View style={styles.musicDisplayContainer}>
                <Image source={{
                    uri: track.thumbnail
                }} style={styles.albumImage} />
                <Text style={styles.musicTitle}>
                    {track.name}
                </Text>
                <Text style={styles.musicArtist}>
                    {track.artist}
                </Text>
                <Slider
                    onValueChange={async (val) => {
                        let value = Math.floor(val)
                        await sound?.playFromPositionAsync(value * 1000);
                        progress.value = value;
                        setCurrentDuration(value);
                    }}
                    style={styles.sliderContainer}
                    progress={progress}
                    minimumValue={min}
                    maximumValue={max}
                    theme={{
                        minimumTrackTintColor: Colors.primary,
                        bubbleBackgroundColor: Colors.primary,
                    }}
                />
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10
                }}>
                    <Text style={styles.durationText}>
                        {Math.floor(currentDuration / 60)}:{Math.floor(currentDuration % 60)}
                    </Text>
                    <Text style={styles.durationText}>
                        {Math.floor(totalDuration / 60)}:{Math.floor(totalDuration % 60)}

                    </Text>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginTop: 20
                }}>
                    <TouchableOpacity style={styles.previousBtn}>
                        <FontAwesome6 name="backward-step" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => isPlaying ? pauseSound() : playSound()} style={styles.playBtn}>
                        <FontAwesome6 name={isPlaying ? "pause" : "play"} size={35} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextBtn}>
                        <FontAwesome6 name="forward-step" size={30} color="white" />
                    </TouchableOpacity>


                </View>
            </View>

        </BackgroundView>
    )
}

const styles = StyleSheet.create({
    topbarContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    musicDisplayContainer: {
        marginTop: 15,
        width: "100%",
        maxWidth: "80%",
        marginHorizontal: "auto",
    },
    albumImage: {
        height: 300,
        width: "100%",
        borderRadius: 10
    },
    musicTitle: {
        color: "white",
        fontWeight: "bold",
        fontSize: TextSize.lg,
        marginTop: 20,
        textAlign: "center"
    },
    musicArtist: {
        color: "white",
        marginTop: 10,
        textAlign: "center"

    },
    nextBtn: {
        marginRight: 15
    },
    previousBtn: {
        marginLeft: 15
    },
    playBtn: {
        marginHorizontal: 10,
        backgroundColor: Colors.primary,
        height: 60,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 999
    },
    sliderContainer: {
        marginTop: 25,
        marginBottom: 5,
    },
    durationText: {
        color: "white",
        fontSize: TextSize.xs
    }
});

export default NowPlayingView;