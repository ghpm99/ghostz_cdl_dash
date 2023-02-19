import axios from 'axios'

const apiLogin = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/auth',
})

export async function signinService(username: string, password: string) {
    const response = await apiLogin.post('/signin', {
        credentials: {
            username,
            password
        }
    })
    return response
}

export async function fetchUserDetails(token: string) {
    const response = await apiLogin.get('/user', {
        headers: { Authorization: 'Basic ' + token },
    })
    return response
}