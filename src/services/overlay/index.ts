import axios from 'axios'
import { API_ENDPOINT } from 'services'

export const apiOverlay = axios.create({
    baseURL: API_ENDPOINT,
});

export async function fetchActiveOverlayService(token: string) {
    const response = await apiOverlay.get("/overlay/active/", {
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
