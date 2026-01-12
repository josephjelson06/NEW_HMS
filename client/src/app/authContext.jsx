import { createContext, useContext, useState } from "react";
import { login as loginApi } from "../services/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const stored = localStorage.getItem("auth");
        return stored ? JSON.parse(stored) : null;
    });

    const login = async (email, password) => {
        const data = await loginApi(email, password);
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));
        return data;
    };

    // Helper to directly set auth data (for registration, token refresh, etc.)
    const setAuthData = (data) => {
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                user: auth?.user,
                token: auth?.token,
                isAuthenticated: !!auth,
                login,
                setAuthData,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

