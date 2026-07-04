import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [token , setToken] = useState(localStorage.getItem("token") || null);
    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);

    const login = (user , token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("token" , token);
    }
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    }

    useEffect(() => {
        const checkCurrentUser = async () => {
            
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await api.get("/auth/me");
                if (res.data.success) {
                    setUser(res.data.user);
                }
            } catch (error) {
                console.error(error);
                logout();
            } finally {
                setLoading(false);
            }

        }
        checkCurrentUser()
    } , [token])

    return (
        <AuthContext.Provider value={{ token, user, loading , login , logout}}>
            {children}
        </AuthContext.Provider>
    );

}
