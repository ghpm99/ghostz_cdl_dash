import axios from "axios";
import { API_ENDPOINT, api } from "services";

const YOUTUBE_API_ENDPOINT = "http://192.168.100.5:8300" ?? API_ENDPOINT;

export async function fetchUrlOAuthYoutube() {
    const response = await api.get("/youtube/auth/");
    return response.data;
}

export async function loadPlaylist(playlistId: string) {
    const response = await api.get("/youtube/load-playlist/", {
        params: {
            playlist_id: playlistId,
        },
    });
    return response.data;
}

export async function fetchYoutubePlaylist() {
    const response = await api.get("/youtube/playlist/");
    return response.data;
}

export async function updateActiveYoutubePlaylistService(id: number) {
    const response = await api.post("/youtube/playlist/update-active/", {
        playlist_id: id,
    });
    return response.data;
}

export async function fetchActiveYoutubePlaylistService(token: string, position?: number) {
    const response = await axios.create({ baseURL: YOUTUBE_API_ENDPOINT }).get("/youtube/playlist/get-active/", {
        params: {
            position: position,
        },
        headers: {
            Authorization: "Basic " + token,
        },
    });
    return {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
    };
}

export async function updateStateChangeService(token: string, id: number, state: number) {
    const response = await axios.create({ baseURL: YOUTUBE_API_ENDPOINT }).post(
        "/youtube/playlist/set-state/",
        {
            id: id,
            state: state,
        },
        {
            headers: {
                Authorization: "Basic " + token,
            },
        }
    );
    return {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
    };
}
