import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { login as userLogin } from "../api";
import { getItemFromLocalStorage, setItemInLocalStorage } from "../utils";
import { LOCAL_STORAGE_TOKEN_KEY } from '../utils/constant';
import jwtDecode from "jwt-decode";

export const useAuth = () =>{
    return useContext(AuthContext)
}

export const useProviderAuth = () => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const userToken = getItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);

        if(userToken){
            const user = jwtDecode(userToken);

            setUser(user);
        }
        
        setLoading(false);

    }, []);

    const login = async (email,password) => {
        const response = await userLogin(email,password);

        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(LOCAL_STORAGE_TOKEN_KEY,response.data.token ? response.data.token : null);
            return {
                success : true
            }
        }
        else{
            return {
                success : false,
                message : response.message
            }
        }

    };

    const logout = () =>{
        setUser(null);
    };

    return {
        user,
        loading,
        login,
        logout
    }

};