import axios from "axios";
import { API_ENDPOINT, api } from "services";

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

export async function fetchActiveYoutubePlaylistService(token: string) {
    const response = await axios.create({ baseURL: API_ENDPOINT }).get("/youtube/playlist/get-active/", {
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
