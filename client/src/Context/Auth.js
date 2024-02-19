import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../Util/constant";


const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ''
    })

    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            ;
            setAuth(prevAuth => ({
                ...prevAuth,
                token: data
            }));
        }
    }, []);



    useEffect(() => {

        axios.get(`${baseURL}/v1/auth/getLoggedinUser`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth')}`
            }
        })
            .then((res) => {
                setAuth(prevAuth => ({
                    ...prevAuth,
                    user: res.data.user
                }))
            }).catch((error) => console.log(error))
    }, [])



    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }