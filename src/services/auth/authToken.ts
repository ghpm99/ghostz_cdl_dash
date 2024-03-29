class TokenService {
    userItemName: string

    constructor(itemName: string) {
        this.userItemName = itemName
    }

    getUser(): IUser | undefined {
        const localStorageToken = localStorage.getItem(this.userItemName)
        const sessionStorageToken = sessionStorage.getItem(this.userItemName)
        const token = localStorageToken ?? sessionStorageToken ?? undefined
        if (!token) {
            return undefined
        }
        const user: IUser = JSON.parse(token)
        return user
    }

    getToken() {
        const user = this.getUser()
        return user?.token
    }


    setUser(user: IUser) {
        if (user.remember) {
            localStorage.setItem(this.userItemName, JSON.stringify(user))
        } else {
            sessionStorage.setItem(this.userItemName, JSON.stringify(user))
        }
    }

    removeUser() {
        localStorage.removeItem(this.userItemName)
        sessionStorage.removeItem(this.userItemName)
    }
}

export default new TokenService('ghostz')
