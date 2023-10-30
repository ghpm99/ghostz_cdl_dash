import { Avatar, Button, Popover } from "antd";
import { useEffect, useState } from "react";
import { fetchUserDetails } from "services/auth";
import TokenService from "../../services/auth/authToken";
import Router from "next/router";

interface IUser {
    id: number;
    name: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
    is_superuser: boolean;
    last_login: string;
    date_joined: string;
}

const UserAvatar = () => {
    const [userData, setUserData] = useState<IUser>();
    useEffect(() => {
        fetchUserDetails().then((response) => setUserData(response.data));
    }, []);

    const hasName = !!userData && !!userData.name;

    const logout = () => {
        TokenService.removeUser();
        Router.push("/signin");
    };

    const content = () => {
        return (
            <div>
                <div>{hasName ? userData.name : userData.username}</div>
                <Button type="primary" onClick={logout}>
                    Deslogar
                </Button>
            </div>
        );
    };
    return (
        <Popover content={content}>
            <Avatar></Avatar>
        </Popover>
    );
};

export default UserAvatar;
