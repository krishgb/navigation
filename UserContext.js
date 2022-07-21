import React, {useState, createContext, useContext, useEffect} from 'react'

const UsersContext = createContext()
export const useUsers = () => useContext(UsersContext)

export const Users = ({children}) => {
    const [users, setUsers] = useState([{email: 'a', password: 'a'}])

    useEffect(() => {
        console.log(users)
    }, [users])

    const isUserExists = (email) => {
        if(!users.length) return false
        return users.some(user => user?.email === email)
    }

    const newUser = (user) => {
        setUsers([...users, user])
    }

    const setSchedule = (email, schedules) => {
        for(const user of users){
            if(user.email === email){
                user.schedules = schedules
                setUsers([...users, user])
            }
        }
    }

    const verifyUser = (email, password) => {
        if(!users.length) return false
        for(const user of users){
            if(user.email === email && user.password === password) return true
        }
        return false
    }

    return (
        <UsersContext.Provider value={{users, newUser, isUserExists, verifyUser, setSchedule}}>
            {children}
        </UsersContext.Provider>
    )
}

