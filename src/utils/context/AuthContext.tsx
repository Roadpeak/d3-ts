import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    userType: string;
    active: boolean;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (token) {
                    const response = await fetch('http://127.0.0.1:8000/api/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        const mappedUser: User = {
                            id: userData.id,
                            email: userData.email,
                            firstName: userData.first_name,
                            lastName: userData.last_name,
                            phone: userData.phone,
                            userType: userData.user_type,
                            active: Boolean(userData.active),
                        };
                        setUser(mappedUser);
                    } else {
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                const userData = await response.json();
                const mappedUser: User = {
                    id: userData.id,
                    email: userData.email,
                    firstName: userData.first_name,
                    lastName: userData.last_name,
                    phone: userData.phone,
                    userType: userData.user_type,
                    active: Boolean(userData.active),
                };
                setUser(mappedUser);
                localStorage.setItem('access_token', userData.token);
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setUser(null);
            throw new Error('Login failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
