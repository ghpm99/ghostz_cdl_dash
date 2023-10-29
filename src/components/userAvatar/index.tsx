import { Avatar, Button, Popover } from "antd";
import { useEffect, useState } from "react";
import { fetchUserDetails } from "services/auth";
import TokenService from "../../services/auth/authToken";
import Router from "next/router";

const UserAvatar = () => {
    const [userData, setUserData] = useState();
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
