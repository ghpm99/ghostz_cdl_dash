import { api } from "services";

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
