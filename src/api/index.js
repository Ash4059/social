import { getFormBody } from '../utils';
import {LOCAL_STORAGE_TOKEN_KEY} from '../utils/constant';
import { API_URLS } from '../utils/constant';

const customFetch = async (url, {body, ...customConfig}) => {
    
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    
    const headers = {
        'content-type' : 'application/x-www-form-urlencoded'
    }
    
    if(token){
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        ...customConfig,
        headers : {
            ...headers,
            ...customConfig.header
        }
    };

    if(body){
        config.body = getFormBody(body);
    }

    try {

        const response = await fetch(url,config);
        const data = await response.json();

        if(data.success){
            return{
                data : data.data,
                success : true
            }
        }

        throw new Error(data.message)

    } catch (error) {
        return{
            message : error.message,
            success : false
        }
    }

};


export const getPosts = (page = 1, limit = 5) =>{
    return customFetch(API_URLS.posts(page,limit),{
        method : 'GET'
    });
}

export const login = (email,password) => {
    return customFetch(API_URLS.login(), {
        method : 'POST',
        body : {email, password}
    });
}

export const register = async (name,email,password,confirmPassword) => {
    return customFetch(API_URLS.signup(),{
        method : 'POST',
        body: { email, name, password, confirm_password: confirmPassword }
    });
}