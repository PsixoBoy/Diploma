import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../api";

const UserContext = createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {
    const [user, setUser] = useState();

    const getUser = async () => {
        if (localStorage.getItem('jwt')) {
            const {data} = await getMe();
            setUser(data);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return <UserContext.Provider value={{user, getUser}}>
        {children}
    </UserContext.Provider>
}