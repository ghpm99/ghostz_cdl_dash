import axios from "axios";
import { api } from "services";

const apiLogin = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/auth",
});

export async function signinService(username: string, password: string) {
    const response = await apiLogin.post("/signin", {
        credentials: {
            username,
            password,
        },
    });
    return response;
}

export async function fetchUserDetails() {
    const response = await api.get("/auth/user");
    return response;
}
