import { usePersistedStore } from "@/stores";
import { getFormData } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import axiosRetry from 'axios-retry';
import { router, useNavigation, useRouter } from "expo-router";

//const BASE_URL = "https://ngumusic.pythonanywhere.com";
const BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
});
axiosRetry(api, {
    retries: 1,
    retryCondition: (error) => {
        // if retry condition is not specified, by default idempotent requests are retried
        return error?.response?.status === 401;
    },
    onRetry: async () => {
        let status = await refreshToken();

    },
});

const refreshToken = async () => {
    try {
        let refresh = usePersistedStore.getState().refresh;

        let response = await axios.post(BASE_URL + "/user/token/refresh/", {
            refresh: refresh,
        });

        usePersistedStore.getState().setAccessToken(response.data?.access || "");
        //usePersistedStore.getState().setRefreshToken(response.data?.refresh || "");
        return true;
    } catch (err) {
        AsyncStorage.clear();
        router.push("/auth/login");
        return false;
    }
};


// Interceptors
api.interceptors.request.use(
    async function (config) {
        const token = usePersistedStore.getState().access;
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// api.interceptors.response.use(
//     function (response) {
//         // Any status code that lie within the range of 2xx cause this function to trigger
//         // Do something with response data
//         return response;
//     },
//     async function (error) {
//         if (error?.response?.status === 401) {

//         }

//         return Promise.reject(error);
//     },
// );

export const LoginRequest = async (data: { email: string, password: string }) =>
    (await api.post("/user/login/", data)).data;

export const RegisterUser = async (data: { first_name: string, last_name: string, email: string, password: string }) =>
    (await api.post("/users/", data)).data;

export const uploadTrack = async (data: { name: string, file: { name: string, type: string, uri: string }, album: string }) =>
    (await api.post("/create/tracks/", getFormData(data), {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })).data;

export const uploadAlbum = async (data: { name: string, thumbnail: { name: string, type: string, uri: string }, description: string }) =>
    (await api.post("/create/albums/", getFormData(data), {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })).data;

export const getGenres = async () =>
    (await api.get("/genres/")).data;

export const getAlbums = async () =>
    (await api.get("/albums/")).data;

export const getUserAlbums = async () =>
    (await api.get("/users/albums/")).data;

export const getAlbum = async (id: string) =>
    (await api.get(`/album/${id}/`)).data;


export const getArtists = async () =>
    (await api.get("/artists/")).data;

export const getArtist = async (id: string) =>
    (await api.get(`/artist/${id}/`)).data;


export const getSomeTracks = async (id: string) =>
    (await api.get(`/artist/some-tracks/${id}/`)).data;


export const getTracks = async () =>
    (await api.get("/tracks/")).data;

const testFunc = async () => {
    console.log("------ STORAGE -----")
    console.log(JSON.stringify(await AsyncStorage.getItem("ngu-store")))
    console.log("------ STORAGE END -----");
    //AsyncStorage.clear()
    //usePersistedStore.getState().setAccessToken("what");

}


testFunc();