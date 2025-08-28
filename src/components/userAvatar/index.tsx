import { useQuery } from "@tanstack/react-query";
import { Avatar, Button, Popover } from "antd";
import Router from "next/router";
import { fetchUserDetails } from "services/auth";
import TokenService from "../../services/auth/authToken";

export interface IUserData {
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
    const { data: userData, isLoading } = useQuery({
        queryKey: ["userDetails"],
        queryFn: fetchUserDetails,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
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
