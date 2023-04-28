import { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export function useAdmin() {
    return useContext(AdminContext);
}

export function AdminProvider({ children }) {
    const [isAdmin, setIsAdmin] = useState(false);
    
    return (
        <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            {children}
        </AdminContext.Provider>
    );
}