interface ILoginForm {
    username: string
    password: string
    remember: boolean
}

interface IUser {
    token: string
    remember: boolean
}

interface IUserDetailsApi {
    username: string
    name: string
    last_name: string
    user_type: string
    complete: boolean
}

interface IChangePasswordRequest {
    new_password: string
    re_new_password: string
}
