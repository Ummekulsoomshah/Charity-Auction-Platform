import React, { createContext, useContext, useState } from 'react'
export const UserDataContext = createContext()
const UserContext = ({ children }) => {
    const [user, setuser] = useState({
        name: "",
        email: "",
        password: ""
    })
    return (
        <UserDataContext.Provider value={{ user, setuser }}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext
