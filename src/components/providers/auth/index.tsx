"use client";
import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext } from "react";
import { fetchUserDetails } from "services/auth";

interface IUserData {
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

interface IAuthContext {
    user: IUserData;
    isLoading: boolean;
    error: unknown;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const {
        data: userData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["userDetails"],
        queryFn: fetchUserDetails,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const value: IAuthContext = {
        user: userData ?? null,
        isLoading: isLoading && !error,
        error,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }
    return context;
};
