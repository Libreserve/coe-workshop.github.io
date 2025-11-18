'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, logout as apiLogout} from '../../lib/api';
import { User } from '../../lib/types';
import {AuthContextType} from "@/app/Context/AuthContext/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    const fetchUser = async () => {
        setLoading(true);
        const data = await getCurrentUser();
        setUser(data.user);
        setAuthenticated(data.authenticated);
        setLoading(false);
    };

    useEffect(() => {
        const loadUser = async () => {
            await fetchUser();
        };
        loadUser();
    }, []);

    const logout = async () => {
        await apiLogout();
        setUser(null);
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, loading, authenticated, logout, refreshUser: fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}