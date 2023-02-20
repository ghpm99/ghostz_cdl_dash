import { api } from "services";

export async function fetchOverlayService() {
    const response = await api.get("/overlay/");
    return {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
    };
}

export async function fetchImportJsonService(data) {
    const response = await api.post("/overlay/import/", data);
    return {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
    };
}

export async function fetchChangeOverlayActiveService(id) {
    const response = await api.post(`/overlay/${id}/active`);
    return {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
    };
}

export async function reloadOverlayService(){
    const response = await api.post(`/overlay/reload/`);
    return {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
    };
}