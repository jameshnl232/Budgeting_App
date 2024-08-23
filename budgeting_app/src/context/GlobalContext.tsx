import { createContext } from "react";
import { useState } from "react";
import { fetchDataFromLocalStorage } from "../utils/utils";

type ContainerProps = {
    children: React.ReactNode;
}

type ContextType = {
    user: string | null;
    setUser: (user: string) => void;
}

const initalContext = {
    user: null,
    setUser: () => {}
}

export const GlobalContext = createContext<ContextType>(initalContext);

const GlobalProvider = ({ children }: ContainerProps) => {

    const [user, setUser] = useState(localStorage.getItem("user") ? fetchDataFromLocalStorage("user") : null);

   
    return (
        <GlobalContext.Provider value={{user, setUser}}>
            {children}  
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;