import { createContext, useState } from "react";

export const Context = createContext(null)

const UserContextProvider = ({ children }) => {
    const [userId, setUserId] = useState()

    return <Context.Provider value={{ userId, setUserId }}>
        {children}
    </Context.Provider>
}

export default UserContextProvider