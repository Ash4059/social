import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { register, login as userLogin, editProfile, fetchUserFriends } from "../api";
import { getItemFromLocalStorage, removeItemFromLocalStorage, setItemInLocalStorage } from "../utils";
import { LOCAL_STORAGE_TOKEN_KEY } from '../utils/constant';
import jwtDecode from "jwt-decode";

export const useAuth = () =>{
    return useContext(AuthContext)
}

export const useProviderAuth = () => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const userToken = getItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);

            if(userToken){
                const user = jwtDecode(userToken);
                const response = await fetchUserFriends();
                let friends = [];

                if(response.success){
                    friends = response.data.friends;
                }

                setUser({
                    ...user,
                    friends
                });

            }

            setLoading(false);
        }   

        getUser();

    }, []);

    const login = async (email,password) => {
        const response = await userLogin(email,password);

        if(response.success){
            setItemInLocalStorage(LOCAL_STORAGE_TOKEN_KEY,response.data.token ? response.data.token : null);
            
            const friendResponse = await fetchUserFriends();
            let friends = [];

            if(friendResponse.success){
                friends = friendResponse.data.friends;
            }

            setUser({
                ...response.data.user,
                friends
            });

            return {
                success : true,
                data : response.data
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
        removeItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);
    };

    const signup = async (name,email,password,confirmPassword) => {

        const response = await register(name,email,password,confirmPassword);

        if(response.success){
            return {
                success : true,
                data : response.data

            }
        }
        else{
            return {
                message : response.message,
                success : false
            }
        }

    }

    const udpateUser = async (userId,name,password,confirmPassword) => {

        const response = await editProfile(userId,name,password,confirmPassword);

        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(LOCAL_STORAGE_TOKEN_KEY,response.data.token ? response.data.token : null);
            return {
                success : true,
                data : response.data

            }
        }
        else{
            return {
                message : response.message,
                success : false
            }
        }
    }

    const updateUserFriends = (addFriends, friend) => {
        if(addFriends){
            setUser({
                ...user,
                friends : [...user.friends, friend]
            });
            return;
        }
        else{
            setUser({
                ...user,
                friends : user.friends.filter(f => f.to_user._id !== friend[0].to_user._id)
            });
        }
    }

    return {
        user,
        loading,
        login,
        logout,
        signup,
        udpateUser,
        updateUserFriends
    }

};